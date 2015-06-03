"use strict";

/*
* 드래그 앤 드롭 가능한 환경 만들고
*   - //마우스 캐치를 먼저
* 드래그 시작
*   - //마우스 클릭하면 이벤트 시작
*   - //떼기전에 마우스를 옴기면 오브젝트가 따라붙는다
*   - //떼면 사라진다
*   - 끝으로 들어가 떼면 이벤트2
* 드래그 끝을 정한다ㄴ
*   - 드래그가 시작되면 드래그엔드도 대비? 활성?
*   - 드래그A가 영역내로 와서 떨어지면 이벤트 2
* */



// 드래그 아이템이 1개인지 여러개인지 확인하고 각각 생성
function MultiDragenv(a,b){
    var testa = document.getElementsByClassName(a);
    var testb = document.getElementsByClassName(b);
    if (testa[1] || testb[1]){
        for(var i =0; i<testa.length; i++){
            for (var j =0; j<testb.length; j++){
                new Dragenv(testa[i],testb[j]);
            }
        }
    } else {
        new Dragenv(testa[0],testb[0]);
    }
}

function Dragenv(a,b){
    //this._init(a,b);
    this.mouse(a,b);
}

Dragenv.prototype = {
    state:function(arg){
        var state1 = document.getElementById('state');
        state1.innerHTML = arg;
    },
    mouse:function(a,b){
        var _self = this,
            mouseDown = false,
            mouseMove = false,
            mouseGrab = false,
            mouseHover = false;

        document.addEventListener('mousemove',function(e){
            mouseMove = true;
            if (mouseDown){
                mouseGrab = true;

                var grabMoveY  = e.pageY - (a.clientHeight/2);
                var grabMoveX  = e.pageX - (a.clientWidth/2);

                var mouseNowY = e.pageY;
                var mouseNowX = e.pageX;

                //console.log(grabMoveX,grabMoveY,mouseNowX,mouseNowY);

                _self.objectMove(grabMoveY,grabMoveX);
                _self.dropCheker(b,grabMoveY,grabMoveX);
            }
        });
        a.addEventListener('mousedown', function(){
            mouseDown = true;

            if(mouseMove) {
                mouseGrab = true;
                _self.objectDouble(this);
            }
        });
        document.addEventListener('mouseup', function(e){
            var c = e.pageY,
                d = e.pageX;

            if (mouseGrab && !mouseHover){
                _self.doubleWrapper.parentNode.removeChild(_self.doubleWrapper);
            }
            if(mouseGrab && _self.dropCheker(b,c,d)){
                _self.dropACtion(a.getAttribute('class'));
            }
            mouseDown = false;
            mouseGrab = false;
        });
    },
    // 드래그 시작하면 오브젝트 복제
    objectDouble:function(a){
        //console.log(this,'복제하려는데this는 뭔가용');
        this.doubleWrapper = document.createElement('div');
        this.doubleWrapper.setAttribute('style','position: absolute; top:0; left:0; right:0; bottom:0;');
        document.body.appendChild(this.doubleWrapper);
        //a.parentNode.appendChild();
        this.oDouble = a.cloneNode(true);
        //console.log(this.oDouble);
        this.oDouble.setAttribute('style','display:none;');
        //a.parentNode.appendChild(this.oDouble);
        //console.log(doubleWrapper);
        this.doubleWrapper.appendChild(this.oDouble);
        //document.body.appendChild(this.oDouble);

    },
    // 드래그 포지션 top left 수치로 복제 오브젝트 마우스에 붙이기
    objectMove:function(ina,inb){
        var style = "position:absolute; top:"+ina+"px; left:"+inb+"px; opacity:0.5; margin:0; cursor:pointer;";
        //var old = this.oDouble.getAttribute('style');
        this.oDouble.setAttribute('style',style);
        //console.log(style);
    },
    //// 상위 오브젝트 마진 있어?
    //parentMarginChecker:function(arg){
    //    var fullword = arg.parentNode.getAttribute('style');
    //    if(fullword.indexOf('margin') === 0){
    //        //console.log(fullword.indexOf('margin'));
    //        return true;
    //    }
    //},
    // 상위 오브젝트 렐러티브?
    parentRelativeChecker:function(arg){
        if (arg.parentNode.getAttribute('style')){
            var fullword = arg.parentNode.getAttribute('style');
            //console.log(fullword, fullword.indexOf('position'));
            if(fullword.indexOf('position') === 0){
                //console.log('relative 있어');
                return true;
            }
        }
    },
    // 드랍 영역 들어왔는지 체크
    dropCheker:function(b,grabMoveY,grabMoveX){

        var top = b.offsetTop,
            left = b.offsetLeft;

        //if(b.parentNode.offsetTop || b.parentNode.offsetLeft) { //상위에 relative가 있을 때
        //    top = b.parentNode.offsetTop + b.offsetTop;
        //    left = b.parentNode.offsetLeft + b.offsetLeft;
        //}
        //console.log('렐러',this.parentRelativeChecker(b));
        if (this.parentRelativeChecker(b)){
            top = b.parentNode.offsetTop + b.offsetTop;
            left = b.parentNode.offsetLeft + b.offsetLeft;
        }
        //console.log('마진',this.parentMarginChecker(b));
        //if (this.parentMarginChecker(b)){ // 상위에 마진이 있을때
        //    top = b.offsetTop;
        //    left = b.offsetLeft;
        //}
        //if(b.parentNode.offsetTop || b.parentNode.offsetLeft) { //상위에 margin 등이 있을때?
        //    top = b.parentNode.offsetTop + b.offsetTop;
        //    left = b.parentNode.offsetLeft + b.offsetLeft;
        //}


        //console.log(b.parentNode.offsetTop, b.parentNode.offsetLeft, b.offsetTop, b.offsetLeft);


        //// 도착하는 위치 표시
        //var newobj = document.createElement('div'),
        //    objwidth = b.clientWidth,
        //    objheight = b.clientHeight,
        //    style = "position:absolute; background:red; width:"+objwidth+"px; height:"+objheight+"px; top:"+top+"px; left:"+left+"px; ";
        //
        //newobj.setAttribute('style',style);
        //document.body.appendChild(newobj);

        //console.log(b.offsetTop, b.offsetLeft, top, left);

        if (left < grabMoveX && grabMoveX < left+(b.clientWidth)) {
            if (top < grabMoveY && grabMoveY < top+(b.clientHeight)) {
                console.log('ok');
                return true;
            }
        }
    },
    // 드랍 영역 들어왔고, 마우스를 떼면 작동
    dropACtion:function(data){
        this.state(data);
    }
};


new MultiDragenv('obj1','obj2');

new MultiDragenv('obj1-2','obj2-2');

