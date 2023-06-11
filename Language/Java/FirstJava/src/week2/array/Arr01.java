package week2.array;

public class Arr01 {
    public static void main(String[] args) {
        // 배열 생성
        int[] intArray = new int[3];
        boolean[] boolArray = new boolean[3];
        String[] stringArray = new String[3];

        // 배열 선언 먼저 -> 나중에 초기화
        int[] intArray2;
        intArray2 = new int[3];

        // 생성한 배열 순회
        // (1) 단건 조회
        System.out.println(intArray[1]);

        // (2) 다건 조회
        for (int i=0; i<intArray2.length; i++) {
            System.out.println(intArray2[i]);
        }
    }
}