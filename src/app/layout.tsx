import '../styles/globals.css'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
