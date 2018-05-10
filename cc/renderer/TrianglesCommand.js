
import BlendFunc        from '../base/types/BlendFunc'
import RenderCommand    from './RenderCommand'
import Triangles        from './Triangles'

export default class TrianglesCommand extends RenderCommand {
    constructor() {
        super()
        this._triangles         = null
        this._mv                = null
        this._textureID         = null
        this._blendType         = BlendFunc.DISABLE
        this._glProgramState    = null
    }

    init(textureID, glProgramState, blendType, triangles, mv, flags) {
        this._triangles = triangles
        this._mv = mv
        if (this._textureID != textureID || this._blendType.src != blendType.src || this._blendType.dst != blendType.dst ||  this._glProgramState != glProgramState) {
            this._textureID         = textureID
            this._blendType         = blendType
            this._glProgramState    = glProgramState
        }
    }

    sameAs(cmd) {
        if (!cmd) {
            return false
        }
        return this._textureID == cmd._textureID && this._blendType.src == cmd._blendType.src && this._blendType.dst == cmd._blendType.dst &&  this._glProgramState == cmd._glProgramState
    }

    getVertexCount() {
        return this._triangles.vertCount
    }

    getIndexCount() {
        return this._triangles.indexCount
    }

    getVertices() {
        return this._triangles.verts
    }

    getIndices() {
        return this._triangles.indices
    }

    useMaterial() {
        
    }

    static create() {
        return new TrianglesCommand()
    }
}
