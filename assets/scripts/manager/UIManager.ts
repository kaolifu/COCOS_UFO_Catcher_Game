import BallInfo from '../ball/BallInfo'
import Data, { SkillData } from '../data/Data'
import SkillInfo from '../skill/SkillInfo'
import BallManager from './BallManager'

const { ccclass, property } = cc._decorator

@ccclass
export default class UIManager extends cc.Component {
  @property(cc.Node)
  caughtBallList: cc.Node = null
  @property(cc.Node)
  skillSelectUI: cc.Node = null
  @property(cc.Prefab)
  skillUIPrefab: cc.Prefab = null
  @property(cc.Node)
  timerUI: cc.Node = null
  @property(cc.Node)
  countDownUI: cc.Node = null
  @property(cc.Node)
  bombWarnUI: cc.Node = null
  @property(cc.Node)
  CoinUI: cc.Node = null
  @property(cc.Node)
  TimeOutUI: cc.Node = null
  @property(cc.Node)
  StageUI: cc.Node = null
  @property(cc.Node)
  CoinCostUI: cc.Node = null
  @property(cc.Node)
  HeartUI: cc.Node = null
  @property(cc.Prefab)
  HeartPerfab: cc.Prefab = null
  @property(cc.SpriteAtlas)
  HeartAtlas: cc.SpriteAtlas = null
  @property(cc.Node)
  SkillInThisGameList: cc.Node = null
  @property(cc.Prefab)
  SkillInThisGamePerfab: cc.Prefab = null

  start() {}

  // update (dt) {}
  moveBallToCaughtBallListUI(index: number, callback: () => void) {
    let ballList = this.node.getComponent(BallManager).caughtBallsThisRound

    if (index >= ballList.length) {
      ballList = []
      callback()
      return
    }

    let ball = ballList[index]
    // ball.getComponent(cc.Animation).play('Ball_MoveToUI')
    // ball.getComponent(cc.Animation).on('finished', () => {
    ball.angle = 0
    ball.getComponent(cc.RigidBody).type = cc.RigidBodyType.Static
    if (ball.getComponent(BallInfo).rarity)
      ball.getComponent(cc.Animation).play('Ball_Rarity')

    ball.parent = this.caughtBallList
    this.scheduleOnce(() => {
      this.moveBallToCaughtBallListUI(index + 1, callback)
    }, 0.2)
    // })
  }

  showSkillSelectUI() {
    this.skillSelectUI.active = true
  }
  hideSkillSelectUI() {
    this.skillSelectUI.active = false
  }

  updateTimerUI(time: number) {
    this.timerUI.children[1].getComponent(cc.Label).string = time
      .toFixed(2)
      .toString()
  }

  showCountDownUI() {
    this.countDownUI.active = true
    this.countDownUI.getComponent(cc.Animation).play()
  }
  hideCountDownUI() {
    this.countDownUI.active = false
    this.countDownUI.getComponent(cc.Animation).stop()
  }
  showBombWarnUI() {
    this.bombWarnUI.active = true
    this.bombWarnUI.getComponent(cc.Animation).play()
  }
  hideBombWarnUI() {
    this.bombWarnUI.active = false
    this.bombWarnUI.getComponent(cc.Animation).stop()
  }

  clearCaughtBallListChildren() {
    this.caughtBallList.removeAllChildren()
  }

  updateCoinUI(coin: number) {
    this.CoinUI.children[1].getComponent(cc.Label).string = coin.toString()
  }

  showTimeOutUI() {
    this.TimeOutUI.active = true
    this.TimeOutUI.getComponent(cc.Animation).play()
  }

  hideTimeOutUI() {
    this.TimeOutUI.active = false
    this.TimeOutUI.getComponent(cc.Animation).stop()
  }

  updateStageUI(stage: string) {
    this.StageUI.getChildByName('content').getComponent(cc.Label).string = stage
  }

  updateCoinCostUI(coin: number) {
    this.CoinCostUI.getChildByName('content').getComponent(cc.Label).string =
      coin.toString()
  }

  instantiateSkillUI(skillId: string) {
    let skill = Data.skillData.filter((item) => item.id == skillId)[0]
    let skillUI = cc.instantiate(this.skillUIPrefab)
    let skillList = this.skillSelectUI.getChildByName('SkillList')

    skillUI.parent = skillList
    skillUI.getChildByName('icon').getComponent(cc.Sprite).spriteFrame =
      skill.spriteFrame
    skillUI.getChildByName('skillName').getComponent(cc.Label).string =
      skill.skillName
    skillUI.getChildByName('desc').getComponent(cc.RichText).string = skill.desc
    skillUI
      .getChildByName('rarity')
      .getChildByName('content')
      .getComponent(cc.Label).string = skill.rarity
    switch (skill.rarity) {
      case '普通':
        skillUI.getChildByName('rarity').getChildByName('bg').color =
          new cc.Color(40, 184, 66, 255)
        break
      case '珍稀':
        skillUI.getChildByName('rarity').getChildByName('bg').color =
          new cc.Color(40, 89, 184, 255)
        break
      case '传奇':
        skillUI.getChildByName('rarity').getChildByName('bg').color =
          new cc.Color(255, 165, 0, 255)
        break
    }

    let skillInfo = skillUI.getComponent(SkillInfo)
    ;(skillInfo.id = skill.id),
      (skillInfo.skillName = skill.skillName),
      (skillInfo.desc = skill.desc),
      (skillInfo.level = skill.level),
      (skillInfo.spriteFrame = skill.spriteFrame),
      (skillInfo.rarity = skill.rarity),
      (skillInfo.percent = skill.percent),
      (skillInfo.effect = skill.effect)
  }

  clearSkillList() {
    this.skillSelectUI.getChildByName('SkillList').removeAllChildren()
  }

  updateHeartUI(currentHeart: number, maxHeart: number) {
    this.HeartUI.removeAllChildren()

    let maxHeartCount = Math.floor(maxHeart / 4)
    let maxHeartSm = maxHeart % 4

    for (let i = 0; i < maxHeartCount; i++) {
      let heartNode = cc.instantiate(this.HeartPerfab)
      heartNode.parent = this.HeartUI
    }
    if (maxHeartSm != 0) {
      let heartNode = cc.instantiate(this.HeartPerfab)
      heartNode.parent = this.HeartUI
      heartNode.children[0].getComponent(cc.Sprite).spriteFrame =
        this.HeartAtlas.getSpriteFrame(`heart-bg${maxHeartSm}`)
      heartNode.children[2].getComponent(cc.Sprite).spriteFrame =
        this.HeartAtlas.getSpriteFrame(`heart-border${maxHeartSm}`)
    }

    let currentHeartCount = Math.floor(currentHeart / 4)
    let currentHeartSm = currentHeart % 4

    for (let i = 0; i < currentHeartCount; i++) {
      this.HeartUI.children[i].children[1].getComponent(cc.Sprite).spriteFrame =
        this.HeartAtlas.getSpriteFrame(`heart4`)
    }
    if (currentHeartSm != 0) {
      this.HeartUI.children[currentHeartCount].children[1].getComponent(
        cc.Sprite
      ).spriteFrame = this.HeartAtlas.getSpriteFrame(`heart${currentHeartSm}`)
    }
  }

  updateSkillInThisGameList(skill: SkillData) {
    let SkillInThisGameNode = cc.instantiate(this.SkillInThisGamePerfab)
    SkillInThisGameNode.parent = this.SkillInThisGameList

    SkillInThisGameNode.getChildByName('icon').getComponent(
      cc.Sprite
    ).spriteFrame = skill.spriteFrame
    SkillInThisGameNode.getChildByName('content').getComponent(
      cc.RichText
    ).string = `<outline color=#550000 width=2>${skill.level.toString()}</outline>`
  }
  clearSkillInThisGameList() {
    this.SkillInThisGameList.removeAllChildren()
  }
}
