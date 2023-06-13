package week2.array;

import java.util.Arrays;

public class Arr02 {
    public static void main(String[] args) {
        // 초기화

        // 1.배열에 특정값 대입해서 선언
        int[] intArr = {1, 2, 3, 4, 5};
        String[] stringArr = {"a", "b", "c", "d", "f"};

        // 2.for 문을 통해서 대입
        for (int i=0; i<intArr.length; i++) {
            intArr[i] = i;
        }

        for (int i=0; i<intArr.length; i++) {
            System.out.println(intArr[i]);
        }
        for (int i:intArr) {
            System.out.println(intArr[i]);
        }
        Arrays.fill(intArr, 1);

        for (int i: intArr) {
            System.out.println(i);
        }
    }

}
