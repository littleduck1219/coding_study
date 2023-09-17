package week3.homework;

import java.awt.*;

public class Calculator {
    private AbstractOperation operation;

    public Calculator (AbstractOperation operation) {
        this.operation = operation;
    }

    public void setOperation (AbstractOperation operation) {
        this.operation = operation;
    }
    public double calculate(int firstNumber, int secondNumber) {
        double answer = 0;

        answer = operation.operate(firstNumber, secondNumber);
        // 더하기
//        if (operator.equals("+")) {
//            answer = addOperation.operate(firstNumber, secondNumber);
//        // 빼기
//        } else if (operator.equals("-")) {
//            answer = substractOperation.operate(firstNumber, secondNumber);
//        // 곱하기
//        } else if (operator.equals("*")) {
//            answer = multiplyOperation.operate(firstNumber, secondNumber);
//        // 나누기
//        } else if (operator.equals("/")) {
//            answer = divideOperation.operate(firstNumber, secondNumber);
//        } else if (operator.equals("%")) {
//            answer = divideOperation.operate(firstNumber, secondNumber);
//        }
        return answer;
    }
}

