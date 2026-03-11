import product1Front from "@/assets/product1-front.jpg";
import product1Dial from "@/assets/product1-dial.jpg";
import product1Box from "@/assets/product1-box.jpg";
import product2Front from "@/assets/product2-front.jpg";
import product2Dial from "@/assets/product2-dial.jpg";
import product2Box from "@/assets/product2-box.jpg";
import product3Front from "@/assets/product3-front.jpg";
import product3Dial from "@/assets/product3-dial.jpg";
import product3Box from "@/assets/product3-box.jpg";
import product4Front from "@/assets/product4-front.jpg";
import product4Dial1 from "@/assets/product4-dial-1.jpg";
import product4Box from "@/assets/product4-box.jpg";
import product5Front from "@/assets/product5-front.jpg";
import product5Angle from "@/assets/product5-angle.jpg";
import product5Box from "@/assets/product5-box.jpg";
import product6Front from "@/assets/product6-front.jpg";
import product6Angle from "@/assets/product6-angle.jpg";
import product6Box from "@/assets/product6-box.jpg";

export type ProductReview = {
  name: string;
  city: string;
  rating: number;
  text: string;
  date: string;
  photos: string[];
};

export const productReviews: Record<number, ProductReview[]> = {
  1: [
    { name: "Andreas K.", city: "Nicosia", rating: 5, date: "2026-02-28", text: "Incredible build quality. The weight and finishing are spot on — my colleagues at work were genuinely shocked when I told them the price. The black dial is stunning in person.", photos: [product1Front, product1Dial] },
    { name: "Michalis T.", city: "Limassol", rating: 5, date: "2026-02-15", text: "Bought this as a daily wearer and it hasn't disappointed. The Seiko NH35 movement keeps excellent time. Box presentation was also really impressive.", photos: [product1Box] },
    { name: "Stavros P.", city: "Larnaca", rating: 5, date: "2026-01-20", text: "Best purchase I've made this year. Delivered next day, came in a beautiful box with papers. The bracelet clasp feels very secure.", photos: [product1Front] },
    { name: "Nikos R.", city: "Paphos", rating: 4, date: "2026-01-05", text: "Very happy with the quality. The only reason for 4 stars is I wish the lume was slightly brighter, but otherwise it's perfect for the price.", photos: [] },
  ],
  2: [
    { name: "Giorgos M.", city: "Limassol", rating: 5, date: "2026-03-01", text: "The green Hulk is an absolute head-turner. Wore it to a beach bar in Limassol and got three compliments in one evening. The sunburst effect on the dial is beautiful.", photos: [product2Front, product2Dial] },
    { name: "Maria L.", city: "Nicosia", rating: 5, date: "2026-02-20", text: "Bought this for my husband's birthday. He absolutely loves it. The presentation box made it feel like a real luxury gift. Fast delivery too!", photos: [product2Box] },
    { name: "Christos A.", city: "Larnaca", rating: 5, date: "2026-02-10", text: "Stunning watch. The green is even more vibrant in person than in photos. Feels solid and premium on the wrist. Highly recommend.", photos: [product2Front] },
  ],
  3: [
    { name: "Elena S.", city: "Nicosia", rating: 5, date: "2026-02-25", text: "The perfect dress watch. I wear it daily to the office and it looks absolutely elegant. The fluted bezel catches light beautifully.", photos: [product3Front, product3Dial] },
    { name: "Panayiotis D.", city: "Limassol", rating: 5, date: "2026-02-08", text: "Ordered the Datejust for a wedding. It paired perfectly with my suit. The 36mm size is ideal — not too big, not too small.", photos: [product3Box] },
    { name: "Anna K.", city: "Paphos", rating: 4, date: "2026-01-15", text: "Gifted to my father for his retirement. He wears it every day now. Quality is excellent for the price point.", photos: [] },
  ],
  4: [
    { name: "Demetris H.", city: "Limassol", rating: 5, date: "2026-03-02", text: "The two-tone is absolutely stunning. The gold finishing is warm and convincing. Wore it on a night out and it looked phenomenal under restaurant lighting.", photos: [product4Front, product4Dial1] },
    { name: "Sophia N.", city: "Nicosia", rating: 5, date: "2026-02-18", text: "Bought for my boyfriend. He says it's his favourite watch now. The blue dial is mesmerising. Delivery was next day as promised.", photos: [product4Box] },
    { name: "Yiannis G.", city: "Larnaca", rating: 5, date: "2026-01-28", text: "Premium feel all around. The bracelet links are solid and the clasp is smooth. Great value for money.", photos: [product4Front] },
  ],
  5: [
    { name: "Alexandros V.", city: "Nicosia", rating: 5, date: "2026-03-05", text: "The Sprite is my favourite watch in the collection. The black and green bezel combo is eye-catching but not over the top. The Jubilee bracelet is incredibly comfortable.", photos: [product5Front, product5Angle] },
    { name: "Costas B.", city: "Paphos", rating: 5, date: "2026-02-22", text: "Delivered next day to Paphos. Opened the box and was genuinely impressed. The GMT function actually works which is a nice touch.", photos: [product5Box] },
    { name: "Marios F.", city: "Limassol", rating: 4, date: "2026-02-01", text: "Great quality and fast delivery. The Jubilee bracelet feels premium. Only giving 4 stars because I prefer a slightly heavier feel, but overall excellent.", photos: [] },
  ],
  6: [
    { name: "Petros C.", city: "Nicosia", rating: 5, date: "2026-03-03", text: "The Daytona is in a league of its own. The chronograph pushers feel crisp, the tachymeter bezel is beautifully engraved, and the sub-dials are perfectly aligned. Absolutely worth it.", photos: [product6Front, product6Angle] },
    { name: "Katerina M.", city: "Limassol", rating: 5, date: "2026-02-14", text: "Valentine's gift for my husband. He literally said it was the best gift he's ever received. The black dial with the contrasting sub-dials is gorgeous.", photos: [product6Box] },
    { name: "Loukas T.", city: "Larnaca", rating: 5, date: "2026-01-30", text: "The Daytona has real presence on the wrist. Slightly larger than the Submariner models but it suits the sporty design. Fantastic watch.", photos: [product6Front] },
  ],
};
