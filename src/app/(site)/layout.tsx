import { client } from '../../../sanity/lib/client'
import Footer from './components/global/footer'
import Navbar from './components/global/navbar'
import { Inter } from 'next/font/google'
import './globals.css'
import { appearance, mainLayoutProfile } from '../../../lib/groq-data'
const inter = Inter({ subsets: ['latin'] })
import { Metadata } from 'next';
import GoogleAnalytics from './components/global/analytics'

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

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    ...(data?.profileSettings?.company_name && { "name": data?.profileSettings?.company_name }),
    ...(data?.profileSettings?.seo?.meta_description && { "description": data?.profileSettings?.seo?.meta_description }),
    ...(data?.profileSettings?.settings?.websiteUrl && { "url": data?.profileSettings?.settings?.websiteUrl }),
    ...(data.appearances.branding.logo.asset.url && { "logo": data.appearances.branding.logo.asset.url }),
    ...(data?.profileSettings?.seo?.imageData?.asset?.url && { "image": data?.profileSettings?.seo?.imageData?.asset?.url }),
    "address": {
      "@type": "PostalAddress",
      ...(data?.profileSettings?.address?.address && { "streetAddress": data?.profileSettings?.address?.address }),
      ...(data?.profileSettings?.address?.city && { "addressLocality": data?.profileSettings?.address?.city }),
      ...(data?.profileSettings?.address?.state && { "addressRegion": data?.profileSettings?.address?.state }),
      ...(data?.profileSettings?.address?.zip_code && { "postalCode": data?.profileSettings?.address?.zip_code }),
      ...(data?.profileSettings?.address?.addressCountry && { "addressCountry": data?.profileSettings?.address?.addressCountry })
    },
    "contactPoint": {
      "@type": "ContactPoint",
      ...(data?.profileSettings?.contact_information?.office_number && { "officeNumber": data?.profileSettings?.contact_information?.office_number }),
      ...(data?.profileSettings?.contact_information?.phone_number && { "directNumber": data?.profileSettings?.contact_information?.phone_number }),
      ...(data?.profileSettings?.contact_information?.email && { "email": data?.profileSettings?.contact_information?.email }),
      "contactType": "Customer Support"
    },
    "sameAs": [
      ...(data?.profileSettings?.social?.facebook ? [data.profileSettings.social.facebook] : []),
      ...(data?.profileSettings?.social?.twitter ? [data.profileSettings.social.twitter] : []),
      ...(data?.profileSettings?.social?.instagram ? [data.profileSettings.social.instagram] : []),
      ...(data?.profileSettings?.social?.youtube ? [data.profileSettings.social.youtube] : []),
      ...(data?.profileSettings?.social?.reddit ? [data.profileSettings.social.reddit] : []),
      ...(data?.profileSettings?.social?.linkedin ? [data.profileSettings.social.linkedin] : []),
      ...(data?.profileSettings?.social?.yelp ? [data.profileSettings.social.yelp] : []),
      ...(data?.profileSettings?.social?.pinterest ? [data.profileSettings.social.pinterest] : []),
      ...(data?.profileSettings?.social?.tiktok ? [data.profileSettings.social.tiktok] : []),
      ...(data?.profileSettings?.social?.zillow ? [data.profileSettings.social.zillow] : [])
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    // Fill the website schema based on localBusiness schema
    ...(data?.profileSettings?.company_name && { "name": data?.profileSettings?.company_name }),
    ...(data?.profileSettings?.settings?.websiteName && { "url": data?.profileSettings?.settings?.websiteName }),
    ...(data?.profileSettings?.seo?.meta_description && { "description": data?.profileSettings?.seo?.meta_description }),
  };

  return (
    <html lang="en">

      {data?.profileSettings?.settings?.googleID &&
        <GoogleAnalytics GA_TRACKING_ID={data?.profileSettings?.settings?.googleID} />
      }
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <style>
          {`
              :root {

                  --primary-accent: ${data.appearances?.primaryAccent ?? '#cccccc'};

                  --footer-background-color: ${data.appearances?.footerBg ?? '#0d1321'};
                  --footer-header-color: ${data.appearances?.footerHeader ?? '#ffffff'};
                  --footer-text-color: ${data.appearances?.footerText ?? '#9b9b9b'};
                  --primary-button-background: ${data.appearances?.primaryButtonBg ?? 'transparent'};
                  --primary-button-text: ${data.appearances?.primaryButtonText ?? '#000000'};
                  --secondary-button-background: ${data.appearances?.secondaryButtonBg ?? 'transparent'};
                  --secondary-button-text: ${data.appearances?.secondaryButtonText ?? '#cccccc'};
                  --secondary-color: ${data.appearances?.secondaryColor ?? '#cccccc'};

                  --header-background-color: ${data.appearances?.navBgColor ? data.appearances?.navBgColor : 'transparent'};
                  --header-navigation-color: ${data.appearances?.navColor ?? '#ffffff'};
                  --mobile-icon-color: ${data.appearances?.mobileIconColor ?? '#ffffff'};

                  --loading-background-color: ${data.appearances?.loaderColor ?? '#0e0e0e'};
                  --loading-image: url(${data.appearances?.loaderImage});

                  --website-body-color: ${data.appearances?.websiteBodyColor ?? '#fff'};
                  --website-text-color: ${data.appearances?.websiteTextColor ?? '#222'};

                  --button-radius: ${`${data.appearances?.buttonRadius ?? 6}px`};
                  --button-y-padding: ${`${data.appearances?.buttonYPadding ?? 8}px`};
                  --button-x-padding: ${`${data.appearances?.buttonXPadding ?? 12}px`};
                  
                  --announcementbar-background-color: ${data.appearances?.announcementBar?.announcementBgColor};
                  --announcementbar-text-color: ${data.appearances?.announcementBar?.announcementTextColor};
              }
          `}
        </style>
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
          ctaLink={data?.appearances?.header?.ctaLink}
          ctaText={data.appearances?.header?.ctaText}
        />
        {children}
        <Footer
          footerText={data.appearances?.footer?.footerText}
          company_name={data.profileSettings.company_name}
          image={data.appearances?.footer?.footerLogo?.asset?.url}
          quickLinksHeading={data.appearances?.footer?.quickLinksHeading}
          quickLinksTwoHeading={data.appearances?.footer?.quickLinksTwoHeading}
          altText={data.ablurDatappearances?.footer?.footerLogo?.asset?.url}
          blurData={data.ablurDatappearances?.footer?.footerLogo?.asset?.lqip}
          email={data.profileSettings?.contact_information?.email}
          phone_number={data.profileSettings?.contact_information?.phone_number}
          office_number={data.profileSettings?.contact_information?.office_number}
          address={data.profileSettings?.address?.address}
          city={data.profileSettings?.address?.city}
          state={data.profileSettings?.address?.state}
          zip_code={data.profileSettings?.address?.zip_code}
          footerDisclaimer={data.appearances?.footer?.footerDisclaimer}
          shortText={data.appearances?.footer?.shortText}
          legal={data.legal}
          links={data.appearances?.footer?.quickLinks}
          secondLinks={data.appearances?.footer?.secondQuickLinks}
          // SOCIAL
          googleBusiness={data.profileSettings?.social?.googleBusiness}
          facebook={data.profileSettings?.social?.facebook}
          youtube={data.profileSettings?.social?.youtube}
          instagram={data.profileSettings?.social?.instagram}
          twitter={data.profileSettings?.social?.twitter}
          reddit={data.profileSettings?.social?.reddit}
          linkedin={data.profileSettings?.social?.linkedin}
          yelp={data.profileSettings?.social?.yelp}
          pinterest={data.profileSettings?.social?.pinterest}
          tiktok={data.profileSettings?.social?.tiktok}
          zillow={data.profileSettings?.social?.zillow}
          size={data.profileSettings?.social?.size}
        />
      </body>
    </html>
  )
}
