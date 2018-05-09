
const MAX_ATTRIBUTES                    = 16
const VERTEX_ATTRIB_FLAG_POSITION       = 1 << 0
const VERTEX_ATTRIB_FLAG_COLOR          = 1 << 1
const VERTEX_ATTRIB_FLAG_TEX_COORD      = 1 << 2
const VERTEX_ATTRIB_FLAG_POS_COLOR_TEX  = VERTEX_ATTRIB_FLAG_POSITION | VERTEX_ATTRIB_FLAG_COLOR | VERTEX_ATTRIB_FLAG_TEX_COORD
let s_attributeFlags = 0
let s_currentShaderProgram  = null
let s_currentBoundTexture   = []
let s_activeTexture         = null

GL.enableVertexAttribs = function (flags) {
    for (let i = 0; i < MAX_ATTRIBUTES; i++) {
        let bit             = 1 << i
        let enabled         = (flags & bit) != 0
        let enabledBefore   = (s_attributeFlags & bit) != 0
        if (enabled != enabledBefore) {
            if (enabled) {
                gl.enableVertexAttribArray(i)
            } else {
                gl.disableVertexAttribArray(i)
            }
        }
    }
    s_attributeFlags = flags
}

GL.useProgram = function (program) {
    if (program != s_currentShaderProgram) {
        s_currentShaderProgram = program
        gl.useProgram(program)
    }
}

GL.bindTexture2D = function (textureId) {
    GL.bindTexture2DN(0, textureId)
}

GL.bindTexture2DN = function (textureUnit, textureId) {
    if (s_currentBoundTexture[textureUnit] != textureId){
        s_currentBoundTexture[textureUnit] = textureId
        GL.activeTexture(gl.TEXTURE0 + textureUnit)
        gl.bindTexture(gl.TEXTURE_2D, textureId)
    }
}

GL.activeTexture = function (texture) {
    if (s_activeTexture != texture) {
        s_activeTexture = texture
        glActiveTexture(s_activeTexture)
    }
}
