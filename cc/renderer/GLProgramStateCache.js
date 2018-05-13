
import GLProgramState from './GLProgramState'

let s_instance

export default class GLProgramStateCache {
    constructor() {
        this._glProgramStates = {}
    }

    static getInstance() {
        if (!s_instance) {
            s_instance = new GLProgramStateCache()
        }
        return s_instance
    }

    static getGLProgramState(glprogram) {
        let ret = this._glProgramStates[glprogram];
        if (!ret) {
            ret = new GLProgramState()
            ret.init(glprogram)
            this._glProgramStates[glprogram] = ret
        }
        return ret
    }
}
