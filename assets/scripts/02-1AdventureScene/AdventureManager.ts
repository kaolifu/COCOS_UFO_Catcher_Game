import Data from '../data/Data'
import CoinManager from '../manager/CoinManager'
import SoundManager from '../manager/SoundManager'
import FSMManager from '../utility/FSMManager'
import AdvState_ShopMenu from './AdvState_ShopMenu'
import AdvState_StartMenu from './AdvState_StartMenu'
import CameraControl from './CameraControl'
import UIControl from './UIControl'

const { ccclass, property } = cc._decorator

enum AdvState {
  StartMenu,
  ShopMenu,
}
@ccclass
export default class AdventureManager extends cc.Component {
  @property(cc.Node)
  mask: cc.Node = null

  fsmManager: FSMManager
  isFirstGame: boolean

  onLoad() {
    cc.director.getPhysicsManager().enabled = true
  }

  start() {
    this.fsmManager = new FSMManager()

    let startMenu = new AdvState_StartMenu(
      AdvState.StartMenu,
      this,
      this.fsmManager
    )
    let shopMenu = new AdvState_ShopMenu(
      AdvState.ShopMenu,
      this,
      this.fsmManager
    )

    this.fsmManager.StateList.push(startMenu, shopMenu)

    const savedState = cc.sys.localStorage.getItem('isFirstGame')
    this.isFirstGame = savedState !== null ? JSON.parse(savedState) : true

    if (this.isFirstGame) {
      this.fsmManager.changeState(AdvState.StartMenu)
      this.isFirstGame = false
      cc.sys.localStorage.setItem(
        'isFirstGame',
        JSON.stringify(this.isFirstGame)
      )
    } else {
      this.fsmManager.changeState(AdvState.ShopMenu)
    }

    this.initializeGame()
  }

  async initializeGame() {
    await Data.initialize()
  }

  update(dt) {}
  onStartGameBtnClick() {
    this.mask.active = true
    SoundManager.Instance.playEffectSound('caughtTime')

    this.scheduleOnce(() => {
      SoundManager.Instance.stopBgm()
      cc.director.loadScene('03GameScene')
    }, 0.5)
  }

  changeToShopMenu() {
    this.fsmManager.changeState(AdvState.ShopMenu)
  }

  onStartMenuBtnClick() {
    this.node.getComponent(CameraControl).moveCameraY(50, 1.5)
    SoundManager.Instance.playEffectSound('tap')
    this.scheduleOnce(() => {
      this.changeToShopMenu()
    }, 1.5)
  }
}
