//定义全局变量
var fs=0, L=0, Lh=0; //此为需求输出结果

//默认参数
var fH=1;
var fT=1;
var g=9.8;

//此部分为用户输入参数
var C=0, C0=0, MR=0, HK_L=0, HK_d=0;   //对于LRM C=C100B 单位 N N Nm   //滑块裸块的长和宽
var HK_LL=0, HK_dd=0;   //滑块含端盖和内回流长度 法兰型宽度 
var XL=""; //系列
var XH=""; //型号
var SYZT=1; //安装方式
var DGS=1, HKS=1;  //导轨数、滑块数
var V=0;  // m/s
var fw=1; 
var T1=0, T3=0;  // s
var Ls=0;  // mm
var n=0;
var Br=0, Bt=0; // mm
var Rs=0, Bs1=0, Bs2=0, Bs3=0; // mm
var FZnum=1;
var m1=0, Ga1=0, Gt1=0, Gr1=0;  // kg  mm
var m2=0, Ga2=0, Gt2=0, Gr2=0;
var rad=0; //角度
var YuYa=1; //预压等级 1无预压  2轻预压 3中预压
var C_1=0,C_2=0,C_3=0; // 1无预压  2轻预压 3中预压对应的系数

//定义计算用中间变量
var a1=0,a3=0;
var L1=0,L2=0,L3=0;

//定义负荷变量，以数组下标1-8代表1-8号，下标留着0不用
//_0等速 _1左加速 _2左减速 _3右加速 _4右减速
//径向
var PR_0=[0,0,0,0,0,0,0,0,0];
var PR_1=[0,0,0,0,0,0,0,0,0];
var PR_2=[0,0,0,0,0,0,0,0,0];
var PR_3=[0,0,0,0,0,0,0,0,0];
var PR_4=[0,0,0,0,0,0,0,0,0];

//横向
var PT_0=[0,0,0,0,0,0,0,0,0];
var PT_1=[0,0,0,0,0,0,0,0,0];
var PT_2=[0,0,0,0,0,0,0,0,0];
var PT_3=[0,0,0,0,0,0,0,0,0];
var PT_4=[0,0,0,0,0,0,0,0,0];

//等效
var PE_0=[0,0,0,0,0,0,0,0,0];
var PE_1=[0,0,0,0,0,0,0,0,0];
var PE_2=[0,0,0,0,0,0,0,0,0];
var PE_3=[0,0,0,0,0,0,0,0,0];
var PE_4=[0,0,0,0,0,0,0,0,0];

//平均
var Pm=[0,0,0,0,0,0,0,0,0];

var PE_max=0;
var Pm_max=0;


function PDdate()
{
	var x=new Date();
	x.setFullYear(2022,6,1); //2022年7月1日
	var today=new Date();
	if (today>x)
	{
		return false;
		
	}
	else
	{
		return true;
	}
}


function ToCalculation()
{
var IsOKrun=PDdate();
if(IsOKrun)
{
	SetCSH();
	GetUserInput();
	Set_a_L();
	
	var ISOK_ToCalculation;
	var strISOK;
    switch (DGS)
	{
	case 1:
		switch (HKS)
		{
		case 1:
		    ISOK_ToCalculation=(V==0)||(fw==0)||(Ls==0)||(n==0)||(m1==0);
			strISOK="下列数据不能为0或空白："+"\n"+"1、速度V"+"\n"+"2、负荷系数fw"+"\n"+"3、行程Ls"+"\n"+"4、每分钟的往复次数n"+"\n"+"5、质量m1";
			break;
		case 2:
		    ISOK_ToCalculation=(V==0)||(fw==0)||(Ls==0)||(n==0)||(m1==0)||(Bs1==0);
			strISOK="下列数据不能为0或空白："+"\n"+"1、速度V"+"\n"+"2、负荷系数fw"+"\n"+"3、行程Ls"+"\n"+"4、每分钟的往复次数n"+"\n"+"5、质量m1"+"\n"+"6、滑块跨距Bs1";
			break;
		case 3:
		    ISOK_ToCalculation=(V==0)||(fw==0)||(Ls==0)||(n==0)||(m1==0)||(Bs1==0)||(Bs2==0);
			strISOK="下列数据不能为0或空白："+"\n"+"1、速度V"+"\n"+"2、负荷系数fw"+"\n"+"3、行程Ls"+"\n"+"4、每分钟的往复次数n"+"\n"+"5、质量m1"+"\n"+"6、滑块跨距Bs1、Bs2";
			break;
		case 4:
		    ISOK_ToCalculation=(V==0)||(fw==0)||(Ls==0)||(n==0)||(m1==0)||(Bs1==0)||(Bs2==0)||(Bs3==0);
			strISOK="下列数据不能为0或空白："+"\n"+"1、速度V"+"\n"+"2、负荷系数fw"+"\n"+"3、行程Ls"+"\n"+"4、每分钟的往复次数n"+"\n"+"5、质量m1"+"\n"+"6、滑块跨距Bs1、Bs2、Bs3";
			break;
		}
	    break;
	case 2:
		switch (HKS)
		{
		case 2:
		    ISOK_ToCalculation=(V==0)||(fw==0)||(Ls==0)||(n==0)||(m1==0)||(Rs==0);
			strISOK="下列数据不能为0或空白："+"\n"+"1、速度V"+"\n"+"2、负荷系数fw"+"\n"+"3、行程Ls"+"\n"+"4、每分钟的往复次数n"+"\n"+"5、质量m1"+"\n"+"6、轨道跨距Rs";
			break;
		case 4:
		    ISOK_ToCalculation=(V==0)||(fw==0)||(Ls==0)||(n==0)||(m1==0)||(Rs==0)||(Bs1==0);
			strISOK="下列数据不能为0或空白："+"\n"+"1、速度V"+"\n"+"2、负荷系数fw"+"\n"+"3、行程Ls"+"\n"+"4、每分钟的往复次数n"+"\n"+"5、质量m1"+"\n"+"6、轨道跨距Rs  滑块跨距Bs1";
			break;
		case 6:
		    ISOK_ToCalculation=(V==0)||(fw==0)||(Ls==0)||(n==0)||(m1==0)||(Rs==0)||(Bs1==0)||(Bs2==0);
			strISOK="下列数据不能为0或空白："+"\n"+"1、速度V"+"\n"+"2、负荷系数fw"+"\n"+"3、行程Ls"+"\n"+"4、每分钟的往复次数n"+"\n"+"5、质量m1"+"\n"+"6、轨道跨距Rs  滑块跨距Bs1、Bs2";
			break;
		case 8:
		    ISOK_ToCalculation=(V==0)||(fw==0)||(Ls==0)||(n==0)||(m1==0)||(Rs==0)||(Bs1==0)||(Bs2==0)||(Bs3==0);
			strISOK="下列数据不能为0或空白："+"\n"+"1、速度V"+"\n"+"2、负荷系数fw"+"\n"+"3、行程Ls"+"\n"+"4、每分钟的往复次数n"+"\n"+"5、质量m1"+"\n"+"6、轨道跨距Rs  滑块跨距Bs1、Bs2、Bs3";
			break;
		}
	    break;
	}

	
	if (ISOK_ToCalculation) //一些不能为空的数据要填
	{
		window.alert(strISOK);
	}
	else
	{
		SetPR_PT();//取得PR  PT
		SetPE_max();
		SetPm_max();
		SetDGS1_HKS1_T0_G0(); //单轨单块，且不加速，负载位于滑块表面中心
		
		//Set_C_YuYa(); //根据预压修正C值 已改为修正Pm_max、PE_max
		Set_P_YuYa();  //根据预压修正Pm_max、PE_max值
		
		fs=C0/PE_max;		
		if ((XL=="LSH")||(XL=="LSD"))
		{
			L=Math.pow((fH*fT*C)/(fw*Pm_max),3)*50;
		}
		else
		{
			L=Math.pow((C)/(fw*Pm_max),3)*100;
		}
		Lh=L*1000/(2*Ls*0.001*n*60);
		
		//修正壁挂安装   已改为在SetPR_PT_3()修正
		//if (SYZT==3) 
		//{
		//	fs=fs/(Math.pow(0.5,1/3));
		//	L=L*2;
		//	Lh=Lh*2;
		//}
		
		SetJGTable(fs,L,Lh); //显示计算结果
	}
}
else
{
	window.alert("版本已到期，请联系亚德客获取新版。");
}
}

//初始化所有数据
function SetCSH()
{
	//全局变量
	fs=0; L=0; Lh=0; 

	//此部分为用户输入参数
	C=0; C0=0; MR=0; HK_L=0; HK_d=0;
    HK_LL=0; HK_dd=0;
	XL=""; 
	XH="";
	SYZT=1;
	DGS=1; HKS=1;
	V=0;
	fw=1; 
	T1=0; T3=0;
	Ls=0;
	n=0;
	Br=0; Bt=0;
	Rs=0; Bs1=0; Bs2=0; Bs3=0;
	FZnum=1;
	m1=0; Ga1=0; Gt1=0; Gr1=0;
	m2=0; Ga2=0; Gt2=0; Gr2=0;
	rad=0;
	YuYa=1;
	C_1=0;C_2=0;C_3=0;

	//定义计算用中间变量
	a1=0; a3=0;
	L1=0; L2=0; L3=0;

	//定义负荷变量，以数组下标1-8代表1-8号，下标留着0不用
	//_0等速 _1左加速 _2左减速 _3右加速 _4右减速
	//径向
	var i=0;
	for (i = 0; i < 9; i++) 
	{ 
        PR_0[i]=0;
        PR_1[i]=0;
        PR_2[i]=0;
        PR_3[i]=0;
        PR_4[i]=0;
		
        PT_0[i]=0;
        PT_1[i]=0;
        PT_2[i]=0;
        PT_3[i]=0;
        PT_4[i]=0;
		
        PE_0[i]=0;
        PE_1[i]=0;
        PE_2[i]=0;
        PE_3[i]=0;
        PE_4[i]=0;
		
        Pm[i]=0;
	}
	PE_max=0;
	Pm_max=0;

}

//取得C C0 XH MR
function GetLSH_C_C0_XH()
{
	switch(document.getElementById("ID_selectXH").value)
	{
		case "XH_LSH15N":
		    C=11.3;C0=17.9;MR=0.12;XH="LSH15N";HK_L=40;HK_d=34;HK_LL=60.2;HK_dd=47;C_1=0.015;C_2=0.061;C_3=0.159;break;
		case "XH_LSH20N":
		    C=18.6;C0=28.6;MR=0.27;XH="LSH20N";HK_L=52.1;HK_d=44;HK_LL=76.5;HK_dd=63;C_1=0.016;C_2=0.052;C_3=0.126;break;
		case "XH_LSH20L":
		    C=22.2;C0=37.6;MR=0.35;XH="LSH20L";HK_L=66.1;HK_d=44;HK_LL=90.5;HK_dd=63;C_1=0.016;C_2=0.052;C_3=0.126;break;
		case "XH_LSH25N":
		    C=26.9;C0=39.4;MR=0.44;XH="LSH25N";HK_L=58.3;HK_d=48;HK_LL=83.3;HK_dd=70;C_1=0.014;C_2=0.041;C_3=0.095;break;
		case "XH_LSH25L":
		    C=32.9;C0=53.0;MR=0.58;XH="LSH25L";HK_L=79.7;HK_d=48;HK_LL=104.7;HK_dd=70;C_1=0.014;C_2=0.041;C_3=0.095;break;
		case "XH_LSH30N":
		    C=37.4;C0=55.0;MR=0.66;XH="LSH30N";HK_L=70.5;HK_d=60;HK_LL=95.5;HK_dd=90;C_1=0.014;C_2=0.041;C_3=0.095;break;
		case "XH_LSH30L":
		    C=45.7;C0=73.1;MR=0.88;XH="LSH30L";HK_L=92.9;HK_d=60;HK_LL=117.9;HK_dd=90;C_1=0.014;C_2=0.041;C_3=0.095;break;
		case "XH_LSH35N":
		    C=50.8;C0=72.3;MR=1.05;XH="LSH35N";HK_L=79.8;HK_d=70;HK_LL=108.8;HK_dd=100;C_1=0.014;C_2=0.032;C_3=0.066;break;
		case "XH_LSH35L":
		    C=61.9;C0=96.1;MR=1.52;XH="LSH35L";HK_L=105.4;HK_d=70;HK_LL=134.4;HK_dd=100;C_1=0.014;C_2=0.032;C_3=0.066;break;
	}
	C=C*1000;
	C0=C0*1000;
	MR=MR*1000;
}

function GetLSD_C_C0_XH()
{
	switch(document.getElementById("ID_selectXH").value)
	{
		case "XH_LSD15S":
		    C=5.0;C0=9.5;MR=0.07;XH="LSD15S";HK_L=40.5;HK_d=34;HK_LL=40.5;HK_dd=52;C_1=0.021;C_2=0.081;C_3=0.212;break;
		case "XH_LSD15N":
		    C=8.9;C0=16.5;MR=0.12;XH="LSD15N";HK_L=57.2;HK_d=34;HK_LL=57.2;HK_dd=52;C_1=0.021;C_2=0.081;C_3=0.212;break;
		case "XH_LSD20S":
		    C=7.2;C0=13.5;MR=0.13;XH="LSD20S";HK_L=45.8;HK_d=42;HK_LL=45.8;HK_dd=59;C_1=0.024;C_2=0.079;C_3=0.193;break;
		case "XH_LSD20N":
		    C=12.1;C0=22.4;MR=0.20;XH="LSD20N";HK_L=64.9;HK_d=42;HK_LL=64.9;HK_dd=59;C_1=0.024;C_2=0.079;C_3=0.193;break;
		case "XH_LSD25S":
		    C=11.5;C0=20.8;MR=0.22;XH="LSD25S";HK_L=59;HK_d=48;HK_LL=59;HK_dd=73;C_1=0.022;C_2=0.063;C_3=0.146;break;
		case "XH_LSD25N":
		    C=19.3;C0=34.7;MR=0.36;XH="LSD25N";HK_L=83;HK_d=48;HK_LL=83;HK_dd=73;C_1=0.022;C_2=0.063;C_3=0.146;break;
		case "XH_LSD30S":
		    C=19.8;C0=30.0;MR=0.38;XH="LSD30S";HK_L=68.4;HK_d=60;HK_LL=68.4;HK_dd=90;C_1=0.020;C_2=0.049;C_3=0.108;break;
		case "XH_LSD30N":
		    C=28.3;C0=50.3;MR=0.65;XH="LSD30N";HK_L=97;HK_d=60;HK_LL=97;HK_dd=90;C_1=0.020;C_2=0.049;C_3=0.108;break;
		case "XH_LSD35S":
		    C=29.2;C0=40.7;MR=0.66;XH="LSD35S";HK_L=73.3;HK_d=70;HK_LL=73.3;HK_dd=100;C_1=0.020;C_2=0.049;C_3=0.108;break;
		case "XH_LSD35N":
		    C=42.7;C0=70.2;MR=1.02;XH="LSD35N";HK_L=106.4;HK_d=70;HK_LL=106.4;HK_dd=100;C_1=0.020;C_2=0.049;C_3=0.108;break;
	}
	C=C*1000;
	C0=C0*1000;
	MR=MR*1000;
}

function GetLRM_C_C0_XH()
{
	switch(document.getElementById("ID_selectXH").value)
	{
		case "XH_LRM5N":
		    C=0.33;C0=0.55;MR=1.68;XH="LRM5N";HK_L=10;HK_d=12;HK_LL=18.2;HK_dd=12;C_1=0;C_2=0;C_3=0;break;
		case "XH_LRM5L":
		    C=0.48;C0=0.9;MR=2.4;XH="LRM5L";HK_L=13;HK_d=12;HK_LL=21.2;HK_dd=12;C_1=0;C_2=0;C_3=0;break;
		case "XH_LRM7N":
		    C=1.02;C0=1.53;MR=5.42;XH="LRM7N";HK_L=13.5;HK_d=17;HK_LL=24.3;HK_dd=17;C_1=0;C_2=0;C_3=0;break;
		case "XH_LRM7L":
		    C=1.43;C0=2.45;MR=9.27;XH="LRM7L";HK_L=21.7;HK_d=17;HK_LL=32.5;HK_dd=17;C_1=0;C_2=0;C_3=0;break;
		case "XH_LRM9N":
		    C=1.97;C0=2.6;MR=11.84;XH="LRM9N";HK_L=18.9;HK_d=20;HK_LL=31;HK_dd=20;C_1=0;C_2=0;C_3=0;break;
		case "XH_LRM9L":
		    C=2.61;C0=4.11;MR=19.73;XH="LRM9L";HK_L=30;HK_d=20;HK_LL=42.1;HK_dd=20;C_1=0;C_2=0;C_3=0;break;
		case "XH_LRM12N":
		    C=3.04;C0=3.86;MR=23.63;XH="LRM12N";HK_L=21.7;HK_d=27;HK_LL=37.6;HK_dd=27;C_1=0;C_2=0;C_3=0;break;
		case "XH_LRM12L":
		    C=3.96;C0=5.9;MR=40.96;XH="LRM12L";HK_L=32.5;HK_d=27;HK_LL=48.4;HK_dd=27;C_1=0;C_2=0;C_3=0;break;
		case "XH_LRM15N":
		    C=4.27;C0=5.7;MR=45.05;XH="LRM15N";HK_L=28;HK_d=32;HK_LL=48;HK_dd=32;C_1=0;C_2=0;C_3=0;break;
		case "XH_LRM15L":
		    C=6.53;C0=9.53;MR=70.08;XH="LRM15L";HK_L=45;HK_d=32;HK_LL=65;HK_dd=32;C_1=0;C_2=0;C_3=0;break;
	}
	C=C*1000;
	C0=C0*1000;
}

//取得用户输入参数
function GetUserInput()
{
	//取得 XL XH C C0 
	var strXH = document.getElementById("ID_selectXH").value;
	switch (strXH.slice(3,6))
	{
		case "LSH":
			GetLSH_C_C0_XH();XL="LSH";break;
		case "LSD":
			GetLSD_C_C0_XH();XL="LSD";break;
		case "LRM":
			GetLRM_C_C0_XH();XL="LRM";break;
	}
	
	//取得安装方式
	switch (document.getElementById("ID_selectSYZT").value)
	{
		case "SYZT_1":
			SYZT=1;break;
		case "SYZT_2":
			SYZT=2;break;
		case "SYZT_3":
			SYZT=3;break;
		case "SYZT_4":
			SYZT=4;break;
		case "SYZT_5":
			SYZT=5;break;
	}
	//取得导轨数、滑块数
	switch (document.getElementById("ID_selectDGSandHKS").value)
	{
		case "DGSandHKS_11":
			DGS=1; HKS=1;break;
		case "DGSandHKS_12":
			DGS=1; HKS=2;break;
		case "DGSandHKS_13":
			DGS=1; HKS=3;break;
		case "DGSandHKS_14":
			DGS=1; HKS=4;break;
		case "DGSandHKS_21":
			DGS=2; HKS=2;break;
		case "DGSandHKS_22":
			DGS=2; HKS=4;break;
		case "DGSandHKS_23":
			DGS=2; HKS=6;break;
		case "DGSandHKS_24":
			DGS=2; HKS=8;break;
	}
	
	//取得角度
	rad=Number(document.getElementById("ID_text_rad").value);
	
	//取得速度条件
	V=Number(document.getElementById("ID_text_V").value);
	fw=Number(document.getElementById("ID_text_fw").value);
	T1=Number(document.getElementById("ID_text_T1").value);
	T3=Number(document.getElementById("ID_text_T3").value);
	Ls=Number(document.getElementById("ID_text_Ls").value);
	n=Number(document.getElementById("ID_text_n").value);
	//取得使用条件
	Br=Number(document.getElementById("ID_text_Br").value);
	Bt=Number(document.getElementById("ID_text_Bt").value);
	Rs=Number(document.getElementById("ID_text_Rs").value);
	Bs1=Number(document.getElementById("ID_text_Bs1").value);
	Bs2=Number(document.getElementById("ID_text_Bs2").value);
	Bs3=Number(document.getElementById("ID_text_Bs3").value);
	//根据导轨数、滑块数 置零不用的使用条件
	switch (document.getElementById("ID_selectDGSandHKS").value)
	{
		case "DGSandHKS_11":
			Rs=0;Bs1=0;Bs2=0;Bs3=0;break;
		case "DGSandHKS_12":
			Rs=0;Bs2=0;Bs3=0;break;
		case "DGSandHKS_13":
			Rs=0;Bs3=0;break;
		case "DGSandHKS_14":
			Rs=0;break;
		case "DGSandHKS_21":
			Bs1=0;Bs2=0;Bs3=0;break;
		case "DGSandHKS_22":
			Bs2=0;Bs3=0;break;
		case "DGSandHKS_23":
			Bs3=0;break;
		case "DGSandHKS_24":
			break;
	}
	//取得负载条件
	switch (document.getElementById("ID_selectFZnum").value)
	{
		case "FZnum_1":
		    FZnum=1;
			m1=Number(document.getElementById("ID_text_m1").value);
			Ga1=Number(document.getElementById("ID_text_Ga1").value);
			Gt1=Number(document.getElementById("ID_text_Gt1").value);
			Gr1=Number(document.getElementById("ID_text_Gr1").value);
			m2=0;
			Ga2=0;
			Gt2=0;
			Gr2=0;
			break;
		case "FZnum_2":
		    FZnum=2;
			m1=Number(document.getElementById("ID_text_m1").value);
			Ga1=Number(document.getElementById("ID_text_Ga1").value);
			Gt1=Number(document.getElementById("ID_text_Gt1").value);
			Gr1=Number(document.getElementById("ID_text_Gr1").value);
			m2=Number(document.getElementById("ID_text_m2").value);
			Ga2=Number(document.getElementById("ID_text_Ga2").value);
			Gt2=Number(document.getElementById("ID_text_Gt2").value);
			Gr2=Number(document.getElementById("ID_text_Gr2").value);
			break;
	}
	//取得预压等级
	switch (document.getElementById("ID_selectYuYa").value)
	{
		case "YuYa_1":
            YuYa=1;
			break;
		case "YuYa_2":
            YuYa=2;
			break;
		case "YuYa_3":
            YuYa=3;
			break;
		case "YuYa_0":
            YuYa=0;
			break;
	}
}

function GetHKXS() //取得滑块形式，返回1:四方型   返回2:法兰型
{
	switch (document.getElementById("ID_selectHKXS").value)
	{
		case "HKXS_1":
            return 1;
			break;
		case "HKXS_2":
            return 2;
			break;
	}
}

//设置加速度和位移,必须初始化V T1 T2后使用
function Set_a_L()
{
	if(T1!=0)
	{
		a1=V/T1;
		L1=0.5*V*T1*1000;
	}
	else
	{
		a1=0;
		L1=0;
	}
	
	if(T3!=0)
	{
		a3=V/T3;
		L3=0.5*V*T3*1000;
    }else
	{
		a3=0;
		L3=0;
	}
	L2=Ls-L1-L3;
}

//计算平均负荷
function GetPm(CPE_0,CPE_1,CPE_2,CPE_3,CPE_4)
{
	var cls=0;
	cls=2*Math.pow(CPE_0,3)*L2; //2倍 等速
	
	cls=cls+Math.pow(CPE_1,3)*L1; //左加
	cls=cls+Math.pow(CPE_2,3)*L3; //左减
	cls=cls+Math.pow(CPE_3,3)*L1; //右加
	cls=cls+Math.pow(CPE_4,3)*L3; //右减
	cls=cls/(2*Ls);
	return Math.pow(cls,1/3);
}

//取得 PR PT
//按安装方式分别设置
function SetPR_PT()
{
	switch(SYZT)
	{
		case 1:
		    SetPR_PT_1();break;
		case 2:
		    SetPR_PT_2();break;
		case 3:
		    SetPR_PT_3();break;
		case 4:
		    SetPR_PT_4();break;
		case 5:
		    SetPR_PT_5();break;
	}
}

function SetPR_PT_1()
{
	var l1=0,l2=0;
	var l3=0,l4=0,l6=0; //m1用
	var l7=0,l8=0,l5=0; //m2用
	l1=Bs1+Bs2+Bs3;
	l2=Rs;
	if(l1==0){l1=HK_L/2;}
	if(l2==0){l2=HK_d/2;}
	
	l3=Ga1-0.5*l1;
	l4=Bt-Gt1;
	l6=Br+Gr1;
	
	l7=Ga2-0.5*l1;
	l8=Bt-Gt2;
	l5=Br+Gr2;
	
	//等速时
	PR_0[1]=m1*g/HKS-m1*g*l3/(2*l1)+m1*g*l4/(2*l2)+m2*g/HKS-m2*g*l7/(2*l1)+m2*g*l8/(2*l2);
	PR_0[2]=m1*g/HKS+m1*g*l3/(2*l1)+m1*g*l4/(2*l2)+m2*g/HKS+m2*g*l7/(2*l1)+m2*g*l8/(2*l2);
	PR_0[3]=m1*g/HKS+m1*g*l3/(2*l1)-m1*g*l4/(2*l2)+m2*g/HKS+m2*g*l7/(2*l1)-m2*g*l8/(2*l2);
	PR_0[4]=m1*g/HKS-m1*g*l3/(2*l1)-m1*g*l4/(2*l2)+m2*g/HKS-m2*g*l7/(2*l1)-m2*g*l8/(2*l2);
	PT_0[1]=0;
	PT_0[2]=0;
	PT_0[3]=0;
	PT_0[4]=0;
	
	//左加速
	PR_1[1]=PR_0[1]-m1*a1*l6/(2*l1)-m2*a1*l5/(2*l1);
	PR_1[2]=PR_0[2]+m1*a1*l6/(2*l1)+m2*a1*l5/(2*l1);
	PR_1[3]=PR_0[3]+m1*a1*l6/(2*l1)+m2*a1*l5/(2*l1);
	PR_1[4]=PR_0[4]-m1*a1*l6/(2*l1)-m2*a1*l5/(2*l1);
	PT_1[1]=0-m1*a1*l4/(2*l1)-m2*a1*l8/(2*l1);
	PT_1[2]=0+m1*a1*l4/(2*l1)+m2*a1*l8/(2*l1);
	PT_1[3]=0+m1*a1*l4/(2*l1)+m2*a1*l8/(2*l1);
	PT_1[4]=0-m1*a1*l4/(2*l1)-m2*a1*l8/(2*l1);
	
	//左减速
	PR_2[1]=PR_0[1]+m1*a3*l6/(2*l1)+m2*a3*l5/(2*l1);
	PR_2[2]=PR_0[2]-m1*a3*l6/(2*l1)-m2*a3*l5/(2*l1);
	PR_2[3]=PR_0[3]-m1*a3*l6/(2*l1)-m2*a3*l5/(2*l1);
	PR_2[4]=PR_0[4]+m1*a3*l6/(2*l1)+m2*a3*l5/(2*l1);
	PT_2[1]=0+m1*a3*l4/(2*l1)+m2*a3*l8/(2*l1);
	PT_2[2]=0-m1*a3*l4/(2*l1)-m2*a3*l8/(2*l1);
	PT_2[3]=0-m1*a3*l4/(2*l1)-m2*a3*l8/(2*l1);
	PT_2[4]=0+m1*a3*l4/(2*l1)+m2*a3*l8/(2*l1);

	//右加速
	PR_3[1]=PR_0[1]+m1*a1*l6/(2*l1)+m2*a1*l5/(2*l1);
	PR_3[2]=PR_0[2]-m1*a1*l6/(2*l1)-m2*a1*l5/(2*l1);
	PR_3[3]=PR_0[3]-m1*a1*l6/(2*l1)-m2*a1*l5/(2*l1);
	PR_3[4]=PR_0[4]+m1*a1*l6/(2*l1)+m2*a1*l5/(2*l1);
	PT_3[1]=0+m1*a1*l4/(2*l1)+m2*a1*l8/(2*l1);
	PT_3[2]=0-m1*a1*l4/(2*l1)-m2*a1*l8/(2*l1);
	PT_3[3]=0-m1*a1*l4/(2*l1)-m2*a1*l8/(2*l1);
	PT_3[4]=0+m1*a1*l4/(2*l1)+m2*a1*l8/(2*l1);
	
	//右减速
	PR_4[1]=PR_0[1]-m1*a3*l6/(2*l1)-m2*a3*l5/(2*l1);
	PR_4[2]=PR_0[2]+m1*a3*l6/(2*l1)+m2*a3*l5/(2*l1);
	PR_4[3]=PR_0[3]+m1*a3*l6/(2*l1)+m2*a3*l5/(2*l1);
	PR_4[4]=PR_0[4]-m1*a3*l6/(2*l1)-m2*a3*l5/(2*l1);
	PT_4[1]=0-m1*a3*l4/(2*l1)-m2*a3*l8/(2*l1);
	PT_4[2]=0+m1*a3*l4/(2*l1)+m2*a3*l8/(2*l1);
	PT_4[3]=0+m1*a3*l4/(2*l1)+m2*a3*l8/(2*l1);
	PT_4[4]=0-m1*a3*l4/(2*l1)-m2*a3*l8/(2*l1);
}

function SetPR_PT_2()
{
	var l1=0,l2=0;
	var l3=0,l4=0; //m1用
	var l7=0,l8=0; //m2用
	l1=Bs1+Bs2+Bs3;
	l2=Rs;
	if(l1==0){l1=HK_L/2;}
	if(l2==0){l2=HK_d/2;}
	
	l3=Br+Gr1;
	l4=Gt1-Bt;
	
	l7=Br+Gr2;
	l8=Gt2-Bt;
	
	//等速时
	PR_0[1]=m1*g*l3/(2*l1)+m2*g*l7/(2*l1);
	PR_0[2]=m1*g*l3/(2*l1)+m2*g*l7/(2*l1);
	PR_0[3]=m1*g*l3/(2*l1)+m2*g*l7/(2*l1);
	PR_0[4]=m1*g*l3/(2*l1)+m2*g*l7/(2*l1);
	PT_0[1]=m1*g*l4/(2*l1)+m2*g*l8/(2*l1);
	PT_0[2]=m1*g*l4/(2*l1)+m2*g*l8/(2*l1);
	PT_0[3]=m1*g*l4/(2*l1)+m2*g*l8/(2*l1);
	PT_0[4]=m1*g*l4/(2*l1)+m2*g*l8/(2*l1);
	
	//左加速
	PR_1[1]=m1*(g+a1)*l3/(2*l1)+m2*(g+a1)*l7/(2*l1);
	PR_1[2]=m1*(g+a1)*l3/(2*l1)+m2*(g+a1)*l7/(2*l1);
	PR_1[3]=m1*(g+a1)*l3/(2*l1)+m2*(g+a1)*l7/(2*l1);
	PR_1[4]=m1*(g+a1)*l3/(2*l1)+m2*(g+a1)*l7/(2*l1);
	PT_1[1]=m1*(g+a1)*l4/(2*l1)+m2*(g+a1)*l8/(2*l1);
	PT_1[2]=m1*(g+a1)*l4/(2*l1)+m2*(g+a1)*l8/(2*l1);
	PT_1[3]=m1*(g+a1)*l4/(2*l1)+m2*(g+a1)*l8/(2*l1);
	PT_1[4]=m1*(g+a1)*l4/(2*l1)+m2*(g+a1)*l8/(2*l1);
	
	//左减速
	PR_2[1]=m1*(g-a3)*l3/(2*l1)+m2*(g-a3)*l7/(2*l1);
	PR_2[2]=m1*(g-a3)*l3/(2*l1)+m2*(g-a3)*l7/(2*l1);
	PR_2[3]=m1*(g-a3)*l3/(2*l1)+m2*(g-a3)*l7/(2*l1);
	PR_2[4]=m1*(g-a3)*l3/(2*l1)+m2*(g-a3)*l7/(2*l1);
	PT_2[1]=m1*(g-a3)*l4/(2*l1)+m2*(g-a3)*l8/(2*l1);
	PT_2[2]=m1*(g-a3)*l4/(2*l1)+m2*(g-a3)*l8/(2*l1);
	PT_2[3]=m1*(g-a3)*l4/(2*l1)+m2*(g-a3)*l8/(2*l1);
	PT_2[4]=m1*(g-a3)*l4/(2*l1)+m2*(g-a3)*l8/(2*l1);

	//右加速
	PR_3[1]=0-m1*(g+a1)*l3/(2*l1)+m2*(g+a1)*l7/(2*l1);
	PR_3[2]=0-m1*(g+a1)*l3/(2*l1)+m2*(g+a1)*l7/(2*l1);
	PR_3[3]=0-m1*(g+a1)*l3/(2*l1)+m2*(g+a1)*l7/(2*l1);
	PR_3[4]=0-m1*(g+a1)*l3/(2*l1)+m2*(g+a1)*l7/(2*l1);
	PT_3[1]=0-m1*(g+a1)*l4/(2*l1)+m2*(g+a1)*l8/(2*l1);
	PT_3[2]=0-m1*(g+a1)*l4/(2*l1)+m2*(g+a1)*l8/(2*l1);
	PT_3[3]=0-m1*(g+a1)*l4/(2*l1)+m2*(g+a1)*l8/(2*l1);
	PT_3[4]=0-m1*(g+a1)*l4/(2*l1)+m2*(g+a1)*l8/(2*l1);
	
	//右减速
	PR_4[1]=0-m1*(g-a3)*l3/(2*l1)+m2*(g-a3)*l7/(2*l1);
	PR_4[2]=0-m1*(g-a3)*l3/(2*l1)+m2*(g-a3)*l7/(2*l1);
	PR_4[3]=0-m1*(g-a3)*l3/(2*l1)+m2*(g-a3)*l7/(2*l1);
	PR_4[4]=0-m1*(g-a3)*l3/(2*l1)+m2*(g-a3)*l7/(2*l1);
	PT_4[1]=0-m1*(g-a3)*l4/(2*l1)+m2*(g-a3)*l8/(2*l1);
	PT_4[2]=0-m1*(g-a3)*l4/(2*l1)+m2*(g-a3)*l8/(2*l1);
	PT_4[3]=0-m1*(g-a3)*l4/(2*l1)+m2*(g-a3)*l8/(2*l1);
	PT_4[4]=0-m1*(g-a3)*l4/(2*l1)+m2*(g-a3)*l8/(2*l1);
}

function SetPR_PT_3()
{
	var l1=0,l2=0;
	var l3=0,l4=0; //m1用
	var l7=0,l8=0; //m2用
	l1=Bs1+Bs2+Bs3;
	l2=Rs;
	if(l1==0){l1=HK_L/2;}
	if(l2==0){l2=HK_d/2;}
	
	l4=Br+Gr1;
	l3=0.5*l1-Ga1;
	
	l8=Br+Gr2;
	l7=0.5*l1-Ga2;
	
	//等速时
	PR_0[1]=m1*g*l4/(2*l2)+m2*g*l8/(2*l2);
	PR_0[2]=m1*g*l4/(2*l2)+m2*g*l8/(2*l2);
	PR_0[3]=m1*g*l4/(2*l2)+m2*g*l8/(2*l2);
	PR_0[4]=m1*g*l4/(2*l2)+m2*g*l8/(2*l2);
	PT_0[1]=m1*g/HKS+m1*g*l3/(2*l1)+m2*g/HKS+m2*g*l7/(2*l1);
	PT_0[2]=m1*g/HKS-m1*g*l3/(2*l1)+m2*g/HKS-m2*g*l7/(2*l1);
	PT_0[3]=m1*g/HKS-m1*g*l3/(2*l1)+m2*g/HKS-m2*g*l7/(2*l1);
	PT_0[4]=m1*g/HKS+m1*g*l3/(2*l1)+m2*g/HKS+m2*g*l7/(2*l1);
	
	//左加速
	PR_1[1]=PR_0[1];
	PR_1[2]=PR_0[2];
	PR_1[3]=PR_0[3];
	PR_1[4]=PR_0[4];
	PT_1[1]=PT_1[1]-m1*a1*l4/(2*l1)-m2*a1*l8/(2*l1);
	PT_1[2]=PT_1[2]+m1*a1*l4/(2*l1)+m2*a1*l8/(2*l1);
	PT_1[3]=PT_1[3]+m1*a1*l4/(2*l1)+m2*a1*l8/(2*l1);
	PT_1[4]=PT_1[4]-m1*a1*l4/(2*l1)-m2*a1*l8/(2*l1);
	
	//左减速
	PR_2[1]=PR_0[1];
	PR_2[2]=PR_0[2];
	PR_2[3]=PR_0[3];
	PR_2[4]=PR_0[4];
	PT_2[1]=PT_1[1]+m1*a3*l4/(2*l1)+m2*a3*l8/(2*l1);
	PT_2[2]=PT_1[2]-m1*a3*l4/(2*l1)-m2*a3*l8/(2*l1);
	PT_2[3]=PT_1[3]-m1*a3*l4/(2*l1)-m2*a3*l8/(2*l1);
	PT_2[4]=PT_1[4]+m1*a3*l4/(2*l1)+m2*a3*l8/(2*l1);

	//右加速
	PR_3[1]=PR_0[1];
	PR_3[2]=PR_0[2];
	PR_3[3]=PR_0[3];
	PR_3[4]=PR_0[4];
	PT_3[1]=PT_1[1]+m1*a1*l4/(2*l1)+m2*a1*l8/(2*l1);
	PT_3[2]=PT_1[2]-m1*a1*l4/(2*l1)-m2*a1*l8/(2*l1);
	PT_3[3]=PT_1[3]-m1*a1*l4/(2*l1)-m2*a1*l8/(2*l1);
	PT_3[4]=PT_1[4]+m1*a1*l4/(2*l1)+m2*a1*l8/(2*l1);
	
	//右减速
	PR_4[1]=PR_0[1];
	PR_4[2]=PR_0[2];
	PR_4[3]=PR_0[3];
	PR_4[4]=PR_0[4];
	PT_4[1]=PT_1[1]-m1*a3*l4/(2*l1)-m2*a3*l8/(2*l1);
	PT_4[2]=PT_1[2]+m1*a3*l4/(2*l1)+m2*a3*l8/(2*l1);
	PT_4[3]=PT_1[3]+m1*a3*l4/(2*l1)+m2*a3*l8/(2*l1);
	PT_4[4]=PT_1[4]-m1*a3*l4/(2*l1)-m2*a3*l8/(2*l1);
	
	//修正壁挂安装
	var i=0;
	var j=0;
	j=Math.pow(0.5,1/3);
	for (i = 0; i < 9; i++) 
	{ 
        PR_0[i]=PR_0[i]*j;
		PR_1[i]=PR_1[i]*j;
		PR_2[i]=PR_2[i]*j;
		PR_3[i]=PR_3[i]*j;
		PR_4[i]=PR_4[i]*j;
        PT_0[i]=PT_0[i]*j;
		PT_1[i]=PT_1[i]*j;
		PT_2[i]=PT_2[i]*j;
		PT_3[i]=PT_3[i]*j;
		PT_4[i]=PT_4[i]*j;
	}
}

function SetPR_PT_4()   //水平cos 壁挂sin
{
	var sinrad=0;
	var cosrad=0;
	sinrad=Math.sin(Math.PI*rad/180);
	cosrad=Math.cos(Math.PI*rad/180);
	//用于临时存储
	var ls_PR_0=[0,0,0,0,0,0,0,0,0];
	var ls_PR_1=[0,0,0,0,0,0,0,0,0];
	var ls_PR_2=[0,0,0,0,0,0,0,0,0];
	var ls_PR_3=[0,0,0,0,0,0,0,0,0];
	var ls_PR_4=[0,0,0,0,0,0,0,0,0];
	var ls_PT_0=[0,0,0,0,0,0,0,0,0];
	var ls_PT_1=[0,0,0,0,0,0,0,0,0];
	var ls_PT_2=[0,0,0,0,0,0,0,0,0];
	var ls_PT_3=[0,0,0,0,0,0,0,0,0];
	var ls_PT_4=[0,0,0,0,0,0,0,0,0];
	
	SetPR_PT_1(); //取得水平安装结果，并以cos值临时存储
	var i=0;
	for (i = 0; i < 9; i++) 
	{ 
        ls_PR_0[i]=PR_0[i]*cosrad;
		ls_PR_1[i]=PR_1[i]*cosrad;
		ls_PR_2[i]=PR_2[i]*cosrad;
		ls_PR_3[i]=PR_3[i]*cosrad;
		ls_PR_4[i]=PR_4[i]*cosrad;
        ls_PT_0[i]=PT_0[i]*cosrad;
		ls_PT_1[i]=PT_1[i]*cosrad;
		ls_PT_2[i]=PT_2[i]*cosrad;
		ls_PT_3[i]=PT_3[i]*cosrad;
		ls_PT_4[i]=PT_4[i]*cosrad;
	}
	
	SetPR_PT_3(); //取得壁挂安装结果，并以sin值+前面临时存储之和作为最终结果
	for (i = 0; i < 9; i++) 
	{ 
        PR_0[i]=PR_0[i]*sinrad+ls_PR_0[i];
		PR_1[i]=PR_1[i]*sinrad+ls_PR_1[i];
		PR_2[i]=PR_2[i]*sinrad+ls_PR_2[i];
		PR_3[i]=PR_3[i]*sinrad+ls_PR_3[i];
		PR_4[i]=PR_4[i]*sinrad+ls_PR_4[i];
        PT_0[i]=PT_0[i]*sinrad+ls_PT_0[i];
		PT_1[i]=PT_1[i]*sinrad+ls_PT_1[i];
		PT_2[i]=PT_2[i]*sinrad+ls_PT_2[i];
		PT_3[i]=PT_3[i]*sinrad+ls_PT_3[i];
		PT_4[i]=PT_4[i]*sinrad+ls_PT_4[i];
	}
}

function SetPR_PT_5()   //水平cos 垂直sin
{
	var sinrad=0;
	var cosrad=0;
	sinrad=Math.sin(Math.PI*rad/180);
	cosrad=Math.cos(Math.PI*rad/180);
	//用于临时存储
	var ls_PR_0=[0,0,0,0,0,0,0,0,0];
	var ls_PR_1=[0,0,0,0,0,0,0,0,0];
	var ls_PR_2=[0,0,0,0,0,0,0,0,0];
	var ls_PR_3=[0,0,0,0,0,0,0,0,0];
	var ls_PR_4=[0,0,0,0,0,0,0,0,0];
	var ls_PT_0=[0,0,0,0,0,0,0,0,0];
	var ls_PT_1=[0,0,0,0,0,0,0,0,0];
	var ls_PT_2=[0,0,0,0,0,0,0,0,0];
	var ls_PT_3=[0,0,0,0,0,0,0,0,0];
	var ls_PT_4=[0,0,0,0,0,0,0,0,0];
	
	SetPR_PT_1(); //取得水平安装结果，并以cos值临时存储
	var i=0;
	for (i = 0; i < 9; i++) 
	{ 
        ls_PR_0[i]=PR_0[i]*cosrad;
		ls_PR_1[i]=PR_1[i]*cosrad;
		ls_PR_2[i]=PR_2[i]*cosrad;
		ls_PR_3[i]=PR_3[i]*cosrad;
		ls_PR_4[i]=PR_4[i]*cosrad;
        ls_PT_0[i]=PT_0[i]*cosrad;
		ls_PT_1[i]=PT_1[i]*cosrad;
		ls_PT_2[i]=PT_2[i]*cosrad;
		ls_PT_3[i]=PT_3[i]*cosrad;
		ls_PT_4[i]=PT_4[i]*cosrad;
	}
	
	SetPR_PT_2(); //取得垂直安装结果，并以sin值+前面临时存储之和作为最终结果
	for (i = 0; i < 9; i++) 
	{ 
        PR_0[i]=PR_0[i]*sinrad+ls_PR_0[i];
		PR_1[i]=PR_1[i]*sinrad+ls_PR_1[i];
		PR_2[i]=PR_2[i]*sinrad+ls_PR_2[i];
		PR_3[i]=PR_3[i]*sinrad+ls_PR_3[i];
		PR_4[i]=PR_4[i]*sinrad+ls_PR_4[i];
        PT_0[i]=PT_0[i]*sinrad+ls_PT_0[i];
		PT_1[i]=PT_1[i]*sinrad+ls_PT_1[i];
		PT_2[i]=PT_2[i]*sinrad+ls_PT_2[i];
		PT_3[i]=PT_3[i]*sinrad+ls_PT_3[i];
		PT_4[i]=PT_4[i]*sinrad+ls_PT_4[i];
	}
}
//取得最大值PE_max
function SetPE_max()
{
	var i=0;
	for (i = 0; i < 9; i++) 
	{ 
        PE_0[i]=Math.abs(PR_0[i])+Math.abs(PT_0[i]);
        PE_1[i]=Math.abs(PR_1[i])+Math.abs(PT_1[i]);
        PE_2[i]=Math.abs(PR_2[i])+Math.abs(PT_2[i]);
        PE_3[i]=Math.abs(PR_3[i])+Math.abs(PT_3[i]);
        PE_4[i]=Math.abs(PR_4[i])+Math.abs(PT_4[i]);
	}
	PE_max=Math.max(PE_0[1],PE_0[2],PE_0[3],PE_0[4],PE_0[5],PE_0[6],PE_0[7],PE_0[8]);
	PE_max=Math.max(PE_max,PE_1[1],PE_1[2],PE_1[3],PE_1[4],PE_1[5],PE_1[6],PE_1[7],PE_1[8]);
	PE_max=Math.max(PE_max,PE_2[1],PE_2[2],PE_2[3],PE_2[4],PE_2[5],PE_2[6],PE_2[7],PE_2[8]);
	PE_max=Math.max(PE_max,PE_3[1],PE_3[2],PE_3[3],PE_3[4],PE_3[5],PE_3[6],PE_3[7],PE_3[8]);
	PE_max=Math.max(PE_max,PE_4[1],PE_4[2],PE_4[3],PE_4[4],PE_4[5],PE_4[6],PE_4[7],PE_4[8]);
}

//取得最大值Pm_max
function SetPm_max()
{
	var i=0;
	for (i = 0; i < 9; i++) 
	{ 
        Pm[i]=GetPm(PE_0[i],PE_1[i],PE_2[i],PE_3[i],PE_4[i]);
	}
	Pm_max=Math.max(Pm[1],Pm[2],Pm[3],Pm[4],Pm[5],Pm[6],Pm[7],Pm[8]);
}

function SetDGS1_HKS1_T0_G0() //单轨单块，且不加速，负载位于滑块表面中心
{
	if ((SYZT==1)&&(DGS==1)&&(HKS==1)&&(T1==0)&&(T3==0)&&(Br==0)&&(Bt==0)&&(Ga1==0)&&(Gt1==0)&&(Gr1==0)&&(Ga2==0)&&(Gt2==0)&&(Gr2==0))
	{
		PE_max=m1*10+m2*10;
		Pm_max=PE_max;
	}
}
function Set_P_YuYa()  //根据预压修正Pm_max、PE_max值,如果YuYa=0,即不考虑预压，Pm_max、PE_max不修正 
{
	switch(YuYa)
	{
		case 1:
		    Pm_max=Pm_max+C*C_1;
			PE_max=PE_max+C*C_1;
			break;
		case 2:
		    Pm_max=Pm_max+C*C_2;
			PE_max=PE_max+C*C_2;
			break;
		case 3:
		    Pm_max=Pm_max+C*C_3;
			PE_max=PE_max+C*C_3;
			break;
	}
}

function Set_C_YuYa() //根据预压修正C值,如果YuYa=0,即不考虑预压，C不修正  //已改为修正Pm_max、PE_max
{
	switch(YuYa)
	{
		case 1:
		    C=C*(1-C_1);break;
		case 2:
		    C=C*(1-C_2);break;
		case 3:
		    C=C*(1-C_3);break;
	}
}

//显示计算结果
function SetJGTable(fs,L,Lh)
{
	fs=fs.toFixed(2);
	L=L.toFixed(2);
	Lh=Lh.toFixed(2);
	
	document.getElementById("tyFormJG").style.visibility="visible"; //显示计算结果
	var mytb = document.getElementById("ID_table_JG");//获取表格的dom节点
    var mytd = mytb.rows[1].cells[1]; //获取X行X列的mytd单元格
    mytd.innerHTML = "　"+String(fs);   //动态修改表格的内容
	
	mytd = mytb.rows[2].cells[1]; //获取X行X列的mytd单元格
	if (fs<1)
	{mytd.innerHTML = "　fs<1，不可使用，请重新输入条件";}
	else 
    {mytd.innerHTML = "　"+String(L);}   //动态修改表格的内容
	
	mytd = mytb.rows[3].cells[1]; //获取X行X列的mytd单元格
	if (fs<1)
	{mytd.innerHTML = "　fs<1，不可使用，请重新输入条件";}
	else 
    mytd.innerHTML = "　"+String(Lh);   //动态修改表格的内容

	document.getElementById("ID_btn_ReInput").style.visibility="visible"; //显示重新输入按钮
    document.getElementById("ID_btn_run").style.visibility="hidden"; //隐藏执行计算按钮
	SetDisabledInput(); //锁定用户输入数据
}

function open_about_fw() 
{
	window.open("about_fw.html","_blank");
}


function ISOK_rad() 
{
	if (isNaN(document.getElementById("ID_text_rad").value)==true) //不是数字
	{document.getElementById("ID_text_rad").value=30;}
	
	var myrad=0;
	myrad=Number(document.getElementById("ID_text_rad").value);

	if(myrad<0 || myrad>90)   //if(myrad<=0 || myrad>=90)
	{
		window.alert("0°≤θ≤90° ，请重新输入。");    //0°＜θ＜90°
		document.getElementById("ID_text_rad").value=30;
	}
}

//onchange V
function SetFw() 
{
	var v=0;
	if (isNaN(document.getElementById("ID_text_V").value)==false) //是数字
	{
	    if (Number(document.getElementById("ID_text_V").value)<=0)
	    {
		   document.getElementById("ID_text_V").value="";
		   document.getElementById("ID_text_fw").value="";
		}
		else
		{
			v=Number(document.getElementById("ID_text_V").value);
			if (v<=0.25) {document.getElementById("ID_text_fw").value=(1+(v/0.25)*0.2).toFixed(2);}
			if (v>0.25 && v<=1) {document.getElementById("ID_text_fw").value=(1.2+((v-0.25)/0.75)*0.3).toFixed(2);}
			if (v>1 && v<=2) {document.getElementById("ID_text_fw").value=(1.5+((v-1)/1)*0.5).toFixed(2);}
			if (v>2 && v<=4) {document.getElementById("ID_text_fw").value=(2.0+((v-2)/2)*1.5).toFixed(2);}
			if (v>4) {document.getElementById("ID_text_fw").value=(3.5).toFixed(2);}
	    }
	}
	else
	{
		document.getElementById("ID_text_V").value="";
		document.getElementById("ID_text_fw").value="";
	}
}

function ISOK_fw() 
{
	if (isNaN(document.getElementById("ID_text_fw").value)==true) //不是数字
	{document.getElementById("ID_text_fw").value="";}
	if (Number(document.getElementById("ID_text_fw").value)<=0)
	{document.getElementById("ID_text_fw").value="";}
}

function ISOK_T1() 
{
	if (isNaN(document.getElementById("ID_text_T1").value)==true) //不是数字
	{document.getElementById("ID_text_T1").value="";}
	if (Number(document.getElementById("ID_text_T1").value)<0)
	{document.getElementById("ID_text_T1").value="";}
}

function ISOK_T3() 
{
	if (isNaN(document.getElementById("ID_text_T3").value)==true) //不是数字
	{document.getElementById("ID_text_T3").value="";}
	if (Number(document.getElementById("ID_text_T3").value)<0)
	{document.getElementById("ID_text_T3").value="";}
}

function ISOK_Ls() 
{
	if (isNaN(document.getElementById("ID_text_Ls").value)==true) //不是数字
	{document.getElementById("ID_text_Ls").value="";}
	
	//初始化要用的数据
	V=Number(document.getElementById("ID_text_V").value);
	T1=Number(document.getElementById("ID_text_T1").value);
	T3=Number(document.getElementById("ID_text_T3").value);
	Ls=Number(document.getElementById("ID_text_Ls").value);
	Set_a_L();
	if(Ls<(L1+L3))
	{
		window.alert("行程不能小于(X1+X3)="+String(L1+L3));
		document.getElementById("ID_text_Ls").value="";
	}
	
}

function ISOK_n() 
{
	if (isNaN(document.getElementById("ID_text_n").value)==true) //不是数字
	{document.getElementById("ID_text_n").value="";}
	
	//初始化要用的数据
	V=Number(document.getElementById("ID_text_V").value);
	T1=Number(document.getElementById("ID_text_T1").value);
	T3=Number(document.getElementById("ID_text_T3").value);
	Ls=Number(document.getElementById("ID_text_Ls").value);
	n=Number(document.getElementById("ID_text_n").value);
	Set_a_L();
	var T_all=0;
	T_all=T1+T3+L2*0.001/V;
	if(n>(30/T_all))
	{
		window.alert("一分钟往复这个次数不能超次"+String(30/T_all));
		document.getElementById("ID_text_n").value="";
	}
}

function ISOK_Br() 
{
	if (isNaN(document.getElementById("ID_text_Br").value)==true) //不是数字
	{document.getElementById("ID_text_Br").value="";}
}

function ISOK_Bt() 
{
	if (isNaN(document.getElementById("ID_text_Bt").value)==true) //不是数字
	{document.getElementById("ID_text_Bt").value="";}
}

function ISOK_Rs() 
{
	if (isNaN(document.getElementById("ID_text_Rs").value)==true) //不是数字
	{document.getElementById("ID_text_Rs").value="";}
	else
	{
		var this_RS=0;
		var min_RS=0;
		
		SetCSH(); //初始化所有数据
		GetUserInput(); //取得用户输入参数

		if (GetHKXS()==1)
		{min_RS=HK_d;}
	    else
		{min_RS=HK_dd;}
	
		this_RS=Number(document.getElementById("ID_text_Rs").value);
		
		if (this_RS<min_RS)
		{
			window.alert("不能小于滑块宽度"+String(min_RS));
			document.getElementById("ID_text_Rs").value="";
		}
	}
}

function ISOK_Bs1() 
{
	if (isNaN(document.getElementById("ID_text_Bs1").value)==true) //不是数字
	{document.getElementById("ID_text_Bs1").value="";}
	else
	{
		var this_BS=0;
		var min_BS=0;
		
		SetCSH(); //初始化所有数据
		GetUserInput(); //取得用户输入参数
		
		min_BS=HK_LL;
	
		this_BS=Number(document.getElementById("ID_text_Bs1").value);
		
		if (this_BS<min_BS)
		{
			window.alert("不能小于滑块长度"+String(min_BS));
			document.getElementById("ID_text_Bs1").value="";
		}
	}
}

function ISOK_Bs2() 
{
	if (isNaN(document.getElementById("ID_text_Bs2").value)==true) //不是数字
	{document.getElementById("ID_text_Bs2").value="";}
	else
	{
		var this_BS=0;
		var min_BS=0;
		
		SetCSH(); //初始化所有数据
		GetUserInput(); //取得用户输入参数
		
		min_BS=HK_LL;
	
		this_BS=Number(document.getElementById("ID_text_Bs2").value);
		
		if (this_BS<min_BS)
		{
			window.alert("不能小于滑块长度"+String(min_BS));
			document.getElementById("ID_text_Bs2").value="";
		}
	}
}

function ISOK_Bs3() 
{
	if (isNaN(document.getElementById("ID_text_Bs3").value)==true) //不是数字
	{document.getElementById("ID_text_Bs3").value="";}
	else
	{
		var this_BS=0;
		var min_BS=0;
		
		SetCSH(); //初始化所有数据
		GetUserInput(); //取得用户输入参数
		
		min_BS=HK_LL;
	
		this_BS=Number(document.getElementById("ID_text_Bs3").value);
		
		if (this_BS<min_BS)
		{
			window.alert("不能小于滑块长度"+String(min_BS));
			document.getElementById("ID_text_Bs3").value="";
		}
	}
}

function ISOK_m1() 
{
	if (isNaN(document.getElementById("ID_text_m1").value)==true) //不是数字
	{document.getElementById("ID_text_m1").value="";}
}

function ISOK_Ga1() 
{
	if (isNaN(document.getElementById("ID_text_Ga1").value)==true) //不是数字
	{document.getElementById("ID_text_Ga1").value="";}
}

function ISOK_Gt1() 
{
	if (isNaN(document.getElementById("ID_text_Gt1").value)==true) //不是数字
	{document.getElementById("ID_text_Gt1").value="";}
}

function ISOK_Gr1() 
{
	if (isNaN(document.getElementById("ID_text_Gr1").value)==true) //不是数字
	{document.getElementById("ID_text_Gr1").value="";}
}

function ISOK_m2() 
{
	if (isNaN(document.getElementById("ID_text_m2").value)==true) //不是数字
	{document.getElementById("ID_text_m2").value="";}
}

function ISOK_Ga2() 
{
	if (isNaN(document.getElementById("ID_text_Ga2").value)==true) //不是数字
	{document.getElementById("ID_text_Ga2").value="";}
}

function ISOK_Gt2() 
{
	if (isNaN(document.getElementById("ID_text_Gt2").value)==true) //不是数字
	{document.getElementById("ID_text_Gt2").value="";}
}

function ISOK_Gr2() 
{
	if (isNaN(document.getElementById("ID_text_Gr2").value)==true) //不是数字
	{document.getElementById("ID_text_Gr2").value="";}
}

//锁定用户输入数据
function SetDisabledInput()
{
	document.getElementById("ID_selectXH").disabled=true;
	document.getElementById("ID_selectSYZT").disabled=true;
	document.getElementById("ID_selectDGSandHKS").disabled=true;
	document.getElementById("ID_text_rad").disabled=true;
	document.getElementById("ID_text_V").disabled=true;
	document.getElementById("ID_text_fw").disabled=true;
	document.getElementById("ID_text_T1").disabled=true;
	document.getElementById("ID_text_T3").disabled=true;
	document.getElementById("ID_text_Ls").disabled=true;
	document.getElementById("ID_text_n").disabled=true;
	document.getElementById("ID_selectHKXS").disabled=true;
	document.getElementById("ID_selectYuYa").disabled=true;
	document.getElementById("ID_text_Br").disabled=true;
	document.getElementById("ID_text_Bt").disabled=true;
	document.getElementById("ID_text_Rs").disabled=true;
	document.getElementById("ID_text_Bs1").disabled=true;
	document.getElementById("ID_text_Bs2").disabled=true;
	document.getElementById("ID_text_Bs3").disabled=true;
	document.getElementById("ID_selectFZnum").disabled=true;
	document.getElementById("ID_text_m1").disabled=true;
	document.getElementById("ID_text_Ga1").disabled=true;
	document.getElementById("ID_text_Gt1").disabled=true;
	document.getElementById("ID_text_Gr1").disabled=true;
	document.getElementById("ID_text_m2").disabled=true;
	document.getElementById("ID_text_Ga2").disabled=true;
	document.getElementById("ID_text_Gt2").disabled=true;
	document.getElementById("ID_text_Gr2").disabled=true;
}
//开放用户输入数据
function SetEnabledInput()
{
	document.getElementById("ID_selectXH").disabled=false;
	document.getElementById("ID_selectSYZT").disabled=false;
	document.getElementById("ID_selectDGSandHKS").disabled=false;
	document.getElementById("ID_text_rad").disabled=false;
	document.getElementById("ID_text_V").disabled=false;
	document.getElementById("ID_text_fw").disabled=false;
	document.getElementById("ID_text_T1").disabled=false;
	document.getElementById("ID_text_T3").disabled=false;
	document.getElementById("ID_text_Ls").disabled=false;
	document.getElementById("ID_text_n").disabled=false;
	document.getElementById("ID_selectHKXS").disabled=false;
	document.getElementById("ID_selectYuYa").disabled=false;
	document.getElementById("ID_text_Br").disabled=false;
	document.getElementById("ID_text_Bt").disabled=false;
	document.getElementById("ID_text_Rs").disabled=false;
	document.getElementById("ID_text_Bs1").disabled=false;
	document.getElementById("ID_text_Bs2").disabled=false;
	document.getElementById("ID_text_Bs3").disabled=false;
	document.getElementById("ID_selectFZnum").disabled=false;
	document.getElementById("ID_text_m1").disabled=false;
	document.getElementById("ID_text_Ga1").disabled=false;
	document.getElementById("ID_text_Gt1").disabled=false;
	document.getElementById("ID_text_Gr1").disabled=false;
	document.getElementById("ID_text_m2").disabled=false;
	document.getElementById("ID_text_Ga2").disabled=false;
	document.getElementById("ID_text_Gt2").disabled=false;
	document.getElementById("ID_text_Gr2").disabled=false;
}

//重新输入
function ToReInput()
{
	SetEnabledInput();
	document.getElementById("tyFormJG").style.visibility="hidden"; //隐藏计算结果
	document.getElementById("ID_btn_ReInput").style.visibility="hidden"; //隐藏重新输入按钮
    document.getElementById("ID_btn_run").style.visibility="visible"; //显示执行计算按钮
}
function MyShowIMG1() 
{
	switch(document.getElementById("ID_selectSYZT").value)
	{
		case "SYZT_1":
			switch(document.getElementById("ID_selectDGSandHKS").value)
			{
				case "DGSandHKS_11":
					document.getElementById("ID_MyShowIMG1").src="images/1-1-1.jpg";
					document.getElementById("ID_MyShowIMG3").src="images/h_1_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/h_1_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/h_1_1_m2.png";break;
					}
					break;
				case "DGSandHKS_12":
					document.getElementById("ID_MyShowIMG1").src="images/1-1-2.jpg";
					document.getElementById("ID_MyShowIMG3").src="images/h_1_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/h_1_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/h_1_2_m2.png";break;
					}
					break;
				case "DGSandHKS_13":
					document.getElementById("ID_MyShowIMG1").src="images/1-1-3.jpg";
					document.getElementById("ID_MyShowIMG3").src="images/h_1_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/h_1_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/h_1_3_m2.png";break;
					}
					break;
				case "DGSandHKS_14":
					document.getElementById("ID_MyShowIMG1").src="images/1-1-4.jpg";
					document.getElementById("ID_MyShowIMG3").src="images/h_1_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/h_1_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/h_1_4_m2.png";break;
					}
					break;
				case "DGSandHKS_21":
					document.getElementById("ID_MyShowIMG1").src="images/1-2-1.jpg";
					document.getElementById("ID_MyShowIMG3").src="images/h_2_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/h_2_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/h_2_1_m2.png";break;
					}
					break;
				case "DGSandHKS_22":
					document.getElementById("ID_MyShowIMG1").src="images/1-2-2.jpg";
					document.getElementById("ID_MyShowIMG3").src="images/h_2_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/h_2_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/h_2_2_m2.png";break;
					}
					break;
				case "DGSandHKS_23":
					document.getElementById("ID_MyShowIMG1").src="images/1-2-3.jpg";
					document.getElementById("ID_MyShowIMG3").src="images/h_2_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/h_2_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/h_2_3_m2.png";break;
					}
					break;
				case "DGSandHKS_24":
					document.getElementById("ID_MyShowIMG1").src="images/1-2-4.jpg";
					document.getElementById("ID_MyShowIMG3").src="images/h_2_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/h_2_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/h_2_4_m2.png";break;
					}
					break;
			}
			break;
		case "SYZT_2":
			switch(document.getElementById("ID_selectDGSandHKS").value)
			{
				case "DGSandHKS_11":
					document.getElementById("ID_MyShowIMG1").src="images/2-1-1.jpg";
					document.getElementById("ID_MyShowIMG3").src="images/v_1_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/v_1_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/v_1_1_m2.png";break;
					}
					break;
				case "DGSandHKS_12":
					document.getElementById("ID_MyShowIMG1").src="images/2-1-2.jpg";
					document.getElementById("ID_MyShowIMG3").src="images/v_1_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/v_1_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/v_1_2_m2.png";break;
					}
					break;
				case "DGSandHKS_13":
					document.getElementById("ID_MyShowIMG1").src="images/2-1-3.jpg";
					document.getElementById("ID_MyShowIMG3").src="images/v_1_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/v_1_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/v_1_3_m2.png";break;
					}
					break;
				case "DGSandHKS_14":
					document.getElementById("ID_MyShowIMG1").src="images/2-1-4.jpg";
					document.getElementById("ID_MyShowIMG3").src="images/v_1_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/v_1_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/v_1_4_m2.png";break;
					}
					break;
				case "DGSandHKS_21":
					document.getElementById("ID_MyShowIMG1").src="images/2-2-1.jpg";
					document.getElementById("ID_MyShowIMG3").src="images/v_2_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/v_2_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/v_2_1_m2.png";break;
					}
					break;
				case "DGSandHKS_22":
					document.getElementById("ID_MyShowIMG1").src="images/2-2-2.jpg";
					document.getElementById("ID_MyShowIMG3").src="images/v_2_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/v_2_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/v_2_2_m2.png";break;
					}
					break;
				case "DGSandHKS_23":
					document.getElementById("ID_MyShowIMG1").src="images/2-2-3.jpg";
					document.getElementById("ID_MyShowIMG3").src="images/v_2_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/v_2_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/v_2_3_m2.png";break;
					}
					break;
				case "DGSandHKS_24":
					document.getElementById("ID_MyShowIMG1").src="images/2-2-4.jpg";
					document.getElementById("ID_MyShowIMG3").src="images/v_2_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/v_2_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/v_2_4_m2.png";break;
					}
					break;
			}
			break;
		case "SYZT_3":
			switch(document.getElementById("ID_selectDGSandHKS").value)
			{
				case "DGSandHKS_11":
					document.getElementById("ID_MyShowIMG1").src="images/3-1-1.jpg";
					document.getElementById("ID_MyShowIMG3").src="images/k_1_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/k_1_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/k_1_1_m2.png";break;
					}
					break;
				case "DGSandHKS_12":
					document.getElementById("ID_MyShowIMG1").src="images/3-1-2.jpg";
					document.getElementById("ID_MyShowIMG3").src="images/k_1_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/k_1_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/k_1_2_m2.png";break;
					}
					break;
				case "DGSandHKS_13":
					document.getElementById("ID_MyShowIMG1").src="images/3-1-3.jpg";
					document.getElementById("ID_MyShowIMG3").src="images/k_1_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/k_1_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/k_1_3_m2.png";break;
					}
					break;
				case "DGSandHKS_14":
					document.getElementById("ID_MyShowIMG1").src="images/3-1-4.jpg";
					document.getElementById("ID_MyShowIMG3").src="images/k_1_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/k_1_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/k_1_4_m2.png";break;
					}
					break;
				case "DGSandHKS_21":
					document.getElementById("ID_MyShowIMG1").src="images/3-2-1.jpg";
					document.getElementById("ID_MyShowIMG3").src="images/k_2_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/k_2_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/k_2_1_m2.png";break;
					}
					break;
				case "DGSandHKS_22":
					document.getElementById("ID_MyShowIMG1").src="images/3-2-2.jpg";
					document.getElementById("ID_MyShowIMG3").src="images/k_2_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/k_2_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/k_2_2_m2.png";break;
					}
					break;
				case "DGSandHKS_23":
					document.getElementById("ID_MyShowIMG1").src="images/3-2-3.jpg";
					document.getElementById("ID_MyShowIMG3").src="images/k_2_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/k_2_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/k_2_3_m2.png";break;
					}
					break;
				case "DGSandHKS_24":
					document.getElementById("ID_MyShowIMG1").src="images/3-2-4.jpg";
					document.getElementById("ID_MyShowIMG3").src="images/k_2_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/k_2_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/k_2_4_m2.png";break;
					}
					break;
			}
			break;
		case "SYZT_4":
			switch(document.getElementById("ID_selectDGSandHKS").value)
			{
				case "DGSandHKS_11":
					document.getElementById("ID_MyShowIMG1").src="images/4_1_1.png";
					document.getElementById("ID_MyShowIMG3").src="images/hs_1_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_1_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_1_1_m2.png";break;
					}
					break;
				case "DGSandHKS_12":
					document.getElementById("ID_MyShowIMG1").src="images/4_1_2.png";
					document.getElementById("ID_MyShowIMG3").src="images/hs_1_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_1_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_1_2_m2.png";break;
					}
					break;
				case "DGSandHKS_13":
					document.getElementById("ID_MyShowIMG1").src="images/4_1_3.png";
					document.getElementById("ID_MyShowIMG3").src="images/hs_1_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_1_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_1_3_m2.png";break;
					}
					break;
				case "DGSandHKS_14":
					document.getElementById("ID_MyShowIMG1").src="images/4_1_4.png";
					document.getElementById("ID_MyShowIMG3").src="images/hs_1_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_1_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_1_4_m2.png";break;
					}
					break;
				case "DGSandHKS_21":
					document.getElementById("ID_MyShowIMG1").src="images/4_2_1.png";
					document.getElementById("ID_MyShowIMG3").src="images/hs_2_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_2_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_2_1_m2.png";break;
					}
					break;
				case "DGSandHKS_22":
					document.getElementById("ID_MyShowIMG1").src="images/4_2_2.png";
					document.getElementById("ID_MyShowIMG3").src="images/hs_2_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_2_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_2_2_m2.png";break;
					}
					break;
				case "DGSandHKS_23":
					document.getElementById("ID_MyShowIMG1").src="images/4_2_3.png";
					document.getElementById("ID_MyShowIMG3").src="images/hs_2_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_2_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_2_3_m2.png";break;
					}
					break;
				case "DGSandHKS_24":
					document.getElementById("ID_MyShowIMG1").src="images/4_2_4.png";
					document.getElementById("ID_MyShowIMG3").src="images/hs_2_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_2_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_2_4_m2.png";break;
					}
					break;
			}
			break;
		case "SYZT_5":
			switch(document.getElementById("ID_selectDGSandHKS").value)
			{
				case "DGSandHKS_11":
					document.getElementById("ID_MyShowIMG1").src="images/5_1_1.png";
					document.getElementById("ID_MyShowIMG3").src="images/vs_1_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_1_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_1_1_m2.png";break;
					}
					break;
				case "DGSandHKS_12":
					document.getElementById("ID_MyShowIMG1").src="images/5_1_2.png";
					document.getElementById("ID_MyShowIMG3").src="images/vs_1_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_1_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_1_2_m2.png";break;
					}
					break;
				case "DGSandHKS_13":
					document.getElementById("ID_MyShowIMG1").src="images/5_1_3.png";
					document.getElementById("ID_MyShowIMG3").src="images/vs_1_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_1_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_1_3_m2.png";break;
					}
					break;
				case "DGSandHKS_14":
					document.getElementById("ID_MyShowIMG1").src="images/5_1_4.png";
					document.getElementById("ID_MyShowIMG3").src="images/vs_1_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_1_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_1_4_m2.png";break;
					}
					break;
				case "DGSandHKS_21":
					document.getElementById("ID_MyShowIMG1").src="images/5_2_1.png";
					document.getElementById("ID_MyShowIMG3").src="images/vs_2_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_2_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_2_1_m2.png";break;
					}
					break;
				case "DGSandHKS_22":
					document.getElementById("ID_MyShowIMG1").src="images/5_2_2.png";
					document.getElementById("ID_MyShowIMG3").src="images/vs_2_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_2_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_2_2_m2.png";break;
					}
					break;
				case "DGSandHKS_23":
					document.getElementById("ID_MyShowIMG1").src="images/5_2_3.png";
					document.getElementById("ID_MyShowIMG3").src="images/vs_2_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_2_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_2_3_m2.png";break;
					}
					break;
				case "DGSandHKS_24":
					document.getElementById("ID_MyShowIMG1").src="images/5_2_4.png";
					document.getElementById("ID_MyShowIMG3").src="images/vs_2_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_2_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_2_4_m2.png";break;
					}
					break;
			}
			break;
	}
	
	switch(document.getElementById("ID_selectDGSandHKS").value)
	{
	case "DGSandHKS_11":
		document.getElementById("ID_1_Rs").style.visibility="hidden";
		document.getElementById("ID_1_Bs1").style.visibility="hidden";		
		document.getElementById("ID_1_Bs2").style.visibility="hidden";		
		document.getElementById("ID_1_Bs3").style.visibility="hidden";		
		document.getElementById("ID_2_Rs").style.visibility="hidden";		
		document.getElementById("ID_2_Bs1").style.visibility="hidden";
		document.getElementById("ID_2_Bs2").style.visibility="hidden";
		document.getElementById("ID_2_Bs3").style.visibility="hidden";
		break;
	case "DGSandHKS_12":
		document.getElementById("ID_1_Rs").style.visibility="hidden";
		document.getElementById("ID_1_Bs1").style.visibility="visible";		
		document.getElementById("ID_1_Bs2").style.visibility="hidden";		
		document.getElementById("ID_1_Bs3").style.visibility="hidden";		
		document.getElementById("ID_2_Rs").style.visibility="hidden";		
		document.getElementById("ID_2_Bs1").style.visibility="visible";
		document.getElementById("ID_2_Bs2").style.visibility="hidden";
		document.getElementById("ID_2_Bs3").style.visibility="hidden";	
		break;
	case "DGSandHKS_13":
		document.getElementById("ID_1_Rs").style.visibility="hidden";
		document.getElementById("ID_1_Bs1").style.visibility="visible";		
		document.getElementById("ID_1_Bs2").style.visibility="visible";		
		document.getElementById("ID_1_Bs3").style.visibility="hidden";		
		document.getElementById("ID_2_Rs").style.visibility="hidden";		
		document.getElementById("ID_2_Bs1").style.visibility="visible";
		document.getElementById("ID_2_Bs2").style.visibility="visible";
		document.getElementById("ID_2_Bs3").style.visibility="hidden";	
		break;
	case "DGSandHKS_14":
		document.getElementById("ID_1_Rs").style.visibility="hidden";
		document.getElementById("ID_1_Bs1").style.visibility="visible";		
		document.getElementById("ID_1_Bs2").style.visibility="visible";		
		document.getElementById("ID_1_Bs3").style.visibility="visible";		
		document.getElementById("ID_2_Rs").style.visibility="hidden";		
		document.getElementById("ID_2_Bs1").style.visibility="visible";
		document.getElementById("ID_2_Bs2").style.visibility="visible";
		document.getElementById("ID_2_Bs3").style.visibility="visible";	
		break;
	case "DGSandHKS_21":
		document.getElementById("ID_1_Rs").style.visibility="visible";
		document.getElementById("ID_1_Bs1").style.visibility="hidden";		
		document.getElementById("ID_1_Bs2").style.visibility="hidden";		
		document.getElementById("ID_1_Bs3").style.visibility="hidden";		
		document.getElementById("ID_2_Rs").style.visibility="visible";		
		document.getElementById("ID_2_Bs1").style.visibility="hidden";
		document.getElementById("ID_2_Bs2").style.visibility="hidden";
		document.getElementById("ID_2_Bs3").style.visibility="hidden";
		break;
	case "DGSandHKS_22":
		document.getElementById("ID_1_Rs").style.visibility="visible";
		document.getElementById("ID_1_Bs1").style.visibility="visible";		
		document.getElementById("ID_1_Bs2").style.visibility="hidden";		
		document.getElementById("ID_1_Bs3").style.visibility="hidden";		
		document.getElementById("ID_2_Rs").style.visibility="visible";		
		document.getElementById("ID_2_Bs1").style.visibility="visible";
		document.getElementById("ID_2_Bs2").style.visibility="hidden";
		document.getElementById("ID_2_Bs3").style.visibility="hidden";
		break;
	case "DGSandHKS_23":
		document.getElementById("ID_1_Rs").style.visibility="visible";
		document.getElementById("ID_1_Bs1").style.visibility="visible";		
		document.getElementById("ID_1_Bs2").style.visibility="visible";		
		document.getElementById("ID_1_Bs3").style.visibility="hidden";		
		document.getElementById("ID_2_Rs").style.visibility="visible";		
		document.getElementById("ID_2_Bs1").style.visibility="visible";
		document.getElementById("ID_2_Bs2").style.visibility="visible";
		document.getElementById("ID_2_Bs3").style.visibility="hidden";
		break;
	case "DGSandHKS_24":
		document.getElementById("ID_1_Rs").style.visibility="visible";
		document.getElementById("ID_1_Bs1").style.visibility="visible";		
		document.getElementById("ID_1_Bs2").style.visibility="visible";		
		document.getElementById("ID_1_Bs3").style.visibility="visible";		
		document.getElementById("ID_2_Rs").style.visibility="visible";		
		document.getElementById("ID_2_Bs1").style.visibility="visible";
		document.getElementById("ID_2_Bs2").style.visibility="visible";
		document.getElementById("ID_2_Bs3").style.visibility="visible";
		break;
	}
	
	switch(document.getElementById("ID_selectFZnum").value)
	{
		case "FZnum_1":
			document.getElementById("ID_1_m2").style.visibility="hidden";
			document.getElementById("ID_1_Ga2").style.visibility="hidden";		
			document.getElementById("ID_1_Gt2").style.visibility="hidden";		
			document.getElementById("ID_1_Gr2").style.visibility="hidden";		
			document.getElementById("ID_2_m2").style.visibility="hidden";		
			document.getElementById("ID_2_Ga2").style.visibility="hidden";
			document.getElementById("ID_2_Gt2").style.visibility="hidden";
			document.getElementById("ID_2_Gr2").style.visibility="hidden";
			break;
		case "FZnum_2":
			document.getElementById("ID_1_m2").style.visibility="visible";
			document.getElementById("ID_1_Ga2").style.visibility="visible";		
			document.getElementById("ID_1_Gt2").style.visibility="visible";		
			document.getElementById("ID_1_Gr2").style.visibility="visible";		
			document.getElementById("ID_2_m2").style.visibility="visible";		
			document.getElementById("ID_2_Ga2").style.visibility="visible";
			document.getElementById("ID_2_Gt2").style.visibility="visible";
			document.getElementById("ID_2_Gr2").style.visibility="visible";
			break;
	}
	//角度是否显示
	switch(document.getElementById("ID_selectSYZT").value)
	{
		case "SYZT_1":
		    document.getElementById("ID_rad").style.visibility="hidden";
		    document.getElementById("ID_2_rad").style.visibility="hidden";
			break;
		case "SYZT_2":
		    document.getElementById("ID_rad").style.visibility="hidden";
		    document.getElementById("ID_2_rad").style.visibility="hidden";
			break;
		case "SYZT_3":
		    document.getElementById("ID_rad").style.visibility="hidden";
		    document.getElementById("ID_2_rad").style.visibility="hidden";
			break;
		case "SYZT_4":
		    document.getElementById("ID_rad").style.visibility="visible";
		    document.getElementById("ID_2_rad").style.visibility="visible";
			break;
		case "SYZT_5":
		    document.getElementById("ID_rad").style.visibility="visible";
		    document.getElementById("ID_2_rad").style.visibility="visible";
			break;
	}
}

function MyShowIMG1D() 
{
	switch(document.getElementById("ID_selectSYZT").value)
	{
		case "SYZT_1":
			switch(document.getElementById("ID_selectDGSandHKS").value)
			{
				case "DGSandHKS_11":
					document.getElementById("ID_MyShowIMG1D").src="images/1-1-1D.jpg";
					document.getElementById("ID_MyShowIMG3D").src="images/h_1_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4D").src="images/h_1_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4D").src="images/h_1_1_m2.png";break;
					}
					break;
				case "DGSandHKS_12":
					document.getElementById("ID_MyShowIMG1D").src="images/1-1-2D.jpg";
					document.getElementById("ID_MyShowIMG3D").src="images/h_1_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4D").src="images/h_1_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4D").src="images/h_1_2_m2.png";break;
					}
					break;
				case "DGSandHKS_13":
					document.getElementById("ID_MyShowIMG1D").src="images/1-1-3D.jpg";
					document.getElementById("ID_MyShowIMG3D").src="images/h_1_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4D").src="images/h_1_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4D").src="images/h_1_3_m2.png";break;
					}
					break;
				case "DGSandHKS_14":
					document.getElementById("ID_MyShowIMG1D").src="images/1-1-4D.jpg";
					document.getElementById("ID_MyShowIMG3D").src="images/h_1_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4D").src="images/h_1_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4D").src="images/h_1_4_m2.png";break;
					}
					break;
				case "DGSandHKS_21":
					document.getElementById("ID_MyShowIMG1D").src="images/1-2-1D.jpg";
					document.getElementById("ID_MyShowIMG3D").src="images/h_2_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4D").src="images/h_2_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4D").src="images/h_2_1_m2.png";break;
					}
					break;
				case "DGSandHKS_22":
					document.getElementById("ID_MyShowIMG1D").src="images/1-2-2D.jpg";
					document.getElementById("ID_MyShowIMG3D").src="images/h_2_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4D").src="images/h_2_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4D").src="images/h_2_2_m2.png";break;
					}
					break;
				case "DGSandHKS_23":
					document.getElementById("ID_MyShowIMG1D").src="images/1-2-3D.jpg";
					document.getElementById("ID_MyShowIMG3D").src="images/h_2_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4D").src="images/h_2_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4D").src="images/h_2_3_m2.png";break;
					}
					break;
				case "DGSandHKS_24":
					document.getElementById("ID_MyShowIMG1D").src="images/1-2-4D.jpg";
					document.getElementById("ID_MyShowIMG3D").src="images/h_2_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4D").src="images/h_2_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4D").src="images/h_2_4_m2.png";break;
					}
					break;
			}
			break;
		case "SYZT_2":
			switch(document.getElementById("ID_selectDGSandHKS").value)
			{
				case "DGSandHKS_11":
					document.getElementById("ID_MyShowIMG1D").src="images/2-1-1D.jpg";
					document.getElementById("ID_MyShowIMG3D").src="images/v_1_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4D").src="images/v_1_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4D").src="images/v_1_1_m2.png";break;
					}
					break;
				case "DGSandHKS_12":
					document.getElementById("ID_MyShowIMG1D").src="images/2-1-2D.jpg";
					document.getElementById("ID_MyShowIMG3D").src="images/v_1_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4D").src="images/v_1_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4D").src="images/v_1_2_m2.png";break;
					}
					break;
				case "DGSandHKS_13":
					document.getElementById("ID_MyShowIMG1D").src="images/2-1-3D.jpg";
					document.getElementById("ID_MyShowIMG3D").src="images/v_1_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4D").src="images/v_1_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4D").src="images/v_1_3_m2.png";break;
					}
					break;
				case "DGSandHKS_14":
					document.getElementById("ID_MyShowIMG1D").src="images/2-1-4D.jpg";
					document.getElementById("ID_MyShowIMG3D").src="images/v_1_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4D").src="images/v_1_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4D").src="images/v_1_4_m2.png";break;
					}
					break;
				case "DGSandHKS_21":
					document.getElementById("ID_MyShowIMG1D").src="images/2-2-1D.jpg";
					document.getElementById("ID_MyShowIMG3D").src="images/v_2_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4D").src="images/v_2_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4D").src="images/v_2_1_m2.png";break;
					}
					break;
				case "DGSandHKS_22":
					document.getElementById("ID_MyShowIMG1D").src="images/2-2-2D.jpg";
					document.getElementById("ID_MyShowIMG3D").src="images/v_2_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4D").src="images/v_2_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4D").src="images/v_2_2_m2.png";break;
					}
					break;
				case "DGSandHKS_23":
					document.getElementById("ID_MyShowIMG1D").src="images/2-2-3D.jpg";
					document.getElementById("ID_MyShowIMG3D").src="images/v_2_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4D").src="images/v_2_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4D").src="images/v_2_3_m2.png";break;
					}
					break;
				case "DGSandHKS_24":
					document.getElementById("ID_MyShowIMG1D").src="images/2-2-4D.jpg";
					document.getElementById("ID_MyShowIMG3D").src="images/v_2_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4D").src="images/v_2_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4D").src="images/v_2_4_m2.png";break;
					}
					break;
			}
			break;
		case "SYZT_3":
			switch(document.getElementById("ID_selectDGSandHKS").value)
			{
				case "DGSandHKS_11":
					document.getElementById("ID_MyShowIMG1D").src="images/3-1-1D.jpg";
					document.getElementById("ID_MyShowIMG3D").src="images/k_1_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4D").src="images/k_1_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4D").src="images/k_1_1_m2.png";break;
					}
					break;
				case "DGSandHKS_12":
					document.getElementById("ID_MyShowIMG1D").src="images/3-1-2D.jpg";
					document.getElementById("ID_MyShowIMG3D").src="images/k_1_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4D").src="images/k_1_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4D").src="images/k_1_2_m2.png";break;
					}
					break;
				case "DGSandHKS_13":
					document.getElementById("ID_MyShowIMG1D").src="images/3-1-3D.jpg";
					document.getElementById("ID_MyShowIMG3D").src="images/k_1_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4D").src="images/k_1_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4D").src="images/k_1_3_m2.png";break;
					}
					break;
				case "DGSandHKS_14":
					document.getElementById("ID_MyShowIMG1D").src="images/3-1-4D.jpg";
					document.getElementById("ID_MyShowIMG3D").src="images/k_1_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4D").src="images/k_1_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4D").src="images/k_1_4_m2.png";break;
					}
					break;
				case "DGSandHKS_21":
					document.getElementById("ID_MyShowIMG1D").src="images/3-2-1D.jpg";
					document.getElementById("ID_MyShowIMG3D").src="images/k_2_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4D").src="images/k_2_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4D").src="images/k_2_1_m2.png";break;
					}
					break;
				case "DGSandHKS_22":
					document.getElementById("ID_MyShowIMG1D").src="images/3-2-2D.jpg";
					document.getElementById("ID_MyShowIMG3D").src="images/k_2_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4D").src="images/k_2_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4D").src="images/k_2_2_m2.png";break;
					}
					break;
				case "DGSandHKS_23":
					document.getElementById("ID_MyShowIMG1D").src="images/3-2-3D.jpg";
					document.getElementById("ID_MyShowIMG3D").src="images/k_2_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4D").src="images/k_2_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4D").src="images/k_2_3_m2.png";break;
					}
					break;
				case "DGSandHKS_24":
					document.getElementById("ID_MyShowIMG1D").src="images/3-2-4D.jpg";
					document.getElementById("ID_MyShowIMG3D").src="images/k_2_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4D").src="images/k_2_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4D").src="images/k_2_4_m2.png";break;
					}
					break;
			}
			break;
		case "SYZT_4":
			switch(document.getElementById("ID_selectDGSandHKS").value)
			{
				case "DGSandHKS_11":
					document.getElementById("ID_MyShowIMG1").src="images/4_1_1.png";
					document.getElementById("ID_MyShowIMG3").src="images/hs_1_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_1_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_1_1_m2.png";break;
					}
					break;
				case "DGSandHKS_12":
					document.getElementById("ID_MyShowIMG1").src="images/4_1_2.png";
					document.getElementById("ID_MyShowIMG3").src="images/hs_1_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_1_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_1_2_m2.png";break;
					}
					break;
				case "DGSandHKS_13":
					document.getElementById("ID_MyShowIMG1").src="images/4_1_3.png";
					document.getElementById("ID_MyShowIMG3").src="images/hs_1_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_1_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_1_3_m2.png";break;
					}
					break;
				case "DGSandHKS_14":
					document.getElementById("ID_MyShowIMG1").src="images/4_1_4.png";
					document.getElementById("ID_MyShowIMG3").src="images/hs_1_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_1_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_1_4_m2.png";break;
					}
					break;
				case "DGSandHKS_21":
					document.getElementById("ID_MyShowIMG1").src="images/4_2_1.png";
					document.getElementById("ID_MyShowIMG3").src="images/hs_2_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_2_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_2_1_m2.png";break;
					}
					break;
				case "DGSandHKS_22":
					document.getElementById("ID_MyShowIMG1").src="images/4_2_2.png";
					document.getElementById("ID_MyShowIMG3").src="images/hs_2_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_2_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_2_2_m2.png";break;
					}
					break;
				case "DGSandHKS_23":
					document.getElementById("ID_MyShowIMG1").src="images/4_2_3.png";
					document.getElementById("ID_MyShowIMG3").src="images/hs_2_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_2_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_2_3_m2.png";break;
					}
					break;
				case "DGSandHKS_24":
					document.getElementById("ID_MyShowIMG1").src="images/4_2_4.png";
					document.getElementById("ID_MyShowIMG3").src="images/hs_2_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_2_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_2_4_m2.png";break;
					}
					break;
			}
			break;
		case "SYZT_5":
			switch(document.getElementById("ID_selectDGSandHKS").value)
			{
				case "DGSandHKS_11":
					document.getElementById("ID_MyShowIMG1").src="images/5_1_1.png";
					document.getElementById("ID_MyShowIMG3").src="images/vs_1_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_1_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_1_1_m2.png";break;
					}
					break;
				case "DGSandHKS_12":
					document.getElementById("ID_MyShowIMG1").src="images/5_1_2.png";
					document.getElementById("ID_MyShowIMG3").src="images/vs_1_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_1_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_1_2_m2.png";break;
					}
					break;
				case "DGSandHKS_13":
					document.getElementById("ID_MyShowIMG1").src="images/5_1_3.png";
					document.getElementById("ID_MyShowIMG3").src="images/vs_1_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_1_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_1_3_m2.png";break;
					}
					break;
				case "DGSandHKS_14":
					document.getElementById("ID_MyShowIMG1").src="images/5_1_4.png";
					document.getElementById("ID_MyShowIMG3").src="images/vs_1_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_1_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_1_4_m2.png";break;
					}
					break;
				case "DGSandHKS_21":
					document.getElementById("ID_MyShowIMG1").src="images/5_2_1.png";
					document.getElementById("ID_MyShowIMG3").src="images/vs_2_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_2_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_2_1_m2.png";break;
					}
					break;
				case "DGSandHKS_22":
					document.getElementById("ID_MyShowIMG1").src="images/5_2_2.png";
					document.getElementById("ID_MyShowIMG3").src="images/vs_2_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_2_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_2_2_m2.png";break;
					}
					break;
				case "DGSandHKS_23":
					document.getElementById("ID_MyShowIMG1").src="images/5_2_3.png";
					document.getElementById("ID_MyShowIMG3").src="images/vs_2_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_2_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_2_3_m2.png";break;
					}
					break;
				case "DGSandHKS_24":
					document.getElementById("ID_MyShowIMG1").src="images/5_2_4.png";
					document.getElementById("ID_MyShowIMG3").src="images/vs_2_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_2_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_2_4_m2.png";break;
					}
					break;
			}
			break;
	}
	
	switch(document.getElementById("ID_selectDGSandHKS").value)
	{
	case "DGSandHKS_11":
		document.getElementById("ID_1_Rs").style.visibility="hidden";
		document.getElementById("ID_1_Bs1").style.visibility="hidden";		
		document.getElementById("ID_1_Bs2").style.visibility="hidden";		
		document.getElementById("ID_1_Bs3").style.visibility="hidden";		
		document.getElementById("ID_2_Rs").style.visibility="hidden";		
		document.getElementById("ID_2_Bs1").style.visibility="hidden";
		document.getElementById("ID_2_Bs2").style.visibility="hidden";
		document.getElementById("ID_2_Bs3").style.visibility="hidden";
		break;
	case "DGSandHKS_12":
		document.getElementById("ID_1_Rs").style.visibility="hidden";
		document.getElementById("ID_1_Bs1").style.visibility="visible";		
		document.getElementById("ID_1_Bs2").style.visibility="hidden";		
		document.getElementById("ID_1_Bs3").style.visibility="hidden";		
		document.getElementById("ID_2_Rs").style.visibility="hidden";		
		document.getElementById("ID_2_Bs1").style.visibility="visible";
		document.getElementById("ID_2_Bs2").style.visibility="hidden";
		document.getElementById("ID_2_Bs3").style.visibility="hidden";	
		break;
	case "DGSandHKS_13":
		document.getElementById("ID_1_Rs").style.visibility="hidden";
		document.getElementById("ID_1_Bs1").style.visibility="visible";		
		document.getElementById("ID_1_Bs2").style.visibility="visible";		
		document.getElementById("ID_1_Bs3").style.visibility="hidden";		
		document.getElementById("ID_2_Rs").style.visibility="hidden";		
		document.getElementById("ID_2_Bs1").style.visibility="visible";
		document.getElementById("ID_2_Bs2").style.visibility="visible";
		document.getElementById("ID_2_Bs3").style.visibility="hidden";	
		break;
	case "DGSandHKS_14":
		document.getElementById("ID_1_Rs").style.visibility="hidden";
		document.getElementById("ID_1_Bs1").style.visibility="visible";		
		document.getElementById("ID_1_Bs2").style.visibility="visible";		
		document.getElementById("ID_1_Bs3").style.visibility="visible";		
		document.getElementById("ID_2_Rs").style.visibility="hidden";		
		document.getElementById("ID_2_Bs1").style.visibility="visible";
		document.getElementById("ID_2_Bs2").style.visibility="visible";
		document.getElementById("ID_2_Bs3").style.visibility="visible";	
		break;
	case "DGSandHKS_21":
		document.getElementById("ID_1_Rs").style.visibility="visible";
		document.getElementById("ID_1_Bs1").style.visibility="hidden";		
		document.getElementById("ID_1_Bs2").style.visibility="hidden";		
		document.getElementById("ID_1_Bs3").style.visibility="hidden";		
		document.getElementById("ID_2_Rs").style.visibility="visible";		
		document.getElementById("ID_2_Bs1").style.visibility="hidden";
		document.getElementById("ID_2_Bs2").style.visibility="hidden";
		document.getElementById("ID_2_Bs3").style.visibility="hidden";
		break;
	case "DGSandHKS_22":
		document.getElementById("ID_1_Rs").style.visibility="visible";
		document.getElementById("ID_1_Bs1").style.visibility="visible";		
		document.getElementById("ID_1_Bs2").style.visibility="hidden";		
		document.getElementById("ID_1_Bs3").style.visibility="hidden";		
		document.getElementById("ID_2_Rs").style.visibility="visible";		
		document.getElementById("ID_2_Bs1").style.visibility="visible";
		document.getElementById("ID_2_Bs2").style.visibility="hidden";
		document.getElementById("ID_2_Bs3").style.visibility="hidden";
		break;
	case "DGSandHKS_23":
		document.getElementById("ID_1_Rs").style.visibility="visible";
		document.getElementById("ID_1_Bs1").style.visibility="visible";		
		document.getElementById("ID_1_Bs2").style.visibility="visible";		
		document.getElementById("ID_1_Bs3").style.visibility="hidden";		
		document.getElementById("ID_2_Rs").style.visibility="visible";		
		document.getElementById("ID_2_Bs1").style.visibility="visible";
		document.getElementById("ID_2_Bs2").style.visibility="visible";
		document.getElementById("ID_2_Bs3").style.visibility="hidden";
		break;
	case "DGSandHKS_24":
		document.getElementById("ID_1_Rs").style.visibility="visible";
		document.getElementById("ID_1_Bs1").style.visibility="visible";		
		document.getElementById("ID_1_Bs2").style.visibility="visible";		
		document.getElementById("ID_1_Bs3").style.visibility="visible";		
		document.getElementById("ID_2_Rs").style.visibility="visible";		
		document.getElementById("ID_2_Bs1").style.visibility="visible";
		document.getElementById("ID_2_Bs2").style.visibility="visible";
		document.getElementById("ID_2_Bs3").style.visibility="visible";
		break;
	}
	
	switch(document.getElementById("ID_selectFZnum").value)
	{
		case "FZnum_1":
			document.getElementById("ID_1_m2").style.visibility="hidden";
			document.getElementById("ID_1_Ga2").style.visibility="hidden";		
			document.getElementById("ID_1_Gt2").style.visibility="hidden";		
			document.getElementById("ID_1_Gr2").style.visibility="hidden";		
			document.getElementById("ID_2_m2").style.visibility="hidden";		
			document.getElementById("ID_2_Ga2").style.visibility="hidden";
			document.getElementById("ID_2_Gt2").style.visibility="hidden";
			document.getElementById("ID_2_Gr2").style.visibility="hidden";
			break;
		case "FZnum_2":
			document.getElementById("ID_1_m2").style.visibility="visible";
			document.getElementById("ID_1_Ga2").style.visibility="visible";		
			document.getElementById("ID_1_Gt2").style.visibility="visible";		
			document.getElementById("ID_1_Gr2").style.visibility="visible";		
			document.getElementById("ID_2_m2").style.visibility="visible";		
			document.getElementById("ID_2_Ga2").style.visibility="visible";
			document.getElementById("ID_2_Gt2").style.visibility="visible";
			document.getElementById("ID_2_Gr2").style.visibility="visible";
			break;
	}
	//角度是否显示
	switch(document.getElementById("ID_selectSYZT").value)
	{
		case "SYZT_1":
		    document.getElementById("ID_rad").style.visibility="hidden";
		    document.getElementById("ID_2_rad").style.visibility="hidden";
			break;
		case "SYZT_2":
		    document.getElementById("ID_rad").style.visibility="hidden";
		    document.getElementById("ID_2_rad").style.visibility="hidden";
			break;
		case "SYZT_3":
		    document.getElementById("ID_rad").style.visibility="hidden";
		    document.getElementById("ID_2_rad").style.visibility="hidden";
			break;
		case "SYZT_4":
		    document.getElementById("ID_rad").style.visibility="visible";
		    document.getElementById("ID_2_rad").style.visibility="visible";
			break;
		case "SYZT_5":
		    document.getElementById("ID_rad").style.visibility="visible";
		    document.getElementById("ID_2_rad").style.visibility="visible";
			break;
	}
}

function MyShowIMG1M() 
{
	switch(document.getElementById("ID_selectSYZT").value)
	{
		case "SYZT_1":
			switch(document.getElementById("ID_selectDGSandHKS").value)
			{
				case "DGSandHKS_11":
					document.getElementById("ID_MyShowIMG1M").src="images/1-1-1M.jpg";
					document.getElementById("ID_MyShowIMG3M").src="images/h_1_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4M").src="images/h_1_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4M").src="images/h_1_1_m2.png";break;
					}
					break;
				case "DGSandHKS_12":
					document.getElementById("ID_MyShowIMG1M").src="images/1-1-2M.jpg";
					document.getElementById("ID_MyShowIMG3M").src="images/h_1_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4M").src="images/h_1_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4M").src="images/h_1_2_m2.png";break;
					}
					break;
				case "DGSandHKS_13":
					document.getElementById("ID_MyShowIMG1M").src="images/1-1-3M.jpg";
					document.getElementById("ID_MyShowIMG3M").src="images/h_1_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4M").src="images/h_1_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4M").src="images/h_1_3_m2.png";break;
					}
					break;
				case "DGSandHKS_14":
					document.getElementById("ID_MyShowIMG1M").src="images/1-1-4M.jpg";
					document.getElementById("ID_MyShowIMG3M").src="images/h_1_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4M").src="images/h_1_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4M").src="images/h_1_4_m2.png";break;
					}
					break;
				case "DGSandHKS_21":
					document.getElementById("ID_MyShowIMG1M").src="images/1-2-1M.jpg";
					document.getElementById("ID_MyShowIMG3M").src="images/h_2_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4M").src="images/h_2_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4M").src="images/h_2_1_m2.png";break;
					}
					break;
				case "DGSandHKS_22":
					document.getElementById("ID_MyShowIMG1M").src="images/1-2-2M.jpg";
					document.getElementById("ID_MyShowIMG3M").src="images/h_2_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4M").src="images/h_2_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4M").src="images/h_2_2_m2.png";break;
					}
					break;
				case "DGSandHKS_23":
					document.getElementById("ID_MyShowIMG1M").src="images/1-2-3M.jpg";
					document.getElementById("ID_MyShowIMG3M").src="images/h_2_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4M").src="images/h_2_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4M").src="images/h_2_3_m2.png";break;
					}
					break;
				case "DGSandHKS_24":
					document.getElementById("ID_MyShowIMG1M").src="images/1-2-4M.jpg";
					document.getElementById("ID_MyShowIMG3M").src="images/h_2_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4M").src="images/h_2_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4M").src="images/h_2_4_m2.png";break;
					}
					break;
			}
			break;
		case "SYZT_2":
			switch(document.getElementById("ID_selectDGSandHKS").value)
			{
				case "DGSandHKS_11":
					document.getElementById("ID_MyShowIMG1M").src="images/2-1-1M.jpg";
					document.getElementById("ID_MyShowIMG3M").src="images/v_1_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4M").src="images/v_1_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4M").src="images/v_1_1_m2.png";break;
					}
					break;
				case "DGSandHKS_12":
					document.getElementById("ID_MyShowIMG1M").src="images/2-1-2M.jpg";
					document.getElementById("ID_MyShowIMG3M").src="images/v_1_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4M").src="images/v_1_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4M").src="images/v_1_2_m2.png";break;
					}
					break;
				case "DGSandHKS_13":
					document.getElementById("ID_MyShowIMG1M").src="images/2-1-3M.jpg";
					document.getElementById("ID_MyShowIMG3M").src="images/v_1_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4M").src="images/v_1_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4M").src="images/v_1_3_m2.png";break;
					}
					break;
				case "DGSandHKS_14":
					document.getElementById("ID_MyShowIMG1M").src="images/2-1-4M.jpg";
					document.getElementById("ID_MyShowIMG3M").src="images/v_1_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4M").src="images/v_1_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4M").src="images/v_1_4_m2.png";break;
					}
					break;
				case "DGSandHKS_21":
					document.getElementById("ID_MyShowIMG1M").src="images/2-2-1M.jpg";
					document.getElementById("ID_MyShowIMG3M").src="images/v_2_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4M").src="images/v_2_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4M").src="images/v_2_1_m2.png";break;
					}
					break;
				case "DGSandHKS_22":
					document.getElementById("ID_MyShowIMG1M").src="images/2-2-2M.jpg";
					document.getElementById("ID_MyShowIMG3M").src="images/v_2_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4M").src="images/v_2_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4M").src="images/v_2_2_m2.png";break;
					}
					break;
				case "DGSandHKS_23":
					document.getElementById("ID_MyShowIMG1M").src="images/2-2-3M.jpg";
					document.getElementById("ID_MyShowIMG3M").src="images/v_2_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4M").src="images/v_2_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4M").src="images/v_2_3_m2.png";break;
					}
					break;
				case "DGSandHKS_24":
					document.getElementById("ID_MyShowIMG1M").src="images/2-2-4M.jpg";
					document.getElementById("ID_MyShowIMG3M").src="images/v_2_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4M").src="images/v_2_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4M").src="images/v_2_4_m2.png";break;
					}
					break;
			}
			break;
		case "SYZT_3":
			switch(document.getElementById("ID_selectDGSandHKS").value)
			{
				case "DGSandHKS_11":
					document.getElementById("ID_MyShowIMG1M").src="images/3-1-1M.jpg";
					document.getElementById("ID_MyShowIMG3M").src="images/k_1_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4M").src="images/k_1_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4M").src="images/k_1_1_m2.png";break;
					}
					break;
				case "DGSandHKS_12":
					document.getElementById("ID_MyShowIMG1M").src="images/3-1-2M.jpg";
					document.getElementById("ID_MyShowIMG3M").src="images/k_1_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4M").src="images/k_1_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4M").src="images/k_1_2_m2.png";break;
					}
					break;
				case "DGSandHKS_13":
					document.getElementById("ID_MyShowIMG1M").src="images/3-1-3M.jpg";
					document.getElementById("ID_MyShowIMG3M").src="images/k_1_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4M").src="images/k_1_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4M").src="images/k_1_3_m2.png";break;
					}
					break;
				case "DGSandHKS_14":
					document.getElementById("ID_MyShowIMG1M").src="images/3-1-4M.jpg";
					document.getElementById("ID_MyShowIMG3M").src="images/k_1_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4M").src="images/k_1_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4M").src="images/k_1_4_m2.png";break;
					}
					break;
				case "DGSandHKS_21":
					document.getElementById("ID_MyShowIMG1M").src="images/3-2-1M.jpg";
					document.getElementById("ID_MyShowIMG3M").src="images/k_2_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4M").src="images/k_2_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4M").src="images/k_2_1_m2.png";break;
					}
					break;
				case "DGSandHKS_22":
					document.getElementById("ID_MyShowIMG1M").src="images/3-2-2M.jpg";
					document.getElementById("ID_MyShowIMG3M").src="images/k_2_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4M").src="images/k_2_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4M").src="images/k_2_2_m2.png";break;
					}
					break;
				case "DGSandHKS_23":
					document.getElementById("ID_MyShowIMG1M").src="images/3-2-3M.jpg";
					document.getElementById("ID_MyShowIMG3M").src="images/k_2_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4M").src="images/k_2_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4M").src="images/k_2_3_m2.png";break;
					}
					break;
				case "DGSandHKS_24":
					document.getElementById("ID_MyShowIMG1M").src="images/3-2-4M.jpg";
					document.getElementById("ID_MyShowIMG3M").src="images/k_2_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4M").src="images/k_2_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4M").src="images/k_2_4_m2.png";break;
					}
					break;
			}
			break;
		case "SYZT_4":
			switch(document.getElementById("ID_selectDGSandHKS").value)
			{
				case "DGSandHKS_11":
					document.getElementById("ID_MyShowIMG1").src="images/4_1_1.png";
					document.getElementById("ID_MyShowIMG3").src="images/hs_1_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_1_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_1_1_m2.png";break;
					}
					break;
				case "DGSandHKS_12":
					document.getElementById("ID_MyShowIMG1").src="images/4_1_2.png";
					document.getElementById("ID_MyShowIMG3").src="images/hs_1_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_1_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_1_2_m2.png";break;
					}
					break;
				case "DGSandHKS_13":
					document.getElementById("ID_MyShowIMG1").src="images/4_1_3.png";
					document.getElementById("ID_MyShowIMG3").src="images/hs_1_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_1_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_1_3_m2.png";break;
					}
					break;
				case "DGSandHKS_14":
					document.getElementById("ID_MyShowIMG1").src="images/4_1_4.png";
					document.getElementById("ID_MyShowIMG3").src="images/hs_1_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_1_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_1_4_m2.png";break;
					}
					break;
				case "DGSandHKS_21":
					document.getElementById("ID_MyShowIMG1").src="images/4_2_1.png";
					document.getElementById("ID_MyShowIMG3").src="images/hs_2_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_2_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_2_1_m2.png";break;
					}
					break;
				case "DGSandHKS_22":
					document.getElementById("ID_MyShowIMG1").src="images/4_2_2.png";
					document.getElementById("ID_MyShowIMG3").src="images/hs_2_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_2_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_2_2_m2.png";break;
					}
					break;
				case "DGSandHKS_23":
					document.getElementById("ID_MyShowIMG1").src="images/4_2_3.png";
					document.getElementById("ID_MyShowIMG3").src="images/hs_2_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_2_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_2_3_m2.png";break;
					}
					break;
				case "DGSandHKS_24":
					document.getElementById("ID_MyShowIMG1").src="images/4_2_4.png";
					document.getElementById("ID_MyShowIMG3").src="images/hs_2_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_2_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/hs_2_4_m2.png";break;
					}
					break;
			}
			break;
		case "SYZT_5":
			switch(document.getElementById("ID_selectDGSandHKS").value)
			{
				case "DGSandHKS_11":
					document.getElementById("ID_MyShowIMG1").src="images/5_1_1.png";
					document.getElementById("ID_MyShowIMG3").src="images/vs_1_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_1_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_1_1_m2.png";break;
					}
					break;
				case "DGSandHKS_12":
					document.getElementById("ID_MyShowIMG1").src="images/5_1_2.png";
					document.getElementById("ID_MyShowIMG3").src="images/vs_1_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_1_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_1_2_m2.png";break;
					}
					break;
				case "DGSandHKS_13":
					document.getElementById("ID_MyShowIMG1").src="images/5_1_3.png";
					document.getElementById("ID_MyShowIMG3").src="images/vs_1_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_1_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_1_3_m2.png";break;
					}
					break;
				case "DGSandHKS_14":
					document.getElementById("ID_MyShowIMG1").src="images/5_1_4.png";
					document.getElementById("ID_MyShowIMG3").src="images/vs_1_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_1_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_1_4_m2.png";break;
					}
					break;
				case "DGSandHKS_21":
					document.getElementById("ID_MyShowIMG1").src="images/5_2_1.png";
					document.getElementById("ID_MyShowIMG3").src="images/vs_2_1_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_2_1_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_2_1_m2.png";break;
					}
					break;
				case "DGSandHKS_22":
					document.getElementById("ID_MyShowIMG1").src="images/5_2_2.png";
					document.getElementById("ID_MyShowIMG3").src="images/vs_2_2_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_2_2_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_2_2_m2.png";break;
					}
					break;
				case "DGSandHKS_23":
					document.getElementById("ID_MyShowIMG1").src="images/5_2_3.png";
					document.getElementById("ID_MyShowIMG3").src="images/vs_2_3_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_2_3_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_2_3_m2.png";break;
					}
					break;
				case "DGSandHKS_24":
					document.getElementById("ID_MyShowIMG1").src="images/5_2_4.png";
					document.getElementById("ID_MyShowIMG3").src="images/vs_2_4_dimension.png";
					switch(document.getElementById("ID_selectFZnum").value)
					{
						case "FZnum_1":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_2_4_m1.png";break;
						case "FZnum_2":
						    document.getElementById("ID_MyShowIMG4").src="images/vs_2_4_m2.png";break;
					}
					break;
			}
			break;
	}
	
	switch(document.getElementById("ID_selectDGSandHKS").value)
	{
	case "DGSandHKS_11":
		document.getElementById("ID_1_Rs").style.visibility="hidden";
		document.getElementById("ID_1_Bs1").style.visibility="hidden";		
		document.getElementById("ID_1_Bs2").style.visibility="hidden";		
		document.getElementById("ID_1_Bs3").style.visibility="hidden";		
		document.getElementById("ID_2_Rs").style.visibility="hidden";		
		document.getElementById("ID_2_Bs1").style.visibility="hidden";
		document.getElementById("ID_2_Bs2").style.visibility="hidden";
		document.getElementById("ID_2_Bs3").style.visibility="hidden";
		break;
	case "DGSandHKS_12":
		document.getElementById("ID_1_Rs").style.visibility="hidden";
		document.getElementById("ID_1_Bs1").style.visibility="visible";		
		document.getElementById("ID_1_Bs2").style.visibility="hidden";		
		document.getElementById("ID_1_Bs3").style.visibility="hidden";		
		document.getElementById("ID_2_Rs").style.visibility="hidden";		
		document.getElementById("ID_2_Bs1").style.visibility="visible";
		document.getElementById("ID_2_Bs2").style.visibility="hidden";
		document.getElementById("ID_2_Bs3").style.visibility="hidden";	
		break;
	case "DGSandHKS_13":
		document.getElementById("ID_1_Rs").style.visibility="hidden";
		document.getElementById("ID_1_Bs1").style.visibility="visible";		
		document.getElementById("ID_1_Bs2").style.visibility="visible";		
		document.getElementById("ID_1_Bs3").style.visibility="hidden";		
		document.getElementById("ID_2_Rs").style.visibility="hidden";		
		document.getElementById("ID_2_Bs1").style.visibility="visible";
		document.getElementById("ID_2_Bs2").style.visibility="visible";
		document.getElementById("ID_2_Bs3").style.visibility="hidden";	
		break;
	case "DGSandHKS_14":
		document.getElementById("ID_1_Rs").style.visibility="hidden";
		document.getElementById("ID_1_Bs1").style.visibility="visible";		
		document.getElementById("ID_1_Bs2").style.visibility="visible";		
		document.getElementById("ID_1_Bs3").style.visibility="visible";		
		document.getElementById("ID_2_Rs").style.visibility="hidden";		
		document.getElementById("ID_2_Bs1").style.visibility="visible";
		document.getElementById("ID_2_Bs2").style.visibility="visible";
		document.getElementById("ID_2_Bs3").style.visibility="visible";	
		break;
	case "DGSandHKS_21":
		document.getElementById("ID_1_Rs").style.visibility="visible";
		document.getElementById("ID_1_Bs1").style.visibility="hidden";		
		document.getElementById("ID_1_Bs2").style.visibility="hidden";		
		document.getElementById("ID_1_Bs3").style.visibility="hidden";		
		document.getElementById("ID_2_Rs").style.visibility="visible";		
		document.getElementById("ID_2_Bs1").style.visibility="hidden";
		document.getElementById("ID_2_Bs2").style.visibility="hidden";
		document.getElementById("ID_2_Bs3").style.visibility="hidden";
		break;
	case "DGSandHKS_22":
		document.getElementById("ID_1_Rs").style.visibility="visible";
		document.getElementById("ID_1_Bs1").style.visibility="visible";		
		document.getElementById("ID_1_Bs2").style.visibility="hidden";		
		document.getElementById("ID_1_Bs3").style.visibility="hidden";		
		document.getElementById("ID_2_Rs").style.visibility="visible";		
		document.getElementById("ID_2_Bs1").style.visibility="visible";
		document.getElementById("ID_2_Bs2").style.visibility="hidden";
		document.getElementById("ID_2_Bs3").style.visibility="hidden";
		break;
	case "DGSandHKS_23":
		document.getElementById("ID_1_Rs").style.visibility="visible";
		document.getElementById("ID_1_Bs1").style.visibility="visible";		
		document.getElementById("ID_1_Bs2").style.visibility="visible";		
		document.getElementById("ID_1_Bs3").style.visibility="hidden";		
		document.getElementById("ID_2_Rs").style.visibility="visible";		
		document.getElementById("ID_2_Bs1").style.visibility="visible";
		document.getElementById("ID_2_Bs2").style.visibility="visible";
		document.getElementById("ID_2_Bs3").style.visibility="hidden";
		break;
	case "DGSandHKS_24":
		document.getElementById("ID_1_Rs").style.visibility="visible";
		document.getElementById("ID_1_Bs1").style.visibility="visible";		
		document.getElementById("ID_1_Bs2").style.visibility="visible";		
		document.getElementById("ID_1_Bs3").style.visibility="visible";		
		document.getElementById("ID_2_Rs").style.visibility="visible";		
		document.getElementById("ID_2_Bs1").style.visibility="visible";
		document.getElementById("ID_2_Bs2").style.visibility="visible";
		document.getElementById("ID_2_Bs3").style.visibility="visible";
		break;
	}
	
	switch(document.getElementById("ID_selectFZnum").value)
	{
		case "FZnum_1":
			document.getElementById("ID_1_m2").style.visibility="hidden";
			document.getElementById("ID_1_Ga2").style.visibility="hidden";		
			document.getElementById("ID_1_Gt2").style.visibility="hidden";		
			document.getElementById("ID_1_Gr2").style.visibility="hidden";		
			document.getElementById("ID_2_m2").style.visibility="hidden";		
			document.getElementById("ID_2_Ga2").style.visibility="hidden";
			document.getElementById("ID_2_Gt2").style.visibility="hidden";
			document.getElementById("ID_2_Gr2").style.visibility="hidden";
			break;
		case "FZnum_2":
			document.getElementById("ID_1_m2").style.visibility="visible";
			document.getElementById("ID_1_Ga2").style.visibility="visible";		
			document.getElementById("ID_1_Gt2").style.visibility="visible";		
			document.getElementById("ID_1_Gr2").style.visibility="visible";		
			document.getElementById("ID_2_m2").style.visibility="visible";		
			document.getElementById("ID_2_Ga2").style.visibility="visible";
			document.getElementById("ID_2_Gt2").style.visibility="visible";
			document.getElementById("ID_2_Gr2").style.visibility="visible";
			break;
	}
	//角度是否显示
	switch(document.getElementById("ID_selectSYZT").value)
	{
		case "SYZT_1":
		    document.getElementById("ID_rad").style.visibility="hidden";
		    document.getElementById("ID_2_rad").style.visibility="hidden";
			break;
		case "SYZT_2":
		    document.getElementById("ID_rad").style.visibility="hidden";
		    document.getElementById("ID_2_rad").style.visibility="hidden";
			break;
		case "SYZT_3":
		    document.getElementById("ID_rad").style.visibility="hidden";
		    document.getElementById("ID_2_rad").style.visibility="hidden";
			break;
		case "SYZT_4":
		    document.getElementById("ID_rad").style.visibility="visible";
		    document.getElementById("ID_2_rad").style.visibility="visible";
			break;
		case "SYZT_5":
		    document.getElementById("ID_rad").style.visibility="visible";
		    document.getElementById("ID_2_rad").style.visibility="visible";
			break;
	}
}
