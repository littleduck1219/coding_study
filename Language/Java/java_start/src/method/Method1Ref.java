package method;

public class Method1Ref {
 public static void main(String[] args) {
     //계산1
     int sum1 = add(5, 18);
     System.out.println("결과1 출력 : " + sum1);

     //계산2
     int sum2 = add(10, 20);
     System.out.println("결과2 출력 : " + sum2);
 }

 public static int add(int a, int b) {
     System.out.println(a + "+" + b + " 연산수행");
     return a + b;
 }
}
