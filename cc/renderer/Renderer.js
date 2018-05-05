
import GLProgram    from './GLProgram'
import Color4F      from '../base/types/Color4F'
import V2F_C4B_T2F  from '../base/types/V2F_C4B_T2F'

const VBO_SIZE          = 65536
const INDEX_VBO_SIZE    = VBO_SIZE * 6 / 4

class TriBatchToDraw {
    constructor() {
        this.cmd            = null
        this.indicesToDraw  = 0
        this.offset         = 0
    }
}

export default class Renderer {
    constructor() {
        this._verts                     = V2F_C4B_T2F.create(VBO_SIZE)
        this._indices                   = new Uint16Array(INDEX_VBO_SIZE)
        this._buffersVBO                = []
        this._filledVertex              = 0
        this._filledIndex               = 0
        this._glViewAssigned            = false
        this._isRendering               = false
        this._isDepthTestFor2D          = false
        this._queuedTriangleCommands    = []
        this._clearColor                = Color4F.BLACK
        this._drawnBatches              = 0
        this._drawnVertices             = 0
        this._commands                  = []
        this._triBatchesToDraw          = []
    }

    initGLView() {
        this.setupBuffer()
        this._glViewAssigned = true
    }

    setupBuffer() {
        this._buffersVBO[0] = gl.createBuffer()
        this._buffersVBO[1] = gl.createBuffer()
    }

    clear() {
        gl.depthMask(true)
        gl.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.b, this._clearColor.a)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        gl.depthMask(false)
    }

    setDepthTest(enable) {
        if (enable) {
            gl.clearDepth(1)
            gl.enable(gl.DEPTH_TEST)
            gl.depthFunc(gl.LEQUAL)
        } else {
            gl.disable(gl.DEPTH_TEST)
        }
        this._isDepthTestFor2D = enable
    }

    clearDrawStats() {
        this._drawnBatches  = 0
        this._drawnVertices = 0
    }

    render() {
        this._isRendering = true
        if (this._glViewAssigned) {
            this.visitRenderQueue(this._commands)
        }
        this.clean()
        this._isRendering = false
    }

    visitRenderQueue(commands) {
        for (let i = 0; i < commands.length; i++) {
            processRenderCommand(commands[i])
        }
        this.flush()
    }

    processRenderCommand(cmd) {
        if (this._filledVertex + cmd.getVertexCount() > VBO_SIZE || this._filledIndex + cmd.getIndexCount() > INDEX_VBO_SIZE) {
            console.assert(cmd.getVertexCount() >= 0 && cmd.getVertexCount() < VBO_SIZE, 'VBO for vertex is not big enough, please break the data down or use customized render command')
            console.assert(cmd.getIndexCount() >= 0 && cmd.getIndexCount() < INDEX_VBO_SIZE, 'VBO for index is not big enough, please break the data down or use customized render command')
            this.drawBatchedTriangles()
        }
        this._queuedTriangleCommands.push(cmd)
        this._filledIndex   += cmd.getIndexCount()
        this._filledVertex  += cmd.getVertexCount()
    }

    drawBatchedTriangles() {
        if (this._queuedTriangleCommands.length == 0) {
            return
        }
        this._filledVertex  = 0
        this._filledIndex   = 0
        let batchesTotal    = 0
        let prevMaterialID  = -1
        let firstCommand    = true
        let cmd             = null
        if (this._triBatchesToDraw[0]) {
            this._triBatchesToDraw[0].offset = 0
        } else {
            this._triBatchesToDraw[0] = new TriBatchToDraw()
        }
        for (let i = 0; i < this._queuedTriangleCommands.length; i++) {
            cmd = this._queuedTriangleCommands[i]
            const currentMaterialID = cmd.getMaterialID()
            this.fillVerticesAndIndices(cmd)
            if (!this._triBatchesToDraw[batchesTotal]) {
                this._triBatchesToDraw[batchesTotal] = new TriBatchToDraw()
            }
            if (prevMaterialID == currentMaterialID || firstCommand) {
                this._triBatchesToDraw[batchesTotal].indicesToDraw += cmd.getIndexCount()
                this._triBatchesToDraw[batchesTotal].cmd = cmd
            } else {
                if (!firstCommand) {
                    batchesTotal++
                    this._triBatchesToDraw[batchesTotal].offset = this._triBatchesToDraw[batchesTotal - 1].offset + this._triBatchesToDraw[batchesTotal - 1].indicesToDraw
                }
                this._triBatchesToDraw[batchesTotal].cmd = cmd
                this._triBatchesToDraw[batchesTotal].indicesToDraw = cmd.getIndexCount()
            }
            prevMaterialID  = currentMaterialID
            firstCommand    = false
        }
        batchesTotal++
        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffersVBO[0])
        gl.bufferData(gl.ARRAY_BUFFER, this._verts.getBuffer(), gl.STATIC_DRAW)
        GL.enableVertexAttribs(GL.VERTEX_ATTRIB_FLAG_POS_COLOR_TEX)
        glVertexAttribPointer(GLProgram.VERTEX_ATTRIB_POSITION, V2F_C4B_T2F.VERTICES_SIZE, gl.FLOAT, false, V2F_C4B_T2F.BYTES_PER_ELEMENT, V2F_C4B_T2F.VERTICES_OFFSET)
        glVertexAttribPointer(GLProgram.VERTEX_ATTRIB_COLOR, V2F_C4B_T2F.COLORS_SIZE, gl.UNSIGNED_BYTE, true, V2F_C4B_T2F.BYTES_PER_ELEMENT, V2F_C4B_T2F.COLORS_OFFSET)
        glVertexAttribPointer(GLProgram.VERTEX_ATTRIB_TEX_COORD, V2F_C4B_T2F.TEX_COORDS_SIZE, gl.FLOAT, false, V2F_C4B_T2F.BYTES_PER_ELEMENT, V2F_C4B_T2F.TEX_COORDS_OFFSET)
        gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, this._buffersVBO[1])
        gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, this._indices, gl.STATIC_DRAW)
        for (let i = 0; i < batchesTotal; ++i) {
            this._triBatchesToDraw[i].cmd.useMaterial()
            gl.drawElements(gl.TRIANGLES, this._triBatchesToDraw[i].indicesToDraw, gl.UNSIGNED_SHORT, this._triBatchesToDraw[i].offset * Uint16Array.BYTES_PER_ELEMENT)
            this._drawnBatches++
            this._drawnVertices += this._triBatchesToDraw[i].indicesToDraw
        }
        // gl.deleteBuffer(this._buffersVBO[0])
        // gl.deleteBuffer(this._buffersVBO[1])
        this._queuedTriangleCommands    = []
        this._filledVertex              = 0
        this._filledIndex               = 0
    }

    fillVerticesAndIndices(cmd) {
        this._verts.memcpy(this._filledVertex, cmd.getVertices(), cmd.getVertexCount())
        // const Mat4& modelView = cmd->getModelView();
        // for(ssize_t i=0; i < cmd->getVertexCount(); ++i)
        // {
        //     modelView.transformPoint(&(_verts[i + _filledVertex].vertices));
        // }
        const indices = cmd.getIndices()
        for (let i = 0; i < cmd.getIndexCount(); ++i)
        {
            this._indices[this._filledIndex + i] = this._filledVertex + indices[i]
        }
        this._filledVertex  += cmd.getVertexCount()
        this._filledIndex   += cmd.getIndexCount()
    }

    flush() {
        this.flushTriangles()
    }

    flushTriangles() {
        this.drawBatchedTriangles()
    }

    clean() {
        this._queuedTriangleCommands    = []
        this._filledVertex              = 0
        this._filledIndex               = 0
    }
}
