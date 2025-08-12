import { HeroSection } from "../components/home/HeroSection";
import { FeaturedProducts } from "../components/home/FeaturedProducts";
import { CategoriesSection } from "../components/home/CategoriesSection";

export default function Index() {
  return (
    <div>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
    </div>
  );
}
