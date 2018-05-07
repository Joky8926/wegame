
import Ref from '../base/Ref'

export default class GLProgramState extends Ref {
    constructor() {
        super()
    }

    static getOrCreateWithGLProgramName(glProgramName) {
        const glProgram = GLProgramCache::getInstance()->getGLProgram(glProgramName);
        if( glProgram )
            return getOrCreateWithGLProgram(glProgram);

        CCLOG("cocos2d: warning: GLProgram '%s' not found", glProgramName.c_str());
        return null
    }
}
