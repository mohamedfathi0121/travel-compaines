export default function Footer() {
  return (
    <footer className="bg-background text-text-secondary border-t border-input py-4">
      <div className="max-w-6xl mx-auto px-4 flex flex-col  items-center justify-between gap-2">
        <div className="flex space-x-4 text-sm">
          <a href="#" className="hover:text-button-primary">
            Home
          </a>
          <a href="#" className="hover:text-button-primary">
            About
          </a>
          <a href="#" className="hover:text-button-primary">
            Contact
          </a>
        </div>
        <p className="text-sm text-text-hard-secondary">
          © {new Date().getFullYear()} AdventureCo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
