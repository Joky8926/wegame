
let gl;
let canvas;
let shaderProgram;
let vertexBuffer;
let woodTexture;

function createGLContext() {
    canvas = wx.createCanvas()
    let context = canvas.getContext('webgl');
    context.viewportWidth = canvas.width;
    context.viewportHeight = canvas.height;
    return context;
}

function loadShader(type, shaderSource) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("Error compiling shader" + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function setupShaders() {
    var vertexShaderSource = `
        attribute vec2 aVertexPosition;
        attribute vec2 aTextureCoordinates;

        varying vec2 vTextureCoordinates;

        void main() {
            gl_Position = vec4(aVertexPosition, 0.0, 1.0);
            vTextureCoordinates = aTextureCoordinates;
        }`

    var fragmentShaderSource = `
        precision mediump float;

        uniform sampler2D uSampler;

        varying vec2 vTextureCoordinates;

        void main() {
            gl_FragColor = texture2D(uSampler, vTextureCoordinates);
        }`

    var vertexShader = loadShader(gl.VERTEX_SHADER, vertexShaderSource);
    var fragmentShader = loadShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Failed to setup shaders");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    shaderProgram.vertexTextureAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoordinates");
    shaderProgram.uniformSamplerLoc = gl.getUniformLocation(shaderProgram, "uSampler");
}

function setupBuffers() {
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var triangleVertices = [
        -0.5, -0.5, 0, 0,
        -0.5, 0.5, 0, 1,
        0.5, -0.5, 1, 0,
        0.5, 0.5, 1, 1
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
    vertexBuffer.itemSize = 2;
    vertexBuffer.numberOfItems = 4;
}

function draw() {
    console.log('draw image end')
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, vertexBuffer.itemSize, gl.FLOAT, false, 16, 0);
    gl.vertexAttribPointer(shaderProgram.vertexTextureAttribute, vertexBuffer.itemSize, gl.FLOAT, false, 16, 8);

    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    gl.enableVertexAttribArray(shaderProgram.vertexTextureAttribute);

    gl.uniform1i(shaderProgram.uniformSamplerLoc, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, woodTexture);

    console.log('bindTexture image end')

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexBuffer.numberOfItems);
    console.log('bindTexture image end2')
}

function textureFinishedLoading(image, texture) {
    console.log('textureFinishedLoading image')
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    console.log('textureFinishedLoading image end')
    gl.generateMipmap(gl.TEXTURE_2D);

    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
    // gl.bindTexture(gl.TEXTURE_2D, null);
    draw();
}

function loadImageForTexture(url, texture) {
    let image = wx.createImage();
    image.onload = function() {
        console.log('onload image')
        textureFinishedLoading(image, texture);
    }
    image.src = url;
}


function setupTextures() {
    woodTexture = gl.createTexture();
    loadImageForTexture("images/Common.png", woodTexture);
}

function startup() {
    gl = createGLContext();
    setupShaders();
    setupBuffers();
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    setupTextures();
}

startup();
