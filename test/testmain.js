
import '../cc/init'

function run() {
    let glview      = new GLView()
    let director    = Director.getInstance()
    director.setOpenGLView(glview)
    director.setAnimationInterval(1 / 60)
    Application.getInstance().run()
}

function logic() {
    let scene = Scene.create()
    Director.getInstance().runWithScene(scene)
    let sp = Sprite.create('images/Common.png')
    scene.addChild(sp)
}

function main() {
    run()
    logic()
    console.log('run')
    // console.log(Image)
}

main()
