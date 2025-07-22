"use client"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../features/store';
import { toggleDarkMode } from '../../features/user/userSlice';

export default function Header() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.user.darkMode);

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <header className="flex items-center justify-between p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="text-xl font-bold">Dashboard</div>
      <button
        onClick={handleToggle}
        className="px-2 py-1 rounded text-sm font-medium border bg-gray-100 dark:bg-gray-700 dark:text-white"
      >
        {darkMode ? "🌙 Dark" : "🌞 Light"}
      </button>
    </header>
  );
}
