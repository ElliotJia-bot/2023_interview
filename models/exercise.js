//这里是mongodb配置
const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    // 题目类型
    exercise_type: {
      type: Number,
      required: true,
      enum: [0, 1, 2, 3, 4, 5, 6],
    },
    // 题目描述
    exercise_desc: {
      type: String,
      required: true,
    },
    // 题目难度
    exercise_level: {
      type: String,
      enum: ["simple", "middle", "hard"],
      default: "simple",
    },
    // 题目是否删除
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

const exercise = mongoose.model("exercise", exerciseSchema);
module.exports = exercise;
