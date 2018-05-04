
import Node from './Node'

export default class Scene extends Node {
    constructor() {
        super()
        this.autorelease()
    }

    render(renderer) {
        let transform = getNodeToParentTransform()
        this.visit(renderer, transform, 0)
        renderer.render()
    }
}
