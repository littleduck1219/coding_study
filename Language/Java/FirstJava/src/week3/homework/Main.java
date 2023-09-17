package week3.homework;

public class Main {
    public static void main(String[] args) {
        Calculator calculator = new Calculator(new SubstractOperation());
        System.out.println(calculator.calculate(10, 5));
    }
}
