import React from 'react'
import { getServices } from '../../../../../lib/groq-data'
import Main from '../../components/templates/main'
import { notFound } from 'next/navigation'
import { Metadata } from 'next';

type Props = {
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
    const servicesMeta = await getServices(slug)

    return {
        title: servicesMeta?.services?.seo?.title_tag,
        description: servicesMeta?.blog?.seo?.meta_description,
        alternates: {
            canonical: 'services/' + servicesMeta?.blog?.slug
        },
        openGraph: {
            title: servicesMeta?.blog?.seo?.title_tag,
            description: servicesMeta?.blog?.seo?.meta_description,
            url: 'services/' + servicesMeta?.blog?.slug,
            siteName: servicesMeta?.profileSettings?.company_name,
            images: servicesMeta?.blog?.imageData?.asset?.url,
            locale: 'en-US',
            type: 'website',
        },
        twitter: {
            title: servicesMeta?.blog?.seo?.title_tag,
            description: servicesMeta?.blog?.seo?.meta_description,
            creator: '@' + servicesMeta?.profileSettings?.seo?.twitterHandle,
        },
        icons: {
            icon: servicesMeta?.appearances?.branding?.favicon?.asset?.url,
            shortcut: servicesMeta?.appearances?.branding?.favicon?.asset?.url,
            apple: servicesMeta?.appearances?.branding?.favicon?.asset?.url,
        },
    }
}

export default async function servicesSlug({ params }: Props) {

    const slug = params.slug
    const services = await getServices(slug)

    if(!services) {
        notFound()
    }

    return (
        <Main
            pageBuilder={services?.services?.pageBuilder}
            allTestimonials={services?.allTestimonial}
            allServices={services?.allServices}
            allBlog={services?.allBlog}
            allTeam={services?.allTeam}
            // CONTACT
            email={services?.profileSettings?.contact_information?.email}
            phone_number={services?.profileSettings?.contact_information?.phone_number}
            office_number={services?.profileSettings?.contact_information?.office_number}
            address={services?.profileSettings?.address?.address}
            city={services?.profileSettings?.address?.city}
            state={services?.profileSettings?.address?.state}
            zip_code={services?.profileSettings?.address?.zip_code}
            // FORM
            emailAlerts={services?.profileSettings?.settings?.emailAlerts}
            sendFrom={services?.profileSettings?.settings?.sendFrom}
            emailBcc={services?.profileSettings?.settings?.emailBcc}
            emailCc={services?.profileSettings?.settings?.emailCc}
        />
    )
}
