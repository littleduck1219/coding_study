package method;

import java.util.Scanner;

public class MethodCasting4 {
    public static void main(String[] args) {
        int balance = 0;
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("---------------------------");
            System.out.println("1.입금 | 2.출금 | 3.잔액확인 | 4.종료");
            System.out.println("---------------------------");
            System.out.print("선택: ");

            int choice = scanner.nextInt();
            int amount;

            switch (choice) {
                case 1:
                    System.out.println("입금");
                    System.out.print("입금 금액을 입력하세요: ");
                    amount = scanner.nextInt();
                    balance = deposit(balance, amount);
                    System.out.println("입금금액: " + amount + "잔액: " + balance);
                    break;

                case 2:
                    System.out.println("출금");
                    System.out.print("출금 금액을 입력하세요: ");
                    amount = scanner.nextInt();
                    balance = withdraw(balance, amount);
                    System.out.println("출출금금액: " + amount + "잔액: " + balance);
                    break;
                case 3:
                System.out.println("잔액: " + balance);
                    break;
                case 4:
                    System.out.println("시스템을 종료합니다.");
                    scanner.close();
                    return;

                default:
                    break;
            }
        }
    }

    public static int deposit(int amount, int balance) {
        System.out.println("입금");
        System.out.println("입금 금액을 입력하세요");
        balance += amount;
        return balance;
    }

    public static int withdraw(int amount, int balance) {
        System.out.println("출금");
        System.out.println("출금 금액을 입력하세요");
        if (amount > balance) {
            System.out.println("잔액이 부족합니다.");
            return balance;
        }
        balance -= amount;
        return balance;
    }
}
