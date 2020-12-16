
Page({
 
    /**
     * 页面的初始数据
     */
    data: {
      imgArr:[
        'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
        'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
        'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
        'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
      ]
    },
    previewImg:function(e){
      console.log(e.currentTarget.dataset.index);
      var index = e.currentTarget.dataset.index;
      var imgArr = this.data.imgArr;
      wx.previewImage({
        current: imgArr[index],     //当前图片地址
        urls: imgArr,               //所有要预览的图片的地址集合 数组形式
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  })