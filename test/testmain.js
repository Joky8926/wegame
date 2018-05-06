
import '../cc/init'
// import Director     from './base/Director'
// import Application  from './platform/Application'
// import GLView       from './platform/GLView'

function run() {
    console.log('run')
    // let glview      = new GLView()
    // let director    = Director.getInstance()
    // director.setOpenGLView(glview)
    // director.setAnimationInterval(1 / 60)
    Application.getInstance().run()
}

function main() {
    run()
}

main()
