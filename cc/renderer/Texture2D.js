
import Ref              from '../base/Ref'
import Size             from '../math/geometry/Size'
import GLProgram        from './GLProgram'
import GLProgramCache   from './GLProgramCache'

export default class Texture2D extends Ref {
    constructor() {
        super()
        self._pixelsWide    = 0
        self._pixelsHigh    = 0
        self._name          = null
        this._contentSize   = null
        this._shaderProgram = null
    }

    initWithImage(image) {
        const imageWidth    = image.getWidth()
        const imageHeight   = image.getHeight()
        const data          = image.getData()
        this.initWithData(data, imageWidth, imageHeight)
    }

    initWithMipmaps(data, pixelsWide, pixelsHigh) {
        // glPixelStorei(GL_UNPACK_ALIGNMENT, 8);
        self._name = gl.createTexture()
        GL.bindTexture2D(self._name)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data)
        this._contentSize = Size.create(pixelsWide, pixelsHigh)
        this._pixelsWide = pixelsWide
        this._pixelsHigh = pixelsHigh
        this.setGLProgram(GLProgramCache.getInstance().getGLProgram(GLProgram.SHADER_NAME_POSITION_TEXTURE))
    }

    setGLProgram(shaderProgram) {
        this._shaderProgram = shaderProgram
    }

    getContentSize() {
        return this._contentSize
    }
}
