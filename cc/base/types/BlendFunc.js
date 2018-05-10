
export default class BlendFunc {
    constructor(_src, _dst) {
        this.src = _src
        this.dst = _dst
    }

    static get ALPHA_PREMULTIPLIED() {
        return new BlendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    }

    static get ALPHA_NON_PREMULTIPLIED() {
        return new BlendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    }

    static get DISABLE() {
        return new BlendFunc(gl.ONE, gl.ZERO)
    }
}
