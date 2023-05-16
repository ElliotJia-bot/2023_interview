const reserveDao = require("../dao/reserve");
const { isValid, getStartAndEndTime } = require("../utils/time/index");
const _ = require("lodash");

class ReserveService {
  // 专家上传预约时间
  async createReserve({ current_time }, reserveInfo) {
    const reserve_start = reserveInfo?.reserve_start;
    // 判断所选的时间是否有效
    const result = isValid(current_time, reserve_start);
    switch (true) {
      case result === "late":
        throw new Error("至少提前一天发布预约，请重新选择时间！");
      case result === "early":
        throw new Error("至多提前七天发布预约，请重新选择时间！");
      default:
        break;
    }
    // 时间有效则创建
    return await reserveDao.createReserve({
      ...reserveInfo,
    });
  }

  async updateDeleteStatus(_id) {
    const result = await reserveDao.updateDeleteStatus(_id);
    if (_.isNil(result)) throw new Error("不允许删除不存在的预约记录");
    return result;
  }

  async updateReserve({ _id, reserve_start, reserve_end }) {
    return await reserveDao.updateReserve({ _id, reserve_start, reserve_end });
  }

  // 学生选择时间进行预约
  // TODO——成功预约则create面试记录
  async updateReserveStatus({ current_time, _id }) {
    const reserve_start = await reserveDao.getReserveById(_id).reserve_start;
    // 判断学生当前时间是否有资格预约
    const result = isValid(current_time, reserve_start);
    switch (true) {
      case result === "late":
        throw new Error("至少提前一天进行预约，请重新选择时间！");
      case result === "early":
        throw new Error("至多提前七天进行预约，请重新选择时间！");
      default:
        break;
    }
    // 学生进行预约
    return await reserveDao.updateReserveStatus(_id);
  }

  async getReserveById(_id) {
    return await reserveDao.getReserveById(_id);
  }

  async getReserveList_mas({ reserve_account, reserve_date }) {
    if (_.isNil(reserve_date)) {
      return await reserveDao.getReserveList_mas({ reserve_account });
    } else {
      var startAndEndTime = getStartAndEndTime(reserve_date);
      return await reserveDao.getReserveList_mas({
        reserve_account,
        ...startAndEndTime,
      });
    }
  }

  async getReserveList_stu({ reserve_account, reserve_date }) {
    if (_.isNil(reserve_date)) {
      return await reserveDao.getReserveList_stu({ reserve_account });
    } else {
      var startAndEndTime = getStartAndEndTime(reserve_date);
      return await reserveDao.getReserveList_stu({
        reserve_account,
        ...startAndEndTime,
      });
    }
  }
}

const reserveService = new ReserveService();

module.exports = reserveService;
