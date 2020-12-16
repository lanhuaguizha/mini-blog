Page({
    data: {
        articlePath: "../editor/editor",
        posts: [1, 2, 3]
    },
    // 跳转到图片预览界面
    toPreviewImage: function (e) {
        let imageId = e.currentTarget.id
        wx.navigateTo({
            url: '../previewProfile/previewProfile'
            // url: '../previewImage/previewImage' + imageId
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