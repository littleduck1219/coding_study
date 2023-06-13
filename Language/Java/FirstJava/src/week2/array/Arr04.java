package week2.array;

import java.util.Arrays;

public class Arr04 {
    public static void main(String[] args) {
        int[] a = {1, 2, 3, 4};
        int[] b = Arrays.copyOf(a, a.length);

        a[3] = 0;
        System.out.println(a[3]);
        System.out.println(b[3]);
    }
}
