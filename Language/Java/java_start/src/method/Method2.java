package method;

public class Method2 {
    public static void main(String[] args) {
        printHeader();
        System.out.println("= 프로그램이 실행 중 입니다 =");
        printFooter();
    }

    public static void printHeader() {
        System.out.println("= 프로그램을 시작합니다 =");
        return;
    }

    public static void printFooter() {
        System.out.println("= 프로그램을 종료합니다 =");
    }
}
