<?php
/*本地开发地址*/
$db_host = '127.0.0.1';
$db_user = 'root';
$db_password = '';
$db_database = 'beauty';

/*新浪云mysql服务器地址
$db_host = 'r.rdc.sae.sina.com.cn';
$db_user = 'ljjy2o2xn4';
$db_password = 'wl40j513kw40z1z0xiw1455h4mi05ll3x1k2kjwj';
$db_database = 'app_lcshao';*/


$db_port = 3306;
$db_charset = 'UTF8';

$conn = mysqli_connect(
  $db_host, $db_user, $db_password, $db_database, $db_port);
mysqli_query($conn, "SET NAMES $db_charset");
function sql_execute($sql){
  global $conn;
  $result = mysqli_query($conn, $sql);
  if(stripos($sql,"select") === 0)
    if(!$result){
      return  "查询执行失败！请检查SQL语法：$sql";
    }else {
      return $rowList = mysqli_fetch_all($result,MYSQLI_ASSOC);
    }
  else
    return $result;
}