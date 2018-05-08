
import Triangles from '../renderer/Triangles'

export default class PolygonInfo {
    constructor() {
        this.triangles = Triangles.create()
    }

    setQuad(quad) {
        this.triangles.vertCount    = 4
        this.triangles.indexCount   = 6
        this.triangles.verts        = quad
    }

    static create() {
        return new PolygonInfo()
    }
}
