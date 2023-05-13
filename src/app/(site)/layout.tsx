import { client } from '../../../sanity/lib/client'
import Footer from './components/global/footer'
import Navbar from './components/global/navbar'
import { Inter } from 'next/font/google'
import './globals.css'
import { appearance, mainLayoutProfile } from '../../../lib/groq-data'
const inter = Inter({ subsets: ['latin'] })
import { Metadata } from 'next';
import GoogleAnalytics from './components/global/analytics'
import Pixel from "./components/global/pixel"

// GENERATES SEO
export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(mainLayoutProfile)


  return {
    title: data?.profileSettings?.seo?.title_tag,
    description: data?.profileSettings?.seo?.meta_description,
    themeColor: data?.appearances?.mainColors?.primaryColor?.hex,
    metadataBase: new URL(data?.profileSettings?.settings?.websiteName),
    alternates: {
      canonical: '/'
    },
    openGraph: {
      title: data?.profileSettings?.seo?.title_tag,
      description: data?.profileSettings?.seo?.meta_description,
      url: '/',
      siteName: data?.profileSettings?.company_name,
      images: data?.profileSettings?.seo?.imageData?.asset?.url,
      locale: 'en-US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: data?.profileSettings?.seo?.title_tag,
      description: data?.profileSettings?.seo?.meta_description,
      creator: '@' + data?.profileSettings?.seo?.twitterHandle,
    },
    icons: {
      icon: data.appearances?.branding?.favicon?.asset?.url,
      shortcut: data.appearances?.branding?.favicon?.asset?.url,
      apple: data.appearances?.branding?.favicon?.asset?.url,
    },
    verification: {
      google: data?.profileSettings?.settings?.googleVerification
    }
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const data = await client.fetch(appearance)

  return (
    <html lang="en">
      {data?.profileSettings?.settings?.googleID &&
        <GoogleAnalytics GA_TRACKING_ID={data?.profileSettings?.settings?.googleID} />
      }
      {data?.profileSettings?.settings?.facebookPixel &&
        <Pixel facebookPixel={data?.profileSettings?.settings?.facebookPixel} />
      }
      <body className={inter.className}>
        <Navbar
          company_name={data.profileSettings.company_name}
          logo={data.appearances.branding.logo.asset.url}
          navItems={data.appearances.header?.mainNav?.navItems}
          logoWidth={data.appearances.branding?.logo?.logoWidth}
          phone={data.profileSettings?.contact_information?.phone_number}
          office={data.profileSettings?.contact_information?.office_number}
          email={data.profileSettings?.contact_information?.email}
          backgroundColor={data.appearances?.navBgColor}
          enableTopHeader={data?.appearances?.topHeaderBar?.enableTopHeaderBar}
        />
        {children}
        <Footer />
      </body>
    </html>
  )
}
