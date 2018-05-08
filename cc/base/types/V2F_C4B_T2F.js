
import Color4B  from './Color4B'
import Tex2F    from './Tex2F'
import Vec2     from '../../math/Vec2'

const BYTES_PER_ELEMENT = Vec2.BYTES_PER_ELEMENT + Color4B.BYTES_PER_ELEMENT + Tex2F.BYTES_PER_ELEMENT
const U32S_PER_ELEMENT  = BYTES_PER_ELEMENT / Uint32Array.BYTES_PER_ELEMENT

export default class V2F_C4B_T2F {
    constructor(buffer, byteOffset) {
        this._buffer        = buffer
        this._byteOffset    = byteOffset || 0
        this._vertices      = new Vec2(buffer, byteOffset)
        this._colors        = new Color4B(buffer, byteOffset + Vec2.BYTES_PER_ELEMENT)
        this._texCoords     = new Tex2F(buffer, byteOffset + Vec2.BYTES_PER_ELEMENT + Color4B.BYTES_PER_ELEMENT)
    }

    memcpy(sizeOffset, verts, count) {
        let dstU32a = new Uint32Array(this._buffer, sizeOffset * BYTES_PER_ELEMENT)
        let srcU32a = verts.getU32a()
        for (let i = 0; i < U32S_PER_ELEMENT * count; i++) {
            dstU32a[i] = srcU32a[i]
        }
    }

    getU32a() {
        return new Uint32Array(this._buffer, this._byteOffset)
    }

    getBuffer() {
        return this._buffer
    }

    getObjWithOffset(offset) {
        return new V2F_C4B_T2F(this._buffer, this._byteOffset + offset * BYTES_PER_ELEMENT)
    }

    get vertices() {
        return this._vertices
    }

    set vertices(value) {
        this._vertices.setWithV2(value)
    }

    get colors() {
        return this._colors
    }

    set colors(value) {
        this._colors.setWithC4b(value)
    }

    get texCoords() {
        return this._texCoords
    }

    set texCoords(value) {
        this._texCoords.setWithT2f(value)
    }

    static create(size = 1) {
        let buffer = new ArrayBuffer(BYTES_PER_ELEMENT * size)
        return new V2F_C4B_T2F(buffer)
    }

    static get BYTES_PER_ELEMENT() {
        return BYTES_PER_ELEMENT
    }

    static get VERTICES_SIZE() {
        return 2
    }

    static get COLORS_SIZE() {
        return 4
    }

    static get TEX_COORDS_SIZE() {
        return 2
    }

    static get VERTICES_OFFSET() {
        return 0
    }

    static get COLORS_OFFSET() {
        return Vec2.BYTES_PER_ELEMENT
    }

    static get TEX_COORDS_OFFSET() {
        return Vec2.BYTES_PER_ELEMENT + Color4B.BYTES_PER_ELEMENT
    }
}
