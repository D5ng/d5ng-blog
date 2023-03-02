---
description: >-
  자바스크립트의 변수종류는 var, let, const 3가지가 있다. 요즘에는 var를 안쓰는데 왜 안쓰는지에 대한 이유를 알아보고, 각각의
  차이점들을 비교해보자. 그전에 변수에 대해서 알아보자!!.
---

# 변수

## 변수란 ? <a href="#undefined" id="undefined"></a>

가장 쉽게 설명하자면 변수는 변하는값을 말한다.\
그래도 우리는 조금 더 딥하게 해볼 필요가 있기에 자세하게 알아보자면,\
변수는 하나의 값을 저장하기 위해 확보한 메모리공간이고, 메모리 주소와 연결해서\
사용하는게 변수이름(식별자)이다.

\
❗️결국 변수는 메모리 주소를 가르키고 그 주소를 통해서 값을 알아낼 수 있다.

```javascript
// 메모리에 값은 dongs로 되어있고 메모리주소는 2진법으로 되어있다.
// 메모리주소를 참조하면 값을 알아낼 수 있는데 그 주소가 name이랑 연결되어있다고 생각하면 좋다.
var name = "dongs";
```

## 🙁 var의 특징 <a href="#var" id="var"></a>

1. 중복선언이 가능하다.
2. 재할당이 가능하다
3. 호이스팅(스코프의 선두로 끌어올려지는 현상)이 된다.
4. 함수 스코프(범위)를 가진다.

## 😃 let의 특징 <a href="#let" id="let"></a>

1. 중복선언이 안된다.
2. 재할당이 가능하다
3. 실제로 호이스팅이 되지만, 안되는것처럼 보여진다.
4. 블록 스코프({} 블록문)를 가진다.

## 😃 const의 특징 <a href="#const" id="const"></a>

1. 중복선언이 안된다.
2. 재할당이 안된다.
3. 실제로 호이스팅이되지만, 안되는것처럼 보여진다.
4. 블록 스코프({} 블록문)를 가진다.

각각의 특징들을 알아봤으니 이제부터 본격적으로 코드로 설명을 하겠다.\
틀린부분이 있을 수도 있지만 그럴일은 없을것이다. (한번만 작성하고 끝나는것이 아니기때문!)

## var의 특징 <a href="#var-1" id="var-1"></a>

```javascript
//var
var name = "동현";
// ~
// 1320
// 만약 코드 줄이 1000줄이 넘어갔다면 ..?

// 1321.
var name = "동현스";
```

### 1. 중복선언이 가능하다 <a href="#1" id="1"></a>

중복선언이 가능하면 안좋다. 왜냐하면 중복선언이 되어버릴경우에 위에 예제처럼 어디에서든 사용하기 쉬운 이름을 을 나만 사용하는게 아니라 다른사람들(협업)자들도 사용하기 때문이다. 지금이야 코드가 짧아서 상관없겠지만 코드가 엄청나게 길다면 그 사이에서 일어나는 오류를 찾기도, 수정하기도 힘들게 된다.

물론 이러한 상황때문에, 전역변수를 최소한으로 사용하는 방법도 있긴하지만 위험요소는 줄여주는게 좋다.

### 2. 변수니까 재할당이 가능하다. <a href="#2" id="2"></a>

const(상수)를 제외하고 변수는 재할당이 가능하다.

### 3. 함수 스코프(범위)를 가진다. <a href="#3" id="3"></a>

```javascript
var name = "동현";

console.log(name); // 동현

function transformedName() {
	var name = "동현스";
	console.log(name); // 동현스
}
console.log(name); // 동현

name = "dongs";

console.log(name); // dongs
```

함수 단위로 스코프를 가지기때문에 함수 안에서 선언해도 밖에서는 볼 수가 없다.\
함수외부에서 선언한 변수들은 전역변수가 되기때문에 오류가 날 확률을 더 높여준다.

### 3. var 호이스팅 <a href="#3-var" id="3-var"></a>

```javascript
console.log(name); // undefined
var name = "동현";

console.log(name); // 동현
```

모든 선언문들은 자바스크립트가 미리 소스코드를 평가하기때문에 선언 이전에서는 undefined가 출력이 된다. 여기서 중요한건 변수선언에서 2가지의 단계가있다.

> 선언단계: <mark style="color:red;">**변수 이름을 등록해서 자바스크립트 엔진에 변수의 존재를 알린다.**</mark>\
> 초기화단계: <mark style="color:red;">**값을 저장하기 위한 메모리 공간을 확보하고 암묵적으로 undefined를 할당해 초기화한다.**</mark>

따라서, 자바스크립트가 미리 변수존재를 알고있고 초기화를 하기때문에\
var 선언 전에도 undefined가 나오는것이다.

## let 특징. <a href="#let" id="let"></a>

### 1. 중복선언이 안된다. <a href="#1" id="1"></a>

```javascript
let name = "동현";

let name = "동현스"; // SyntaxError: Identifier 'name' has already been declared
// 문법에러: 식별자 'name'이 이미 선언되었습니다.
```

위에 있던 협업의 문제를 let으로 해결이 가능하다. 친절하게 변수명이 이미 써있다고 알려주고 너무좋다.\
일단 이것만봐도 “var보단 let을 써야겠다” 라고 생각이 들것이다.

### 2. 재할당이 된다. <a href="#2" id="2"></a>

var, let은 재할당이 된다.

### 3. let, const 호이스팅 <a href="#3-let-const" id="3-let-const"></a>

```javascript
console.log(name); // referenceError 참조에러 발생.
let name = "동현";

function printName() {
	// 스코프 시작지점.
	console.log(name); // 호이스팅이 안되면 '동현'이 나와야하는데 참조에러가 발생한다.
	let name = "동현스"; // 초기화 단계
}
```

let과 const로 선언한 변수들은 변수선언 이전에 참조하면 참조에러가 발생한다.

> let과 const로 선언한 변수는 선언단계와 초기화단계가 분리되어 진행된다. 즉 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 선언 단계가 먼저 실행되지만 초기화 단계는 변수 선언문에 도달했을 때 실행된다.

스코프의 시작지점부터 초기화 단계 시작지점까지 변수를 참조 할 수 없다. 이 구간을 TDZ(Temporal Dead Zone)라고 부른다.

<mark style="color:red;">**결론은 let과 const는 호이스팅이 안되는것처럼 보여지지만 실제로 호이스팅은 된다.**</mark>

### 4. 블록 스코프 <a href="#4" id="4"></a>

let과 const는 블록 스코프다.\
var는 함수의 블록만을 따지지만, let과 const는 모든 블록문을 따진다. (if, for, function, class, { } 등등) var처럼 함수외에 변수는 전역변수가 아니기때문에 에러날 확률이 낮다.

```javascript
let name = "동현";

function transformedName() {
	name = "동현스";
	console.log(name); // 동현스
}

if (name) {
	name = "블록 동현";
	console.log(name); // 블록 동현
}

cosnole.log(name); // 동현
```

## const의 특징 <a href="#const-1" id="const-1"></a>

const는 선언만 할 수 없고, 선언과 동시에 초기화(할당)을 해줘야한다.\
상수는 단 한번만 할당이 허용된다.

```javascript
var name;

let name2;

const name3; // 문법에러 발생.

const name4 = '동현'; // 이렇게 선언 및 할당을 해줘야한다.
```

### 1. 중복선언이 안된다. (위에 let과 같다.) <a href="#1-let" id="1-let"></a>

### 2. 재할당이 안된다. <a href="#2" id="2"></a>

상수는 재할당이 금지된 변수이기때문에 재할당이 될 수가 없다.

### 3. 호이스팅이 된다. (위에 let과 같다.) <a href="#3-let" id="3-let"></a>

### 4. 블록 스코프 (위에 let과 같다.) <a href="#4-let" id="4-let"></a>

***

## 알아두면 좋은것. <a href="#undefined" id="undefined"></a>

* 모든 선언문들은 호이스팅이 된다.
* var**보단 **<mark style="color:red;">**let**</mark>**과 **<mark style="color:red;">**const**</mark>**를 사용하고, **<mark style="color:red;">**재할당이 필요한경우**</mark>**에만 let을 쓰자.**
