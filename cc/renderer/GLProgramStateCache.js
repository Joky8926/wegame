
let s_instance

export default class GLProgramStateCache {
    constructor() {
        this._glProgramStates = {}
    }

    getGLProgramState(glprogram) {
        let ret = this._glProgramStates[glprogram];
        if (!ret) {
            ret = new GLProgramState()
            ret.init(glprogram)
            this._glProgramStates[glprogram] = ret
        }
        return ret
    }

    static getInstance() {
        if (!s_instance) {
            s_instance = new GLProgramStateCache()
        }
        return s_instance
    }
}
