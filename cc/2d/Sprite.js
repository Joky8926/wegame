
import Node             from './Node'
import PolygonInfo      from './PolygonInfo'
import BlendFunc        from '../base/types/BlendFunc'
import Color4B          from '../base/types/Color4B'
import V2F_C4B_T2F_Quad from '../base/types/V2F_C4B_T2F_Quad'
import Rect             from '../math/geometry/Rect'
import Size             from '../math/geometry/Size'
import GLProgram        from '../renderer/GLProgram'
import GLProgramState   from '../renderer/GLProgramState'
import TrianglesCommand from '../renderer/TrianglesCommand'

export default class Sprite extends Node {
    constructor() {
        super()
        this._contentSize           = Size.ZERO
        this._blendFunc             = null
        this._texture               = null
        this._trianglesCommand      = TrianglesCommand.create()
        this._rect                  = null
        this._originalContentSize   = Size.ZERO
        this._quad                  = null
        this._polyInfo              = PolygonInfo.create()
        this._opacityModifyRGB      = false
        this._fileName              = 0
        this._fileType              = 0
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
        // _recursiveDirty = false;
        // setDirty(false);
        this._opacityModifyRGB = true
        this._blendFunc = BlendFunc.ALPHA_PREMULTIPLIED
        // _flippedX = _flippedY = false;
        // setAnchorPoint(Vec2::ANCHOR_MIDDLE);
        // _offsetPosition.setZero();
        this._quad = V2F_C4B_T2F_Quad.create()
        this._quad.bl.colors = Color4B.WHITE
        this._quad.br.colors = Color4B.WHITE
        this._quad.tl.colors = Color4B.WHITE
        this._quad.tr.colors = Color4B.WHITE
        this.setTexture(texture)
        this.setTextureRect(rect, rect.size)
        _recursiveDirty = true;
        setDirty(true);
    }

    setTexture(texture) {
        this.setGLProgramState(GLProgramState.getOrCreateWithGLProgramName(GLProgram.SHADER_NAME_POSITION_TEXTURE_COLOR_NO_MVP, texture))
        if (this._texture != texture) {
            this._texture = texture
            this.updateBlendFunc()
        }
    }

    updateBlendFunc() {
        this._blendFunc = BlendFunc.ALPHA_NON_PREMULTIPLIED
        this.setOpacityModifyRGB(false)
    }

    setOpacityModifyRGB(modify) {
        if (this._opacityModifyRGB != modify) {
            this._opacityModifyRGB = modify
            this.updateColor()
        }
    }

    updateColor() {
        let color4 = Color4B.create(this._displayedColor.r, this._displayedColor.g, this._displayedColor.b, this._displayedOpacity)
        if (this._opacityModifyRGB) {
            color4.r *= this._displayedOpacity / 255
            color4.g *= this._displayedOpacity / 255
            color4.b *= this._displayedOpacity / 255
        }
    }

    setTextureRect(rect, untrimmedSize) {
        super.setContentSize(untrimmedSize)
        this._originalContentSize = untrimmedSize
        this.setVertexRect(rect)
        // updateStretchFactor()
        this.updatePoly()
    }

    setVertexRect(rect) {
        this._rect = rect
    }

    updatePoly() {
        const copyRect = new Rect(0, 0, this._rect.size.width, this._rect.size.height)
        this.setTextureCoords(this._rect, this._quad)
        this.setVertexCoords(copyRect, this._quad)
        this._polyInfo.setQuad(this._quad)
    }

    setTextureCoords(rectInPoints, outQuad) {
        const left      = 0
        const right     = 1
        const top       = 0
        const bottom    = 1
        outQuad.bl.texCoords.u = left
        outQuad.bl.texCoords.v = bottom
        outQuad.br.texCoords.u = right
        outQuad.br.texCoords.v = bottom
        outQuad.tl.texCoords.u = left
        outQuad.tl.texCoords.v = top
        outQuad.tr.texCoords.u = right
        outQuad.tr.texCoords.v = top
    }

    setVertexCoords(rect, outQuad) {
        const x1 = rect.origin.x
        const y1 = rect.origin.y
        const x2 = x1 + rect.size.width
        const y2 = y1 + rect.size.height
        outQuad.bl.vertices.set(x1, y1)
        outQuad.br.vertices.set(x2, y1)
        outQuad.tl.vertices.set(x1, y2)
        outQuad.tr.vertices.set(x2, y2)
    }

    draw(renderer, transform, flags) {
        if (this._texture == null) {
            return
        }
        if (renderer.checkVisibility(transform, this._contentSize)) {
            this._trianglesCommand.init(this._texture.getName(), this.getGLProgramState(), this._blendFunc, this._polyInfo.triangles, transform, flags)
            // renderer->addCommand(&_trianglesCommand);
        }
    }

    static create(filename) {
        const sprite = new Sprite()
        if (sprite.initWithFile(filename)) {
            return sprite
        }
        return null
    }
}
