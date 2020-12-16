const api = require('../../utils/api.js');
const regeneratorRuntime = require('../../utils/runtime.js');
let fromTab = false //点击事件的发出者是Tab而不是三级菜单
let hotSelectedId = -1 // 开发view选中功能的常量，如果click的是相同tab，就return
let labelSelected = ""
let tabSelectedId = -1

Page({

  /**
   * 页面的初始数据
   */
  data: {
    posts: [],
    page: 1,
    filter: "",
    nodata: false,
    nomore: false,
    defaultSearchValue: "",
    navItems: [{ name: '最新', index: 1 }, { name: '热门', index: 2 }, { name: '标签', index: 3 }],
    tabCur: 1,
    scrollLeft: 0,
    showHot: false,
    showLabels: false,
    hotItems: ["浏览最多", "评论最多", "点赞最多", "收藏最多"],
    hotCur: 0,
    labelList: [
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "kotlin-native" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "kotlin-jvm" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "kotlin-js" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "创世记" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "出埃及记" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "利未记" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "民数记" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "申命记" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "约书亚记" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "士师记" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "路得记" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "撒母耳记上" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "撒母耳记下" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "列王记上" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "列王记下" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "历代志上" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "历代志下" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "以斯拉记" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "尼希米记" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "以斯帖记" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "约伯记" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "诗篇" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "箴言" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "传道书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "雅歌" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "以赛亚书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "耶利米书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "耶利米哀歌" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "以西结书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "但以理书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "何西阿书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "约珥书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "阿摩司书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "俄巴底亚书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "约拿书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "弥迦书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "那鸿书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "哈巴谷书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "西番雅书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "哈该书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "撒迦利亚书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "玛拉基书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "马太福音" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "马可福音" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "路加福音" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "约翰福音" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "使徒行传" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "罗马书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "哥林多前书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "哥林多后书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "加拉太书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "以弗所书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "腓立比书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "歌罗西书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "帖撒罗尼迦前书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "帖撒罗尼迦后书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "提摩太前书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "提摩太后书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "提多书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "腓利门书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "希伯来书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "雅各书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "彼得前书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "彼得后书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "约翰一书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "约翰二书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "约翰三书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "犹大书" },
      { _id: "9a393e025e7715490017cfa96bb449cb", key: "basePostsLabels", timestamp: 1584862537480, value: "启示录" }
    ],
    labelCur: "全部",
    whereItem: ['', 'createTime', '']//下拉查询条件
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    wx.setStorageSync("hotCur", 0)
    wx.setStorageSync('labelCur', "全部")
    await this.getPostsList('', 'createTime')
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: async function () {
    let that = this;
    let page = 1
    that.setData({
      page: page,
      posts: [],
      filter: "",
      nomore: false,
      nodata: false,
      defaultSearchValue: ""
    })

    if (wx.getStorageSync("hotCur") == 0 && tabSelectedId == 2) {
      await this.getPostsList("", "totalVisits")
    } else if (wx.getStorageSync("hotCur") == 1 && tabSelectedId == 2) {
      await this.getPostsList("", "totalComments")
    } else if (wx.getStorageSync("hotCur") == 2 && tabSelectedId == 2) {
      await this.getPostsList("", "totalZans")
    } else if (wx.getStorageSync("hotCur") == 3 && tabSelectedId == 2) {
      await this.getPostsList("", "totalCollection")
    } else if (wx.getStorageSync("labelCur") == "全部" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "")
    } else if (wx.getStorageSync("labelCur") == "kotlin-native" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "kotlin-native")
    } else if (wx.getStorageSync("labelCur") == "kotlin-jvm" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "kotlin-jvm")
    } else if (wx.getStorageSync("labelCur") == "kotlin-js" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "kotlin-js")
    } else if (wx.getStorageSync("labelCur") == "创世记" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "创世记")
    } else if (wx.getStorageSync("labelCur") == "出埃及记" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "出埃及记")
    } else if (wx.getStorageSync("labelCur") == "利未记" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "利未记")
    } else if (wx.getStorageSync("labelCur") == "民数记" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "民数记")
    } else if (wx.getStorageSync("labelCur") == "申命记" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "申命记")
    } else if (wx.getStorageSync("labelCur") == "约书亚记" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "约书亚记")
    } else if (wx.getStorageSync("labelCur") == "士师记" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "士师记")
    } else if (wx.getStorageSync("labelCur") == "路得记" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "路得记")
    } else if (wx.getStorageSync("labelCur") == "撒母耳记上" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "撒母耳记上")
    } else if (wx.getStorageSync("labelCur") == "撒母耳记下" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "撒母耳记下")
    } else if (wx.getStorageSync("labelCur") == "列王记上" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "列王记上")
    } else if (wx.getStorageSync("labelCur") == "列王记下" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "列王记下")
    } else if (wx.getStorageSync("labelCur") == "历代志上" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "历代志上")
    } else if (wx.getStorageSync("labelCur") == "历代志下" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "历代志下")
    } else if (wx.getStorageSync("labelCur") == "以斯拉记" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "以斯拉记")
    } else if (wx.getStorageSync("labelCur") == "尼希米记" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "尼希米记")
    } else if (wx.getStorageSync("labelCur") == "以斯帖记" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "以斯帖记")
    } else if (wx.getStorageSync("labelCur") == "约伯记" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "约伯记")
    } else if (wx.getStorageSync("labelCur") == "诗篇" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "诗篇")
    } else if (wx.getStorageSync("labelCur") == "箴言" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "箴言")
    } else if (wx.getStorageSync("labelCur") == "传道书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "传道书")
    } else if (wx.getStorageSync("labelCur") == "雅歌" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "雅歌")
    } else if (wx.getStorageSync("labelCur") == "以赛亚书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "以赛亚书")
    } else if (wx.getStorageSync("labelCur") == "耶利米书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "耶利米书")
    } else if (wx.getStorageSync("labelCur") == "耶利米哀歌" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "耶利米哀歌")
    } else if (wx.getStorageSync("labelCur") == "以西结书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "以西结书")
    } else if (wx.getStorageSync("labelCur") == "但以理书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "但以理书")
    } else if (wx.getStorageSync("labelCur") == "何西阿书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "何西阿书")
    } else if (wx.getStorageSync("labelCur") == "约珥书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "约珥书")
    } else if (wx.getStorageSync("labelCur") == "阿摩司书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "阿摩司书")
    } else if (wx.getStorageSync("labelCur") == "俄巴底亚书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "俄巴底亚书")
    } else if (wx.getStorageSync("labelCur") == "约拿书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "约拿书")
    } else if (wx.getStorageSync("labelCur") == "弥迦书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "弥迦书")
    } else if (wx.getStorageSync("labelCur") == "那鸿书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "那鸿书")
    } else if (wx.getStorageSync("labelCur") == "哈巴谷书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "哈巴谷书")
    } else if (wx.getStorageSync("labelCur") == "西番雅书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "西番雅书")
    } else if (wx.getStorageSync("labelCur") == "哈该书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "哈该书")
    } else if (wx.getStorageSync("labelCur") == "撒迦利亚书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "撒迦利亚书")
    } else if (wx.getStorageSync("labelCur") == "玛拉基书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "玛拉基书")
    } else if (wx.getStorageSync("labelCur") == "马太福音" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "马太福音")
    } else if (wx.getStorageSync("labelCur") == "马可福音" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "马可福音")
    } else if (wx.getStorageSync("labelCur") == "路加福音" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "路加福音")
    } else if (wx.getStorageSync("labelCur") == "约翰福音" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "约翰福音")
    } else if (wx.getStorageSync("labelCur") == "使徒行传" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "使徒行传")
    } else if (wx.getStorageSync("labelCur") == "罗马书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "罗马书")
    } else if (wx.getStorageSync("labelCur") == "哥林多前书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "哥林多前书")
    } else if (wx.getStorageSync("labelCur") == "哥林多后书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "哥林多后书")
    } else if (wx.getStorageSync("labelCur") == "加拉太书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "加拉太书")
    } else if (wx.getStorageSync("labelCur") == "以弗所书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "以弗所书")
    } else if (wx.getStorageSync("labelCur") == "腓立比书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "腓立比书")
    } else if (wx.getStorageSync("labelCur") == "歌罗西书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "歌罗西书")
    } else if (wx.getStorageSync("labelCur") == "帖撒罗尼迦前书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "帖撒罗尼迦前书")
    } else if (wx.getStorageSync("labelCur") == "帖撒罗尼迦后书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "帖撒罗尼迦后书")
    } else if (wx.getStorageSync("labelCur") == "提摩太前书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "提摩太前书")
    } else if (wx.getStorageSync("labelCur") == "提摩太后书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "提摩太后书")
    } else if (wx.getStorageSync("labelCur") == "提多书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "提多书")
    } else if (wx.getStorageSync("labelCur") == "腓利门书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "腓利门书")
    } else if (wx.getStorageSync("labelCur") == "希伯来书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "希伯来书")
    } else if (wx.getStorageSync("labelCur") == "雅各书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "雅各书")
    } else if (wx.getStorageSync("labelCur") == "彼得前书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "彼得前书")
    } else if (wx.getStorageSync("labelCur") == "彼得后书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "彼得后书")
    } else if (wx.getStorageSync("labelCur") == "约翰一书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "约翰一书")
    } else if (wx.getStorageSync("labelCur") == "约翰二书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "约翰二书")
    } else if (wx.getStorageSync("labelCur") == "约翰三书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "约翰三书")
    } else if (wx.getStorageSync("labelCur") == "犹大书" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "犹大书")
    } else if (wx.getStorageSync("labelCur") == "启示录" && tabSelectedId == 3) {
      await this.getPostsList("", "createTime", "启示录")
    } else {
      await this.getPostsList("")
    }
    // await this.getPostsList("", "createTime", "")
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    let whereItem = this.data.whereItem
    let filter = this.data.filter
    await this.getPostsList(whereItem[0], whereItem[1], whereItem[2])
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 点击文章明细
   */
  bindPostDetail: function (e) {
    let blogId = e.currentTarget.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + blogId
    })
  },
  /**
   * 搜索功能
   * @param {} e 
   */
  bindconfirm: async function (e) {
    let that = this;
    console.log('e.detail.value', e.detail.value)
    let page = 1
    that.setData({
      page: page,
      posts: [],
      filter: e.detail.value,
      nomore: false,
      nodata: false,
      whereItem: [e.detail.value, 'createTime', '']
    })
    await this.getPostsList(e.detail.value, 'createTime')
  },

  /**
 * tab切换
 * @param {} e 
 */
  tabSelect: async function (e) {
    let that = this;
    console.log(e);
    let tabCur = e.currentTarget.dataset.id

    if (tabSelectedId == tabCur) return


    switch (tabCur) {
      case 1: {
        that.setData({
          tabCur: e.currentTarget.dataset.id,
          // scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
          nomore: false,
          nodata: false,
          showHot: false,
          showLabels: false,
          defaultSearchValue: "",
          posts: [],
          page: 1,
          whereItem: ['', 'createTime', '']
        })

        await that.getPostsList("", 'createTime')
        break
      }
      case 2: {
        that.setData({
          posts: [],
          tabCur: e.currentTarget.dataset.id,
          // scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
          showHot: true,
          showLabels: false,
          defaultSearchValue: "",
          page: 1,
          nomore: false,
          nodata: false,
          whereItem: ['', 'totalVisits', '']
        })
        // await that.getPostsList("", "totalVisits")
        fromTab = true
        await that.hotSelect(e);
        break
      }
      case 3: {
        that.setData({
          tabCur: e.currentTarget.dataset.id,
          // scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
          showHot: false,
          showLabels: true,
        })

        // let task = that.getPostsList("", 'createTime')
        // let labelList = await api.getLabelList(); // 提前请求看是否能解决标签晃动

        // that.setData({
        //   labelList: labelList.result.data
        // })
        await that.labelSelect(e)

        break
      }
    }
    tabSelectedId = tabCur
  },

  /**
   * 热门按钮切换
   * @param {*} e 
   */
  hotSelect: async function (e) {

    let that = this
    let hotCur = 0;
    if (wx.getStorageSync("hotCur") == undefined || fromTab) {
      hotCur = wx.getStorageSync("hotCur")
    } else {
      hotCur = e.currentTarget.dataset.id
    }

    if (hotSelectedId == hotCur && !fromTab) return

    let orderBy = "createTime"
    switch (hotCur) {
      //浏览最多
      case 0: {
        orderBy = "totalVisits"
        break
      }
      //评论最多
      case 1: {
        orderBy = "totalComments"
        break
      }
      //点赞最多
      case 2: {
        orderBy = "totalZans"
        break
      }
      //收藏最多
      case 3: {
        orderBy = "totalCollection"
        break
      }
    }
    that.setData({
      posts: [],
      hotCur: hotCur,
      defaultSearchValue: "",
      page: 1,
      nomore: false,
      nodata: false,
      whereItem: ['', orderBy, '']
    })
    await that.getPostsList("", orderBy)

    wx.setStorageSync("hotCur", hotCur)
    fromTab = false

    hotSelectedId = hotCur
  },

  tap() {
    let that = this;
    for (let i = 0; i < that.data.labelList.length; i++) {
      if (that.data.labelList[i].value === that.data.labelCur) {
        that.setData({
          // labelCur: that.data.labelList[i].value,
          scrollLeft: (i + 1) * (180 * (wx.getSystemInfoSync().windowWidth / 750))
          // scrollLeft: (i + 1) * 74
        })
        break
      }
    }
  },

  /**
   * 标签按钮切换
   * @param {*} e 
   */
  labelSelect: async function (e) {

    let that = this;
    let labelCur = "全部"
    if (wx.getStorageSync('labelCur') === undefined || e.currentTarget.dataset.id == 3) {
      labelCur = wx.getStorageSync('labelCur')
    } else {
      labelCur = e.currentTarget.dataset.id;
    }
    if (labelSelected == labelCur && e.currentTarget.dataset.id != 3) return

    that.setData({
      posts: [],
      labelCur: labelCur,
      defaultSearchValue: "",
      page: 1,
      nomore: false,
      nodata: false,
      whereItem: ['', 'createTime', labelCur == "全部" ? "" : labelCur]
    })

    await that.getPostsList("", "createTime", labelCur == "全部" ? "" : labelCur)

    wx.setStorageSync('labelCur', labelCur)
    labelSelected = labelCur
    that.tap();
  },
  /**
   * 获取文章列表
   */
  getPostsList: async function (filter, orderBy, label) {
    wx.showLoading({
      title: '加载中...',
    })
    let that = this
    let page = that.data.page
    if (that.data.nomore) {
      wx.hideLoading()
      return
    }
    let result = await api.getPostsList(page, filter, 1, orderBy, label)
    if (result.data.length === 0) {
      that.setData({
        nomore: true
      })
      if (page === 1) {
        that.setData({
          nodata: true
        })
      }
    }
    else {
      that.setData({
        page: page + 1,
        posts: that.data.posts.concat(result.data),
      })
    }
    wx.hideLoading()
  }
})