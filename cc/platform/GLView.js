
import Ref from '../base/Ref'

export default class GLView extends Ref {
    constructor() {
        super()
    }

    renderScene(scene, renderer) {
        console.assert(scene, 'Invalid Scene')
        console.assert(renderer, 'Invalid Renderer')
        scene.render(renderer)
    }
}
