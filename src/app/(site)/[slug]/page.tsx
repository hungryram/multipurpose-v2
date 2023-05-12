import { notFound } from "next/navigation";
import { getPage } from "../../../../lib/groq-data";
import Main from "../components/templates/main";
import { Metadata } from 'next';

type Props = {
    params: {
        slug: string;
        pageBuilder: any;
        allTestimonials: any;
        allBlog: any;
        allTeam: any;
        profileSettings: any;
    };
};

type Meta = {
    params: {
        slug: string
    }
}

// GENERATES SEO
export async function generateMetadata({ params }: Meta): Promise<Metadata> {
    const slug = params.slug
    const page = await getPage(slug)

    return {
        title: page?.pages?.seo?.title_tag,
        description: page?.pages?.seo?.meta_description,
        alternates: {
            canonical: page?.pages?.slug
        },
        openGraph: {
            title: page?.pages?.seo?.title_tag,
            description: page?.pages?.seo?.meta_description,
            url: page?.pages?.slug,
            siteName: page?.profileSettings?.company_name,
            locale: 'en-US',
            type: 'website',
          },
          twitter: {
            card: 'summary_large_image',
            title: page?.pages?.seo?.title_tag,
            description: page?.pages?.seo?.meta_description,
            creator: '@' + page?.profileSettings?.seo?.twitterHandle,
          },
          icons: {
            icon: page.appearances.branding.favicon.asset.url,
            shortcut: page.appearances.branding.favicon.asset.url,
            apple: page.appearances.branding.favicon.asset.url,
          },
    }
}

// GENERATES PAGE DATA
export default async function Page({ params }: Props) {
    const slug = params.slug;
    const page = await getPage(slug)

    if (!page) {
        notFound()
    }

    return (
        <Main
            pageBuilder={page?.pages?.pageBuilder}
            // CONTACT
            email={page?.pages?.profileSettings?.contact_information?.email}
            phone_number={page?.pages?.profileSettings?.contact_information?.phone_number}
            office_number={page?.pages?.profileSettings?.contact_information?.office_number}
            address={page?.pages?.profileSettings?.address?.address}
            city={page?.pages?.profileSettings?.address?.city}
            state={page?.pages?.profileSettings?.address?.state}
            zip_code={page?.pages?.profileSettings?.address?.zip_code}

            // FORMS
            emailAlerts={page?.pages?.profileSettings?.settings?.emailAlerts}
            sendFrom={page?.pages?.profileSettings?.settings?.sendFrom}
            emailBcc={page?.pages?.profileSettings?.settings?.emailBcc}
            emailCc={page?.pages?.profileSettings?.settings?.emailCc}
            // PAGE FOLDERS
            allServices={page?.pages?.allServices}
            allTestimonials={page?.pages?.allTestimonial}
            allBlog={page?.pages?.allBlog}
            allTeam={page?.pages?.allTeam}
        />
    )
}
