package class1.ex;

public class MovieReviewMain {
    public static void main(String[] args) {
        MovieReview[] reviews = new MovieReview[2];

        MovieReview inception = new MovieReview();
        inception.title = "인셉션";
        inception.review = "인새은 무한 루프";
        reviews[0] = inception;

        MovieReview aboutTime = new MovieReview();
        aboutTime.title = "어바웃 타임";
        aboutTime.review = "인생 시간 영화";
        reviews[1] = aboutTime;

        for (MovieReview review : reviews) {

        }

        System.out.println(inception.title + inception.review);
        System.out.println(aboutTime.title + aboutTime.review);

    }
}
