<html><head><title>A H323 IP-IP Gateway</title></head>

<body background="wall.gif">
<p align="center"><b><font size="5">H323 IP-IP Gateway</font></b></p>
<p align="center"><img border="0" src="line.blue.gif" width="652" height="8"></p>
<ul>

<font size="2">
  <li><p align="left"><a href="#about">What is this about?</a></li>
  <li><p align="left"><a href="#how">How does it work?</a></li>
  <li><p align="left"><a href="#copyright">Is it free?</a></li>
  <li><p align="left"><a href="#download">Where can I got it?</a></li>
  <li><p align="left"><a href="#questions">More questions?</a></li>
</font>

<p align="center"><img border="0" src="line.blue.gif" width="652" height="8"></p>

<font size="3"><b><li><p align="left"><a name="about">What is this about?</a></p></li></b></font>
<font size="2">
H323 is a group of protocals to traffic voice, video over IP networks.<br><br>
A H323 GW was usually employed to bridge the call signal, multi-media streams between IP-based telephony network and PSTN network.<br><br>
A IP-IP gateway here, how ever, is a gateway that bridges between two or more H323 telephony networks.<br><br>
A commercial product that do the same thing are <a href="http://www.cisco.com/univercd/cc/td/doc/product/software/ios123/123cgcr/vvfax_c/callc_c/h323_c/ipipgw/overvw.htm">Cisco Multiservice IP-to-IP Gateway.</a><br><br>
This is a work based on <a href="http://www.gnugk.org">GNUGK project</a>.
</font>

<br><br><br>
<font size="3"><b><li><p align="left"><a name="how">How does it work?</a></p></li></b></font>
The IP-IP Gateway need to register with both H323 zone as a Gaterway, with proper prefixes.<br>
When it successfully registered with both GKs, it is ready to carry calls between. Here is a call signalling flow:<br><br>
<p><img src="IP-IP-Gateway.bmp"></p>
<font size="2">
1. Endpoint 1 requesting for a call to Endpoint 2 by initiates a ARQ to Gatekeeper A;<br><br>
2. Gatekeeper A looks up the registration table and found the IP-IP Gateway has prefixes match the requesting destination, so it answered the Endpoint 1 with a ACF that has CallSignalAddress as the IP-IP Gateway.<br><br>
3. Endpoint 1 send SETUP to the IP-IP Gateway.<br>
4. On receiving a SETUP, the IP-IP Gateay requesting the Gatekeeper A for answering a call with a ARQ<br><br>
5. Gatekeeper B answered with ACF.<br><br>
6. Now we entered into zone of Gatekeeper B. The IP-IP Gateway send ARQ to Gatekeeper B to requesting call to Endpoint 2;<br><br>
7. Gatekeeper B looks up the registration and found Endpoint 2, and answered with a ACF, with CallSignalAddress of Endpoit 2;<br><br>
8. The IP-IP Gateway send SETUP to Endpoint 2;<br><br>
9. Endpoint 2 requesting Gatekeeper B for answering call with ARQ;<br><br>
10. Gatekeeper B answered with ACF;<br><br>
11. Endpoint 2 send CONNECT to the IP-IP Gateway;<br><br>
12. IP-IP Gateway hand over the CONNECT to Endpoint 1;<br><br>

Furtuer more, the IP-IP Gateway can proxy H245, RTP/RTCP between to endpoints, in case it is needed.

</font>

<br><br><br>
<font size="3"><b><li><p align="left"><a name="copyright">Is it free?</a></p></li></b></font>
<font size="2">This work follows the GPL, as GNUGK project does.</font>

<br><br><br>
<font size="3"><b><li><p align="left"><a name="download">Where can I got it?</a></p></li></b></font>
<font size="2">
<li>A windows executable file is <a href="programs/ipgw.rar">here</a></li>
<li>You may also need the <a href="programs/PTLibd.dll">PTLibd.dll</a> and <a href="programs/msvcr71d.dll"> msvcr71d.dll</a> and <a href="programs/msvcp71d.dll">msvcp71d.dll</a> to run it</li>
<li>A patch file for current GNUGK 2.2.0 source code to make it a IP-IP Gateway is <a href="programs/ipgw.diff">here</a> :-)</li>
<li>Or if you want the patch-applied one, down load the patched <a href="programs/ipgw.src.tar.gz">GnuGK-2.2.1</a></li>
<li>And <a href="programs/gatekeeper.ini">here</a> is a sample configuration file shows how to route calls between three H323 zone.</li>
</font>

<br><br><br>
<font size="3"><b><li><p align="left"><a name="questions">More questions?</a></p></li></b></font>
<font size="2">Send mail to: <a href="mailto:kubuqi#hotmail.com">kubuqi#hotmail.com</a></font>

</ul>
</body>

<?php
/*��ֻ����ʽ�򿪼������ļ�counter.txt����������������$num*/
$fp=fopen("counter.txt","r");
$num=fgets($fp,5);
fclose($fp);
/*������ֵ��1������ֵ����������ļ�*/
$num=$num+1;
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

</html>