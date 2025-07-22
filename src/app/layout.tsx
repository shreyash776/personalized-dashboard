import './globals.css'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import { ReduxProvider } from '../features/store'
import ThemeBody from "../components/layout/ThemeBody";
import InitializePreferences from '../components/InitializePreferences'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  

  return (
    <html lang="en">
      <body className="flex min-h-screen ">
        <ReduxProvider>
          <InitializePreferences />
          
          <ThemeBody>
          <Sidebar />
        
          <div className="flex-1 flex flex-col bg-white  ">
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
