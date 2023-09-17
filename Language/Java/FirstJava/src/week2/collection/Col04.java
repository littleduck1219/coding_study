package week2.collection;

import java.util.LinkedList;
import java.util.Queue;

public class Col04 {
    public static void main(String[] args) {
        // queue : FIFO
        // add, peak, pall
        // queue 생성장가 없는 인터페이스

        Queue<Integer> intQueue = new LinkedList<>();

        intQueue.add(1);
        intQueue.add(5);
        intQueue.add(9);

        while(!intQueue.isEmpty()) {
            System.out.println(intQueue.poll());
        }

        intQueue.add(1);
        intQueue.add(5);
        intQueue.add(9);

        System.out.println(intQueue.peek());
        System.out.println(intQueue.size());
    }

}
