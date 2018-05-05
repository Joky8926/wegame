
import Node from './Node'

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

        Texture2D *texture = _director->getTextureCache()->addImage(filename);
        if (texture)
        {
            Rect rect = Rect::ZERO;
            rect.size = texture->getContentSize();
            return initWithTexture(texture, rect);
        }

        // don't release here.
        // when load texture failed, it's better to get a "transparent" sprite then a crashed program
        // this->release();
        return false;
    }

    static create(filename) {
        const sprite = new Sprite()
        if (sprite.initWithFile(filename)) {
            sprite.autorelease()
            return sprite
        }
        sprite.release()
        return null
    }
}
