export default function Header() {
  return (
    <header className="w-full border-b dark:border-gray-700 p-4 flex items-center justify-between bg-white dark:bg-gray-800">
      <div className="text-xl font-bold">Dashboard</div>
      <div>{/* Search bar, User info, Theme toggle will go here */}</div>
    </header>
  );
}
