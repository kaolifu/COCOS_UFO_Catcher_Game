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
      //#region 资源加载
      const apple = await this.loadResource('Images/Icons/apple')
      const cherry = await this.loadResource('Images/Icons/cherries')
      const melon = await this.loadResource('Images/Icons/melon')
      const appleG = await this.loadResource('Images/Icons/apple-gold')

      const coinB = await this.loadResource('Images/Icons/coin-bronze')
      const coinS = await this.loadResource('Images/Icons/coin-silver')
      const coinG = await this.loadResource('Images/Icons/coin-gold')

      const meat = await this.loadResource('Images/Icons/meat')
      const pizza = await this.loadResource('Images/Icons/pizza')
      const hamburger = await this.loadResource('Images/Icons/hamburger')
      const hamburgerG = await this.loadResource('Images/Icons/hamburger-gold')

      const chicken = await this.loadResource('Images/Icons/chicken')
      const capybara = await this.loadResource('Images/Icons/capybara')
      const cow = await this.loadResource('Images/Icons/cow')
      const chickenG = await this.loadResource('Images/Icons/chicken-gold')

      const egg = await this.loadResource('Images/Icons/egg')
      const time = await this.loadResource('Images/Icons/time')
      const shield = await this.loadResource('Images/Icons/shield')
      const bomb = await this.loadResource('Images/Icons/bomb')

      const fruitLv = await this.loadResource('Images/SkillIcons/fruitLv')
      const fruitRa = await this.loadResource('Images/SkillIcons/fruitRa')
      const animalLv = await this.loadResource('Images/SkillIcons/animalLv')
      const animalRa = await this.loadResource('Images/SkillIcons/animalRa')
      const coinLv = await this.loadResource('Images/SkillIcons/coinLv')
      const foodLv = await this.loadResource('Images/SkillIcons/foodLv')
      const foodRa = await this.loadResource('Images/SkillIcons/foodRa')
      const shieldLv = await this.loadResource('Images/SkillIcons/shieldLv')
      const timeLv = await this.loadResource('Images/SkillIcons/timeLv')
      const heartLv = await this.loadResource('Images/SkillIcons/heartLv')
      const eggLv = await this.loadResource('Images/SkillIcons/eggLv')
      //#endregion

      this.ballData = [
        {
          id: '1',
          ballName: 'appleBall',
          type: 'fruit',
          score: 1,
          percent: 5,
          rarityPercent: 0.1,
          rarityMultiplier: 5,
          spriteFrame: apple,
        },
        {
          id: '2',
          ballName: 'cherryBall',
          score: 2,
          type: 'fruit',
          percent: 0,
          rarityPercent: 0.1,
          rarityMultiplier: 5,
          spriteFrame: cherry,
        },
        {
          id: '3',
          ballName: 'melonBall',
          type: 'fruit',
          score: 3,
          percent: 0,
          rarityPercent: 0.1,
          rarityMultiplier: 5,
          spriteFrame: melon,
        },
        {
          id: '4',
          ballName: 'appleGoldBall',
          type: 'fruit',
          score: 5,
          percent: 0,
          rarityPercent: 1,
          rarityMultiplier: 5,
          spriteFrame: appleG,
        },
        {
          id: '5',
          ballName: 'bombBall',
          type: 'bomb',
          score: 0,
          percent: 5,
          rarityPercent: 0,
          rarityMultiplier: 0,
          spriteFrame: bomb,
        },
        {
          id: '6',
          ballName: 'meatBall',
          type: 'food',
          score: 1,
          percent: 5,
          rarityPercent: 0.05,
          rarityMultiplier: 3,
          spriteFrame: meat,
        },
        {
          id: '7',
          ballName: 'pizzaBall',
          type: 'food',
          score: 2,
          percent: 0,
          rarityPercent: 0.05,
          rarityMultiplier: 3,
          spriteFrame: pizza,
        },
        {
          id: '8',
          ballName: 'hamburgerBall',
          type: 'food',
          score: 3,
          percent: 0,
          rarityPercent: 0.05,
          rarityMultiplier: 3,
          spriteFrame: hamburger,
        },
        {
          id: '9',
          ballName: 'hamburgerGoldBall',
          type: 'food',
          score: 5,
          percent: 0,
          rarityPercent: 1,
          rarityMultiplier: 3,
          spriteFrame: hamburgerG,
        },
        {
          id: '10',
          ballName: 'coinBronzeBall',
          type: 'coin',
          score: 5,
          percent: 5,
          rarityPercent: 0,
          rarityMultiplier: 0,
          spriteFrame: coinB,
        },
        {
          id: '11',
          ballName: 'coinSilverBall',
          type: 'coin',
          score: 10,
          percent: 0,
          rarityPercent: 0,
          rarityMultiplier: 0,
          spriteFrame: coinS,
        },
        {
          id: '12',
          ballName: 'coinGoldBall',
          type: 'coin',
          score: 20,
          percent: 0,
          rarityPercent: 0,
          rarityMultiplier: 0,
          spriteFrame: coinG,
        },
        {
          id: '13',
          ballName: 'chickenBall',
          type: 'animal',
          score: 1,
          percent: 5,
          rarityPercent: 0.1,
          rarityMultiplier: 3,
          spriteFrame: chicken,
        },
        {
          id: '14',
          ballName: 'capybaraBall',
          type: 'animal',
          score: 2,
          percent: 0,
          rarityPercent: 0.1,
          rarityMultiplier: 3,
          spriteFrame: capybara,
        },
        {
          id: '15',
          ballName: 'cowBall',
          type: 'animal',
          score: 3,
          percent: 0,
          rarityPercent: 0.1,
          rarityMultiplier: 3,
          spriteFrame: cow,
        },
        {
          id: '16',
          ballName: 'chickenGoldBall',
          type: 'animal',
          score: 5,
          percent: 0,
          rarityPercent: 1,
          rarityMultiplier: 3,
          spriteFrame: chickenG,
        },
        {
          id: '17',
          ballName: 'shieldBall',
          type: 'special',
          score: 0,
          percent: 0,
          rarityPercent: 0,
          rarityMultiplier: 0,
          spriteFrame: shield,
        },
        {
          id: '18',
          ballName: 'timeBall',
          type: 'special',
          score: 0,
          percent: 0,
          rarityPercent: 0,
          rarityMultiplier: 0,
          spriteFrame: time,
        },
        {
          id: '19',
          ballName: 'heartBall',
          type: 'special',
          score: 0,
          percent: 0,
          rarityPercent: 0,
          rarityMultiplier: 0,
          spriteFrame: shield,
        },
      ]

      this.skillData = [
        {
          id: '1',
          skillName: '水果类等级+1',
          level: 1,
          desc: '水果类宝物的出现概率提升<br/>水果类宝物的金币增加',
          spriteFrame: fruitLv,
          rarity: '普通',
          percent: 20,
          effect: (level: number) => {
            this.levelUp('fruit', level)
          },
        },
        {
          id: '2',
          skillName: '水果类品质+1',
          level: 1,
          desc: '水果类大宝物的出现概率提升<br/>水果类宝物会增殖边上的水果',
          spriteFrame: fruitRa,
          rarity: '珍稀',
          percent: 10,
          effect: (level: number) => {
            this.rarityUp('fruit', level)
          },
        },
        {
          id: '3',
          skillName: '金币类等级+1',
          level: 1,
          desc: '金币类宝物的出现概率提升<br/>金币类宝物拥有极高的价值',
          spriteFrame: coinLv,
          rarity: '珍稀',
          percent: 10,
          effect: (level: number) => {
            let results = this.ballDataInThisGame.filter(
              (item) => item.type === 'coin'
            )
            results[0].percent += 5 * level
            results[0].score += 3 * level
            if (level > 3) {
              results[1].percent += 5 * (level - 3)
              results[1].score += 3 * level
            }
            if (level > 6) {
              results[2].percent += 5 * (level - 6)
              results[2].score += 3 * level
            }
          },
        },
        {
          id: '4',
          skillName: '食物类等级+1',
          level: 1,
          desc: '食物类宝物的出现概率提升<br/>食物类宝物的金币增加',
          spriteFrame: foodLv,
          rarity: '普通',
          percent: 20,
          effect: (level: number) => {
            this.levelUp('food', level)
          },
        },
        {
          id: '5',
          skillName: '食物类品质+1',
          level: 1,
          desc: '食物类大宝物的出现概率提升<br/>食物类宝物可以恢复血量',
          spriteFrame: foodRa,
          rarity: '珍稀',
          percent: 10,
          effect: (level: number) => {
            this.rarityUp('food', level)
          },
        },
        {
          id: '6',
          skillName: '动物类等级+1',
          level: 1,
          desc: '动物类宝物的出现概率提升<br/>动物类宝物的金币增加',
          spriteFrame: animalLv,
          rarity: '普通',
          percent: 20,
          effect: (level: number) => {
            this.levelUp('animal', level)
          },
        },
        {
          id: '7',
          skillName: '动物类品质+1',
          level: 1,
          desc: '动物类大宝物的出现概率提升<br/>动物类宝物会生产新的动物',
          spriteFrame: animalRa,
          rarity: '珍稀',
          percent: 10,
          effect: (level: number) => {
            this.rarityUp('animal', level)
          },
        },
        {
          id: '8',
          skillName: '护盾等级+1',
          level: 1,
          desc: '护盾的出现概率提升<br/>护盾可以抵御的伤害量提升',
          spriteFrame: shieldLv,
          rarity: '珍稀',
          percent: 10,
          effect: (level: number) => {
            this.levelUpOneItem('shieldBall', level, 2.5)
          },
        },
        {
          id: '9',
          skillName: '计时器等级+1',
          level: 1,
          desc: '计时器的出现概率提升<br/>计时器可以增加本轮游戏时间',
          spriteFrame: timeLv,
          rarity: '珍稀',
          percent: 10,
          effect: (level: number) => {
            this.levelUpOneItem('timeBall', level, 2.5)
          },
        },
        {
          id: '10',
          skillName: '心宝石等级+1',
          level: 1,
          desc: '心宝石的出现概率提升<br/>心宝石可以提升血量上限',
          spriteFrame: heartLv,
          rarity: '传奇',
          percent: 5,
          effect: (level: number) => {
            this.levelUpOneItem('heartBall', level, 1)
          },
        },
        {
          id: '11',
          skillName: '恐龙蛋等级+1',
          level: 1,
          desc: '小恐龙每局游戏都会吐出宝物球',
          spriteFrame: heartLv,
          rarity: '普通',
          percent: 0,
          effect: () => {},
        },
      ]
    } catch (error) {
      console.error('加载资源失败', error)
    }
  }

  private static levelUp(type: string, level: number) {
    let results = this.ballDataInThisGame.filter((item) => item.type === type)
    results[0].percent += 5 * level
    results[0].score += 1 * level
    if (level > 2) {
      results[1].percent += 5 * (level - 2)
      results[1].score += 1 * level
    }
    if (level > 4) {
      results[2].percent += 5 * (level - 4)
      results[2].score += 1 * level
    }
    if (level > 6) {
      results[3].percent += 1 * (level - 6)
      results[3].score += 1 * level
    }
  }
  private static levelUpOneItem(
    ballName: string,
    level: number,
    percent: number
  ) {
    let result = this.ballDataInThisGame.find(
      (item) => item.ballName === ballName
    )
    result.percent += percent * level
  }
  private static rarityUp(type: string, level: number) {
    let results = this.ballDataInThisGame.filter((item) => item.type === type)
    results.forEach((item) => {
      item.rarityPercent += 0.025 * level
    })
  }
}
