const exerciseDao = require("../dao/exercise");
const interviewrecordDao = require("../dao/interviewrecord");
const async = require("async");
const _ = require("lodash");
const { getExerciseType } = require("../public/constant/index.js");

class ExerciseService {
  async createExercise(exerciseInfo) {
    return await exerciseDao.createExercise({ ...exerciseInfo });
  }

  async updateDeleteStatus(_id) {
    const result = await exerciseDao.updateDeleteStatus(_id);
    if (_.isNil(result)) throw new Error("不允许删除不存在的题目");
    return result;
  }

  async updateExercise({ _id, exercise_type, exercise_desc, exercise_level }) {
    return await exerciseDao.updateExercise({
      _id,
      exercise_type,
      exercise_desc,
      exercise_level,
    });
  }

  getExerciseType() {
    return getExerciseType();
  }

  async findExerciseById(_id) {
    return await exerciseDao.findExerciseById(_id);
  }

  async findExerciseByType({ exercise_type }) {
    return await exerciseDao.findExerciseByType({ exercise_type });
  }

  // 专家生成面试题目，并将题目更新到对应面试记录的数据中
  async generateExercises({ _id, exercise_types }) {
    if (exercise_types.length !== 3) throw new Error("题目类型必须为3种");
    // map函数遍历操作和调用回调函数是同步，会阻塞整个线程直到遍历完成。
    // 如果回调函数中有异步操作，不会等异步操作完成而是往下遍历
    // TODO——提高响应 async.map等待时间
    var result = await async.map(exercise_types, async (type) => {
      const temp = await exerciseDao.findExerciseByType({
        exercise_type: type,
      });
      return temp[0];
    });
    const exercises = result.map((exercise) => {
      return exercise._id;
    });
    const res = await interviewrecordDao.updateExercises({
      _id,
      interview_exercises: exercises,
    });
    // console.log(res);
    return result;
  }
}

const exerciseService = new ExerciseService();

module.exports = exerciseService;
