import './globals.css'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import { ReduxProvider } from '../features/store'
import ThemeBody from "../components/layout/ThemeBody";
import InitializePreferences from '../components/InitializePreferences'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  

  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-100 ">
        <ReduxProvider>
          <InitializePreferences />
          {/* Ensure ThemeBody is wrapped around the main content */}
          <ThemeBody>
          <Sidebar />
          <div className="mt-4 p-4 bg-white dark:bg-black text-black dark:text-white">
  This text and background should switch colors on dark mode toggle.
</div>
          <div className="flex-1 flex flex-col bg-white  dark:bg-green-500">
            <Header />
            <main className="flex-1 p-4">{children}</main>
          </div>
         </ThemeBody>
         <InitializePreferences />
        </ReduxProvider>
      </body>
    </html>
  );
}
