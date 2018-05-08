
const BYTES_PER_ELEMENT = Uint8Array.BYTES_PER_ELEMENT * 4

export default class Color4B {
    constructor(buffer, byteOffset, length) {
        this._u8a = new Uint8Array(buffer, byteOffset, length)
    }

    get r() {
        return this._u8a[0]
    }

    set r(value) {
        this._u8a[0] = value
    }

    get g() {
        return this._u8a[1]
    }

    set g(value) {
        this._u8a[1] = value
    }

    get b() {
        return this._u8a[2]
    }

    set b(value) {
        this._u8a[2] = value
    }

    get a() {
        return this._u8a[3]
    }

    set a(value) {
        this._u8a[3] = value
    }

    set(r, g, b, a) {
        this.r = r
        this.g = g
        this.b = b
        this.a = a
    }

    setWithC4b(c4b) {
        this.set(c4b.r, c4b.g, c4b.b, c4b.a)
    }

    static create(r, g, b, a) {
        return new Color4B([r, g, b, a])
    }

    static get WHITE() {
        return this.create(255, 255, 255, 255)
    }

    static get BYTES_PER_ELEMENT() {
        return BYTES_PER_ELEMENT
    }
}
