import React from 'react'
import { getTeam } from '../../../../../lib/groq-data'
import Styles from '../../components/templates/cta-textimage.module.css'
import ContentEditor from '../../components/util/content-editor'
import Image from 'next/image'
import { DevicePhoneMobileIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
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
    const teamMetaData = await getTeam(slug)

    return {
        title: teamMetaData?.team?.seo?.title_tag,
        description: teamMetaData?.team?.seo?.meta_description,
        alternates: {
            canonical: teamMetaData?.team?.slug
        },
        openGraph: {
            title: teamMetaData?.team?.seo?.title_tag,
            description: teamMetaData?.team?.seo?.meta_description,
            url: teamMetaData?.team?.slug,
            siteName: teamMetaData?.profileSettings?.company_name,
            locale: 'en-US',
            type: 'website',
          },
          twitter: {
            card: 'summary_large_image',
            title: teamMetaData?.team?.seo?.title_tag,
            description: teamMetaData?.team?.seo?.meta_description,
            creator: '@' + teamMetaData?.profileSettings?.seo?.twitterHandle,
          },
          icons: {
            icon: teamMetaData.appearances.branding.favicon.asset.url,
            shortcut: teamMetaData.appearances.branding.favicon.asset.url,
            apple: teamMetaData.appearances.branding.favicon.asset.url,
          },
    }
}

export default async function TeamSlug({ params }: Props) {
    const slug = params.slug
    const team = await getTeam(slug)

    if(!team?.team) {
        notFound()
    }

    return (
        <div className="section">
            <div className="container">
                <div className="pb-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <p className="text-base font-semibold leading-7 accent">{team?.team?.position}</p>
                            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{team?.team?.name}</h1>
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold sm:grid-cols-2 md:flex lg:gap-x-10 mt-10">
                                {team?.team?.contactInformation?.phoneNumber && <a href={`tel:${team?.team?.contactInformation?.phoneNumber}`} className="flex items-center"><DevicePhoneMobileIcon className="w-4 h-4 inline-block mr-2 accent"/>{team?.team?.contactInformation?.phoneNumber}</a>}
                                {team?.team?.contactInformation?.email && <a href={`mailto:${team?.team?.contactInformation?.email}`} className="flex items-center"><EnvelopeIcon className="w-4 h-4 inline-block mr-2 accent"/>{team?.team?.contactInformation?.email}</a>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`lg:flex lg:gap-x-20`}>
                    <div className="lg:w-2/5">
                        {team?.team?.imageData?.asset?.url &&
                            <Image
                                src={team?.team?.imageData?.asset?.url}
                                alt={team?.team?.imageData?.asset?.altText}
                                placeholder={team?.team?.imageData?.asset?.lqip ? 'blur' : 'empty'}
                                blurDataURL={team?.team?.imageData?.asset?.lqip}
                                width={1824}
                                height={1080}
                            />
                        }
                    </div>
                    <div className={`${Styles.ctaContent} lg:w-3/5`}>
                        <div className="content pt-10">
                            {team?.team?.about ?
                                <ContentEditor
                                    content={team?.team?.about}
                                />
                                :
                                <p>Bio coming soon!</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
