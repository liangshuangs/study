 function test () {
    let a = 1;
    console.log(a);
 }
 module.exports = {
   test
 }

let test1 = "{\"countDownComp\":{\"countDownBackground\":\"背景\",\"countDownContent\":\"跑马灯内容\",\"countDownExpireTime\":\"跑马灯结束时间\",\"countDownStartTime\":\"跑马灯开始时间\",\"resetCountDown\":false,\"switcher\":false,\"theme\":0},\"goodsPictureUrl\":\"商品图片url\",\"h5PageUrl\":\"商品详情页url\",\"name\":\"阿迪达斯男鞋\",\"sale\":100,\"sellPointList\":[{\"image\":\"卖点图片\",\"name\":\"好吃\"}]}"
test1 = JSON.parse(test1)
 console.log(test1)