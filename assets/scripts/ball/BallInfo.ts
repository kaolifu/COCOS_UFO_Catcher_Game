const { ccclass, property } = cc._decorator

@ccclass
export default class BallInfo extends cc.Component {
  ballName: string
  type: string
  score: number
  heal?: number
  rarity: boolean
  rarityMultiplier: number
  spirteFrame: cc.SpriteFrame
}
