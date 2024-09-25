import Data, { BallData, SkillData } from '../data/Data'

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
  public set CurrentSkillId(id: string) {
    this.currentSkillId = id
  }
  public get CurrentSkillId(): string {
    return this.currentSkillId
  }

  private skillsInThisGame: SkillData[] = []
  public get SkillsInThisGame(): SkillData[] {
    return this.skillsInThisGame
  }

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

  public setSkillsInThisGame(id: string) {
    let result = this.skillsInThisGame.find(
      (skill: SkillData) => skill.id == id
    )
    if (result) {
      result.level++
    } else {
      let skill = Data.skillData.find((skill: SkillData) => skill.id == id)
      if (skill) {
        this.skillsInThisGame.push(skill)
      } else {
        console.log('未找到技能')
      }
    }
  }

  public applyAllSkillEffect() {
    this.skillsInThisGame.forEach((skill: SkillData) => {
      skill.effect(skill.level)
    })
  }
}
