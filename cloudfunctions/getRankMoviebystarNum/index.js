// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const $ = db.command.aggregate
  return db.collection('movieComments').aggregate()
  .group({
      _id: '$movieID',
      totalstars: $.sum('$starNum')
    })
  .sort({
    totalstars: -1
    })
  .limit(5)
  .end()
}