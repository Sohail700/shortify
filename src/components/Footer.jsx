import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 h-39">
      <div className="container mx-auto px-4 text-center">
        <Link href="/" className="flex justify-center items-center space-x-2 mb-2">
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="8" fill="#3B82F6"/>
            <path d="M16 24H32M32 24L26 18M32 24L26 30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-lg font-bold">URLShortner</span>
        </Link>
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} URLShortner. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
