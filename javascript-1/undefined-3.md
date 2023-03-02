# 콜백함수와 고차함수

## 고차함수란 ? <a href="#undefined" id="undefined"></a>

매개변수를 통해 함수의 외부에서 콜백 함수를 전달받은 함수를 말한다.\
함수를 인자로 받을 수 있고 함수 형태로 리턴할 수 있는 함수를 말한다.

```javascript
// 함수를 인자를 받으면서 함수를 리턴한다.
// highorderFunc 함수는 callback이라는 함수를 매개변수로 받았으므로 고차함수다.
const highorderFunc = (number, callback) => callback(number);

const callback = (number) => number + number;

highorderFunc(10, callback);
```

## 콜백함수란 ? <a href="#undefined" id="undefined"></a>

다른 함수의 인자로 전달되는 함수를 말한다.\
<mark style="color:red;">**콜백함수는 고차함수에 의해 호출되며 고차 함수는 필요에 따라 콜백에 인수를 를 전달할 수 있다.**</mark>\
콜백함수는 이벤트, Ajax통신, 타이머 함수 등에 활용된다.

### 사용하는 이유 <a href="#undefined" id="undefined"></a>

함수에 비슷한 공통로직은 있는데 경우에 따라 변경되어야 할 때 사용한다.\
무슨 말이냐면 코드 예시를 봐보자.

### 일반적인 작성방법. <a href="#undefined" id="undefined"></a>

```javascript
// 이 함수는 x, y를 더해서 리턴하는 함수다.
const calulate = (x, y) => x + y;
calculate(5, 5);

// 여기서 더하기를 하는것이 아닌 곱셈을 해야한다면...
const multiplication = (x, y) => x * y;
multiplication(5, 5);

// 나누기를 하고싶다면 ...
const division = (x, y) => x / y;
division(5, 5);

// 함수들을 계속해서 새롭게 만들어주어야한다.
// 코드가 짧아서 문제는 없어보이지만 고차함수와 콜백함수를 통해서 더 유연하게 만들 수 있다.
```

## 고차함수와 콜백함수를 사용할 때 <a href="#undefined" id="undefined"></a>

위 예제처럼 각각의 함수를 만드는것이 아니라 공통로직이 있는 x,y의 값들을 받는 함수를 만들고,\
유연하게 대처할 수 있는 콜백함수와 고차함수를 만들어서 사용할 수 있다.

```javascript
// 고차함수
const calculate = (x, y, callback) => callback(x, y);

// 콜백함수
const multiplication = (x, y) => x * y;
const division = (x, y) => x / y;
const addtion = (x, y) => x + y;

calculate(5, 5, addtion);
calculate(5, 5, division);
calculate(5, 5, multiplication);

// ===========================================================
// ===========================================================
// ===========================================================
// 다른예제
const numberPrint = (number, callback) => {
	for (let i = 0; i < number; i++) {
		callback(number);
	}
};

// 숫자를 모두 출력하고싶을 때
const allPrint = (number) => console.log(number);

// 0부터 받은숫자 중에서 짝수만 출력하고 싶은경우.
const evenPrint = (number) => number % 2 === 0 && console.log(number);

numberPrint(5, allPrint); // 0, 1, 2, 3, 4
numberPrint(5, evenPrint); // 0, 2, 5
```
