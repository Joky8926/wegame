
import Ref          from '../base/Ref'

class VertexAttrib {
    constructor() {
        this.index  = 0
        this.size   = 0
        this.type   = gl.FLOAT
        this.name   = ''
    }
}

class Uniform {
    constructor() {
        this.location   = 0
        this.size       = 0
        this.type       = gl.FLOAT
        this.name       = ''
    }
}

export default class GLProgram extends Ref {
    constructor() {
        super()
        this._program           = null
        this._vertShader        = null
        this._fragShader        = null
        this._vertexAttribs     = {}
        this._userUniforms      = {}
        this._hashForUniforms   = {}
    }

    bindPredefinedVertexAttribs() {
        const attribute_locations = [
            [GLProgram.ATTRIBUTE_NAME_POSITION, GLProgram.VERTEX_ATTRIB_POSITION],
            [GLProgram.ATTRIBUTE_NAME_COLOR, GLProgram.VERTEX_ATTRIB_COLOR],
            [GLProgram.ATTRIBUTE_NAME_TEX_COORD, GLProgram.VERTEX_ATTRIB_TEX_COORD]
        ]
        for(let i = 0; i < attribute_locations.length; i++) {
            gl.bindAttribLocation(this._program, attribute_locations[i][1], attribute_locations[i][0])
        }
    }

    initWithByteArrays(vShaderByteArray, fShaderByteArray) {
        this._program = gl.createProgram()
        this._vertShader = this.compileShader(gl.VERTEX_SHADER, vShaderByteArray)
        this._fragShader = this.compileShader(gl.FRAGMENT_SHADER, fShaderByteArray)
        gl.attachShader(this._program, this._vertShader)
        gl.attachShader(this._program, this._fragShader)
    }

    compileShader(type, source) {
        let shader = gl.createShader(type)
        gl.shaderSource(shader, source)
        gl.compileShader(shader)
        return shader
    }

    link() {
        console.assert(this._program != null, 'Cannot link invalid program')
        this.bindPredefinedVertexAttribs()
        gl.linkProgram(this._program)
        this.parseVertexAttribs()
        this.parseUniforms()
        this.clearShader()
    }

    parseVertexAttribs() {
        const activeAttributes = gl.getProgramParameter(this._program, gl.ACTIVE_ATTRIBUTES)
        if (activeAttributes > 0) {
            for (let i = 0; i < activeAttributes; ++i) {
                let attribute = new VertexAttrib()
                const info = gl.getActiveAttrib(this._program, i)
                attribute.name = info.name
                attribute.type = info.type
                attribute.size = info.size
                attribute.index = gl.getAttribLocation(this._program, info.name)
                this._vertexAttribs[attribute.name] = attribute
            }
        }
    }

    parseUniforms() {
        const activeUniforms = gl.getProgramParameter(this._program, gl.ACTIVE_UNIFORMS)
        if (activeUniforms > 0) {
            for (let i = 0; i < activeUniforms; ++i) {
                let uniform = new Uniform()
                const info = gl.getActiveUniform(this._program, i)
                const info = gl.getActiveAttrib(this._program, i)
                uniform.name = info.name
                uniform.type = info.type
                uniform.size = info.size
                uniform.location = gl.getUniformLocation(this._program, info.name)
                this._userUniforms[uniform.name] = uniform
            }
        }
    }

    clearShader() {
        if (this._vertShader) {
            gl.deleteShader(this._vertShader)
        }
        if (this._fragShader) {
            gl.deleteShader(this._fragShader)
        }
        this._vertShader = null
        this._fragShader = null
    }

    updateUniforms() {
        this.use()
    }

    use() {
        GL.useProgram(this._program)
        if (this._userUniforms[GLProgram.UNIFORM_NAME_SAMPLER0]) {
            this.setUniformLocationWith1i(this._userUniforms[GLProgram.UNIFORM_NAME_SAMPLER0].location, 0)
        }
    }

    setUniformLocationWith1i(location, i1) {
        const updated = this.updateUniformLocation(location, i1)
        if (updated) {
            gl.uniform1i(location, i1)
        }
    }

    updateUniformLocation(location, data) {
        if (location < 0) {
            return false
        }
        if (!this._hashForUniforms[location] || this._hashForUniforms[location] != data) {
            this._hashForUniforms[location] = data
            return false
        }
        return true
    }
}

GLProgram.VERTEX_ATTRIB_POSITION    = 0
GLProgram.VERTEX_ATTRIB_COLOR       = 0
GLProgram.VERTEX_ATTRIB_TEX_COORD   = 0

GLProgram.SHADER_NAME_POSITION_TEXTURE_COLOR_NO_MVP = 'ShaderPositionTextureColor_noMVP'
GLProgram.SHADER_NAME_POSITION_TEXTURE              = 'ShaderPositionTexture'

GLProgram.UNIFORM_NAME_SAMPLER0 = 'CC_Texture0'

GLProgram.ATTRIBUTE_NAME_COLOR      = 'a_color'
GLProgram.ATTRIBUTE_NAME_POSITION   = 'a_position'
GLProgram.ATTRIBUTE_NAME_TEX_COORD  = 'a_texCoord'
