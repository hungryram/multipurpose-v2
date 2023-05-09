import { MapPinIcon, EnvelopeIcon, PhoneIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline'
import ContentEditor from '../util/content-editor'
import { contactData } from '../../../../sample/data'

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
                <form action="#" method="POST" className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
                    <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                    First name
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Last name
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Phone number
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="tel"
                                        name="phone-number"
                                        id="phone-number"
                                        autoComplete="tel"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Message
                                </label>
                                <div className="mt-2.5">
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows={4}
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Send message
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
