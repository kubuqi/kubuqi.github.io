<?php
/*��ֻ����ʽ�򿪼������ļ�counter.txt����������������$num*/
$fp=fopen("counter.txt","r");
$num=fgets($fp,5);
fclose($fp);
/*������ֵ��1������ֵ����������ļ�*/
$num++;
$fp=fopen("counter.txt","w");
fputs($fp,$num);
fclose($fp);
echo $num;
/*���ֻ����ʾ��ֵ�����ǾͿ������������������������$num,��echo $num*/
/*����Ĵ�����ʮ��СͼƬ������10������*/
/*��Ҫ���Ҵ�0��9ʮ�����ֵ�ͼƬ�����ֱ�������Ϊ0.gif,1.gif����9.gif�������Ƿ�����counter.txtͬһ��Ŀ¼��*/
/*$len_str=strlen($num);*/
/*ѭ����ͼƬ�������֣��������$coutput_str�����*/
/*for($i=(0);$i<$len_str;$i++){
$numbers_exploded  =  substr($num,$i,1);
$output_str = $output_str . "<img src=\"$unmbers_exploded.gif\">";
}
echo $output_str;*/
?>


