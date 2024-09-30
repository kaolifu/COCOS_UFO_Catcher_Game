import BallInfo from '../ball/BallInfo'
import Data, { SkillData } from '../data/Data'
import SkillInfo from '../skill/SkillInfo'
import BallManager from './BallManager'
import CoinManager from './CoinManager'
import HeartManager from './HeartManager'

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
  @property(cc.Node)
  FruitsFeverUI: cc.Node = null
  @property(cc.Node)
  GameOverUI: cc.Node = null
  @property(cc.Node)
  GameOverSettleUI: cc.Node = null

  start() {}

  // update (dt) {}
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
  playTimerUIAddTimeAnimation() {
    this.timerUI.getComponent(cc.Animation).play('TimerUI_AddTime')
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
    this.CoinCostUI.getChildByName('content').getComponent(
      cc.RichText
    ).string = `<outline color=#000000 width=4>${coin.toString()}</outline>`
  }

  instantiateSkillUI(skillId: string) {
    let skill = Data.skillData.filter((item) => item.id == skillId)[0]
    let skillUI = cc.instantiate(this.skillUIPrefab)
    let skillList = this.skillSelectUI.getChildByName('SkillList')

    skillUI.parent = skillList
    skillUI.getChildByName('icon').getComponent(cc.Sprite).spriteFrame =
      skill.spriteFrame
    skillUI
      .getChildByName('skillName')
      .getComponent(
        cc.RichText
      ).string = `<outline color=#000000 width=8>${skill.skillName}</outline>`
    skillUI
      .getChildByName('desc')
      .getComponent(
        cc.RichText
      ).string = `<outline color=#000000 width=8>${skill.desc}</outline>`
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

  updateHeartUI() {
    let maxHeart = HeartManager.Instance.MaxHeart
    let currentHeart = HeartManager.Instance.CurrentHeart

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
  playHeartUIShakeAnim() {
    for (let heart of this.HeartUI.children) {
      heart.getComponent(cc.Animation).play('HeartUI_Shake')
    }
  }
  playHeartUIHealAnim() {
    for (let heart of this.HeartUI.children) {
      heart.getComponent(cc.Animation).play('HeartUI_Heal')
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

  updateBallScoreUI(ball: cc.Node, score: number) {
    ball.getChildByName('score').getComponent(cc.RichText).string =
      `<outline color=#000000 width=2>+${score}</outline>`.toString()
  }

  showFruitsFeverUI() {
    this.FruitsFeverUI.active = true
    this.FruitsFeverUI.getComponent(cc.Animation).play('FruitsFeverUI')
  }

  hideFruitsFeverUI() {
    this.FruitsFeverUI.active = false
  }

  showGameOverUI() {
    this.GameOverUI.active = true
  }

  hideGameOverUI() {
    this.GameOverUI.active = false
  }

  showGameOverSettleUI() {
    this.GameOverSettleUI.getChildByName('GetCoins')
      .getChildByName('content')
      .getComponent(
        cc.RichText
      ).string = `<outline color=#000000 width=4>${CoinManager.Instance.Coin.toString()}</outline>`
    this.GameOverSettleUI.active = true
  }

  hideGameOverSettleUI() {
    this.GameOverSettleUI.active = false
  }
}
