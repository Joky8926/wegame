
import PoolManager from './PoolManager'

let instance

export default class Director {
    constructor() {
        this._runningScene = null
    }

    mainLoop() {
        // other
        PoolManager.getInstance().clear()
    }

    runWithScene(scene) {
        console.assert(scene != null, 'This command can only be used to start the Director. There is already a scene present.')
        console.assert(this._runningScene == null, "_runningScene should be null")
    }
}

Director.getInstance = function() {
    if (!instance) {
        instance = new Director()
    }
    return instance
}
