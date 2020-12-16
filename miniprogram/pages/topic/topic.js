const app = getApp()
const api = require('../../utils/api.js');
const regeneratorRuntime = require('../../utils/runtime.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [{ id: 0, name: "文章" }, { id: 1, name: "书籍" }, { id: 2, name: "视频" }, { id: 3, name: "图片" }, { id: 4, name: "音乐" }, { id: 5, name: "电影" }, { id: 6, name: "购物"}],
    load: true,
    classifyList: [],
    classifyList1: [],
    classifyList2: [],
    classifyList3: [],
    classifyList4: [],
    classifyList5: [],
    classifyList6: [],
    classifyList7: [],
    tipsshow: 'hide'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    // let list = [{}];
    // for (let i = 0; i < 4; i++) {
    //   list[i] = {};
    //   list[i].name = String.fromCharCode(65 + i);
    //   list[i].id = i;
    // }
    await this.getClassifyList()

    this.setData({
      list: list,
      listCur: list[0]
    })
  },
  /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
  onPullDownRefresh: async function () {
    let that = this;
    that.setData({
      classifyList: []
    })
    await this.getClassifyList()
    wx.stopPullDownRefresh();
  },

  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {

  },

  /**
 * 获取专题集合
 * @param {*} e 
 */
  getClassifyList: async function () {
    wx.showLoading({
      title: '加载中...',
    })
    let that = this
    // let articleList = await api.getClassifyArticleList("article")
    // let bookList = await api.getClassifyArticleList("book")
    // let videoList = await api.getClassifyArticleList("video")
    // let pictureList = await api.getClassifyArticleList("picture")
    // let musicList = await api.getClassifyArticleList("music")
    // let movieList = await api.getClassifyArticleList("movie")
    // let shoppingList = await api.getClassifyArticleList("shopping")

    const [articleList, bookList, videoList, pictureList, musicList, movieList, shoppingList] = await Promise.all([
      api.getClassifyArticleList("article"),
      api.getClassifyArticleList("book"),
      api.getClassifyArticleList("video"),
      api.getClassifyArticleList("picture"),
      api.getClassifyArticleList("music"),
      api.getClassifyArticleList("movie"),
      api.getClassifyArticleList("shopping")
    ]);

    // console.info(articleList)
    // console.info(bookList)

    that.setData({
      classifyList1: articleList.result.data,
      classifyList2: bookList.result.data,
      classifyList3: videoList.result.data,
      classifyList4: pictureList.result.data,
      classifyList5: musicList.result.data,
      classifyList6: movieList.result.data,
      classifyList7: shoppingList.result.data
    })

    wx.hideLoading()
  },

  /**
  * 跳转至专题详情
  * @param {} e 
  */
  openTopicPosts: async function (e) {
    let classify = e.currentTarget.dataset.tname;
    wx.navigateTo({
      url: '../topic/topiclist/topiclist?classify=' + classify
    })
  },

  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  }
})