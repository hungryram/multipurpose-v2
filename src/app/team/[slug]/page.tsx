import React from 'react'
import { getTeam } from '../../../../lib/groq-data'
import CalltoActionTextImage from '@/app/components/templates/cta-textimage'
import Styles from "@/app/components/templates/cta-textimage.module.css"
import ContentEditor from '@/app/components/util/content-editor'
import Image from 'next/image'
import { DevicePhoneMobileIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

type Props = {
    params: {
        slug: string
    }
}

export default async function TeamSlug({ params }: Props) {
    const slug = params.slug
    const team = await getTeam(slug)
    return (
        <div className="section">
            <div className="container">
                <div className="pb-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <p className="text-base font-semibold leading-7 accent">{team?.position}</p>
                            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{team?.name}</h1>
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold sm:grid-cols-2 md:flex lg:gap-x-10 mt-10">
                                {team?.contactInformation?.phoneNumber && <a href={`tel:${team?.contactInformation?.phoneNumber}`} className="flex items-center"><DevicePhoneMobileIcon className="w-4 h-4 inline-block mr-2 accent"/>{team?.contactInformation?.phoneNumber}</a>}
                                {team?.contactInformation?.email && <a href={`mailto:${team?.contactInformation?.email}`} className="flex items-center"><EnvelopeIcon className="w-4 h-4 inline-block mr-2 accent"/>{team?.contactInformation?.email}</a>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`lg:flex lg:gap-x-20`}>
                    <div className="lg:w-2/5">
                        {team?.imageData?.asset?.url &&
                            <Image
                                src={team?.imageData?.asset?.url}
                                alt={team?.imageData?.asset?.altText}
                                placeholder={team?.imageData?.asset?.lqip ? 'blur' : 'empty'}
                                blurDataURL={team?.imageData?.asset?.lqip}
                                width={1824}
                                height={1080}
                            />
                        }
                    </div>
                    <div className={`${Styles.ctaContent} lg:w-3/5`}>
                        <div className="content pt-10">
                            {team?.about ?
                                <ContentEditor
                                    content={team?.about}
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
