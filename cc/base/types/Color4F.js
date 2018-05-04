
export default class Color4F {
    constructor(_r = 0, _g = 0, _b = 0, _a = 0) {
        this.r = _r
        this.g = _g
        this.b = _b
        this.a = _a
    }

    static get BLACK() {
        return new Color4F(0, 0, 0, 1)
    }
}
