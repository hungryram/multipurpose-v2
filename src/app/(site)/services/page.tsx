import { client } from "../../../../sanity/lib/client"
import { servicesPage } from "../../../../lib/groq-data"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import ContentEditor from "../components/util/content-editor"

// GENERATES SEO
export async function generateMetadata() {
    const serviceMeta = await client.fetch(servicesPage, { next: { revalidate: 60 } })

    return {
        title: serviceMeta?.pageSetting?.services?.seo?.title_tag,
        description: serviceMeta?.pageSetting?.services?.seo?.meta_description,
        alternates: {
            canonical: 'services/'
        },
        openGraph: {
            title: serviceMeta?.pageSetting?.services?.seo?.title_tag,
            description: serviceMeta?.pageSetting?.services?.seo?.meta_description,
            url: 'services/',
            siteName: serviceMeta?.profileSettings?.company_name,
            images: serviceMeta?.profileSettings?.seo?.defaultImageBanner?.asset?.url,
            locale: 'en-US',
            type: 'website',
        },
        twitter: {
            title: serviceMeta?.pageSetting?.services?.seo?.title_tag,
            description: serviceMeta?.pageSetting?.services?.seo?.meta_description,
            creator: '@' + serviceMeta?.profileSettings?.seo?.twitterHandle,
        },
        icons: {
            icon: serviceMeta.appearances?.branding?.favicon?.asset?.url,
            shortcut: serviceMeta.appearances?.branding?.favicon?.asset?.url,
            apple: serviceMeta.appearances?.branding?.favicon?.asset?.url,
        },
    }
}

export default async function ServicesSection() {

    const services = await client.fetch(servicesPage, { next: { revalidate: 60 } })

    if (!services.services) {
        notFound()
    }

    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Services",
        "url": `${services?.profileSettings?.settings?.websiteName}/services`,
        ...(services?.pageSetting?.services?.seo?.meta_description && { "description": services?.pageSetting?.services?.seo?.meta_description }),
        "mainEntity": services?.services?.map((node: any) => ({
            ...{
                "@type": "Service",
                "name": node?.title,
                "description": node.description,
                "image": node.imageData?.asset.url,
                "provider": {
                    "@type": "Organization",
                    "name": services?.profileSettings?.company_name,
                    "url": `${services?.profileSettings?.settings?.websiteName}/services/${node?.slug?.current}`,
                },
            },
        })),
    };


    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
            />
            <div className="section">
                <div className="container">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{services?.pageSetting?.services?.title}</h2>
                        {services?.pageSetting?.services?.content &&
                            <div className="mt-10">
                                <ContentEditor
                                    content={services?.pageSetting?.services?.content}
                                />
                            </div>
                        }
                    </div>
                    <ul
                        role="list"
                        className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                    >
                        {services?.services?.map((node: any) => {

                            const imageData = node?.imageData?.asset

                            return (
                                <li key={node._id}>
                                    <Link href={`services/${node?.slug?.current}`} aria-label={`link to ${node.title}`}>
                                        <Image
                                            className="w-full rounded-2xl object-cover"
                                            src={imageData?.url}
                                            alt={imageData?.altText}
                                            width={800}
                                            height={800}
                                            placeholder={imageData?.lqip ? 'blur' : 'empty'}
                                            blurDataURL={imageData?.lqip}
                                        />
                                        <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{node.title}</h3>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}
