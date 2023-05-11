import { client } from '../../../../sanity/lib/client'
import { legalPage } from '../../../../lib/groq-data'
import ContentEditor from '../components/util/content-editor'
import Link from 'next/link'

export default async function LegalPage() {

    const legal = await client.fetch(legalPage)

    const pageSettings = legal?.pageSetting?.legal

    return (
        <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">{pageSettings?.title}</h2>
                <div className="mt-10">
                    <ContentEditor 
                        content={pageSettings?.content}
                    />
                </div>
                <div className="my-20">
                    <ul role="list" className="divide-y divide-gray-200">
                        {legal?.legal?.map((item: any) => (
                            <li key={item._id} className="py-4">
                                <Link href={`legal/${item.slug}`}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
