
const BYTES_PER_ELEMENT = Float32Array.BYTES_PER_ELEMENT * 2

export default class Size {
    constructor(buffer, byteOffset, length) {
        this._f32a = new Float32Array(buffer, byteOffset, length)
    }

    get width() {
        return this._f32a[0]
    }

    set width(value) {
        this._f32a[0] = value
    }

    get height() {
        return this._f32a[1]
    }

    set height(value) {
        this._f32a[1] = value
    }

    static get ZERO() {
        return new Size([0, 0])
    }

    static get BYTES_PER_ELEMENT() {
        return BYTES_PER_ELEMENT
    }
}
