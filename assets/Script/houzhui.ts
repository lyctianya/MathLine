/**
 *
 大家看到，后缀表达式适合计算式进行运算，但是人却不太容易写出来，尤其是表达式很长的情况下，因此在开发中，我们需要将 中缀表达式转成后缀表达式。

具体步骤如下:
1.初始化两个栈：运算符栈s1和储存中间结果的栈s2；
2.从左至右扫描中缀表达式；
3.遇到操作数时，将其压s2；
4.遇到运算符时，比较其与s1栈顶运算符的优先级：
    4.1如果s1为空，或栈顶运算符为左括号“(”，则直接将此运算符入栈；
    4.2否则，若优先级比栈顶运算符的高，也将运算符压入s1；
    4.3否则，将s1栈顶的运算符弹出并压入到s2中，再次转到(4.1)与s1中新的栈顶运算符相比较；	
5.遇到括号时：
    5.1 如果是左括号“(”，则直接压入s1
    5.2 如果是右括号“)”，则依次弹出s1栈顶的运算符，并压入s2，直到遇到左括号为止，此时将这一对括号丢弃
6.重复步骤2至5，直到表达式的最右边
7.将s1中剩余的运算符依次弹出并压入s2
8.依次弹出s2中的元素并输出，结果的逆序即为中缀表达式对应的后缀表达式



 将中缀表达式转后缀表达式
 说明
 将 1+((2+3)*4)-5 转成 123+4*+5-
 1.因为直接对str进行操作，不方便，因此先将字符串转换为数组
 2.将得到的中缀表达式对应的list 转为后缀表达式
 *
 */

//编写一个方法，可以返回一个运算符对应的优先级
let priority = (function () {
    const ADD = 1;
    const SUB = 1;
    const MUL = 2;
    const DIV = 2;
    return (operation) => {
        let result = 0;
        switch (operation) {
            case "+":
                result = ADD;
                break;
            case "-":
                result = SUB;
                break;
            case "*":
                result = MUL;
                break;
            case "/":
                result = DIV;
                break;
            default:
        }
        return result;
    };
})();

let infixExpression = "1+((2+3)*4)-5";
let infixArr = infixToArr(infixExpression);
console.log("中缀表达式为：", infixArr);
let suffixArr = infixToSuffix(infixArr);
console.log("后缀表达式为：", suffixArr);
console.log("后缀表达式计算结果为：", calculate(suffixArr));

function infixToArr(subject) {
    let list = [];
    let i = 0; //这是一个指针，用于遍历中缀表达式字符串
    let str; //对多位数的拼接
    let c; //每遍历到一个字符，就放入到c
    do {
        c = subject.substring(i, i + 1);
        //如果是非数字，就要加入到ls
        if (c.match(/\d+/)) {
            str = ""; //先将str置为""
            while (
                i < subject.length &&
                (c = subject.substring(i, i + 1)).match(/\d+/)
            ) {
                str += c; //拼接
                i++;
            }
            list.push(str);
        } else {
            //如果不是一个数字
            list.push(c);
            i++; //i需要后移
        }
    } while (i < subject.length);
    return list;
}

function infixToSuffix(infixArr) {
    //定义两个栈
    let operator = []; //符号栈
    let suffixArr = []; //后缀表达式栈

    //遍历infixArr
    for (let item of infixArr) {
        //如果是一个数，加入suffixArr
        if (item.match(/\d+/)) {
            suffixArr.push(item);
        } else if (item === "(") {
            operator.push(item);
        } else if (item === ")") {
            //如果是右括号)，则依次弹出Operator的运算符，
            //并压入suffixArr，知道遇到左括号(位置，此时将这一对括号丢弃
            while (operator.length && operator[operator.length - 1] !== "(") {
                suffixArr.push(operator.pop());
            }
            operator.pop(); //将(符号弹出栈，消除小括号
        } else {
            //将s1栈顶的运算符弹出并压入到suffixArr中，再次转到(4.1)与operator中新的栈顶运算符相比较
            while (
                operator.length > 0 &&
                priority(operator[operator.length - 1]) >= priority(item)
            ) {
                suffixArr.push(operator.pop());
            }
            //还需要将item压入栈
            operator.push(item);
        }
    }
    //将operator中剩余的运算符依次弹出并加入suffixArr
    while (operator.length > 0) {
        suffixArr.push(operator.pop());
    }
    return suffixArr;
}

function calculate(list) {
    //创建栈，只需要一个栈即可
    let stack = [];
    for (let item of list) {
        if (item.match(/\d+/)) {
            //匹配是多位数
            //入栈
            stack.push(item);
        } else {
            //pop出两个数，并运算，再入栈
            let num2 = parseInt(stack.pop());
            let num1 = parseInt(stack.pop());
            let res = 0;
            if (item === "+") {
                res = num1 + num2;
            } else if (item === "-") {
                res = num1 - num2;
            } else if (item === "*") {
                res = num1 * num2;
            } else if (item === "/") {
                res = num1 / num2;
            } else {
                throw new Error("运算符有误");
            }
            //把res入栈
            stack.push(res + "");
        }
    }
    return stack.pop();
}
