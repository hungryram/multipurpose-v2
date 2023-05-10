import { client } from "../../../sanity/lib/client"
import { groq } from "next-sanity"
import { servicesPage } from "../../../lib/groq-data"
import Image from "next/image"
import Link from "next/link"

export default async function ServicesSection() {

    const services = await client.fetch(servicesPage)

    return (
        <div className="section">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our team</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
                        best results for our clients.
                    </p>
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
    )
}
