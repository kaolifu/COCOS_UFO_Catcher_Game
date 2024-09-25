import SkillManager from '../manager/SkillManager'

const { ccclass, property } = cc._decorator

@ccclass
export default class SkillInfo extends cc.Component {
  id: string
  skillName: string
  desc: string
  spriteFrame: cc.SpriteFrame
  rarity: string
  rarityColor: cc.Color
  percent: number
  effect: () => void

  constructor(
    id,
    skillName,
    desc,
    spriteFrame,
    rarity,
    rarityColor,
    percent,
    effect
  ) {
    super()
    this.id = id
    this.skillName = skillName
    this.desc = desc
    this.spriteFrame = spriteFrame
    this.rarity = rarity
    this.rarityColor = rarityColor
    this.percent = percent
    this.effect = effect
  }

  // onLoad () {}

  start() {
    if (this.getComponent(cc.Toggle).isChecked) {
      SkillManager.Instance.CurrentSkillId = this.id
    }

    this.node.on('toggle', () => {
      SkillManager.Instance.CurrentSkillId = this.id
    })
  }

  // update (dt) {}
}
