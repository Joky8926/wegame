
import V2F_C4B_T2F from './V2F_C4B_T2F'

export default class V2F_C4B_T2F_Quad {
    constructor(_bl, _br, _tl, _tr) {
        this.bl = _bl
        this.br = _br
        this.tl = _tl
        this.tr = _tr
    }

    getArray() {
        return this.bl
    }

    static create() {
        const arr = V2F_C4B_T2F.create(4)
        return new V2F_C4B_T2F_Quad(arr, arr.getObjWithOffset(1), arr.getObjWithOffset(2), arr.getObjWithOffset(3))
    }
}
