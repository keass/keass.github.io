var output = document.getElementById('output');

var isPali = function (arg){ // 대칭수 검사
    var lastone, newone;
    lastone = String(arg).split("");
    lastone.reverse();
    newone = Number(lastone.join(""));
    if (newone === arg ) {
        return true;
    }
};
var two3digitPalindrome = function(){ // 대칭수 출력
    var one3digit,two3digit,arrdigit =[],index;
    for (one3digit = 100; one3digit<1000; one3digit++){
        for (two3digit = 100; two3digit<1000; two3digit++){
            if (isPali(one3digit*two3digit)) {
                index = one3digit+two3digit;
                arrdigit[index] = one3digit*two3digit;
                arrdigit = arrdigit.sort();
                console.log(one3digit, two3digit, index, one3digit*two3digit);
            }
        }
    }
};

two3digitPalindrome(353);