'use client'
import { getPage } from "../../../lib/groq-data";
import Main from "../components/templates/main";

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

export default async function Page({ params }: Props) {
    const slug = params.slug;

    const page = await getPage(slug)
    return (
        <>
            <Main
                pageBuilder={page?.pageBuilder}
                // CONTACT
                email={page?.profileSettings?.contact_information?.email}
                phone_number={page?.profileSettings?.contact_information?.phone_number}
                office_number={page?.profileSettings?.contact_information?.office_number}
                address={page?.profileSettings?.address?.address}
                city={page?.profileSettings?.address?.city}
                state={page?.profileSettings?.address?.state}
                zip_code={page?.profileSettings?.address?.zip_code}

                // FORMS
                emailAlerts={page?.profileSettings?.settings?.emailAlerts}
                sendFrom={page?.profileSettings?.settings?.sendFrom}
                emailBcc={page?.profileSettings?.settings?.emailBcc}
                emailCc={page?.profileSettings?.settings?.emailCc}
                // PAGE FOLDERS
                allServices={page?.allServices}
                allTestimonials={page?.allTestimonial}
                // allBlog={page?.allBlog}
                allTeam={page?.allTeam}
            />
        </>
    )
}
