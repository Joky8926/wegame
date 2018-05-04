
export default class Vec2 {
    constructor(_x = 0, _y = 0) {
        this.x = _x
        this.y = _y
    }

    get ZERO() {
        return new Vec2(0, 0)
    }
}
