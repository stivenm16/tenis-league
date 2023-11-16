import Providers from './Providers'
import Navbar from './components/NavBar'
import './globals.css'

export const metadata = {
  title: 'Tenis League',
  description: 'Are you ready for the next tournament?',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
