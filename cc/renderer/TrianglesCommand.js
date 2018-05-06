
import RenderCommand from './RenderCommand'

class Triangles {
    constructor() {
        this.verts      = null
        this.indices    = null
        this.vertCount  = 0
        this.indexCount = 0
    }
}

export default class TrianglesCommand extends RenderCommand {
    constructor() {
        super()
        this._triangles     = new Triangles()
        this._materialID    = 0
    }

    getMaterialID() {
        return this._materialID
    }

    getVertexCount() {
        return this._triangles.vertCount
    }

    getIndexCount() {
        return this._triangles.indexCount
    }

    getVertices() {
        return this._triangles.verts
    }

    getIndices() {
        return this._triangles.indices
    }

    useMaterial() {
        
    }
}
