
const BYTES_PER_ELEMENT = Float32Array.BYTES_PER_ELEMENT * 2

export default class Size {
    constructor(buffer, byteOffset, length) {
        this._f32a = new Float32Array(buffer, byteOffset, length)
    }

    equals(target) {
        return this.width == target.width && this.height == target.height
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

    static create(width, height) {
        return new Size([width, height])
    }

    static get ZERO() {
        return this.create(0, 0)
    }

    static get BYTES_PER_ELEMENT() {
        return BYTES_PER_ELEMENT
    }
}
