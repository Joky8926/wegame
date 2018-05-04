
export default class Quaternion {
    constructor(_x = 0, _y = 0, _z = 0, _w = 1) {
        this.x = _x
        this.y = _y
        this.z = _z
        this.w = _w
    }

    get ZERO() {
        return new Quaternion(0, 0, 0, 0)
    }
}
