import { HeroSection } from "../components/home/HeroSection";
import { FeaturedProducts } from "../components/home/FeaturedProducts";
import { CategoriesSection } from "../components/home/CategoriesSection";
import { AlgerianFeaturesSection } from "../components/home/AlgerianFeaturesSection";

export default function Index() {
  return (
    <div>
      <HeroSection />
      <CategoriesSection />
      <AlgerianFeaturesSection />
      <FeaturedProducts />
    </div>
  );
}
