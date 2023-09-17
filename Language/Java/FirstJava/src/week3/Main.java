package week3;

public class Main {
    public static void main(String[] args) {
        Car car = new Car();

        double speed = car.gasPedal(100, 'D');
        System.out.println("speed = " + speed);

        boolean lights = car.onOffLights();
        System.out.println("lights = " + lights);

        System.out.println();
        System.out.println("car.gear = " + car.gear);
    }
}
