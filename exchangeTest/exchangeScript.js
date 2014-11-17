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

var check = function(){
    var i;
    var test = document.getElementById("ecg_ifmt");
    var ob = test.querySelectorAll('option[data-unit]');
    var test = ob[0].getAttribute("data-unit");

    for (var i in ob) {
        console.log(ob[i].getAttribute("data-unit"));
        if (ob[i].getAttribute("data-unit") === "KRW" ){
            console.log('한국선택');
        }

    }



    console.log(test);

}
check();