import SkillManager from '../manager/SkillManager'

const { ccclass, property } = cc._decorator

@ccclass
export default class SkillInfo extends cc.Component {
  id: string
  skillName: string
  level: number
  desc: string
  spriteFrame: cc.SpriteFrame
  rarity: string
  percent: number
  effect: (level: number) => void


  // onLoad() {
  // }

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
