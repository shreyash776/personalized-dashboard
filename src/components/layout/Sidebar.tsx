import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 p-6 border-r border-gray-200 dark:border-gray-700 min-h-screen">
      <nav className="flex flex-col space-y-4">
        <Link href="/" className="text-lg font-medium">Feed</Link>
        <Link href="/trending" className="text-lg font-medium">Trending</Link>
        <Link href="/favorites" className="text-lg font-medium">Favorites</Link>
        <Link href="/settings" className="text-lg font-medium">Settings</Link>
      </nav>
    </aside>
  );
}
