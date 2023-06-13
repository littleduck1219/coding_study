package week2.array;

public class Arr08 {
    public static void main(String[] args) {
        int[] arr = {3, 2, 1, 5, 1};

        int max = arr[0];

        for (int num: arr) {
            if (num > max) {
                max = num;
            }
        }
        System.out.println(max);
    }
}
