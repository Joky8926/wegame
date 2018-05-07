
GameGlobal.ccPositionTextureColor_noMVP_vert = `
attribute vec2 a_position;
attribute vec2 a_texCoord;
attribute vec4 a_color;

varying lowp vec4 v_fragmentColor;
varying mediump vec2 v_texCoord;

void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_fragmentColor = a_color;
    v_texCoord = a_texCoord;
}
`

GameGlobal.ccPositionTextureColor_noMVP_frag = `
precision lowp float;

varying vec4 v_fragmentColor;
varying vec2 v_texCoord;

void main() {
    gl_FragColor = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);
}
`
