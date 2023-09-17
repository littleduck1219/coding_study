package week2;

public class W16 {
    public static void main(String[] args) {
        int number = 0;

        // while
        while (number < 3) {
            number++;
            System.out.println(number + "출력!");
        }

        // do while
        int number1 = 4;
        do {
            System.out.println(number + "출력!");
        } while (number < 3); {

        }

        for (int i=0; i<10; i++) {
            System.out.println("i: " + i);
            if (i==2) {
                break;
            }
            for (int j=0; j<10; j++) {
                System.out.println("j: " + j);
                if (j == 2) {
                    break;
                }
            }
        }
    }
}
