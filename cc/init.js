
import './global/global'
import './renderer/shader'
import './renderer/GLStateCache'
import Scene                from './2d/Scene'
import Sprite               from './2d/Sprite'
import Director             from './base/Director'
import Application          from './platform/Application'
import GLView               from './platform/GLView'
import GLProgramState       from './renderer/GLProgramState'
import GLProgramStateCache  from './renderer/GLProgramStateCache'

GameGlobal.Scene                = Scene
GameGlobal.Sprite               = Sprite
GameGlobal.Director             = Director
GameGlobal.Application          = Application
GameGlobal.GLView               = GLView
GameGlobal.GLProgramState       = GLProgramState
GameGlobal.GLProgramStateCache  = GLProgramStateCache
