#면접 문제 은행

@version 1.0
 
##Contributors

@bentruyman (http://bentruyman.com/), @roger_raymond (http://twitter.com/iansym), @ajpiano (http://ajpiano.com/), @paul_irish (http://paulirish.com/), @SlexAxton (http://alexsexton.com/), @boazsender (http://boazsender.com/), @miketaylr (http://miketaylr.com/), @vladikoff (http://vladfilippov.com/), @gf3 (http://gf3.ca/), @jon_neal (http://twitter.com/jon_neal), @wookiehangover (http://wookiehangover.com/) and @darcy_clarke (http://darcyclarke.me)

##한국어 번역(한국 상황에 맞춰서 약간 수정 하였습니다.)
@ohgyun(http://ohgyun.com), @nerdog, @javarouka, @Songhun(http://songhun.blogspot.com)

## 일반적인 질문:

* Twitter,Facebook 혹은 Me2day등의 SNS를 사용하시나요?
	* 사용한다면, 누구를 팔로우 하고 있나요?
* GitHub을 사용하시나요?
	* 사용한다면, 어떤 프로젝트를 Watch 혹은 Fork하시나요?
* 자주 보는 Blog가 있습니까?
* 버전 관리 시스템은 어떤 것들을 사용해보셨습니까?
* 선호하는 개발 환경은 무엇입니까? (운영체제, 에디터, 브라우저, 도구 등등)
> 윈도7, 웹스톰, 크롬, 파폭, 음료수

* 당신이 웹 페이지를 만들 때의 과정을 설명 해주실 수 있을까요?
> 간단하게 스케치, html로 마크업, css로 레이아웃만 잡고, 콘텐츠 작성, html/css 먼저 작성, javascript 작성

* 점진적 향상법(progressive enhancement)과 우아한 성능저하법(graceful degradation)의 차이를 설명하실 수 있습니까?
	* "누구도 성공하지 못합니다" 라고 말하면 보너스 포인트를 주세요.
	* 각 특색을 설명을 한다면, 더 높은 보너스 포인트를 주세요.
	
	> **점진적 향상법** html 마크업 완료, css 으로 스타일 추가, js로 사용자 경험 추가 의 순서처럼 토대를 쌓아가며 제작하는 방식		
	> **우아한 성능저하법** 최신 기술(브라우저)를 쓰지 않는 사람들에게도 사용할 수 있게 의도적인 빼기로 만들어지는 방식	
	> **[참고한 글](http://webdesign.about.com/od/webdesignglossary/g/graceful-degradation.htm)**
	
* "시멘틱 HTML(Semantic HTML)"이 무엇을 뜻하는지 설명해주세요.
> 시멘틱이 말 그대로 의미라는 뜻이므로 웹을 설계할때 무의미하고 낭비되는 부분을 없애고, 사람만이 읽을 수 있는 마크업이 아닌 컴퓨터도 분석할 수 있는 체계로 만들어 효과적인 정보만을 골라내어 보여줄 수 있도록 지향하는 기술
> **[참고한 글 : 위키 -시멘틱 웹-](http://ko.wikipedia.org/wiki/%EC%8B%9C%EB%A7%A8%ED%8B%B1_%EC%9B%B9)**

* "최소화(minification)"가 무엇을 하는 것입니까?
> 공백, 줄바꿈, 주석 등을 제거해서 더 간소화 하는 작업, 특히 javascript 와 CSS에 활용성 높음
> **[참고한 글 :위키 -minification-](http://en.wikipedia.org/wiki/Minification_(programming))**

* 여러 도메인을 이용하여 서버 사이트 데이터를 제공하는 것이 더 나은 이유는 무엇인가요?
	* 브라우저가 한 번에 1개의 도메인에서 다운로드 받는 리소스는 몇 개 인가요?
	
	> 과거에는 2개 현재는 6개까지 늘었다고 한다. 파이어폭스는 8개
	[참고한 글 : 스택 오버플로우](http://stackoverflow.com/questions/9583172/how-many-resources-will-a-browser-download-from-a-given-domain-at-a-time) /  [참고한 글2 : 블로그 글](http://sgdev-blog.blogspot.sg/2014/01/maximum-concurrent-connection-to-same.html) 
	한번에 받아 올 수 있는 사이트 데이터량이 8개로 제한적이니 CDN 등 외부 도메인에서 데이터를 제공 받아 동시에 로딩하는 리소스 개수를 여유롭기 위해서 인듯


* 만약에 디자인을 표현하기 위해 8개의 다른 Stylesheet를 가지고 있다면, 사이트에서는 어떻게 통합하실 건가요?
	* 파일의 연결법을 찾아내세요.
	* Build system을 이용한 결합없이, `@import`를 사용하면 점수를 깎으세요.
	
	> 1. 직접 최적화 먼저. 중복값 제거, 우선순위(캐스캐이딩) 고려해서 파일 순서 정해서 통합 진행. 한 파일내 @import로 몰아오는 건 구식
	> 2. 온라인 툴 활용, CSS minify, CSS compressor 정도
	> 3. 큰 규모에서는 최근 알게된 grunt - concat 으로도 가능할 듯
	
* 당신이 프로젝트에 합류했습니다. 근데 그들은 Tab을 이용하고, 당신은 Sapce를 사용했습니다. 어떻게 하실건가요?
	* `:retab!` 명령어를 아는지 확인
	
	> 기존에 작업된 소스 내 tab을 space로 변환하는 명령어 (VIM 인듯)
	> 둘중 하나로 통일해야한다면, 정규표현식으로 Tab <-> space 치환

* 간단한 Slideshow 페이지를 만들어보세요.
	* Javascript를 사용하지 않고 만들었다면, 보너스 점수가 있습니다.

* 당신의 코드의 성능을 테스트하기 위해서 사용하는 도구가 무엇입니까?
> 사용해 본적 없음,  QUnit 활용 예정

* 올해 당신이 익히고 싶은 기술이 있다면, 그것은 무엇입니까?
> javascript MVC, LISP

* 페이지 로딩 시간을 줄이는 3가지 방법은?
> 파일 통합, 공백/여백 최적화, 이미지 최적화

* 표준의 중요함을 설명하세요
> 공통된 작업자들의 시간을 절약 



## HTML에 관련된 질문들:

* `doctype`이 무엇을 하는 것이고, 몇 번 지정할 수 있나요?
> html문서의 DTD 선언 태그,  최상단에 한번 지정가능
> 1. 대표적인 html4 독타입 `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">`
> 2. html5 독타입 `<!DOCTYPE html>`

* 표준모드(standards mode)와 쿽스모드(quirks mode)의 다른 점은 무엇인가요?
> 쿽스는 하위버전 호환을 위해 표준에 어긋나는 형식도 보일 수 있도록 합니다.  쿽스 모드는 1. 독타입을 선언하지 않거나, 2. DTD 주소를 생략하고 선언하거나, 3. (IE 구버전) 첫번째 줄에 아닐 경우 적용됩니다.

* XHTML을 이용한 페이지의 한계점은 무엇이 있나요?
	* `application/xhtml+xml`으로 지정한 페이지에 어떠한 문제가 있나요?

* 다국어가 포함된 페이지는 어떤 방식으로 제공하나요?
> 백엔드 지원 요청, `<html lang="ko>` 언어 기본 설정은 선언해두되, 변수로 다국어 변수를 받도록 요청

* HTML5에서 XHTML문법을 사용할 수 있나요? HTML5에서 XML을 어떻게 사용하나요?
* `data-`속성은 무엇을 하는 것인가요?
> 비표준 시절 이상한 attribute 나 class로 구분해줬는데, data-XXX 와 같은 속성을 지정할 수 있어서 스크립트에서도 유연한 지정이 가능

* HTML4에서 콘텐츠 모델(content models)은 무엇이며, HTML5의 그것과 다른 점은 무엇인가요?
> 1. HTML4에서는 block / inline 두가지
> 2. HTML5에서는 엄격한 규칙들이 세분화 되어있음
> `http://www.w3.org/TR/2011/WD-html5-20110525/content-models.html`

* HTML5를 오픈웹플랫폼(open web platform)으로 생각해본다면, 어떤 것들로 구성돼 있을까요?
* 쿠키(Cookies)와 세션저장소(sessionStorage)와 로컬저장소(localStorage)의 차이점을 설명해주세요.

## Javascript에 관련된 질문들:

* 사용해 본 Javascript 라이브러리들을 말씀해주세요.
> Jquery, jindo, 기타 slide, gallery, skroller 등

* Java와 Javascript의 다른 점은 무엇인가요?
> 햄과 햄버거 처럼 다른거라고.... (상업적인 용도로 이름만 동일)

* `undefined`와 `undeclared` 변수는 무엇인가요?
* 클로져(Closure)는 무엇이며, 어떻게/왜 사용하는지 설명해주세요.
	* 클로져를 만들 때 선호하는 패턴은 무엇인가요? argyle (IIFEs에만 적용할 수 있다)
* 익명함수(anonymous functions)는 주로 어떤 상황에서 사용하나요?
* "Javascript 모듈 패턴(Javascript module pattern)"이 무엇인지 설명을 해주시고, 언제 사용하는지도 말씀해주시기 바랍니다.
	* "네임스페이스(namespacing)"에 대해서 언급을 하면, 보너스 포인트가 있습니다.
	* 당신의 모듈이 네임스페이스가 없는 상황이라면?
* 당신의 코드를 어떻게 구성하는지?(모듈 패턴, Class기반 상속?)
* 호스트 객체(Host Objects)와 네이티브 객체(Native Objects)의 차이점은 무엇인가요?
* 다음 코드의 차이점은 무엇인가요?
```javascript
function Person(){} var person = Person() var person = new Person()
```
* `.call`과 `.apply`의 차이점은 무엇인가요?
* `Function.prototype.bind`을 설명 하시오
* 코드 최적화를 하는 시점은 언제인가요?
* Javascript에서 어떻게 상속을 하는지 설명할 수 있나요?
	* "누구도 할 수 없어요" 같은 재밌는 대답 시에 보너스 포인트가 있습니다.
	* 안되는 이유에 대해서 설명을 시도한다면, 더 많은 점수를 주세요.
* `document.write()`를 언제 사용하시나요?
	* 정답 : 1999년 - 초보개발자를 걸러내기 위한 시절
* UA문자열을 이용하여 기능 검출(feature detection)과 기능 추론(feature inference)의 차이점을 설명 하시오.
* AJAX에 관해 가능한 자세히 설명하세요.
* JSONP가 어떻게 동작 되는지 설명하세요.(그리고,실제 AJAX와 어떻게 다른지 설명하세요.)
* 기존에 Javascript 템플릿을 사용한 적이 있나요? 만약에 있다면, 어떠한 방식으로 사용했는지 말씀해주세요.
* "호이스팅(Hoisting)"에 대해서 설명 하시오.
> 함수 내부 상단에 변수를 모아서 선언 하는 것

* FOUC가 무엇이며 FOUC를 어떻게 방지하나요?
* 이벤트 버블링(Event Bubbling)에 대해서 설명하세요.
* "속성(Attribute)"와 "요소(property)"의 차이가 무엇인가요?
* Javascript 객체를 확장하는 것이 좋지 않은 이유는 무엇인가요?
* Document Load 이벤트와 Ready 이벤트의 차이가 무엇인가요?
* `==`와 `===`의 차이점은 무엇인가요?
* 브라우저의 URL에서 파라메터를 얻을 수 있는 방법에 대해서 설명하세요.
* Javascript의 "동일출처정책(the same-origin policy)"에 대해서 설명하세요.
* 이벤트 딜리게이션(Event Delegation)에 대해서 설명하세요.
* Javascript의 상속패턴(inheritance patterns)에 대해서 설명하세요.
* 다음 코드를 동작하게 만드세요.
```javascript
[1,2,3,4,5].duplicator(); // [1,2,3,4,5,1,2,3,4,5]
```
* Javascript에서 메모이제이션(memoization, 중복 계산 방지)에 대한 전략을 설명해주세요.
* 삼항식(Ternary statement)을 사용하는 이유는 무엇이고, 그것을 표현하기 위한 연산자 단어는 무엇인가요?
* arity는 어떠한 함수인가요?

## Javascript 코드 예제:

```javascript
>~~3.14
```
문제: 위 상황의 결과 값은?

**답: 3**

```javascript
"i'm a lasagna hog".split("").reverse().join("");
```
문제: 위 상황의 결과 값은?

**답: "goh angasal a m'i"**

```javascript
( window.foo || ( window.foo = "bar" ) );
```
문제: window.foo의 값은 무엇인가요?

**답: "bar"**

처음에 window.foo는 false, undefined 혹은 0등의 값을 가지고 있다.

```javascript
var foo = "Hello"; (function() { var bar = " World"; alert(foo + bar); })(); alert(foo + bar);
```
문제: 어떠한 두 가지의 알럿이 나올까요?

**답: "Hello World" & ReferenceError: bar is not defined**

## jQuery에 연관된 질문들:

* "체이닝(Chaining)"에 대해서 설명 하세요.
* `.end()`는 무엇을 하는 것입니까?
* 이벤트 핸들러 선언 시, 언제 그리고 왜 namespace를 부여하는지를 설명해주세요.
* 이펙트 큐(queue)라는 것은 무엇인가요?
* `.get()`,`[]` 그리고 `.eq()`의 차이점이 무엇인가요?
* `.bind()`,`.live()`그리고 `.delegate()`의 차이점이 무엇인가요?
* `$`과 `$.fn` 차이점이 무엇인지 설명 해주시오. 혹은, `$.fn`가 무엇인지 설명해주세요.
* 다음 Selector를 최적화 해주세요.:

```javascript
$(".foo div#bar:eq(0)")
```

## CSS 관련 질문들:

* "reset" CSS가 무엇인지, 어떻게 유용한지 설명 해주세요.
> 브라우저별로 초기에 여백이나 패딩, img 의 보더 등 값이 다 차이가 있어서 통일된 값 (보통은 0) 으로 초기화 하는 것. 크로스 브라우징을 위해 css 상단에 선언

* Floats가 어떻게 동작하는지 설명해주세요.
> left, right, none 등의 값을 가지며 말그대로 객체가 뜨는 느낌이 있어서, 아래의 객체들이 아래쪽으로 침범

* 클리어링(Clearing) 기술에는 어떤 것들이 있으며, 어떠한 경우에 어떻게 사용하는 것이 적절한지 설명하세요.
> 플로팅을 해제 하는 기술, Clear:both 가 기본으로 floating을 양쪽으로 주거나 left, right, none 으로 왼쪽, 오른쪽, 모두 해제 할 수 있음

* CSS 스프라이트(CSS Sprites)를 설명하고, 페이지나 사이트를 어떻게 향상시키는지 설명하시오.
> 여러 개의 이미지를 로딩하지 않고, 한 이미지에 그림을 모두 배치하고 css 배경 속성 좌표로 지정해서 이미지 표시. 로딩 속도 향상, 구식 이미지 hover 등을 css 로 개선 가능

* IE box model과 W3C box model의 차이점을 설명하시오.
> [참고 : 위키](http://en.wikipedia.org/wiki/Internet_Explorer_box_model_bug) 
> w3c에는 콘텐츠영역 밖으로 padding, border, margin 순으로 지정되나 IE박스모델은 content 영역 안으로 padding, border가 들어와 사이즈 차이 발생

* Image Replacement를 사용해야 할 때, 선호하는 기술과 언제 사용하는지를 설명 해주세요.
* CSS 요소핵(CSS property hacks)을 조건부적으로 .css파일안에 넣으시나요 혹은 다른 방식이 있나요?
> 프로젝트 컨벤션에 따라 다르나, 간단한 작업시에는 한 파일 내 핵이 필요한 코드 바로 하단에 브라우져별 핵을 추가해서 한번에 볼 수 있도록 지정
> HTML 상단에 브라우져 인식 구문으로 css를 따로 만들기도 함

* 기능이 제약된 브라우저를 위해서 어떤 방식으로 페이지를 만드나요?
	* 어떠한 기술과 절차를 거치는지 설명하시오.
* 컨텐츠를 안보이게 하는 기술들의 차이점을 설명하시오.(그리고 스크린 리더(Screen readers)에서 접근이 가능한 방법은?)
* 그리드 시스템(Grid system)을 사용한 적이 있나요? 있다면 어떠한 것을 선호하나요?
* 미디어 쿼리(media queries)를 사용한 적이 있나요? 혹은 모바일에 맞는 layout과 CSS를 사용한 적이 있나요?
> 미디어 쿼리와 반응형 모두 사용 가능

* SVG를 스타일링 하기 위한 편한 방법이 있나요?
> 온라인 에디팅 툴 활용 (구글 SVG 편집기 등)

* 인쇄를 하기 위해 웹페이지를 어떻게 최적화 하나요?
> print.css 구성 시 필요없는 부분(메뉴, 사이드바)은 숨기고, 배경은 없애고, 특정 페이지 넘김이 필요한 곳은 강제 페이지 넘김 css 지정

* 효율적인 CSS를 작성하기 위한 "비법(gotchas)"은 어떤 게 있나요?
* CSS 전처리(CSS preprocessors)를 사용해보셨나요?
	* 그렇다면, 사용 경험에 기반해 좋았던 점과 나빴던 점을 설명해주세요.
> Sass 사용, 괄호와 세미콜론까지 생략되서 작성 속도 빠름. 줄바꿈과 탭으로 구분이 필요한 만큼 구분하기 위한 에디터 필수 일듯

* 페이지에서 표준 폰트가 아닌 폰트 디자인을 사용할 때 어떤 방식으로 처리하시나요?(웹폰트를 제외하고)
* CSS Selector가 어떠한 원리로 동작하는지 설명하시오.

## 그 외 흥미로운 질문들:

* 당신이 작성한 코드 중 어떤 것을 가장 멋지고, 자랑스럽게 여기나요?
* HTML5 gang sign에 대해서 아시나요?
* 배를 타본 적이 있으세요?
* Firebug와 Webkit Inspector에서 좋아하는 부분을 말씀해주세요.
* 당신 스스로 하는 프로젝트가 있나요? 어떤 종류인가요?
* "유니콘화(cornify)"의 의미를 설명해주세요.
* 한장의 종이 위에, A B C D E를 차례대로 내려 쓰시오. 그다음, 코드로 작성하지 말고, 역순으로 재배치 해보세요.
	* 종이를 위아래를 뒤집어낼 때 까지 기다리세요.
    * 이것은 인터뷰의 끝에 긴장감을 풀어주고 웃음을 줄 수 있는 좋은 방법이 입니다.
* 해적입니까? 닌자입니까?
	* 만약에 둘 다 이며, 좋은 이유를 댄다면 보너스 점수를 주세요.(좀비 몽키 해적 닌자인 경우엔 +2)
* 만약에 웹개발을 안했다면, 무엇을 했었을까요?
* Carmen Sandiego는 세상의 어디에 있을가요?(힌트 : 그들의 답은 항상 틀릴겁니다.)
* Internet Explorer의 당신이 좋아하는 기능은 무엇입니까?
* 다음 문장을 완성하세요 : Brendan Eich 와 Doug Crockford 는 Javascript의 __________ 이다.
* jQuery: 훌륭한 라이브러리인가요? 최고로 좋은 라이브러리인가요? 토론하세요.
