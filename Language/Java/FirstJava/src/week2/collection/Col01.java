package week2.collection;

import java.util.ArrayList;

public class Col01 {
    public static void main(String[] args) {
        // list
        // 순서가 있는 데이터의 집합
        // 처음에 길이를 몰라도 만들 수 있음.
        // Array -> 정적 배열(길이를 알아야함)
        // List(ArrayList) -> 동적배열(크기가 가변적으로 늘어남)

        ArrayList<Integer> intList = new ArrayList<Integer>();

        intList.add(1);
        intList.add(2);
        intList.add(3);
        System.out.println(intList.get(1));

        // 2번쩨 있는 값(15)을 바꿔보자,
        intList.set(1, 10);
        System.out.println(intList.get(1));

        // 삭제 -> 삭제가 되면 두번째 값이 앞으로 밀린다.
        intList.remove(0);
        System.out.println(intList.get(0));

        System.out.println("클리어 전");
        System.out.println(intList.toString());
        intList.clear();
        System.out.println("클리어 후");
        System.out.println(intList.toString());

    }
}
