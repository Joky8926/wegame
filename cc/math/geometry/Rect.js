
import Size from './Size'
import Vec2 from '../Vec2'

const BYTES_PER_ELEMENT = Vec2.BYTES_PER_ELEMENT + Size.BYTES_PER_ELEMENT

export default class Rect {
    constructor(x, y, width, height) {
        this.origin = new Vec2([x, y])
        this.size   = new Size([width, height])
    }

    static get ZERO() {
        return new Rect(0, 0, 0, 0)
    }
}
