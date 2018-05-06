
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
}

function main() {
    run()
    logic()
    console.log('run')
    // console.log(Image)
}

main()
