package week3.staticFolder;

public class Main {
    public static void main(String[] args) {
        System.out.println(Car.company + "\n");

        Car.company = "Audi";
        System.out.println(Car.company + "\n");

        String companyName = Car.setCompany("Benz");
        System.out.println("companyName = " + companyName);

        System.out.println();

        Car car = new Car();

        Car.company = "Ferrari";
        System.out.println(Car.company + "\n");

        String companyName2 = Car.setCompany("Lamborghini");
        System.out.println("companyName2 = " + companyName2);
    }
}
