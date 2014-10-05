/**
 * Created by dongsoo on 2014-10-04.
 *
 * 필요한 기능
 * 최신 브라우저용 탭, 쿼리로 class, id 겟엘레멘트 / 컨텐트 영역 이름 동일 하면 작동 *
 * 초기화 초기탭 외 비활성화, 초기탭콘텐트 영역 외 비활성화
 * 탭 누르면 다른 탭 비활성화 > 같은 이름의 콘텐트 영역활성화 다른 탭 비활성화
 *
 */

var tabmodle = tabmodle || {};

tabmodle.first = function() {
    this._elemenet(); // 프로토 타입 내용 활용
    this._init(); // 초기화
    this._evCap(); // 마우스 클릭 캡쳐
};
tabmodle.first.prototype = {
    _elemenet:function(){
        this.tab = document.getElementById('tab');
        this.tabheader = tab.querySelector("ul li");
        this.tabcontent = tab.querySelector('div');
        this.tabheaderEv = tab.querySelectorAll("ul li");
        this.tabcontentEv = tab.querySelectorAll("div");
    },
    _init:function(){
        this.tabheader.style = "display:none";
        this.tabcontent.style = "display:none"
        this.tabheader.setAttribute("class","active");
        this.tabcontent.setAttribute("class","active");
    },
    _evCap:function(){
        var that = this;
        var count = 0;
        for (var j = 0; j<this.tabheaderEv.length; j++) {
            this.tabheaderEv[j].addEventListener("mousedown",function(){
                    that._tabclick(this);
                });
            }
    },
    _tabclick:function(arg){
        var that = this;
        for (var k = 0; k < that.tabheaderEv.length; k++){
            that.tabheaderEv[k].removeAttribute("class");
            that.tabcontentEv[k].removeAttribute("class");
        }
        arg.setAttribute("class","active");
        var tabheadnum = arg.id.split("_")[1];
        console.log(tabheadnum);
        for (var k = 0; k < that.tabcontentEv.length; k++){
            if (that.tabcontentEv[k].id.split("_")[1] == tabheadnum){
                that.tabcontentEv[k].setAttribute("class","active");
            }
        }



    }
};
var stat = new tabmodle.first();
