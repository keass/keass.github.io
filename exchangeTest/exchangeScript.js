/*
기능 구현 목표
 // 0. 인풋 2개 있는지 검증 >> 생략, select 랑 input은 기본적으로 있는걸로
 // 1. 변경 사항은 실시간으로 적용, 단위표기, 나라 지도 등 >> 실시간 X, 선택, key입력으로 적용
 // 2. 셀렉트시 국기 변경, 단위 하단 변경, 단위 우측 변경
 // 3. 금액 적을때, 반대 금액 실시간 변경
 // 4. 최근에 수치를 입력한 기준으로 다른쪽 고치기
 // 5. 숫자 소숫점 2자리까지만
 // 6. 숫자만 입력 가능하도록
 // 7. 초기화
 // 8. 입력 수 젤 앞에 0 지우기 >> 값 제일 앞 0 일때 삭제
 // 9. 오류 먼저, 키입력 바뀌었을때, NaN 뜨는 내용
 //10. 하나씩만 지우기
 //11 강제 0 입력시 단위에 00 표기 지우기
 //12. 자리수 쉼표 표시하기
 //13. 최고 수, >> html 에 maxlength 추가

// 과제 제출 이후 작업
 0. 점 중복 입력 방지
 1. 인풋 비어있을때 0 넣기

 // 미구현
 1. 인풋 입력 뒤에서부터 가능하도록
 2. 셀렉티드 다시 적용시키기
 3. 우측 하단 단위 조,억,만 단위 한글로 표기
 +. 국가별 환율, 국가 기준 금액 넣어서 새로고침
 +. 하단에 매매기준율 전일대비 등락율 값 가져오기
*/
var nhn = {};

nhn.exchange = function(){
    this.nodeInit();
    this.attachEvent();
    this.init();
};

nhn.exchange.prototype = {
    currencyRateData : {USD:10000000000, KRW:10985000000000, JPY:1165294691729.96, EUR:8018599354.72, CNY:61262617812.73, AUS:1146396443405, CAD:11284026707.76, NZD:12586507172.65},
    currencyUnitRight : {USD:"달러", KRW:"원", JPY:"엔", EUR:"유로", CNY:"위안", AUS:"달러", CAD:"달러", NZD:"달러"},
    currencyMax : 10000,

    init:function(){
        this.changeNationPre();
        this.changeNationNxt();
        this.currencyInput02.value = 0;
        this.currencyInput01.value = 0;
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
            if (this.value === "") { this.value ="0"; }
        });
        this.currencyInput02.addEventListener("keyup",function(){
            that.recentInputChecker = 1;
            that.changeNationNxt();
            that.currencyInput01.value = that.regCommaOn(Number(that.currnetCalc(that.stateNationNxt, that.stateNationPre, that.regCommaOff(that.currencyInput02.value))).toFixed(2).toLocaleString());
            that.currencyInput02.value = that.regCommaOn(that.regCommaOff(that.currencyInput02.value));
            if (this.value === "") { this.value ="0"; }
        });
        this.currencyInput01.addEventListener("keydown",function(){
            that.leadingZeroCheck(that.currencyInput01);
            that.isNumbersAndDot(event);
            that.dobleDotCheck(this.value,event);

        });
        this.currencyInput02.addEventListener("keydown",function(){
            that.leadingZeroCheck(that.currencyInput02);
            that.isNumbersAndDot(event);
            that.dobleDotCheck(this.value,event);
        });
    },
    selectFlag:function(){
        this.stateNationPre = this.selectNation01.options[this.selectNation01.selectedIndex].getAttribute('data-unit');
        this.stateNationNxt = this.selectNation02.options[this.selectNation02.selectedIndex].getAttribute('data-unit');
    },
    recentInputChecker:0,
    currencyInputBySelected:function(){
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
        this.unitright[0].innerHTML = this.regCommaOn(this.regCommaOff(this.currencyInput01.value)) +" "+this.currencyUnitRight[this.stateNationPre];
    },
    changeNationUnitNxt:function(){
        this.unitLeft[1].innerHTML = this.stateNationNxt;
        this.unitright[1].innerHTML = this.regCommaOn(this.regCommaOff(this.currencyInput02.value)) +" "+this.currencyUnitRight[this.stateNationNxt];
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
    dobleDotCheck:function(arg,event){
        var regdot = /\./;
        arg = (this.regCommaOff(arg));
        if (arg.match(regdot)) {
            if ( event.keyCode===190 || event.keyCode===110 ){ event.preventDefault(); }
        }
    },
    regCommaOn:function(arg){
        var reg, parts;
        reg = /(^[+]?\d+)(\d{3})/;
        parts = arg.toString().split(".");
        while ( reg.test(parts) ) {
            parts[0] = parts[0].replace(reg, '$1'+','+'$2');
        }
        return parts.join(".");
    },
    regCommaOff:function(arg) {
        var parts = arg.toString().split(".");
        parts[0] = parts[0].replace(/,/g,"");
        return parts.join(".");
    },
    currnetCalc : function(nationPre,nationNxt,exValue){
        if (exValue === ""|| exValue === "."){ return 0;}
        return (parseFloat(exValue)/parseFloat(this.currencyRateData[nationPre])*parseFloat(this.currencyRateData[nationNxt])).toFixed(2);
    },
    isNumbersAndDot : function(event){
        ///console.log(event.keyCode);
        var ky = event.keyCode;
        if (!((ky<58 && ky>47) || (ky<106 && ky>95) || (ky===46 || ky===8) || (ky===190 || ky===110))){
            event.preventDefault();
        }
    }
};
var execute = new nhn.exchange();


