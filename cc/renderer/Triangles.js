
export default class Triangles {
    constructor() {
        this.verts      = null
        this.indices    = null
        this.vertCount  = 0
        this.indexCount = 0
    }

    static create() {
        return new Triangles()
    }
}
