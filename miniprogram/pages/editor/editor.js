Page({
    data: {
        placeholder: "赶快创作你的作品吧...",
        post: {},
        imgList: [],
        isShowModel: false
    },

    goback: async function (e) {
        wx.navigateBack({
            delta: 1
        })
    },
    ChooseImage() {
        // wx.chooseImage({ 
        //     count: 9, //默认9
        //     sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        //     sourceType: ['album'], //从相册选择
        //     success: (res) => {
        //         if (this.data.imgList.length != 0) {
        //             this.setData({
        //                 imgList: this.data.imgList.concat(res.tempFilePaths)
        //             })
        //         } else {
        //             this.setData({
        //                 imgList: res.tempFilePaths
        //             })
        //         }
        //     }
        // });
        let that = this;

        wx.chooseMedia({
            count: 9,
            mediaType: ['image', 'video'],
            sourceType: ['album', 'camera'],
            maxDuration: 30,
            camera: 'back',
            success(res) {
                if (that.data.imgList.length != 0) {
                    that.setData({
                        imgList: that.data.imgList.concat(res.tempFiles.map((item) => {
                            return item.tempFilePath;
                        }))
                    })
                } else {
                    that.setData({
                        imgList: res.tempFiles.map((item) => {
                            return item.tempFilePath;
                        })
                    })
                }
                console.log(res.tempFiles.tempFilePath)
                console.log(res.tempFiles.size)
            }
        })
    },
    DelImg(e) {
        wx.showModal({
            title: '删除图片',
            content: '确定要删除该图片吗？',
            cancelText: '取消',
            confirmText: '确定',
            success: res => {
                if (res.confirm) {
                    this.data.imgList.splice(e.currentTarget.dataset.index, 1);
                    this.setData({
                        imgList: this.data.imgList
                    })
                }
            }
        })
    },
})