const mongoose = require("mongoose");


const interviewrecordSchema = new mongoose.Schema(
  {
    // 专家account
    interview_mas: {
      type: String,
      required: true,
    },
    // 学生account
    interview_stu: {
      type: String,
      required: true,
    },
    // 面试开始时间
    interview_start: {
      type: Number,
      required: true,
    },
    // 面试结束时间
    interview_end: {
      type: Number,
      required: true,
    },
    // 面试房间号
    interview_room: {
      type: String,
      required: true,
    },
    // 面试题目
    interview_exercises: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'exercise',
    }],
    // 面试情况
    interview_evaluation: {
      type: String,
      default: "面试官未上传面试评价",
    },
    // 记录是否删除
    delete_status: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    created: {
      type: Number,
    },
    updated: {
      type: Number,
    },
  },
  {
    timestamps: {
      createdAt: "created",
      updatedAt: "updated",
    },
  }
);

const interviewrecord = mongoose.model(
  "interviewrecord",
  interviewrecordSchema
);
module.exports = interviewrecord;
