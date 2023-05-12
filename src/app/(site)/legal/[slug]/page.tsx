import { notFound } from "next/navigation"
import { getLegal } from "../../../../../lib/groq-data"
import ContentSimple from "../../components/templates/content-simple"
import { Metadata } from 'next';

interface Props {
    params: {
        slug: string
    }
}

type Meta = {
    params: {
        slug: string
    }
}

// GENERATES SEO
export async function generateMetadata({ params }: Meta): Promise<Metadata> {
    const slug = params.slug
    const legal = await getLegal(slug)

    return {
        title: legal?.legal?.seo?.title_tag,
        description: legal?.legal?.seo?.meta_description,
        alternates: {
            canonical: 'legal/' + legal?.legal?.slug
        },
        openGraph: {
            title: legal?.legal?.seo?.title_tag,
            description: legal?.legal?.seo?.meta_description,
            url: 'legal/' + legal?.legal?.slug,
            siteName: legal?.profileSettings?.company_name,
            images: legal?.profileSettings?.seo?.defaultImageBanner?.asset?.url,
            locale: 'en-US',
            type: 'website',
        },
        twitter: {
            title: legal?.legal?.seo?.title_tag,
            description: legal?.legal?.seo?.meta_description,
            creator: '@' + legal?.profileSettings?.seo?.twitterHandle,
        },
        icons: {
            icon: legal.appearances?.branding?.favicon?.asset?.url,
            shortcut: legal.appearances?.branding?.favicon?.asset?.url,
            apple: legal.appearances?.branding?.favicon?.asset?.url,
        },
    }
}

export default async function LegalSlug({ params }: Props) {

    const legal = await getLegal(params.slug)

    if (!legal) {
        notFound()
    }

    return (
        <div className="bg-white px-6 py-32 lg:px-8">
            <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700 content">
                <h1>{legal?.legal?.title}</h1>
                <hr />
                <ContentSimple
                    content={legal?.legal?.content}
                />
            </div>
        </div>
    )
}
