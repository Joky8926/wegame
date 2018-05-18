
import Ref from '../base/Ref'

export default class Image extends Ref {
    constructor() {
        super()
        self._data = null
    }

    initWithImageFile(path, callback) {
        self._data      = wx.createImage()
        self._data.src  = path
        self._data.onload = callback
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
