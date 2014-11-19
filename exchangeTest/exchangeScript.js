/*
 작동 기능
 // 0. 인풋 2개 있는지 검증 >> 생략, select 랑 input은 기본적으로 있는걸로
 // 1. 변경 사항은 실시간으로 적용, 단위표기, 나라 지도 등 >> 실시간 X, 선택, key입력으로 적용
 // 2. 셀렉트시 국기 변경, 단위 하단 변경, 단위 우측 변경
 // 3. 금액 적을때, 반대 금액 실시간 변경
 // 4. 최근에 수치를 입력한 기준으로 다른쪽 고치기
 // 5. 숫자 소숫점 2자리까지만
 // 6. 숫자만 입력 가능하도록
 // 7. 초기화
 // 8. 입력 수 젤 앞에 0 지우기 >> 값 제일 앞 0 일때 삭제
 // 0. 오류 먼저, 키입력 바뀌었을때, NaN 뜨는 내용
 // 3. 하나씩만 지우기
 // + 강제 0 입력시 단위에 00 표기 지우기
 //10. 자리수 쉼표 표시하기
 // 2. 최고 수, >> html 에 maxlength 추가

 9. 셀렉티드 다시 적용시키기
 7. 0 이상일때 뒤에서 부터 입력, >> 마우스 땔 때  문자 길이 젤 뒤로 보내기 >> 키 하단 입력?
 11. 단위 우측 한글 표기

// 미구현
3. 하단에 매매기준율 전일대비 등락율 값 가져오기
5. 국가별 환율, 국가 기준 금액 넣어서 새로고침

*/
var nhn = {};

nhn.exchange = function(){
    this.nodeInit();
    this.attachEvent();
    this.init();
};

nhn.exchange.prototype = {
    //currencyData : {USD:1000, KRW:1095400, JPY:116060, EUR:800, CNY:6130, AUS:1140, CAD:1130, NZD:1260},
    currencyRateData : {USD:10000000000, KRW:10985000000000, JPY:1165294691729.96, EUR:8018599354.72, CNY:61262617812.73, AUS:1146396443405, CAD:11284026707.76, NZD:12586507172.65},
    currencyUnitRight : {USD:"달러", KRW:"원", JPY:"엔", EUR:"유료", CNY:"위안", AUS:"달러", CAD:"달러", NZD:"달러"},
    currencyMax : 10000,

    init:function(){
        this.changeNationPre();
        this.changeNationNxt();
        this.currencyInput02.value = 0;
        this.currencyInput01.value = 0;
        //this.stateNationPre = this.selectNation01.options[this.selectNation01.selectedIndex].getAttribute('data-unit');
        //this.stateNationNxt = this.selectNation02.options[this.selectNation02.selectedIndex].getAttribute('data-unit');
    },
    nodeInit:function(){
        this.selectNation01 = document.getElementById("ecg_ifmt");
        this.selectNation02 = document.getElementById("ecg_ifmt2");

        this.currencyInput01 = document.getElementById("num");
        this.currencyInput02 = document.getElementById("num2");

        this.currencyInput01.setAttribute("maxlength","16");
        this.currencyInput02.setAttribute("maxlength","16");

        this.flag = document.getElementsByClassName("flag");
        this.unitLeft = document.getElementsByClassName("nt_eng");
        this.unitright = document.getElementsByClassName("nb_txt");
     },
    attachEvent:function(){
        var that = this;
        this.selectNation01.addEventListener("change",function(){
            that.changeNationPre();
        });
        this.selectNation02.addEventListener("change",function(){
            that.changeNationNxt();
        });

        this.currencyInput01.addEventListener("keyup",function(){
            that.recentInputChecker = 0;
            that.changeNationPre();
            that.currencyInput02.value = that.regCommaOn(Number(that.currnetCalc(that.stateNationPre, that.stateNationNxt, that.regCommaOff(that.currencyInput01.value))).toFixed(2).toLocaleString());
            that.currencyInput01.value = that.regCommaOn(that.regCommaOff(that.currencyInput01.value));
        });
        this.currencyInput02.addEventListener("keyup",function(){
            that.recentInputChecker = 1;
            that.changeNationNxt();
            that.currencyInput01.value = that.regCommaOn(Number(that.currnetCalc(that.stateNationNxt, that.stateNationPre, that.regCommaOff(that.currencyInput02.value))).toFixed(2).toLocaleString());
            that.currencyInput02.value = that.regCommaOn(that.regCommaOff(that.currencyInput02.value));
        });
        this.currencyInput01.addEventListener("click",function(){
        });
        this.currencyInput02.addEventListener("click",function(){
        });

        this.currencyInput01.addEventListener("keydown",function(){
            that.leadingZeroCheck(that.currencyInput01);
            that.isNumDot(event);

        });
        this.currencyInput02.addEventListener("keydown",function(){
            that.leadingZeroCheck(that.currencyInput02);
            that.isNumDot(event);
        });
    },
    selectFlag:function(){
        this.stateNationPre = this.selectNation01.options[this.selectNation01.selectedIndex].getAttribute('data-unit');
        this.stateNationNxt = this.selectNation02.options[this.selectNation02.selectedIndex].getAttribute('data-unit');
    },
    recentInputChecker:0,
    currencyInputBySelected:function(){
        var that = this;
        if (this.recentInputChecker === 0) {
            this.currencyInput02.value = this.regCommaOn(Number(this.currnetCalc(this.stateNationPre, this.stateNationNxt, this.regCommaOff(this.currencyInput01.value))).toFixed(2).toLocaleString());
        } else {
            this.currencyInput01.value = this.regCommaOn(Number(this.currnetCalc(this.stateNationNxt, this.stateNationPre, this.regCommaOff(this.currencyInput02.value))).toFixed(2).toLocaleString());
        }
    },
    changeNationPre:function(){
        this.selectFlag();
        this.currencyInputBySelected();
        this.changeNationFlagPre();
        this.changeNationUnitPre();
        this.changeNationUnitNxt();
    },
    changeNationNxt:function(){
        this.selectFlag();
        this.currencyInputBySelected();
        this.changeNationFlagNxt();
        this.changeNationUnitNxt();
        this.changeNationUnitPre();
    },
    changeNationUnitPre:function(){
        this.unitLeft[0].innerHTML = this.stateNationPre;
        this.unitright[0].innerHTML = this.currencyInput01.value +" "+this.currencyUnitRight[this.stateNationPre];
    },
    changeNationUnitNxt:function(){
        this.unitLeft[1].innerHTML = this.stateNationNxt;
        this.unitright[1].innerHTML = this.currencyInput02.value +" "+this.currencyUnitRight[this.stateNationNxt];
    },
    changeNationKorUnitPre:function(){

    },
    changeNationKorUnitNxt:function(){

    },

    changeNationFlagPre:function() {
        this.flag[0].setAttribute("class", "flag "+(this.stateNationPre).toLowerCase());
    },
    changeNationFlagNxt:function() {
        this.flag[1].setAttribute("class","flag "+(this.stateNationNxt).toLowerCase());
    },

    leadingZeroCheck:function(arg){
        if (arg.value[0] === "0") { arg.value = ""; }
    },
    regCommaOn:function(arg){
        var reg = /(^[+-]?\d+)(\d{3})/;

        arg += '';
        while ( reg.test(arg) ) {
            arg = arg.replace(reg, '$1'+','+'$2');

        }
        return arg;
    },
    regCommaOff:function(arg) {
        arg = String(arg).replace(/\,/g,"");
        return arg;
    },
    currnetCalc : function(){
        if (arguments[2] === ""){ return 0;}
        return (parseFloat(arguments[2])/parseFloat(this.currencyRateData[arguments[0]])*parseFloat(this.currencyRateData[arguments[1]])).toFixed(2);
    },
    isNumDot : function(event){
        ///console.log(event.keyCode);
        var ky = event.keyCode;
        if (!((ky<58 && ky>47) || (ky<106 && ky>95) || (ky===46 || ky===8) || (ky===190 || ky===110))){
            event.preventDefault();
        }
    }
};
var imsi;
var execute = new nhn.exchange();


