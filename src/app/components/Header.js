import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-['Pacifico'] text-primary text-3xl hover:text-primary-dark transition-colors duration-300">
          Sumee
        </Link>
        <div className="flex items-center gap-6">
          <button className="text-primary border border-primary px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300 whitespace-nowrap">
            Únete como Pro / Join as Pro
          </button>
          <button className="text-secondary hover:text-primary transition-colors duration-300 whitespace-nowrap">
            Iniciar Sesión / Log In
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-all duration-300 whitespace-nowrap">
            Registrarse / Sign Up
          </button>
          <div className="flex items-center gap-2 text-sm">
            <button className="px-2 py-1 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors duration-300">
              ES
            </button>
            <button className="px-2 py-1 rounded-full hover:bg-gray-100 transition-colors duration-300">
              EN
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}