#include<stdio.h>
#include<string.h>
#include<stack>
#include<iostream>
using namespace std;
int i;
double a,b;
char s[250],c;
int main()
{
    while(gets(s),strcmp(s,"#")!=0)
    {
        stack<char>s1;
        stack<double>s2;
        for(i=0;s[i];i++)
        {
            if(s[i]>='0'&&s[i]<='9') //如果是数字继续找数字
            {
                a=0;
                while(s[i]>='0'&&s[i]<='9')
                {
                    a=a*10+s[i]-'0';
                    i++;
                }
                i--;
                s2.push(a);
            }
            else if(s[i]=='(') //如果(
            {
                s1.push(s[i]);
            }
            else if(s[i]==')') //如果)
            {
                while(s1.top()!='(')//找不到前括号就循环
                {
                    c=s1.top();//符号top
                    s1.pop();//删掉
                    a=s2.top();//数字top
                    s2.pop();//删掉
                    b=s2.top();//当前数字top
                    s2.pop();//删掉
                    if(c=='+') a+=b;
                    if(c=='-') a=b-a;
                    if(c=='*') a=b*a;
                    if(c=='/') a=b/a;
                    s2.push(a);
                }
                s1.pop();//删除前括号
                if(s1.empty()==1){continue;}
                if(s1.top()=='*') //去掉括号以后栈还是乘
                {
                    s1.pop();//删掉
                    a=s2.top();//数字top
                    s2.pop();//删掉
                    b=s2.top();//当前数字top
                    s2.pop();//删掉
                    a=b*a;
                    s2.push(a);
                }
            }
            else if(s[i]=='-'||s[i]=='+') //如果是+-
            {
                if(s1.empty()==0&&s1.top()!='(')//优先级低或者一样交换符号
                {
                    c=s1.top();//字符栈顶
                    s1.pop();//删掉
                    a=s2.top();//数字栈顶1
                    s2.pop();//删掉
                    b=s2.top();//数字栈顶2
                    s2.pop();//删掉
                    if(c=='+') a+=b; 
                    if(c=='-') a=b-a;
                    if(c=='*') a=b*a;
                    if(c=='/') a=b/a;
                    s2.push(a);//运算以后的入数字栈
                    s1.push(s[i]);//字符入栈
                }
                else if(s1.empty()==1||s1.top()=='(')//如果空或者前括号
                {
                    s1.push(s[i]);//字符入栈
                }
            }
            else if(s[i]=='/') //如果除
            {
                b=0;
                c=s[i];//存一下符号
                if(s1.empty()==1||s1.top()=='(') //空就入栈不运算
                {
                    s1.push(c);
                    continue;
                }
                i+=2;//找符号后面的数字
                while(s[i]>='0'&&s[i]<='9')
                {
                    b=b*10+s[i]-'0';
                    i++;
                }
                i--;//找到数字
                a=s2.top();//取出数字栈顶
                s2.pop();//删掉
                if(s1.top()=='*') //优先级一样交换符号
                {
                    a=a*b;
                    s1.pop();//删除原来的
                    s1.push(c);//换成新的
                }
                else a=a/b;//优先级高做除法
                s2.push(a);//新数字入栈
            }
            else if(s[i]=='*') //如果乘
            {
                b=0;
                c=s[i];
                if(s1.empty()==1||s1.top()=='(')
                {
                    s1.push(c);
                    continue;
                }
                i+=2;
                if(s[i]=='(')
                {
                    s1.push(c);
                    i--;
                    continue;
                }
                while(s[i]>='0'&&s[i]<='9')
                {
                    b=b*10+s[i]-'0';
                    i++;
                }
                i--;
                a=s2.top();
                s2.pop();
                if(s1.top()=='/')
                {
                    a=a/b;
                    s1.pop();
                    s1.push(c);
                }
                else if(s1.top()!='/')
                {
                    a=a*b;
                }
                s2.push(a);
            }
            
        }
        while(!s1.empty())//如果符号栈非空就循环
        {
            c=s1.top();//符号top
            s1.pop();//删掉
            a=s2.top();//数字top
            s2.pop();//删掉
            b=s2.top();//当前数字top
            s2.pop();//删掉
            if(c=='+') a+=b;
            if(c=='-') a=b-a;
            if(c=='*') a=b*a;
            if(c=='/') a=b/a;
            s2.push(a);
        }
        printf("%.2f\n",s2.top());
    }
    return 0;
 }