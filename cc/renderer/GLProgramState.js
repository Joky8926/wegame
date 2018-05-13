
import Ref                  from '../base/Ref'
import GLProgramStateCache  from './GLProgramStateCache'

const Type = {}
Type.VALUE          = 0
Type.POINTER        = 1
Type.CALLBACK_FN    = 2

class VertexAttribValue {
    constructor(vertexAttrib) {
        this._vertexAttrib  = vertexAttrib.clone()
        this._enabled       = false
        this._type          = Type.VALUE
    }
}

class UniformValue {
    constructor(uniform, glprogram) {
        this._uniform   = uniform.clone()
        this._glprogram = glprogram
    }

    apply() {
        if (this._type == Type.CALLBACK_FN) {
            // (*_value.callback)(_glprogram, _uniform);
        } else if (this._type == Type.POINTER) {
            // switch (_uniform->type) {
            //     case GL_FLOAT:
            //         _glprogram->setUniformLocationWith1fv(_uniform->location, _value.floatv.pointer, _value.floatv.size);
            //         break;

            //     case GL_FLOAT_VEC2:
            //         _glprogram->setUniformLocationWith2fv(_uniform->location, _value.v2f.pointer, _value.v2f.size);
            //         break;

            //     case GL_FLOAT_VEC3:
            //         _glprogram->setUniformLocationWith3fv(_uniform->location, _value.v3f.pointer, _value.v3f.size);
            //         break;

            //     case GL_FLOAT_VEC4:
            //         _glprogram->setUniformLocationWith4fv(_uniform->location, _value.v4f.pointer, _value.v4f.size);
            //         break;

            //     default:
            //         CCASSERT(false, "Unsupported type");
            //         break;
            // }
        } else {
            // switch (this._uniform.type) {
            //     case gl.SAMPLER_2D:
            //         this._glprogram.setUniformLocationWith1i(this._uniform.location, _value.tex.textureUnit)
            //         GL::bindTexture2DN(_value.tex.textureUnit, _value.tex.textureId);
            //         break;

            //     case GL_SAMPLER_CUBE:
            //         _glprogram->setUniformLocationWith1i(_uniform->location, _value.tex.textureUnit);
            //         GL::bindTextureN(_value.tex.textureUnit, _value.tex.textureId, GL_TEXTURE_CUBE_MAP);
            //         break;

            //     case GL_INT:
            //         _glprogram->setUniformLocationWith1i(_uniform->location, _value.intValue);
            //         break;

            //     case GL_FLOAT:
            //         _glprogram->setUniformLocationWith1f(_uniform->location, _value.floatValue);
            //         break;

            //     case GL_FLOAT_VEC2:
            //         _glprogram->setUniformLocationWith2f(_uniform->location, _value.v2Value[0], _value.v2Value[1]);
            //         break;

            //     case GL_FLOAT_VEC3:
            //         _glprogram->setUniformLocationWith3f(_uniform->location, _value.v3Value[0], _value.v3Value[1], _value.v3Value[2]);
            //         break;

            //     case GL_FLOAT_VEC4:
            //         _glprogram->setUniformLocationWith4f(_uniform->location, _value.v4Value[0], _value.v4Value[1], _value.v4Value[2], _value.v4Value[3]);
            //         break;

            //     case GL_FLOAT_MAT4:
            //         _glprogram->setUniformLocationWithMatrix4fv(_uniform->location, (GLfloat*)&_value.matrixValue, 1);
            //         break;
            // }
        }
    }
}

export default class GLProgramState extends Ref {
    constructor() {
        super()
        this._uniformAttributeValueDirty    = true
        this._glprogram                     = null
        this._attributes                    = {}
        this._uniforms                      = {}
        this._uniformsByName                = {}
        this._vertexAttribsFlags            = 0
    }

    init(glprogram) {
        this._glprogram = glprogram
        for (let name in this._glprogram._vertexAttribs) {
            this._attributes[name] = new VertexAttribValue(this._glprogram._vertexAttribs[name])
        }
        for (let name in this._glprogram._userUniforms) {
            let uniform = this._glprogram._userUniforms[name]
            this._uniforms[uniform.location] = new UniformValue(uniform, this._glprogram)
            this._uniformsByName[name] = uniform.location
        }
    }

    apply(modelView) {
        this.applyGLProgram(modelView)
        // applyAttributes();
        applyUniforms()
    }

    applyGLProgram(modelView) {
        this.updateUniformsAndAttributes()
        this._glprogram.use()
        this._glprogram.setUniformsForBuiltins(modelView)
    }

    // applyAttributes(applyAttribFlags = true) {
    //     this.updateUniformsAndAttributes()
    //     if (this._vertexAttribsFlags) {
    //         if (applyAttribFlags)
    //             GL.enableVertexAttribs(this._vertexAttribsFlags)
    //         for(auto &attribute : _attributes) {
    //             attribute.second.apply();
    //         }
    //     }
    // }

    applyUniforms() {
        this.updateUniformsAndAttributes()
        for (let location in this._uniforms) {
            let uniform = this._uniforms[location]
            uniform.apply()
        }
    }

    updateUniformsAndAttributes() {
        if (this._uniformAttributeValueDirty) {
            for (let name in this._uniformsByName) {
                this._uniforms[this._uniformsByName[name]]._uniform = this._glprogram.getUniform(name).clone
            }
            this._vertexAttribsFlags = 0
            for (let name in this._attributes) {
                const attributeValue = this._attributes[name]
                attributeValue._vertexAttrib = this._glprogram.getVertexAttrib(name).clone
                if (attributeValue._enabled) {
                    this._vertexAttribsFlags |= 1 << attributeValue._vertexAttrib.index
                }
            }
            _uniformAttributeValueDirty = false
        }
    }

    static getOrCreateWithGLProgramName(glProgramName) {
        const glProgram = GLProgramCache.getInstance().getGLProgram(glProgramName)
        if (glProgram) {
            return this.getOrCreateWithGLProgram(glProgram)
        }
        return null
    }

    static getOrCreateWithGLProgram(glprogram) {
        const ret = GLProgramStateCache.getInstance().getGLProgramState(glprogram)
        return ret
    }
}
