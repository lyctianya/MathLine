/*
 * @Author: TrueMan
 * @Date: 2021-07-01 15:52:28
 * @LastEditTime: 2021-07-02 19:19:52
 * @LastEditors: 楚门
 * @Description: 本工程实现简单数学公式的解析、校验、计算。并能生成解题步骤说明
 * @FilePath: /mathLine/assets/Script/mathAnalysis.ts
 */

//使用堆栈解析一般数学公式。
const str = "(30+20-5)/5-10*-3";
// operator 是操作符，value是权重,权重越大，优先级越高。
const operatorList: Array<{
    operator: string;
    value: number;
    name: string;
    func: Function;
}> = [
    {
        operator: "+",
        value: 0,
        name: "加",
        func: (a: number, b: number): number => a + b,
    },

    {
        operator: "-",
        value: 0,
        name: "减",
        func: (a: number, b: number): number => a - b,
    },
    {
        operator: "*",
        value: 1,
        name: "乘",
        func: (a: number, b: number): number => a * b,
    },
    {
        operator: "/",
        value: 1,
        name: "除",
        func: (a: number, b: number): number => a / b,
    },
    {
        operator: "%",
        value: 1,
        name: "取余",
        func: (a: number, b: number): number => a % b,
    },
    {
        operator: "(",
        value: 10,
        name: "小括号",
        func: (a: number, b: number): number => a,
    },
    {
        operator: ")",
        value: 10,
        name: "小括号",
        func: (a: number, b: number): number => a,
    },
];
//第一步，先检查出所有数值，然后
class MathAnalysis {
    /**
     * 设置数学题目，返回题目是否合法。合法时候无返回。错误时候返回错误原因。
     *
     * @param {string} subject
     * @return {*}  {string}
     * @memberof MathAnalysis
     */
    public setMathSubject(subject: string): string {
        if (typeof subject !== "string") {
            console.error("数学算式必须是字符串形式");
            return "数学算式必须是字符串形式";
        }
    }

    /**
     * 获取题目解答
     *
     * @return {*}  {number}
     * @memberof MathAnalysis
     */
    public getAnswer(): number {
        return 0;
    }

    /**
     *获取题目解题步骤
     *
     * @return {*}  {string}
     * @memberof MathAnalysis
     */
    public getAnalysis(): string {
        return "";
    }

    /**
     * 解析中缀表达式
     *
     * @param {string} subject
     * @return {*}  {Array<string>}
     * @memberof MathAnalysis
     */
    getInfixArr(subject: string): Array<string> {
        // 将字符串解析为中缀表达式数组，但不校验对错
        let infixArr: Array<string> = [];
        let i = 0; //这是一个指针，用于遍历中缀表达式字符串
        do {
            if (!isNaN(Number(subject.substring(i, i + 1)))) {
                //如果是数字
                let str = "";
                while (
                    i < subject.length &&
                    !isNaN(Number(str + subject.substring(i, i + 1)))
                ) {
                    str += subject.substring(i, i + 1);
                    i++;
                }
                infixArr.push(str);
            } else {
                //如果不是数字
                infixArr.push(subject.substring(i, i + 1));
                i++;
            }
        } while (i < subject.length);
        return infixArr;
    }
    getSuffixArr(subject: string) {
        const infixArr = this.getInfixArr(subject);
        //定义两个栈
        let operator = []; //符号栈
        let suffixArr = []; //后缀表达式栈
        let priority = () => 100;
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
                while (
                    operator.length &&
                    operator[operator.length - 1] !== "("
                ) {
                    suffixArr.push(operator.pop());
                }
                operator.pop(); //将(符号弹出栈，消除小括号
            } else {
                //将s1栈顶的运算符弹出并压入到suffixArr中，再次转到(4.1)与operator中新的栈顶运算符相比较
                while (
                    operator.length > 0 //&&
                    // priority(operator[operator.length - 1]) >= priority(item)
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
}

const tester = new MathAnalysis();
const ret = tester.getInfixArr("-100*0.01-99/3*1.35");
console.log(ret);
