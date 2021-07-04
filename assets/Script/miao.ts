function evalPN(tokens: Array<string>) {
    const operation = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
    };
    const len = tokens.length;
    const stack = [];
    for (let i = len - 1; i > -1; i--) {
        if (tokens[i] in operation) {
            const a = stack.pop();
            const b = stack.pop();
            const result = operation[tokens[i]](a, b);
            stack.push(result);
        } else {
            stack.push(+tokens[i]);
        }
    }
    return stack.pop();
}

function Stack() {
    let items = [];

    this.push = function (element) {
        items.push(element);
    };
    this.pop = function () {
        return items.pop();
    };
    this.peek = function () {
        return items[items.length - 1];
    };
    this.isEmpty = function () {
        return items.length === 0;
    };
    this.size = function () {
        return items.length;
    };
    this.clear = function () {
        items = [];
    };
    this.print = function () {
        console.log(items.toString());
    };
}

// 判断优先级
function f(str) {
    let yxj; //优先级
    switch (str) {
        case "*":
            yxj = 5;
            break;
        case "/":
            yxj = 5;
            break;
        case "+":
            yxj = 4;
            break;
        case "-":
            yxj = 4;
            break;
    }
    return yxj;
}

// 创建一个栈
const stack = new Stack();

// 表示缓存数据区
const list = new Array();
function getList(str) {
    for (let i = 0; i < str.length; i++) {
        // 只要是数字直接缓存区
        if (str[i] >= "0" && str[i] <= "9") {
            list.push(str[i]);
        } else if (
            str[i] == "+" ||
            str[i] == "-" ||
            str[i] == "*" ||
            str[i] == "/"
        ) {
            while (true) {
                if (stack.isEmpty() || stack.peek() == "(") {
                    stack.push(str[i]);
                    break;
                } else if (f(str[i]) > f(stack.peek())) {
                    //当前运算符优先级大于s1栈顶运算符优先级
                    stack.push(str[i]);
                    break;
                } else {
                    //小于等于
                    let cc = stack.peek();
                    stack.pop();
                    list.push(cc);
                }
            }
        } else {
            if (str[i] == "(") {
                stack.push(str[i]);
            } else {
                while (stack.peek() != "(") {
                    let ccc = stack.peek();
                    stack.pop();
                    list.push(ccc);
                }
                stack.pop();
            }
        }
    }

    // 将剩下的全部追加在后面
    while (!stack.isEmpty()) {
        let cccc = stack.peek();
        list.push(cccc);
        stack.pop();
    }
}

getList("9+2*3+10/2");

console.log(list);
stack.print();

const miao = evalPN(list);
console.log(miao);
