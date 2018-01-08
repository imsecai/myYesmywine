<?php
   $id = isset($_GET['id']) ? $_GET['id'] : null;

   $file_url = './data/goodlist.json';

    // 打开文件
    $myfile = fopen($file_url, 'r');

    // 读取打开的文件
    $content = fread($myfile, filesize($file_url));

    // 把读取到的内容转成数组
    $arr_data = json_decode($content);
   

     $arrlength=count($arr_data);
    for($i=0;$i<$arrlength;$i++){
            if($arr_data[$i]->id==$id){
                $res = $arr_data[$i];
                echo json_encode($res,JSON_UNESCAPED_UNICODE);
                 
         }   
    }
?>