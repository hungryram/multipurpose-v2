import { groq } from 'next-sanity'
import { client } from '../../../sanity/lib/client'
import Footer from './components/global/footer'
import Navbar from './components/global/navbar'
import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })

const sanityData = groq`
{
  'profileSettings': *[_type == 'profile'][0] {
    ...,
    'defaultImageData': seo.defaultImageBanner.asset->{
      'altText': altText,
      'lqip': metadata.lqip,
      url
    }
  },
  'appearances': *[_type == 'appearances'][0] {
    header {
      defaultHeaderImage
    },
    'favicon': branding.favicon,
    'themeColor': mainColors.primaryColor.hex,
    'defaultHeaderBanner': header.defaultHeaderImage.asset->{
      'altText': altText,
      'lqip': metadata.lqip,
      url
    }
  }
}

`

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const data = await client.fetch(sanityData)
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar 
          company_name={data.profileSettings.company_name}
        />
        {children}
        <Footer />
      </body>
    </html>
  )
}
