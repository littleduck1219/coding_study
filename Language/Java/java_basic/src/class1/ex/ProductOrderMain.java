package class1.ex;

public class ProductOrderMain {

    public static void main(String[] args) {
        ProductOrder[] orders = new ProductOrder[3];

        ProductOrder order1 = new ProductOrder();
        order1.productName = "두부";
        order1.price = 2000;
        order1.quantity = 2;
        orders[0] = order1;

        ProductOrder order2 = new ProductOrder();
        order2.productName = "김치";
        order2.price = 2000;
        order2.quantity = 2;
        orders[1] = order2;

        ProductOrder order3 = new ProductOrder();
        order3.productName = "돼지고기기";
        order3.price = 1600;
        order3.quantity = 2;
        orders[2] = order3;

        int total = 0;
        for (ProductOrder order : orders) {
            System.out.println("상품명: " + order.productName + "가격: " + order.price + "수량: " + order.quantity);
            total += order.price * order.quantity;
        }

    }
}
