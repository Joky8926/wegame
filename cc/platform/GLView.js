
import Ref  from '../base/Ref'
import Size from '../math/geometry/Size'

export default class GLView extends Ref {
    constructor() {
        super()
        this._designResolutionSize = Size.create(canvas.width, canvas.height)
    }

    renderScene(scene, renderer) {
        console.assert(scene, 'Invalid Scene')
        console.assert(renderer, 'Invalid Renderer')
        scene.render(renderer)
    }

    getDesignResolutionSize() {
        return this._designResolutionSize.clone()
    }
}
