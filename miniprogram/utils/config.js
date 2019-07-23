/**
 * 打赏二维码
 */
var moneyUrl ="https://7265-release-e00p3-1259243074.tcb.qcloud.la/qrcode_for_gh_182f5b861172_258.jpg?sign=911a1693a8e03a85d5b17183055f3448&t=1563501561"

/**
 * 公众号二维码
 */
var wechatUrl ="https://7265-release-e00p3-1259243074.tcb.qcloud.la/qrcode_for_gh_182f5b861172_258.jpg?sign=911a1693a8e03a85d5b17183055f3448&t=1563501561"

/**
 * 云开发环境
 */
var env ="release-e00p3"
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
    moneyUrl:moneyUrl,
    wechatUrl:wechatUrl,
    env:env
}