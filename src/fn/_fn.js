//时间戳转年、月、日、时、分、秒
/*
 * date：为13为时间戳
 * t:返回值类型 dateTime时间类型   date日期类型
 * */
export function timestampTime(date, t) {
//      var date = new Date(date*1000);//如果date为13位不需要乘1000

  if (t === "dateTime") {
    var date = new Date(date);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

    return Y + M + D + h + m + s;
  } else if (t === "date") {
    var date = new Date(date);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());

    return Y + M + D;
  }

}

/*
 *【日期】获取上个月第一天或最后一天
 *  参数t:值为	firstDay/lastDay
 */
export function lastMonth(t) {
  var nowdays = new Date();
  var year = nowdays.getFullYear();
  var month = nowdays.getMonth();
  if (month == 0) {
    month = 12;
    year = year - 1;
  }
  if (month < 10) {
    month = "0" + month;
  }
  var firstDay = year + "-" + month + "-" + "01";//上个月的第一天

  var myDate = new Date(year, month, 0);
  var lastDay = year + "-" + month + "-" + myDate.getDate();//上个月的最后一天

  if (t === 'firstDay') {
    return firstDay
  } else if (t === 'lastDay') {
    return lastDay
  }

}

//获取下个月某一天
export function nextMonth(date) {
  var arr = date.split('-');
  var year = arr[0]; //获取当前日期的年份
  var month = arr[1]; //获取当前日期的月份
  var day = arr[2]; //获取当前日期的日
  var days = new Date(year, month, 0);
  days = days.getDate(); //获取当前日期中的月的天数
  var year2 = year;
  var month2 = parseInt(month) + 1;
  if (month2 == 13) {
    year2 = parseInt(year2) + 1;
    month2 = 1;
  }
  var day2 = day;
  var days2 = new Date(year2, month2, 0);
  days2 = days2.getDate();
  if (day2 > days2) {
    day2 = days2;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }
  var t2 = year2 + '-' + month2 + '-' + day2;
  return t2;
}

//正则表达式获取地址栏参数
export function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null)
    return unescape(r[2]);
  else
    return null;
}

//获取cookie
export function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    return (arr[2]);
  } else {
    return null;
  }
}
