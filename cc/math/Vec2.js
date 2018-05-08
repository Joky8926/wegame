
const BYTES_PER_ELEMENT = Float32Array.BYTES_PER_ELEMENT * 2

export default class Vec2 {
    constructor(buffer, byteOffset, length) {
        this._f32a = new Float32Array(buffer, byteOffset, length)
    }

    get x() {
        return this._f32a[0]
    }

    set x(value) {
        this._f32a[0] = value
    }

    get y() {
        return this._f32a[1]
    }

    set y(value) {
        this._f32a[1] = value
    }

    set(xx, yy) {
        this.x = xx
        this.y = yy
    }

    static get ZERO() {
        return new Vec2([0, 0])
    }

    static get BYTES_PER_ELEMENT() {
        return BYTES_PER_ELEMENT
    }
}
