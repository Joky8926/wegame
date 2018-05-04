
import Color4F from '../base/types/Color4F'

export default class Renderer {
    constructor() {
        this._glViewAssigned    = false
        this._isRendering       = false
        this._isDepthTestFor2D  = false
        this._clearColor        = Color4F.BLACK
        this._drawnBatches      = 0
        this._drawnVertices     = 0
    }

    initGLView() {
        this.setupBuffer()
        this._glViewAssigned = true
    }

    setupBuffer() {

    }

    clear() {
        gl.depthMask(true)
        gl.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.b, this._clearColor.a)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        gl.depthMask(false)
        // RenderState::StateBlock::_defaultState->setDepthWrite(false);
    }

    setDepthTest(enable) {
        if (enable) {
            gl.clearDepth(1)
            gl.enable(gl.DEPTH_TEST)
            gl.depthFunc(gl.LEQUAL)
            // RenderState::StateBlock::_defaultState->setDepthTest(true);
            // RenderState::StateBlock::_defaultState->setDepthFunction(RenderState::DEPTH_LEQUAL);
        } else {
            gl.disable(gl.DEPTH_TEST)
            // RenderState::StateBlock::_defaultState->setDepthTest(false);
        }
        this._isDepthTestFor2D = enable
    }

    clearDrawStats() {
        this._drawnBatches  = 0
        this._drawnVertices = 0
    }

    render() {
        this._isRendering = true
    }
}
