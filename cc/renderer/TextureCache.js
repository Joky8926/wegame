
import Ref          from '../base/Ref'
import Image        from '../platform/Image'
import Texture2D    from './Texture2D'

export default class TextureCache extends Ref {
    constructor() {
        super()
        this._textures = {}
    }

    addImage(path) {
        let texture = this._textures[path]
        if (!texture) {
            let image   = new Image()
            texture     = new Texture2D()
            image.initWithImageFile(path)
            texture.initWithImage(image)
            this._textures[path] = texture
        }
        return texture
    }
}
