
import Node         from './Node'
import Rect         from '../math/geometry/Rect'
import Size         from '../math/geometry/Size'
import GLProgram    from '../renderer/GLProgram'

export default class Sprite extends Node {
    constructor() {
        super()
        this._fileName      = 0
        this._fileType      = 0
        this._contentSize   = Size.ZERO
        this._texture       = null
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
        // _opacityModifyRGB = true;
        // _blendFunc = BlendFunc::ALPHA_PREMULTIPLIED;
        // _flippedX = _flippedY = false;
        // setAnchorPoint(Vec2::ANCHOR_MIDDLE);
        // _offsetPosition.setZero();

        // clean the Quad
        // memset(&_quad, 0, sizeof(_quad));

        // _quad.bl.colors = Color4B::WHITE;
        // _quad.br.colors = Color4B::WHITE;
        // _quad.tl.colors = Color4B::WHITE;
        // _quad.tr.colors = Color4B::WHITE;
        this.setTexture(texture)
        setTextureRect(rect, rotated, rect.size);
        _recursiveDirty = true;
        setDirty(true);
    }

    setTexture(texture) {
        setGLProgramState(GLProgramState::getOrCreateWithGLProgramName(GLProgram.SHADER_NAME_POSITION_TEXTURE_COLOR_NO_MVP, texture));

        // // If batchnode, then texture id should be the same
        // CCASSERT(! _batchNode || (texture &&  texture->getName() == _batchNode->getTexture()->getName()), "CCSprite: Batched sprites should use the same texture as the batchnode");
        // // accept texture==nil as argument
        // CCASSERT( !texture || dynamic_cast<Texture2D*>(texture), "setTexture expects a Texture2D. Invalid argument");

        // if (texture == nullptr)
        // {
        //     // Gets the texture by key firstly.
        //     texture = _director->getTextureCache()->getTextureForKey(CC_2x2_WHITE_IMAGE_KEY);

        //     // If texture wasn't in cache, create it from RAW data.
        //     if (texture == nullptr)
        //     {
        //         Image* image = new (std::nothrow) Image();
        //         bool CC_UNUSED isOK = image->initWithRawData(cc_2x2_white_image, sizeof(cc_2x2_white_image), 2, 2, 8);
        //         CCASSERT(isOK, "The 2x2 empty texture was created unsuccessfully.");

        //         texture = _director->getTextureCache()->addImage(image, CC_2x2_WHITE_IMAGE_KEY);
        //         CC_SAFE_RELEASE(image);
        //     }
        // }

        // if ((_renderMode != RenderMode::QUAD_BATCHNODE) && (_texture != texture))
        // {
        //     CC_SAFE_RETAIN(texture);
        //     CC_SAFE_RELEASE(_texture);
        //     _texture = texture;
        //     updateBlendFunc();
        // }
    }

    draw(renderer, transform, flags) {
        if (this._texture == null) {
            return
        }
        if (renderer.checkVisibility(transform, this._contentSize)) {

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
