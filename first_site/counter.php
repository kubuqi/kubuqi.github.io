<?php
/*以只读方式打开计数器文件counter.txt，并将它读到变理$num*/
$fp=fopen("counter.txt","r");
$num=fgets($fp,5);
fclose($fp);
/*变量的值加1并将新值存入计数器文件*/
$num++;
$fp=fopen("counter.txt","w");
fputs($fp,$num);
fclose($fp);
echo $num;
/*如果只是显示数值，我们就可以在这里用输出语句输出变量$num,如echo $num*/
/*下面的代码用十幅小图片来代替10个数。*/
/*你要先找从0到9十个数字的图片，并分别将它命名为0.gif,1.gif……9.gif。将它们放在与counter.txt同一个目录。*/
/*$len_str=strlen($num);*/
/*循环用图片代替数字，存入变量$coutput_str并输出*/
/*for($i=(0);$i<$len_str;$i++){
$numbers_exploded  =  substr($num,$i,1);
$output_str = $output_str . "<img src=\"$unmbers_exploded.gif\">";
}
echo $output_str;*/
?>


