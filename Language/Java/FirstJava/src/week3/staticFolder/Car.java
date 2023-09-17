package week3.staticFolder;

public class Car {
    // 필드 영억
    static String company = "GENESIS";
    String model;
    String color;
    double price;
    double speed;
    char gear;
    boolean lights;

    // 객체 데이터 영역
    Tire tire = new Tire();
    Door door = new Door();
    Handle handle = new Handle();
    public Car() {}

    double gasPedal(double kmh, char type) {
        changeGear(type);
        speed = kmh;
        return speed;
    }

    double breakPedal() {
        speed = 0;
        return speed;
    }

    char changeGear(char type) {
        gear = type;
        return gear;
    }

    boolean onOffLights() {
        lights = !lights;
        return lights;
    }

    void horn() {
        System.out.println("빵빵!");
    }

    String getCompany() {
        return "(주)" + company;
    }

    static String setCompany(String companyName) {
        company = companyName;
        return company;
    }
}
