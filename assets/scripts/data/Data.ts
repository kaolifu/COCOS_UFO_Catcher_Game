const { ccclass, property } = cc._decorator

export interface BallData {
  id: string
  ballName: string
  type: string
  score: number
  percent: number
  rarityPercent: number
  rarityMultiplier: number
  spriteFrame: cc.SpriteFrame
}
export interface SkillData {
  id: string
  skillName: string
  level: number
  desc: string
  spriteFrame: cc.SpriteFrame
  rarity: string
  rarityColor: cc.Color
  percent: number
  effect: (level: number) => void
}

@ccclass
export default class Data {
  public static ballData: BallData[] = []
  public static ballDataInThisGame
  public static skillData: SkillData[] = []

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
      const coinGoldSpriteFrame = await this.loadResource(
        'Images/Icons/coin-gold'
      )
      const egg1SpriteFrame = await this.loadResource('Images/Icons/egg1')
      const bombSpriteFrame = await this.loadResource('Images/Icons/bomb')
      const timeSpriteFrame = await this.loadResource('Images/Icons/time')
      const shieldSpriteFrame = await this.loadResource('Images/Icons/shield')

      this.ballData = [
        {
          id: '1',
          ballName: 'appleBall',
          type: 'fruit',
          score: 1,
          percent: 20,
          rarityPercent: 0.1,
          rarityMultiplier: 3,
          spriteFrame: appleSpriteFrame,
        },
        {
          id: '2',
          ballName: 'cherryBall',
          score: 2,
          type: 'fruit',
          percent: 20,
          rarityPercent: 0.1,
          rarityMultiplier: 3,
          spriteFrame: cherriesSpriteFrame,
        },
        {
          id: '3',
          ballName: 'melonBall',
          type: 'fruit',
          score: 3,
          percent: 20,
          rarityPercent: 0.1,
          rarityMultiplier: 3,
          spriteFrame: melonSpriteFrame,
        },
        {
          id: '4',
          ballName: 'coinBronzeBall',
          type: 'coin',
          score: 10,
          percent: 20,
          rarityPercent: 0,
          rarityMultiplier: 0,
          spriteFrame: coinBronzeSpriteFrame,
        },
        {
          id: '5',
          ballName: 'bombBall',
          type: 'bomb',
          score: 0,
          percent: 20,
          rarityPercent: 0,
          rarityMultiplier: 0,
          spriteFrame: bombSpriteFrame,
        },
      ]

      this.skillData = [
        {
          id: '1',
          skillName: '水果类等级+1',
          level: 1,
          desc: '水果类宝物的出现概率 + 5%<br/>水果类宝物的金币 + 1',
          spriteFrame: appleSpriteFrame,
          rarity: '普通',
          rarityColor: new cc.Color(40, 184, 66, 255),
          percent: 20,
          effect: (level: number) => {
            let results = this.ballDataInThisGame.filter(
              (item) => item.type === 'fruit'
            )
            results.forEach((item) => {
              item.percent += 5 * level
              item.score += 1 * level
            })
          },
        },
        {
          id: '2',
          skillName: '水果类品质+1',
          level: 1,
          desc: '水果类大宝物的出现概率 + 5%',
          spriteFrame: appleSpriteFrame,
          rarity: '珍稀',
          rarityColor: new cc.Color(40, 89, 184, 255),
          percent: 10,
          effect: (level: number) => {
            let results = this.ballDataInThisGame.filter(
              (item) => item.type === 'fruit'
            )
            results.forEach((item) => {
              item.rarityPercent += 0.05 * level
            })
          },
        },
        {
          id: '3',
          skillName: '金币类等级+1',
          level: 1,
          desc: '水果类宝物的出现概率 + 5%',
          spriteFrame: coinGoldSpriteFrame,
          rarity: '普通',
          rarityColor: new cc.Color(40, 184, 66, 255),
          percent: 20,
          effect: (level: number) => {
            let results = this.ballDataInThisGame.filter(
              (item) => item.type === 'coin'
            )
            results.forEach((item) => {
              item.percent += 5 * level
            })
          },
        },
        {
          id: '4',
          skillName: '恐龙蛋等级+1',
          level: 1,
          desc: '每局游戏会有小恐龙吐出恐龙蛋',
          spriteFrame: egg1SpriteFrame,
          rarity: '珍稀',
          rarityColor: new cc.Color(40, 89, 184, 255),
          percent: 10,
          effect: () => {},
        },
      ]
    } catch (error) {
      console.error('加载资源失败', error)
    }
  }
}
