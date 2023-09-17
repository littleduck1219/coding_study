package week3.abs;

public abstract class Car {
    double speed;

    public double gasPedal(double kmh) {
        speed = kmh;
        return speed;
    }
    public double breakPedal() {
        speed = 0;
        return speed;
    }
    public abstract void horn();
}
