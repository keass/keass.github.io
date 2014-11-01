/**
 * Created by dongsoo on 2014-10-21.
 */

// 1~X 까지 홀,짝 합수 구하기
var oddaddx = function (arg, arg2){
    var k = 0, j = 0, i = 1, midstr = '', midstr2 = '';
    console.log(i%arg2 === 0);
    for (i; i<=arg; i++){
        if (i%arg2 === 0){
            k = k + i;
            midstr = midstr + "+"+i;
        } else if (i%arg2 === 1) {
            j = j + i;
            console.log(j);
            midstr2 = midstr2 + "+"+i;
        }
    }

    if (arg2 === 2) {
        console.log(midstr, k);
    } else if (arg2 === 1) {
        console.log(midstr2, j);
    }


};

oddaddx(12,1);
