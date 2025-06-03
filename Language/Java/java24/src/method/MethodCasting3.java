package method;

public class MethodCasting3 {
    public static void main(String[] args) {
        int balance = 1000;
        balance = deposit(balance, 2000);
        balance = withdraw(balance, 300);

    }

    public static int deposit(int a, int b) {
        a += b;
        System.out.println(b + "원을 입금하였습니다. 현재 잔액: " + a + "원");
        return a;

    }

    public static int withdraw(int a, int b) {
        if (a >= b) {
            a -= b;
            System.out.println("출금");
        } else {
            System.out.println("잔액 부족");
        }

        return a;
    }
}
