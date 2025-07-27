import { Link } from "react-router-dom";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function AuthHeader() {
  return (
    <header className="w-full bg-background shadow-md z-50 relative border-b border-gray-300">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 md:px-8 py-4">
        <Link
          to="/"
          className="text-xl md:text-2xl font-bold text-text-primary whitespace-nowrap"
        >
          AdventureCo
        </Link>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
