
import V2F_C4B_T2F from './V2F_C4B_T2F'

export default class V2F_C4B_T2F_Quad {
    constructor(_bl, _br, _tl, _tr) {
        this.bl = _bl
        this.br = _br
        this.tl = _tl
        this.tr = _tr
    }

    cast2ArrV2F_C4B_T2F() {

    }

    static create() {
        return new V2F_C4B_T2F_Quad(V2F_C4B_T2F.create(), V2F_C4B_T2F.create(), V2F_C4B_T2F.create(), V2F_C4B_T2F.create())
    }
}
