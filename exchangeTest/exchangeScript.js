/*
 작동 기능
 // 생략 0. 인풋 2개 있는지 검증, 나라 선택 검증 > 없으면 생성, 나라 기본으로
 1. 변경 사항은 실시간으로 적용, 단위표기, 나라 지도 등
 // 1. 셀렉트시 지도 변경, 단위 하단, 단위 우측 변경
 // 2. 금액 적을때, 하단에 실시간 변경 상대적으로 둘다
 // 2. 금액 적고, 국가 바꿀때도 수치는 그대로 유지, 새로 계산
 // 3. 숫자만 입력 가능하도록

 4. 숫자 소숫점 2자리까지만
 4. 0일때 클릭하면 다지우고 입력, 0 이상일때 뒤에서 부터 입력,젤 앞에 0 지우기
 4. 영부터 입력 안됌
 4. 자리수 표시하기
 5. 셀렉티드 위치 바꾸기
 6. 한글 단위 표기


// 하단 내용
3. 하단에 매매기준율 전일대비 등락율 값 가져오기
4. 오름은 빨강, 내림은 파랑
5. 가능하면 국가별 환율 넣고, 국가 기준 금액 넣어서 새로고침

*/
var nhn = {};

nhn.exchange = function(){
    this.nodeInit();
    this.attachEvent();
    this.make2DTnumber(456.126);
};

nhn.exchange.prototype = {
    //currencyData : {USD:1, KRW:1095.40, JPY:116.06, EUR:0.80, CNY:6.13, AUS:1.14, CAD:1.13, NZD:1.26},
    currencyData : {USD:1000, KRW:1095400, JPY:116060, EUR:800, CNY:6130, AUS:1140, CAD:1130, NZD:1260},
    currencyRateData : {USD:10000000000, KRW:10985000000000, JPY:1165294691729.96, EUR:8018599354.72, CNY:61262617812.73, AUS:1146396443405, CAD:11284026707.76, NZD:12586507172.65},
    currencyUnitRight : {USD:"달러", KRW:"원", JPY:"엔", EUR:"유료", CNY:"위안", AUS:"달러", CAD:"달러", NZD:"달러"},

    init:function(){
        this.changeNationPre();
        this.changeNationNxt();
        this.stateNationPre = "KRW";
        this.stateNationNxt = "JPY";
    },
    nodeInit:function(){
        this.selectNation01 = document.getElementById("ecg_ifmt");
        this.selectNation02 = document.getElementById("ecg_ifmt2");
        this.flag = document.getElementsByClassName("flag");
        this.unitLeft = document.getElementsByClassName("nt_eng");
        this.unitright = document.getElementsByClassName("nb_txt");
        this.currencyInput01 = document.getElementById("num");
        this.currencyInput02 = document.getElementById("num2");
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
            //that.isNumDot(event);
            that.changeNationPre();
            that.currencyInput02.value = that.currnetCalc(that.stateNationPre, that.stateNationNxt, that.currencyInput01.value);
            that.recentInputChecker = 0;
        });
        this.currencyInput02.addEventListener("keyup",function(){
            that.changeNationNxt();
            that.currencyInput01.value = that.currnetCalc(that.stateNationNxt, that.stateNationPre, that.currencyInput02.value);
            that.recentInputChecker = 1;
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
            this.currencyInput02.value = this.currnetCalc(that.stateNationPre, that.stateNationNxt, that.currencyInput01.value);
        } else {
            this.currencyInput01.value = this.currnetCalc(that.stateNationNxt, that.stateNationPre, that.currencyInput02.value);
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
    changeNationFlagPre:function() {
        this.flag[0].setAttribute("class", "flag "+(this.stateNationPre).toLowerCase());
    },
    changeNationFlagNxt:function() {
        this.flag[1].setAttribute("class","flag "+(this.stateNationNxt).toLowerCase());
    },
    make2DTnumber:function(arg){ /*
        console.log(arg);
        console.log((10.8).toFixed(3));
        console.log(Math.round(arg,4));
        console.log("먼저 3자리 고정하고 2수로 반올림", Math.round(arg.toFixed(3),2));

        console.log(Math.round(arg/1000, 3).toFixed(2));*/
    },
    currnetCalc : function(){
        /*
        var dollorFromChange, dollorToChange, result = 0;
        dollorFromChange = arguments[2]*1/this.currencyRateData[arguments[0]];
        console.log("변환할 값", arguments[2]);
        console.log("달러화 지수",1/this.currencyRateData[arguments[0]]);
        console.log("1차 변환", dollorFromChange);
        result = dollorFromChange*this.currencyRateData[arguments[1]];
        console.log(this.currencyRateData[arguments[1]]);
        console.log("변환된 값은", result);
        */

        //currencyData : {USD:1000, KRW:1095400, JPY:116060, EUR:800, CNY:6130, AUS:1140, CAD:1130, NZD:1260}
        console.log("첫번쨰 나라 변환지수", this.currencyRateData[arguments[0]]);
        console.log("두번쨰 나라 변환지수", this.currencyRateData[arguments[1]]);
        console.log(arguments[2]/(this.currencyRateData[arguments[0]])*(this.currencyRateData[arguments[1]]).toFixed(2));
        console.log((arguments[2]*this.currencyRateData[arguments[1]])/(this.currencyRateData[arguments[0]]).toFixed(2));
        return (arguments[2]/(this.currencyRateData[arguments[0]])*(this.currencyRateData[arguments[1]])).toFixed(2);
    },
    isNumDot : function(event){
        //console.log(event.keyCode);
        if ( !(48 <= event.keyCode && event.keyCode <= 57 || 96 <= event.keyCode && event.keyCode <= 105 || event.keyCode === 190 || event.keyCode === 110 || event.keyCode === 8 )){
            event.preventDefault();
        }
    }
};

var execute = new nhn.exchange();


