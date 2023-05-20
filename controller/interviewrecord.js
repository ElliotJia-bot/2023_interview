const interviewrecordService = require('../service/interviewrecord')

class InterviewrecordController {
  async deleteRecord(req) {
    const { _id } = req.body
    return await interviewrecordService.updateDeleteStatus(_id)
  }

  async updateRecord(req) {
    const { _id, interview_evaluation } = req.body
    return await interviewrecordService.updateRecord({
      _id,
      interview_evaluation,
    })
  }

  // interview_mas为专家account
  async getRecordList_mas(req) {
    const { interview_mas, page = 1, size = 10 } = req.query
    return await interviewrecordService.getRecordList_mas({
      interview_mas,
      page,
      size,
    })
  }

  // interview_stu为学生account
  async getRecordList_stu(req) {
    const { interview_stu, page = 1, size = 10 } = req.query
    return await interviewrecordService.getRecordList_stu({
      interview_stu,
      page,
      size,
    })
  }

  async getExercises(req) {
    const _id = req.query
    return await interviewrecordService.getExercises(_id)
  }
}

const interviewrecordController = new InterviewrecordController()

module.exports = interviewrecordController
