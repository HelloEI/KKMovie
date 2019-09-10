// miniprogram/pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendMovieComment: {}, // 推荐电影
    recommendList: [], // 推荐电影列表
    movieTitle: '',
    movieImg: '',
    headshort: '',
    name: '',
    movieId:'',
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true
  },

  // 跳转热门电影
  skipToHot() {
    wx.navigateTo({
      url: '../hotMovie/hotMovie',
    })
  },
  // 跳转我的电影
  skipToMy() {
    wx.navigateTo({
      url: '../myFavorites/myFavorities',
    })
  },
  // 跳转影评详情
  skipToComment(event) {
    let commentId = this.data.recommendMovie._id
    wx.navigateTo({
      url: '../commentDetail/commentDetail?commentId=' + commentId,
    })
  },
  //跳转电影详情
  skipToDetail(event) {
    let movieId = event.currentTarget.dataset.movieid
    console.log(movieId)
    wx.navigateTo({
      url: '../movieDetail/movieDetail?movieId=' + movieId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.cloud.callFunction({
      //name: 'movieComments',
      name: 'recommandMovies',
      success: res => {
        console.log('call',res.result);
        //let recommendList = this.getHotMovie(res.result.list);
        //this.getHotMovie(res.result.list);
        this.setData({
          recommendList:res.result,
        })
        /*
        console.log(this.data.recommendList);
        let recommendMovieComment = this.getRandomMovieComment(this.data.recommendList);
        //let recommendMovie = res.result.data;

        this.setData({
          recommendMovieComment,
          recommendList,
          movieTitle: recommendMovieComment.title,
          movieImg: recommendMovieComment.image,
          headshort: recommendMovieComment.headshort,
          name: recommendMovieComment.userName,
          movieId: recommendMovieComment.movieID,
          id:recommendMovieComment._id
        })*/
        console.log(this.data.recommendList)
        //console.log(recommendMovieComment)
      },
      fail: console.errorerror
    })
  },
  //获取随机电影评论
  getRandomMovieComment(movieList) {
    let movieComment = movieList
    console.log(movieComment.constructor)
    for (let i = 0; i < 2; i += 1) {
      console.log(movieComment[i].movieId);
      let movieId = movieComment[i].movieId;
      wx.cloud.callFunction({
        name: 'getCommentByMovie',
        data: {
          movieId: movieId
        }
      }).then(res_commentList => {
        console.log('comment',res_commentList.result.data)
        //let randomComment = res_commentList[Math.floor(Math.random() * movieComments.length)]
        movieComment.push({
          movieId: res_commentList.result.data[0].movieID,
          movieTitle: res_commentList.result.data[0].title,
          movieImage: res_commentList.result.data[0].image,
        })
      }).catch(console.error)
    }
    console.log(movieComment)
    return movieComment
  },
  //根据电影总的评论的总的收藏数排序电影，获取前五部推荐电影
  getHotMovie(rankList) {
    var movieList = new Array()
    var tempList = new Array()
    //movieList[0]={w:'try new'}
    //movieList[1] ={w1:'try again'}
    //for (let i = 0; i < 5; i++) {
    //  let movie_Id = rankList[i]._id;
      wx.cloud.callFunction({
        name: 'recommandMovies',
      //  data: {
      //    movieId: movie_Id
      //    }
        }).then(res_ranklist => {
          console.log('api test',res_ranklist)
          //movieList[i]=res_ranklist.result.data[0]
          //console.log(tempList)
          movieList.push({
            movieId: res_ranklist.result.data[0].movieID,
            movieTitle: res_ranklist.result.data[0].title,
            movieImage: res_ranklist.result.data[0].image,
          //  //movieContent: res_ranklist.result.data[0],
          })
          console.log(movieList)
          //this.setData({
          //  movieList: movieList
          //})
        }).catch(console.error)
      //wx.hideLoading()
      //console.log(i,movieList)
      //console.log(tempList)
      //movieList[i]=tempList
       //}
    this.setData({
      recommendList: movieList
    })
    console.log(this.data.recommendList)
      //return movieList
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  }
})