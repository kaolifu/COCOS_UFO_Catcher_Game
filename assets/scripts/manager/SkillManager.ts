import Data, { SkillData } from '../data/Data'

const { ccclass, property } = cc._decorator

@ccclass
export default class SkillManager {
  private static _instance: SkillManager = null
  public static get Instance(): SkillManager {
    if (this._instance == null) {
      this._instance = new SkillManager()
    }
    return this._instance
  }

  private currentSkillId: string
  private skillsInThisGame: SkillData[] = []

  public getThreeRandomSkillIds(): string[] {
    let skillData = [...Data.skillData]

    let results: string[] = []
    for (let i = 0; i < 3; i++) {
      let amountPercent = skillData.reduce(
        (prev, curr) => prev + curr.percent,
        0
      )
      let randomNum = Math.random() * amountPercent

      for (let j = 0; j < skillData.length; j++) {
        if (randomNum <= skillData[j].percent) {
          results.push(skillData[j].id)
          skillData.splice(j, 1)
          break
        }
        randomNum -= skillData[j].percent
      }
    }
    return results
  }

  public set CurrentSkillId(id: string) {
    this.currentSkillId = id
  }
  public get CurrentSkillId(): string {
    return this.currentSkillId
  }

  public setSkillsInThisGame(id: string) {
    let skill = Data.skillData.find((skill: SkillData) => skill.id == id)

    if (skill) {
      this.skillsInThisGame.push(skill)
      console.log('添加技能成功，持有技能:')
      console.log(this.skillsInThisGame)
    } else {
      console.log('添加技能失败')
    }
  }
}
