Page({
    data: {
        isShow: false,//控制顶部按钮显示
        articlePath: "../editor/editor",
        posts: [1],
        imgArr: [
            'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
            'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
            'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
            'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
        ]
    },
    toPreviewProfile: function (e) {
        wx.navigateTo({
            url: '../previewProfile/previewProfile'
        })
    },

    toEditor: function (e) {
        wx.navigateTo({
            url: '../editor/editor'
        })
    },

    /**
   * 显示隐藏功能
   */
    showMenuBox: function () {
        this.setData({
            isShow: !this.data.isShow
        })
    },

    // 跳转到图片预览界面
    toPreviewImage: function (e) {
        // let imageId = e.currentTarget.id
        // wx.navigateTo({
        //     url: '../previewImage/previewImage' + imageId
        // })
        var index = e.currentTarget.dataset.index;
        var imgArr = this.data.imgArr;
        wx.previewImage({
            current: imgArr[index],     //当前图片地址
            urls: imgArr,               //所有要预览的图片的地址集合 数组形式
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
        })
    },

    /**
  * 点击文章明细
  */
    bindPostDetail: function (e) {
        let blogId = e.currentTarget.id;
        wx.navigateTo({
            url: '../article/article?id=' + blogId
        })
    },
})