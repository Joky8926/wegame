
export default class Color3B {
    constructor(_r = 0, _g = 0, _b = 0) {
        this.r = _r
        this.g = _g
        this.b = _b
    }

    static get WHITE() {
        return new Color3B(255, 255, 255)
    }
}
