import MenuSection from "../components/MenuSection";
import BackButton from "../components/BackButton";
import { MenuItem } from "../types";

interface MenuPageProps {
  onAddToCart: (item: MenuItem) => void;
}

export default function MenuPage({ onAddToCart }: MenuPageProps) {
  return (
    <div className="pt-20">
      <BackButton />
      <MenuSection onAddToCart={onAddToCart} />
    </div>
  );
}
