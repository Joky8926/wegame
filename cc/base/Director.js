
import PoolManager  from './PoolManager'
import Renderer     from '../renderer/Renderer'

let instance

export default class Director {
    constructor() {
        this._runningScene      = null
        this._nextScene         = null
        this._totalFrames       = 0
        this._lastUpdate        = wx.getPerformance().now()
        this._deltaTime         = 0
        this._openGLView        = null
        this._renderer          = new Renderer()
    }

    setOpenGLView(openGLView) {
        this._openGLView = openGLView
        this.setGLDefaultValues()
        this._renderer.initGLView()
    }

    setGLDefaultValues() {
        console.assert(this._openGLView, "opengl view should not be null")
        // setAlphaBlending(true);
        this.setDepthTest(false)
        // setProjection(_projection);
    }

    setDepthTest(on) {
        this._renderer.setDepthTest(on)
    }

    setAnimationInterval(interval) {
        this._animationInterval = interval
        wx.setPreferredFramesPerSecond(1 / interval)
    }

    mainLoop() {
        this.drawScene()
        PoolManager.getInstance().clear()
    }

    runWithScene(scene) {
        console.assert(this._runningScene == null, '_runningScene should be null')
        this.pushScene(scene)
        // startAnimation();
    }

    replaceScene(scene) {
        console.assert(scene != null, 'the scene should not be null')
        if (this._runningScene == null) {
            this.runWithScene(scene)
            return
        }
        if (this.scene == this._nextScene) {
            return
        }
        if (this._nextScene) {
            this._nextScene.cleanup()
        }
        this._nextScene = scene
    }

    pushScene(scene) {
        console.assert(scene != null, 'the scene should not null')
        this._nextScene = scene
    }

    drawScene() {
        calculateDeltaTime()
        // update
        this._renderer.clear()
        // experimental::FrameBuffer::clearAllFBOs()
        if (this._nextScene) {
            setNextScene()
        }
        // pushMatrix(MATRIX_STACK_TYPE::MATRIX_STACK_MODELVIEW);
        if (this._runningScene) {
            this._renderer.clearDrawStats()
            this._openGLView.renderScene(this._runningScene, this._renderer)
            // _eventDispatcher->dispatchEvent(_eventAfterVisit);
        }
        if (_displayStats) {
            this.showStats()
        }
        // _renderer->render();
        // _eventDispatcher->dispatchEvent(_eventAfterDraw);
        // popMatrix(MATRIX_STACK_TYPE::MATRIX_STACK_MODELVIEW);
        this._totalFrames++;
        // if (_openGLView)
        // {
        //     _openGLView->swapBuffers();
        // }
        // if (_displayStats)
        // {
        //     calculateMPF();
        // }
    }

    calculateDeltaTime() {
        let now = wx.getPerformance().now()
        this._deltaTime = (now - this._lastUpdate) / 1000000
        this._deltaTime = Math.max(0, this._deltaTime)
        this._lastUpdate = now
    }

    setNextScene() {
        if (this._runningScene) {
            this._runningScene.onExit()
            this._runningScene.cleanup()
            this._runningScene.release()
        }
        this._runningScene = this._nextScene
        this._runningScene.retain()
        this._runningScene.onEnter()
        this._nextScene = null
    }

    showStats() {

    }

    static getInstance() {
        if (!instance) {
            instance = new Director()
        }
        return instance
    }
}
