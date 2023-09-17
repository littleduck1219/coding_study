package week2.collection;

import java.util.LinkedList;

public class Col02 {
    public static void main(String[] args) {
        // Linked list
        // 메모리에 남는 공간을 요청해서 나누어서 실제값을 담음
        // 실제 값이 있는 주소 값으로 목록을 구성하고 저장하는 자료구조.

        // 기본적 기능은 -> ArrayList와 동일
        // linkedList 값 -> 여기 저기 나누어서 : 조회ㅏ는 속도가 "느리다"
        // 값을 추가하거나, 삭제할 때는 빠르다.

        LinkedList<Integer> linkedList = new LinkedList<Integer>();
        linkedList.add(5);
        linkedList.add(10);
        linkedList.add(3);

        System.out.println(linkedList.get(0));
        System.out.println(linkedList.get(1));
        System.out.println(linkedList.get(2));

        System.out.println(linkedList.toString());

        linkedList.add(200);
        System.out.println(linkedList.toString());

        linkedList.add(2, 4);
        System.out.println(linkedList.toString());

        linkedList.set(1, 30);
        System.out.println(linkedList.toString());

        linkedList.remove(1);
        System.out.println(linkedList.toString());

        linkedList.clear();
        System.out.println(linkedList.toString());
    }
}
