// Product 1: Submariner No Date (black dial)
import reviewSubNodate1 from "@/assets/review-sub-nodate-1.jpg";
import reviewSubNodate2 from "@/assets/review-sub-nodate-2.jpg";
import reviewSubNodate3 from "@/assets/review-sub-nodate-3.jpg";

// Product 2: Submariner Hulk (green)
import reviewHulk1 from "@/assets/review-hulk-1.jpg";
import reviewHulk2 from "@/assets/review-hulk-2.jpg";

// Product 3: Datejust 36 (grey/rhodium dial)
import reviewDatejust1 from "@/assets/review-datejust-1.jpg";
import reviewDatejust2 from "@/assets/review-datejust-2.jpg";

// Product 4: Submariner Blue/Gold (Bluesy two-tone)
import reviewBluesy1 from "@/assets/review-bluesy-1.jpg";

// Product 5: GMT-Master II Sprite (black/green bezel)
import reviewSprite1 from "@/assets/review-sprite-1.jpg";
import reviewSprite2 from "@/assets/review-sprite-2.jpg";

// Product 6: Daytona Black
import reviewDaytona1 from "@/assets/review-daytona-1.jpg";
import reviewDaytona2 from "@/assets/review-daytona-2.jpg";

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
    { name: "Andreas K.", city: "Nicosia", rating: 5, date: "2026-02-28", text: "Incredible build quality. The weight and finishing are spot on — my colleagues at work were genuinely shocked when I told them the price. The black dial is stunning in person.", photos: [reviewSubNodate1, reviewSubNodate2] },
    { name: "Michalis T.", city: "Limassol", rating: 5, date: "2026-02-15", text: "Bought this as a daily wearer and it hasn't disappointed. The Seiko NH35 movement keeps excellent time. Box presentation was also really impressive.", photos: [reviewSubNodate3] },
    { name: "Stavros P.", city: "Larnaca", rating: 5, date: "2026-01-20", text: "Best purchase I've made this year. Delivered next day, came in a beautiful box with papers. The bracelet clasp feels very secure.", photos: [reviewSubNodate1] },
    { name: "Nikos R.", city: "Paphos", rating: 4, date: "2026-01-05", text: "Very happy with the quality. The only reason for 4 stars is I wish the lume was slightly brighter, but otherwise it's perfect for the price.", photos: [] },
  ],
  2: [
    { name: "Giorgos M.", city: "Limassol", rating: 5, date: "2026-03-01", text: "The green Hulk is an absolute head-turner. Wore it to a beach bar in Limassol and got three compliments in one evening. The sunburst effect on the dial is beautiful.", photos: [reviewHulk1, reviewHulk2] },
    { name: "Maria L.", city: "Nicosia", rating: 5, date: "2026-02-20", text: "Bought this for my husband's birthday. He absolutely loves it. The presentation box made it feel like a real luxury gift. Fast delivery too!", photos: [reviewHulk2] },
    { name: "Christos A.", city: "Larnaca", rating: 5, date: "2026-02-10", text: "Stunning watch. The green is even more vibrant in person than in photos. Feels solid and premium on the wrist. Highly recommend.", photos: [reviewHulk1] },
  ],
  3: [
    { name: "Elena S.", city: "Nicosia", rating: 5, date: "2026-02-25", text: "The perfect dress watch. I wear it daily to the office and it looks absolutely elegant. The fluted bezel catches light beautifully.", photos: [reviewDatejust1, reviewDatejust2] },
    { name: "Panayiotis D.", city: "Limassol", rating: 5, date: "2026-02-08", text: "Ordered the Datejust for a wedding. It paired perfectly with my suit. The 36mm size is ideal — not too big, not too small.", photos: [reviewDatejust2] },
    { name: "Anna K.", city: "Paphos", rating: 4, date: "2026-01-15", text: "Gifted to my father for his retirement. He wears it every day now. Quality is excellent for the price point.", photos: [] },
  ],
  4: [
    { name: "Demetris H.", city: "Limassol", rating: 5, date: "2026-03-02", text: "The two-tone is absolutely stunning. The gold finishing is warm and convincing. Wore it on a night out and it looked phenomenal under restaurant lighting.", photos: [reviewBluesy1] },
    { name: "Sophia N.", city: "Nicosia", rating: 5, date: "2026-02-18", text: "Bought for my boyfriend. He says it's his favourite watch now. The blue dial is mesmerising. Delivery was next day as promised.", photos: [reviewBluesy1] },
    { name: "Yiannis G.", city: "Larnaca", rating: 5, date: "2026-01-28", text: "Premium feel all around. The bracelet links are solid and the clasp is smooth. Great value for money.", photos: [] },
  ],
  5: [
    { name: "Alexandros V.", city: "Nicosia", rating: 5, date: "2026-03-05", text: "The Sprite is my favourite watch in the collection. The black and green bezel combo is eye-catching but not over the top. The Jubilee bracelet is incredibly comfortable.", photos: [reviewSprite1, reviewSprite2] },
    { name: "Costas B.", city: "Paphos", rating: 5, date: "2026-02-22", text: "Delivered next day to Paphos. Opened the box and was genuinely impressed. The GMT function actually works which is a nice touch.", photos: [reviewSprite2] },
    { name: "Marios F.", city: "Limassol", rating: 4, date: "2026-02-01", text: "Great quality and fast delivery. The Jubilee bracelet feels premium. Only giving 4 stars because I prefer a slightly heavier feel, but overall excellent.", photos: [] },
  ],
  6: [
    { name: "Petros C.", city: "Nicosia", rating: 5, date: "2026-03-03", text: "The Daytona is in a league of its own. The chronograph pushers feel crisp, the tachymeter bezel is beautifully engraved, and the sub-dials are perfectly aligned. Absolutely worth it.", photos: [reviewDaytona1, reviewDaytona2] },
    { name: "Katerina M.", city: "Limassol", rating: 5, date: "2026-02-14", text: "Valentine's gift for my husband. He literally said it was the best gift he's ever received. The black dial with the contrasting sub-dials is gorgeous.", photos: [reviewDaytona1] },
    { name: "Loukas T.", city: "Larnaca", rating: 5, date: "2026-01-30", text: "The Daytona has real presence on the wrist. Slightly larger than the Submariner models but it suits the sporty design. Fantastic watch.", photos: [reviewDaytona2] },
  ],
};
