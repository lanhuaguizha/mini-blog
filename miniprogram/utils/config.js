/**
 * 打赏二维码
 */
var moneyUrl = "cloud://release-e00p3.7265-release-e00p3-1259243074/微信图片_20190830100318.jpg"

/**
 * 公众号二维码
 */
var wechatUrl = "cloud://release-e00p3.7265-release-e00p3-1259243074/微信图片_20190830100311.jpg"

/**
 * 云开发环境
 */
var env = "release-e00p3"
/**
 * 个人文章操作枚举
 */
var postRelatedType = {
    COLLECTION: 1,
    ZAN: 2,
    properties: {
        1: {
            desc: "收藏"
        },
        2: {
            desc: "点赞"
        }
    }
};

module.exports = {
    postRelatedType: postRelatedType,
    moneyUrl: moneyUrl,
    wechatUrl: wechatUrl,
    env: env
}