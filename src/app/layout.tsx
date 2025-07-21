import './globals.css'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import { ReduxProvider } from '../features/store'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <ReduxProvider>
          
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-4">{children}</main>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
