import React from 'react'
import { getServices } from '../../../../../lib/groq-data'
import Main from '../../components/templates/main'
import { notFound } from 'next/navigation'

type Props = {
    params: {
        slug: string
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
            pageBuilder={services?.pageBuilder}
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
