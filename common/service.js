/*
接口API
基于豆瓣开放API的图书、电影
*/

var BaseURL = "https://api.douban.com/v2/";
var SouHongWangURL = "http://api.souhong.wang";

var Douban_APIS = {
  /*
  图书搜索

  image  图书缩略图
  title  图书名称
  publisher  出版社
  author  作者
  price  价格
  pages  总页数
  */
  book_search:BaseURL + "book/search",


  /*
  image  图片缩略图
  title  图书名称
  publisher  出版社
  author  作者
  price  价格
  pages  总页数
  summary  图书简介
  author_intro  作者简介
  */
  book_detail_id:BaseURL + "book/",


  /*
  images.medium  电影图像
  title  电影名称
  casts  电影演员  数据需要再处理
  rating.average  电影评分
  year  电影上映时间
  genres  电影标签
  alt  电影详情url
  */
  movie_search:BaseURL + "movie/search",



  souhong_url:SouHongWangURL +"/index/index?",


  star_url:SouHongWangURL + "/star/list?",


  /*
  slideList: 轮播图
     url：链接
     photo：图片

  hotTaskList：热门     taskList：企业任务
    title：标题
    finish_date：截止时间
    price：报价
  */
  task_url: SouHongWangURL + "/task/list?",


  /**/
  task_detail: SouHongWangURL + "/task/index?",
}



module.exports = Douban_APIS;
