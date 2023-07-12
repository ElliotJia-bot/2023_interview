const exerciseService = require('../service/exercise')

class ExerciseController {
  async createExercise(req) {
    const { exercise_type, exercise_desc, exercise_level = 'simple' } = req.body
    return await exerciseService.createExercise({
      exercise_type,
      exercise_desc,
      exercise_level,
    })
  } //专家添加题目

  async deleteExercise(req) {
    const { _id } = req.body
    return await exerciseService.updateDeleteStatus(_id)
  }//删除题目

  // async updateExercise(req) {
  //   const { _id, exercise_type, exercise_desc, exercise_level } = req.body
  //   console.log("代码执行完成controller");
  //   return await exerciseService.updateExercise({
  //     _id,
  //     exercise_type,
  //     exercise_desc,
  //     exercise_level,
  //   })
  // }//更新题目？？

  async updateExercise(req) {
    const { _id, exercise_type, exercise_desc, exercise_level } = req.body
    
    return await exerciseService.updateExercise({
      _id,
      exercise_type,
      exercise_desc,
      exercise_level,
    })
  }//更新题目（v2.0）

  getExerciseType() {
    return exerciseService.getExerciseType()
  }

  getExerciseLevel() {
    return exerciseService.getExerciseLevel()
  }

  async getExerciseById(req) {
    const _id = req.query
    return await exerciseService.findExerciseById(_id)
  }//由ID获取题目

  async getExerciseByType(req) {
    const { exercise_type } = req.body
    return await exerciseService.findExerciseByType({ exercise_type })
  }

  // _id为面试记录的id
  async generateExercises(req) {
    const { _id, exercise_types } = req.body
    return await exerciseService.generateExercises({ _id, exercise_types })
  }

  async getList(req) {
    const { exercise_type, exercise_level, page = 1, size = 10 } = req.body
    return await exerciseService.getList({
      exercise_type,
      exercise_level,
      page,
      size,
    })
  }
}

const exerciseController = new ExerciseController()

module.exports = exerciseController
