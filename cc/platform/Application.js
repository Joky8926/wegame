
import Director from '../base/Director'

let instance

export default class Application {
    constructor() {
        this.bindLoop = this.loop.bind(this)
    }

    loop() {
        Director.getInstance().mainLoop()
        requestAnimationFrame(this.bindLoop)
    }
    
    run() {
        requestAnimationFrame(this.bindLoop)
    }

    static getInstance() {
        if (!instance) {
            instance = new Application()
        }
        return instance
    }
}
