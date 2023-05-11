import { client } from '../../../sanity/lib/client'
import Footer from './components/global/footer'
import Navbar from './components/global/navbar'
import { Inter } from 'next/font/google'
import './globals.css'
import { appearance } from '../../../lib/groq-data'
const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const data = await client.fetch(appearance)
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar 
          company_name={data.profileSettings.company_name}
          logo={data.appearances.branding.logo.asset.url}
          navItems={data.appearances.header?.mainNav?.navItems}
          logoWidth={data.appearances.branding?.logo?.logoWidth}
          phone={data.profileSettings?.contact_information?.phone_number}
          email={data.profileSettings?.contact_information?.email}
        />
        {children}
        <Footer />
      </body>
    </html>
  )
}
