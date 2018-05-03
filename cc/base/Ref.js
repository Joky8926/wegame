
import PoolManager from './PoolManager'

let uObjectCount = 0

export default class Ref {
    constructor() {
        this._ID                = ++uObjectCount
        this._referenceCount    = 1
    }

    retain() {
        console.assert(_referenceCount > 0, 'reference count should be greater than 0')
        ++this._referenceCount
    }

    release() {
        console.assert(_referenceCount > 0, 'reference count should be greater than 0')
        --this._referenceCount
        if (this._referenceCount == 0) {
            let poolManager = PoolManager.getInstance()
            if (!poolManager.isClearing() && poolManager.isObjectInPools(this)) {
                console.assert(false, "The reference shouldn't be 0 because it is still in autorelease pool.")
            }
            // delete
        }
    }

    autorelease() {
        PoolManager.getInstance().addObject(this)
    }

    getId() {
        return this._ID
    }

    getReferenceCount() {
        return this._referenceCount
    }
}
