
export default class Mat4 {
    constructor() {
        this.m = new Float32Array(16)
    }

    set(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) {
        this.m[0]  = m11
        this.m[1]  = m21
        this.m[2]  = m31
        this.m[3]  = m41
        this.m[4]  = m12
        this.m[5]  = m22
        this.m[6]  = m32
        this.m[7]  = m42
        this.m[8]  = m13
        this.m[9]  = m23
        this.m[10] = m33
        this.m[11] = m43
        this.m[12] = m14
        this.m[13] = m24
        this.m[14] = m34
        this.m[15] = m44
    }

    static create(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) {
        let mat4 = new Mat4()
        mat4.set(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44)
        return mat4
    }

    static createTranslation(xTranslation, yTranslation, zTranslation) {
        let dst = this.IDENTITY
        dst.m[12] = xTranslation
        dst.m[13] = yTranslation
        dst.m[14] = zTranslation
        return dst
    }

    static createRotation(q, dst) {
        let x2 = q.x + q.x
        let y2 = q.y + q.y
        let z2 = q.z + q.z
        let xx2 = q.x * x2
        let yy2 = q.y * y2
        let zz2 = q.z * z2
        let xy2 = q.x * y2
        let xz2 = q.x * z2
        let yz2 = q.y * z2
        let wx2 = q.w * x2
        let wy2 = q.w * y2
        let wz2 = q.w * z2
        dst.m[0] = 1 - yy2 - zz2
        dst.m[1] = xy2 + wz2
        dst.m[2] = xz2 - wy2
        dst.m[3] = 0

        dst.m[4] = xy2 - wz2
        dst.m[5] = 1 - xx2 - zz2
        dst.m[6] = yz2 + wx2
        dst.m[7] = 0

        dst.m[8] = xz2 + wy2
        dst.m[9] = yz2 - wx2
        dst.m[10] = 1 - xx2 - yy2
        dst.m[11] = 0

        dst.m[12] = 0
        dst.m[13] = 0
        dst.m[14] = 0
        dst.m[15] = 1
    }

    static createOrthographicOffCenter(left, right, bottom, top, zNearPlane, zFarPlane) {
        let dst     = this.ZERO
        dst.m[0]    = 2 / (right - left)
        dst.m[5]    = 2 / (top - bottom)
        dst.m[10]   = 2 / (zNearPlane - zFarPlane)

        dst.m[12]   = (left + right) / (left - right)
        dst.m[13]   = (top + bottom) / (bottom - top)
        dst.m[14]   = (zNearPlane + zFarPlane) / (zNearPlane - zFarPlane)
        dst.m[15]   = 1
        return dst
    }

    static multiply(m1, m2) {
        let product = []
        product[0]  = m1[0] * m2[0]  + m1[4] * m2[1] + m1[8]   * m2[2]  + m1[12] * m2[3]
        product[1]  = m1[1] * m2[0]  + m1[5] * m2[1] + m1[9]   * m2[2]  + m1[13] * m2[3]
        product[2]  = m1[2] * m2[0]  + m1[6] * m2[1] + m1[10]  * m2[2]  + m1[14] * m2[3]
        product[3]  = m1[3] * m2[0]  + m1[7] * m2[1] + m1[11]  * m2[2]  + m1[15] * m2[3]

        product[4]  = m1[0] * m2[4]  + m1[4] * m2[5] + m1[8]   * m2[6]  + m1[12] * m2[7]
        product[5]  = m1[1] * m2[4]  + m1[5] * m2[5] + m1[9]   * m2[6]  + m1[13] * m2[7]
        product[6]  = m1[2] * m2[4]  + m1[6] * m2[5] + m1[10]  * m2[6]  + m1[14] * m2[7]
        product[7]  = m1[3] * m2[4]  + m1[7] * m2[5] + m1[11]  * m2[6]  + m1[15] * m2[7]

        product[8]  = m1[0] * m2[8]  + m1[4] * m2[9] + m1[8]   * m2[10] + m1[12] * m2[11]
        product[9]  = m1[1] * m2[8]  + m1[5] * m2[9] + m1[9]   * m2[10] + m1[13] * m2[11]
        product[10] = m1[2] * m2[8]  + m1[6] * m2[9] + m1[10]  * m2[10] + m1[14] * m2[11]
        product[11] = m1[3] * m2[8]  + m1[7] * m2[9] + m1[11]  * m2[10] + m1[15] * m2[11]

        product[12] = m1[0] * m2[12] + m1[4] * m2[13] + m1[8]  * m2[14] + m1[12] * m2[15]
        product[13] = m1[1] * m2[12] + m1[5] * m2[13] + m1[9]  * m2[14] + m1[13] * m2[15]
        product[14] = m1[2] * m2[12] + m1[6] * m2[13] + m1[10] * m2[14] + m1[14] * m2[15]
        product[15] = m1[3] * m2[12] + m1[7] * m2[13] + m1[11] * m2[14] + m1[15] * m2[15]
        return Mat4.create(...product)
    }

    static get IDENTITY() {
        return Mat4.create(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1)
    }

    static get ZERO() {
        return Mat4.create(
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0)
    }
}
