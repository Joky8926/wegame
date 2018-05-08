
import Ref          from '../base/Ref'
import GLProgram    from './GLProgram'

const kShaderType_PositionTextureColor_noMVP = 1

let instance

export default class GLProgramCache extends Ref {
    constructor() {
        super()
        this._programs = {}
        this.init()
    }

    init() {
        this.loadDefaultGLPrograms()
    }

    loadDefaultGLPrograms() {
        let p = new GLProgram()
        this.loadDefaultGLProgram(p, kShaderType_PositionTextureColor_noMVP)
        this._programs[GLProgram.SHADER_NAME_POSITION_TEXTURE_COLOR_NO_MVP] = p
    }

    loadDefaultGLProgram(p, type) {
        switch (type) {
            case kShaderType_PositionTextureColor_noMVP:
                p.initWithByteArrays(ccPositionTextureColor_noMVP_vert, ccPositionTextureColor_noMVP_frag)
                break
        }
        p.link()
        p.updateUniforms()
    }

    getGLProgram(key) {
        return this._programs[key]
    }

    static getInstance() {
        if (!instance) {
            instance = new GLProgramCache()
        }
        return instance
    }
}
