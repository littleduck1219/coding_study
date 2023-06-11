import java.util.Scanner;

public class W1home {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        String title = sc.nextLine();
        float rate = sc.nextFloat();
        sc.nextLine();
        String recipe1 = sc.nextLine();
        String recipe2 = sc.nextLine();
        String recipe3 = sc.nextLine();
        String recipe4 = sc.nextLine();
        String recipe5 = sc.nextLine();

        double rate1 = (int)rate;
        System.out.println("[" + title + "]");
        System.out.println("별점 : " +  rate + "(" + rate1 * 100 / 5 + "%)");
        System.out.println("1." + recipe1);
        System.out.println("2." + recipe2);
        System.out.println("3." + recipe3);
        System.out.println("4." + recipe4);
        System.out.println("5." + recipe5);
    }
}