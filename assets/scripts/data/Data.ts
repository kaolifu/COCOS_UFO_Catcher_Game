const { ccclass, property } = cc._decorator

interface BallData {
  id: string
  ballName: string
  score: number
  percent: number
  rarityPercent: number
  rarityMultiplier: number
  spirteFrame: cc.SpriteFrame
}

@ccclass
export default class Data {
  public static ballData: BallData[] = []
  public static loadResource(path: string): Promise<cc.SpriteFrame> {
    return new Promise((resolve, reject) => {
      cc.loader.loadRes(path, cc.SpriteFrame, (err, resource) => {
        if (err) {
          reject(err)
        } else {
          resolve(resource)
        }
      })
    })
  }

  public static async initialize() {
    try {
      const appleSpriteFrame = await this.loadResource('Images/Icons/apple')
      const cherriesSpriteFrame = await this.loadResource(
        'Images/Icons/cherries'
      )
      const melonSpriteFrame = await this.loadResource('Images/Icons/melon')
      const coinBronzeSpriteFrame = await this.loadResource(
        'Images/Icons/coin-bronze'
      )
      const bombSpriteFrame = await this.loadResource('Images/Icons/bomb')

      this.ballData = [
        {
          id: '1',
          ballName: 'appleBall',
          score: 1,
          percent: 20,
          rarityPercent: 0.1,
          rarityMultiplier: 3,
          spirteFrame: appleSpriteFrame,
        },
        {
          id: '2',
          ballName: 'cherryBall',
          score: 1,
          percent: 20,
          rarityPercent: 0.1,
          rarityMultiplier: 3,
          spirteFrame: appleSpriteFrame,
        },
        {
          id: '3',
          ballName: 'melonBall',
          score: 1,
          percent: 20,
          rarityPercent: 0.1,
          rarityMultiplier: 3,
          spirteFrame: appleSpriteFrame,
        },
        {
          id: '4',
          ballName: 'coinBronzeBall',
          score: 1,
          percent: 20,
          rarityPercent: 0.1,
          rarityMultiplier: 3,
          spirteFrame: appleSpriteFrame,
        },
        {
          id: '5',
          ballName: 'bombBall',
          score: 1,
          percent: 20,
          rarityPercent: 0.1,
          rarityMultiplier: 3,
          spirteFrame: appleSpriteFrame,
        },
      ]
    } catch (error) {
      console.error('加载资源失败', error)
    }
  }
}
