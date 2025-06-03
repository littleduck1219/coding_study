package method;

public class MethodEx1 {
    public static void main(String[] args) {


        average(1, 2, 3);
        average(15, 25, 35);
    }

    public static double average(int a, int b, int c) {

        int sum = a + b + c;
        return sum / 3.0;
    }
}
