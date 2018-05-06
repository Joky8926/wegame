
import Node from './Node'
import Rect from '../math/geometry/Rect'

export default class Sprite extends Node {
    constructor() {
        super()
        this._fileName = 0
        this._fileType = 0
    }

    initWithFile(filename) {
        if (!filename || filename.trim().length == 0) {
            console.log('Call Sprite::initWithFile with blank resource filename.')
            return false
        }
        this._fileName = filename
        this._fileType = 0
        let texture = this._director.getTextureCache().addImage(filename)
        let rect    = Rect.ZERO
        rect.size   = texture.getContentSize()
        return this.initWithTexture(texture, rect)
    }

    initWithTexture(texture, rect) {
        
    }

    static create(filename) {
        const sprite = new Sprite()
        if (sprite.initWithFile(filename)) {
            return sprite
        }
        return null
    }
}
