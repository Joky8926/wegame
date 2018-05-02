
import Director from "./base/Director"

let instance

export default class Application {
    constructor() {
        
    }

    update() {
        Director.getInstance().mainLoop()
    }

    render() {

    }

    loop() {
        this.update()
        this.render()
        requestAnimationFrame(this.bindLoop)
    }
    
    run() {
        this.bindLoop = this.loop.bind(this)
        requestAnimationFrame(this.bindLoop)
    }
}

Application.getInstance = function() {
    if (!instance) {
        instance = new Application()
    }
    return instance
}
