function GetnNavigatorUserAgent()
{
	const explorer = navigator.userAgent;
	var Browser;
	// IE  判断浏览器是否支持ActiveX控件，如果浏览器支持ActiveX控件可以利用,
	//if (!!window.ActiveXObject || "ActiveXObject" in window) {
	//Browser = 'ie';
	//alert("当前浏览器为：IE");
	//}
	//IE  documentMode是一个IE的私有属性，在IE8+中被支持。
	if (window.document.documentMode) {
	  Browser = 'IE';
	  //alert("当前浏览器为：IE");
	}
	//firefox 
	else if (explorer.indexOf("Firefox") >= 0) {
	  Browser = 'Firefox';
	  //alert("当前浏览器为：Firefox");
	}
	//Chrome
	else if (explorer.indexOf("Chrome") >= 0) {
	  Browser = 'Chrome';
	  //alert("当前浏览器为：Chrome");
	}
	//Opera
	else if (explorer.indexOf("Opera") >= 0) {
	  Browser = 'Opera';
	  //alert("当前浏览器为：Opera");
	}
	//Safari
	else if (explorer.indexOf("Safari") >= 0) {
	  Browser = 'Safari';
	  //alert("当前浏览器为：Safari");
	}
	//Netscape
	else if (explorer.indexOf("Netscape") >= 0) {
	  Browser = 'Netscape';
	  //alert('当前浏览器为：Netscape');
	}
	return Browser;
}

function open_LSH()
{
	var Browser=GetnNavigatorUserAgent();
	if (Browser=="IE")
	{
		window.open("LSH.html","_blank");
	}
	else
	{
		window.open("LSH_chrome.html","_blank");
	}
}

function open_LSD()
{
	var Browser=GetnNavigatorUserAgent();
	if (Browser=="IE")
	{
		window.open("LSD.html","_blank");
	}
	else
	{
		window.open("LSD_chrome.html","_blank");
	}
}

function open_LRM()
{
	var Browser=GetnNavigatorUserAgent();
	if (Browser=="IE")
	{
		window.open("LRM.html","_blank");
	}
	else
	{
		window.open("LRM_chrome.html","_blank");
	}
}