
import Node from './Node'

export default class Scene extends Node {
    constructor() {
        super()
    }

    render(renderer) {
        let transform = this.getNodeToParentTransform()
        this.visit(renderer, transform, 0)
        renderer.render()
    }

    static create() {
        return new Scene()
    }
}
