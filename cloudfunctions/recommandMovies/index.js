// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const $ = db.command.aggregate
  const list_target_db = []
  const res = await cloud.callFunction({
    // 要调用的云函数名称
    name: 'getRankMoviebystarNum',
  })
  //return res.result
  let movieList_db = res.result.list
    //console.log('db')
  //console.log('db', movieList_db)
    for (let i = 0; i < 3; i++) {
      const movie_db = movieList_db[i];
      let movieId_db = movie_db._id;
      //条件查询 获取特定id的movie
      const movie = await db.collection('movies').where({
        movieID: movieId_db
      }).get();
      //list_target_db.movie = movie
      //console.log('dbmovie', movie)
      const comment = await db.collection('movieComments').aggregate()
        .match({
          movieID: movieId_db
        })
        .sample({
          size: 1
        })
        .end();
      //list_target_db.comment = comment
    //把拼好的docments挨个放进mainNewsList里面也就是形成了一个全新的
    //融合的数据更为完整的JSON数组   
      list_target_db.push({
        movie:movie,
        comment:comment,
      });
  }
  //console.log('dblist', list_target_db)
  return list_target_db;
}