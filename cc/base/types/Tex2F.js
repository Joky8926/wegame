
const BYTES_PER_ELEMENT = Float32Array.BYTES_PER_ELEMENT * 2

export default class Tex2F {
    constructor(buffer, byteOffset, length) {
        this._f32a = new Float32Array(buffer, byteOffset, length)
    }

    get u() {
        return this._f32a[0]
    }

    set u(value) {
        this._f32a[0] = value
    }

    get v() {
        return this._f32a[1]
    }

    set v(value) {
        this._f32a[1] = value
    }

    set(u, v) {
        this.u = u
        this.v = v
    }

    setWithT2f(t2f) {
        this.set(t2f.u, t2f.v)
    }

    static create() {
        return new Tex2F([0, 0])
    }

    static get BYTES_PER_ELEMENT() {
        return BYTES_PER_ELEMENT
    }
}
