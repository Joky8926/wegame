
import Ref      from '../base/Ref'
import Color3B  from '../base/types/Color3B'
import Size     from '../math/geometry/Size'

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
    }
}
