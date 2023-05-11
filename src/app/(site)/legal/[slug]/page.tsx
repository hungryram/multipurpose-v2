import { notFound } from "next/navigation"
import { getLegal } from "../../../../../lib/groq-data"
import ContentSimple from "../../components/templates/content-simple"

interface Props {
    params: {
        slug: string
    }
}

export default async function LegalSlug({ params }: Props) {

    const legal = await getLegal(params.slug)

    if(!legal) {
        notFound()
    }

    return (
        <>
            <div className="bg-white px-6 py-32 lg:px-8">
                <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700 content">
                    <h1>{legal.title}</h1>
                    <hr />
                    <ContentSimple
                        content={legal?.content}
                    />
                </div>
            </div>
        </>
    )
}
