const { ccclass, property } = cc._decorator

@ccclass
export default class BallInfo extends cc.Component {
  ballName: string
  score: number
  rarity: boolean
  spirteFrame: cc.SpriteFrame
}
