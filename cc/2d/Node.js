
import Director     from '../base/Director'
import Ref          from '../base/Ref'
import Color3B      from '../base/types/Color3B'
import Size         from '../math/geometry/Size'
import Mat4         from '../math/Mat4'
import Quaternion   from '../math/Quaternion'
import Vec2         from '../math/Vec2'

const FLAGS_TRANSFORM_DIRTY     = 1 << 0
const FLAGS_CONTENT_SIZE_DIRTY  = 1 << 1
const FLAGS_DIRTY_MASK          = FLAGS_TRANSFORM_DIRTY | FLAGS_CONTENT_SIZE_DIRTY

export default class Node extends Ref {
    constructor() {
        super()
        this._rotationX                     = 0
        this._rotationY                     = 0
        this._scaleX                        = 1
        this._scaleY                        = 1
        this._skewX                         = 0
        this._skewY                         = 0
        this._contentSize                   = Size.ZERO
        this._contentSizeDirty              = true
        this._transformDirty                = true
        this._inverseDirty                  = true
        this._transformUpdated              = true
        this._localZOrder                   = 0
        this._globalZOrder                  = 0
        this._parent                        = null
        this._name                          = ''
        this._glProgramState                = null
        this._running                       = false
        this._visible                       = true
        this._ignoreAnchorPointForPosition  = false
        this._reorderChildDirty             = false
        this._isTransitionFinished          = false
        this._displayedOpacity              = 255
        this._realOpacity                   = 255
        this._displayedColor                = Color3B.WHITE
        this._realColor                     = Color3B.WHITE
        this._cascadeColorEnabled           = false
        this._cascadeOpacityEnabled         = false
        this._position                      = Vec2.ZERO
        this._rotationQuat                  = new Quaternion()
        this._transform                     = Mat4.IDENTITY
        this._modelViewTransform            = Mat4.IDENTITY
        this._children                      = []
        this._director                      = Director.getInstance()
    }

    onEnter() {
        
    }

    onExit() {

    }

    cleanup() {

    }

    setContentSize(size) {
        if (!size.equals(this._contentSize)) {
            this._contentSize       = size
            this._transformUpdated  = true
            this._transformDirty    = true
            this._inverseDirty      = true
            this._contentSizeDirty  = true
        }
    }

    getNodeToParentTransform() {
        if (this._transformDirty) {
            let x = this._position.x
            let y = this._position.y
            let z = 0
            // if (_ignoreAnchorPointForPosition)
            // {
            //     x += _anchorPointInPoints.x;
            //     y += _anchorPointInPoints.y;
            // }
            // bool needsSkewMatrix = ( _skewX || _skewY );
            let translation = Mat4.createTranslation(x, y, z)
            Mat4.createRotation(this._rotationQuat, this._transform)
            this._transform = Mat4.multiply(translation, this._transform)
            if (this._scaleX != 1) {
                this._transform.m[0] *= this._scaleX;
                this._transform.m[1] *= this._scaleX;
                this._transform.m[2] *= this._scaleX;
            }
            if (this._scaleY != 1) {
                this._transform.m[4] *= this._scaleY;
                this._transform.m[5] *= this._scaleY;
                this._transform.m[6] *= this._scaleY;
            }
            // if (!_anchorPointInPoints.isZero())
            // {
            //     _transform.m[12] += _transform.m[0] * -_anchorPointInPoints.x + _transform.m[4] * -_anchorPointInPoints.y;
            //     _transform.m[13] += _transform.m[1] * -_anchorPointInPoints.x + _transform.m[5] * -_anchorPointInPoints.y;
            //     _transform.m[14] += _transform.m[2] * -_anchorPointInPoints.x + _transform.m[6] * -_anchorPointInPoints.y;
            // }
        }
        this._transformDirty = false
        return this._transform
    }

    visit(renderer, parentTransform, parentFlags) {
        if (!this._visible) {
            return
        }
        let flags = this.processParentFlags(parentTransform, parentFlags)
        this.draw(renderer, this._modelViewTransform, flags)
        for (let i = 0; i < this._children.length; i++) {
            this._children[i].visit(renderer, this._modelViewTransform, flags)
        }
    }

    draw(renderer, transform, flags) {

    }

    processParentFlags(parentTransform, parentFlags) {
        let flags = parentFlags
        flags |= this._transformUpdated ? FLAGS_TRANSFORM_DIRTY : 0
        flags |= this._contentSizeDirty ? FLAGS_CONTENT_SIZE_DIRTY : 0
        if (flags & FLAGS_DIRTY_MASK) {
            this._modelViewTransform = this.transform(parentTransform)
        }
        this._transformUpdated = false
        this._contentSizeDirty = false
        return flags
    }

    transform(parentTransform) {
        return Mat4.multiply(parentTransform, this.getNodeToParentTransform())
    }

    getGLProgramState() {
        return this._glProgramState
    }


    setGLProgramState(glProgramState) {
        if (glProgramState != this._glProgramState) {
            this._glProgramState = glProgramState
        }
    }
}
