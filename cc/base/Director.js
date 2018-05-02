
import PoolManager from "./PoolManager"

let instance

export default class Director {
    constructor() {

    }

    mainLoop() {
        // other
        PoolManager.getInstance().clear()
    }
}

Director.getInstance = function() {
    if (!instance) {
        instance = new Director()
    }
    return instance
}
