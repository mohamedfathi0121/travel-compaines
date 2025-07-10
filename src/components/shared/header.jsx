
import { ThemeSwitcher } from '../ThemeSwitcher';

export default function Header() {
  return (
    <header className="w-full px-6 py-4 bg-white shadow-sm flex justify-between items-center">
      <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
        Create Trip
      </h1>
      <ThemeSwitcher />
    </header>
  );
}
