class Formatter {

  static formatDate(date){
    if(date === null){
      date = new Date();
    }
    var s_day = this.setCeroToValue(date.getDate());
    var s_month = this.setCeroToValue(date.getMonth() + 1); //Month from 0 to 11
    var s_year = this.setCeroToValue(date.getFullYear());

    const value_date = s_day + '-' + s_month + '-' + s_year;

    return value_date;
  }

  static setCeroToValue(num){
    var temp_num = '0';
    if(Number(num) < 10){
      temp_num += num;
    }else{
      temp_num = num;
    }

    return temp_num;
  }

  static oneMonthAgo = new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 1,
    new Date().getDate()
);


}

export default Formatter;
