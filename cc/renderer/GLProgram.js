
import Ref from '../base/Ref'

export default class GLProgram extends Ref {
    constructor() {
        super()
        this._program       = null
        this._vertShader    = null
        this._fragShader    = null
    }

    bindPredefinedVertexAttribs() {
        
    }

    initWithByteArrays(vShaderByteArray, fShaderByteArray) {
        this._program = gl.createProgram()
    }
}

GLProgram.VERTEX_ATTRIB_POSITION    = 0
GLProgram.VERTEX_ATTRIB_COLOR       = 0
GLProgram.VERTEX_ATTRIB_TEX_COORD   = 0

GLProgram.SHADER_NAME_POSITION_TEXTURE_COLOR_NO_MVP = 'ShaderPositionTextureColor_noMVP'
