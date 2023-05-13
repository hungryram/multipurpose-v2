'use client'
import { MapPinIcon, EnvelopeIcon, PhoneIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline'
import { contactData } from '../../../../../sample/data';
import ContentEditor from '../util/content-editor';
import FormBuilder from './form-builder';

interface Props {
    content: string;
    email: string;
    phone_number: string;
    office_number: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    emailAlerts: string;
    sendFrom: string;
    emailBcc: string;
    emailCc: string;
    formBuilder: any
}

export default function ContactPage({
    content,
    // CONTACT
    email,
    phone_number,
    office_number,
    address,
    city,
    state,
    zip_code,
    formBuilder,
    emailAlerts,
    sendFrom,
    emailBcc,
    emailCc,
}: Props) {
    return (
        <div className="relative isolate bg-white">
            <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
                <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
                    <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                        <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
                        </div>
                        <div className="content">
                            {content ?
                                <ContentEditor
                                    content={content}
                                />
                                :
                                <div dangerouslySetInnerHTML={{ __html: contactData.content }} />
                            }
                        </div>
                        <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
                            {address || city || state || zip_code ? (
                                <div className="flex gap-x-4">
                                    <dt className="flex-none">
                                        <span className="sr-only">Address</span>
                                        <MapPinIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                    </dt>
                                    <dd>
                                        {address && (
                                            <>
                                                {address}
                                                <br />
                                            </>
                                        )}
                                        {city && (
                                            <>
                                                {city ? city + ',' : ''}
                                            </>
                                        )}{' '}
                                        {state} {zip_code}
                                    </dd>
                                </div>
                            ) : null}

                            {phone_number &&
                                <div className="flex gap-x-4">
                                    <dt className="flex-none">
                                        <span className="sr-only">Direct</span>
                                        <DevicePhoneMobileIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                    </dt>
                                    <dd>
                                        <a className="hover:text-gray-900" href={`tel:${phone_number}`}>
                                            {phone_number}
                                        </a>
                                    </dd>
                                </div>
                            }
                            {office_number &&
                                <div className="flex gap-x-4">
                                    <dt className="flex-none">
                                        <span className="sr-only">Phone</span>
                                        <PhoneIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                    </dt>
                                    <dd>
                                        <a className="hover:text-gray-900" href={`tel:${office_number}`}>
                                            {office_number}
                                        </a>
                                    </dd>
                                </div>
                            }
                            {email &&
                                <div className="flex gap-x-4">
                                    <dt className="flex-none">
                                        <span className="sr-only">Email</span>
                                        <EnvelopeIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                    </dt>
                                    <dd>
                                        <a className="hover:text-gray-900" href={`mailto:${email}`}>
                                            {email}
                                        </a>
                                    </dd>
                                </div>
                            }
                        </dl>
                    </div>

                </div>
                <div>
                    <FormBuilder 
                        formSchema={formBuilder}
                    />
                </div>
            </div>
        </div>
    )
}
