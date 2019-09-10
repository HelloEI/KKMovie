// miniprogram/pages/movieDetail/movieDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{},
    actionSheetHidden:true,
    actionSheetItems:['文字','音频']
  }, 
  // 底部弹出框
  actionSheetTap(){
    this.setData({
      actionSheetHidden:!this.data.actionSheetHidden
    })
  },
  actionSheetChange(){
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindItemTap(e){
    let selectType = e.currentTarget.dataset.name
    let movieDetail = {
      image: this.data.movie.image,
      title: this.data.movie.title,
      id: this.data.movie._id,
      movieId: this.data.movie.movieID
    }
    //wx.setStorageSync('movieDetail', movieDetail)
    wx.setStorageSync('movieDetail', movieDetail)
    wx.navigateTo({
      url: '../editComment/editComment?selectType=' + selectType
    })
  },
  // 跳转影评列表页
  skipToComment(event){
    let movieId = event.currentTarget.dataset.movieid
    console.log(event.currentTarget.dataset)
    wx.navigateTo({
      url: '../commentList/commentList?movieId=' + movieId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '',
    })
    this.getMovieById(options.movieId)
    console.log(options)
  },
  
  // 根据ID获取电影详情
  getMovieById(movieId){
    wx.cloud.callFunction({
      name:'getMovieById',
      data:{
        movieId:movieId
      }
    }).then(res=>{
      let movie = res.result.data[0]
      //console.log(movie)
      this.setData({ 
        movie
      })
      //console.log(movie)
      wx.hideLoading()
    }).catch(console.error)
  }
})