
let instance

export default class PoolManager {
    constructor() {
        this._isClearing    = false
        this._managedObject = {}
    }

    addObject(object) {
        this._managedObject[object.getId()] = object
    }

    isObjectInPools(object) {
        return this._managedObject[object.getId()] != undefined
    }

    clear() {
        this._isClearing = true
        for (let key in this._managedObject) {
            this._managedObject[key].release()
        }
        this._isClearing = false
    }

    isClearing() {
        return this._isClearing
    }
}

PoolManager.getInstance = function() {
    if (!instance) {
        instance = new PoolManager()
    }
    return instance
}
