
export default class Size {
    constructor(w = 0, h = 0) {
        this.width  = w
        this.height = h
    }

    static get ZERO() {
        return new Size(0, 0)
    }
}
