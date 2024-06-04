// react components.
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Categories from "@/components/home/Categories";
import NewArrival from "@/components/home/NewArrival";
import Advertisement from "@/components/home/Advertisement";
import TrendingProducts from "@/components/home/TrendingProducts";

export async function generateMetadata() {
  return {
    title: "Lws Kart | Home",
    description:
      "Discover the finest selection of furniture at Lws Kart. Shop for modern and stylish furniture for your home and office. Quality and comfort guaranteed.",
    keywords:
      "furniture, modern furniture, home decor, office furniture, stylish furniture, quality furniture, Lws Kart, sofas, terrace furniture, beds, outdoor furniture, mattresses",
    openGraph: {
      title: "Lws Kart | Home",
      description:
        "Discover the finest selection of furniture at Lws Kart. Shop for modern and stylish furniture for your home and office. Quality and comfort guaranteed.",
      url: process.env.BASE_URL,
      type: "website",
      images: [
        {
          width: 1200,
          height: 630,
          url: "/logo.svg",
          alt: "Lws Kart - Finest Furniture Selection",
        },
      ],
    },
  };
}

const HomePage = async () => {
  return (
    <main>
      <Hero />
      <Features />
      <Categories />
      <NewArrival />
      <Advertisement />
      <TrendingProducts />
    </main>
  );
};

export default HomePage;
