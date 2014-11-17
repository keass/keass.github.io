/*
 작동 기능
 // 생략 0. 인풋 2개 있는지 검증, 나라 선택 검증 > 없으면 생성, 나라 기본으로
 1. 변경 사항은 실시간으로 적용, 단위표기, 나라 지도 등
 1. 셀렉트시 지도 변경, 단위 하단, 단위 우측 변경
 2. 금액 적을때, 하단에 실시간 변경 상대적으로 둘다
 2. 금액 적고, 국가 바꿀때도 수치는 그대로 유지, 새로 계산
 3. 하단에 매매기준율 전일대비 등락율 값 가져오기
 4. 오름은 빨강, 내림은 파랑

 5. 가능하면 국가별 환율 넣고, 국가 기준 금액 넣어서 새로고침
 */
var nhn = {};

nhn.exchange = function(){
    this.currencyInit();
    //this.output();
    this.attachEvent();
};

nhn.exchange.prototype = {
    currencyData : {USD:1, KRW:1095.40, JPY:116.06, EUR:0.80, CNY:6.13, AUS:1.14, CAD:1.13, NZD:1.26},
    stateNationPre:"KRW",
    stateNationNxt:"JPY",
    init:function(){
        this.changeNationPre();
        this.changeNationNxt();
    },
    currencyInit:function(){
         this.selectNation01 = document.getElementById("ecg_ifmt");
         this.selectNation02 = document.getElementById("ecg_ifmt2");
         this.flag = document.getElementsByClassName("flag");
         this.currencyInput01 = document.getElementById("num");
         this.currencyInput02 = document.getElementById("num2");
     },
    attachEvent:function(){
        var that = this;
        this.selectNation01.addEventListener("change",this.cachangeNationPre();});
        this.selectNation02.addEventListener("change",function(){
            that.changeNationNxt();
        });
    },
    changeNationPre:function(){
        this.stateNationPre = this.selectNation01.options[this.selectNation01.selectedIndex].getAttribute('data-unit');
        this.currencyInput02.value = this.currnetCalc(this.stateNationPre, this.stateNationNxt, this.currencyInput01.value);
        this.changeNationFlagPre();
    },
    changeNationNxt:function(){
        this.stateNationNxt = this.selectNation02.options[this.selectNation02.selectedIndex].getAttribute('data-unit');
        this.currencyInput02.value = this.currnetCalc(this.stateNationNxt, this.stateNationPre, this.currencyInput01.value);
        this.changeNationFlagNxt();
    },
    changeNationFlagPre:function() {
        this.flag[0].setAttribute("class", "flag "+(this.stateNationPre).toLowerCase());
    },
    changeNationFlagNxt:function() {
        this.flag[1].setAttribute("class","flag "+(this.stateNationNxt).toLowerCase());
    },
    currnetCalc : function(nation1,nation2,exchValue){
        return (exchValue)/(this.currencyData[arguments[0]])*(this.currencyData[arguments[1]]);
    }
    /*currnetCalcNxt : function(nation1,nation2,exValue){
        return (exchValue)/(this.currencyData[arguments[0]])*(this.currencyData[arguments[1]]);
        //console.log(exValue/nation1*nation2);
        //return exValue/nation1*nation2;
        // 한화 엔화로
    },
    output : function() {
        this.currnetCalc(this.currencyData.KRW, this.currencyData.JPY, 20000);
    }*/
};

var test = new nhn.exchange();


