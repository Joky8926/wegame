
import './global/global'
import './renderer/GLStateCache'
import Director     from './base/Director'
import Application  from './platform/Application'
import GLView       from './platform/GLView'

export default class Main {
    constructor() {

    }

    run() {
        let glview      = new GLView()
        let director    = Director.getInstance()
        director.setOpenGLView(glview)
        director.setAnimationInterval(1 / 60)
        Application.getInstance().run()
    }
}
