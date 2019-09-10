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
    //let commentId = this.data.recommendMovie._id
    let commentId = event.currentTarget.dataset.commentid
    //console.log('comment', event.currentTarget.dataset)
    wx.navigateTo({
      url: '../commentDetail/commentDetail?commentId=' + commentId,
    })
  },
  //跳转电影详情
  skipToDetail(event) {
    let movieId = event.currentTarget.dataset.movieid
    //console.log(event.currentTarget.dataset)
    wx.navigateTo({
      url: '../movieDetail/movieDetail?movieId=' + movieId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取热门电影三部及每部电影的随机选择的评论
    wx.cloud.callFunction({
      //name: 'movieComments',
      name: 'recommandMovies',
      success: res => {
        console.log('call',res.result);
        this.setData({
          recommendList:res.result,
        })
        console.log(this.data.recommendList)
        //console.log(recommendMovieComment)
      },
      fail: console.errorerror
    })
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