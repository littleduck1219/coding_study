package week2;

public class W02 {
    public static void main(String[] args) {
        System.out.println(4 + 2);
        System.out.println(4 - 2);
        System.out.println(4 * 2);
        System.out.println(4 / 2);
        System.out.println(5 / 2);
        System.out.println(2 / 4);
        System.out.println(4 % 2);
        System.out.println(5 % 2);
        System.out.println(2 % 4);
        System.out.println(2 + 2 * 2);
        System.out.println((2 + 2) * 2);

        int a = 20;
        int b = 10;
        int c;

        // 덧샘
        c = a + b;
        System.out.println(c); // 30
        // 뺄셈
        c = a - b;
        System.out.println(c); // 10
        // 곱샘
        c = a * b;
        System.out.println(c);
        // 나눗셈(몫)
        c = a / b;
        System.out.println(c);
        // 나눗셈(나머지)
        c = a % b;
        System.out.println(c);
    }
}
