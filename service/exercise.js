const exerciseDao = require('../dao/exercise')
const interviewrecordDao = require('../dao/interviewrecord')
const async = require('async')
const _ = require('lodash')
const {
  getExerciseType,
  getExerciseLevel,
} = require('../public/constant/index.js')

class ExerciseService {
  async createExercise(exerciseInfo) {
    return await exerciseDao.createExercise({ ...exerciseInfo })
  }//该方法用于创建题目。前端需要传递题目信息exerciseInfo作为参数，然后调用exerciseDao.createExercise来创建题目，并将创建结果返回给前端。

  async updateDeleteStatus(_id) {
    const result = await exerciseDao.updateDeleteStatus(_id)
    if (_.isNil(result)) throw new Error('不允许删除不存在的题目')
    return result
  }//该方法用于更新题目的删除状态。前端需要传递题目ID _id作为参数，然后调用exerciseDao.updateDeleteStatus来更新题目的删除状态，并将更新结果返回给前端。

  async updateExercise({ _id, exercise_type, exercise_desc, exercise_level }) {
    return await exerciseDao.updateExercise({
      _id,
      exercise_type,
      exercise_desc,
      exercise_level,
    })
  }//该方法用于更新题目的信息。前端需要传递题目ID _id、题目类型 exercise_type、题目描述 exercise_desc和题目难度 exercise_level作为参数，然后调用exerciseDao.updateExercise来更新题目的信息，并将更新结果返回给前端。

  // 获取题目所有类型
  getExerciseType() {
    return getExerciseType()
  }//该方法用于获取题目的所有类型。前端可以直接调用该方法，无需传递参数，然后获取题目的所有类型作为返回值。

  // 获取题目的所有难度级别
  getExerciseLevel() {
    return getExerciseLevel()
  }//该方法用于获取题目的所有难度级别。前端可以直接调用该方法，无需传递参数，然后获取题目的所有难度级别作为返回值。

  async findExerciseById(_id) {
    return await exerciseDao.findExerciseById(_id)
  }//该方法用于根据题目ID查找题目。前端需要传递题目ID _id作为参数，然后调用exerciseDao.findExerciseById来查找题目，并将查找结果返回给前端。

  async findExerciseByType({ exercise_type }) {
    return await exerciseDao.findExerciseByType({ exercise_type })
  }//该方法用于根据题目类型查找题目。前端需要传递题目类型 exercise_type作为参数，然后调用exerciseDao.findExerciseByType来查找题目，并将查找结果返回给前端。

  // 专家生成面试题目，并将题目更新到对应面试记录的数据中
  async generateExercises({ _id, exercise_types }) {
    // TODO: 写死并不是很好
    if (exercise_types.length !== 3) throw new Error('题目类型必须为3种')
    // map函数遍历操作和调用回调函数是同步，会阻塞整个线程直到遍历完成。
    // 如果回调函数中有异步操作，不会等异步操作完成而是往下遍历
    // TODO——提高响应 async.map等待时间,建议直接写批量操作
    var result = await async.map(exercise_types, async (type) => {
      const [temp] = await exerciseDao.findExerciseByType({
        exercise_type: type,
      })
      return temp
    })
    const exercises = result.map((exercise) => {
      return exercise._id
    })
    const res = await interviewrecordDao.updateExercises({
      _id,
      interview_exercises: exercises,
    })
    // console.log(res);
    return result
  }//该方法用于专家生成面试题目，并将题目更新到对应面试记录的数据中。前端需要传递面试记录ID _id和题目类型数组 exercise_types作为参数。首先会检查题目类型数组的长度是否为3种类型，然后通过遍历题目类型数组，并调用exerciseDao.findExerciseByType来查找对应类型的题目。查找结果将作为一个数组返回，并将其中的题目ID提取出来。最后，调用interviewrecordDao.updateExercises来更新面试记录的题目信息，并将更新结果返回给前端。

  // 专家根据题型、题目难度查看题库
  async getList({ exercise_type, exercise_level, page, size }) {
    return await exerciseDao.getList({
      exercise_type,
      exercise_level,
      page,
      size,
    })
  }//该方法用于根据题型、题目难度、分页信息获取题目列表。前端需要传递题目类型 exercise_type、题目难度 exercise_level、页码 page和每页数量 size作为参数，然后调用exerciseDao.getList来获取题目列表，并将列表作为返回值返回给前端。
}

const exerciseService = new ExerciseService()

module.exports = exerciseService
