
import RenderCommand    from './RenderCommand'
import Triangles        from './Triangles'

export default class TrianglesCommand extends RenderCommand {
    constructor() {
        super()
        this._triangles     = Triangles.create()
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

    static create() {
        return new TrianglesCommand()
    }
}
