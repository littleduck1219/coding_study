package week2.collection;

import java.util.Set;
import java.util.HashSet;

public class Col05 {
    public static void main(String[] args) {
        // Set 순서없고, 중복없음
        // 순서가 보장되지 않는 대신 중복을 허용하지 않도록 하는 프로그램에서 사용할 수 있는 구조
        // Set -> 그냥 쓸 수도 있으. 그러나, HashSet, TreeSet 등으로 응용해서 같이 사용 가능
        // 생성자가 존재하는 HashSet을 이용해서 -> Set을 구현해 볼 수 있다.

        Set<Integer> intSet = new HashSet<>();

        intSet.add(1);
        intSet.add(2);
        intSet.add(3);
        intSet.add(4);
        intSet.add(2);
        intSet.add(3);
        intSet.add(4);

        for (Integer value: intSet) {
            System.out.println(value);
        }
        System.out.println(intSet.contains(2));
        System.out.println(intSet.contains((3)));
    }

}
