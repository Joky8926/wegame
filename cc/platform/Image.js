
import Ref from '../base/Ref'

export default class Image extends Ref {
    constructor() {
        super()
        self._data = null
    }

    initWithImageFile(path) {
        self._data      = wx.createImage()
        self._data.src  = path
    }

    getData() {
        return self._data
    }

    getWidth() {
        return self._data.width
    }

    getHeight() {
        return self._data.height
    }
}
