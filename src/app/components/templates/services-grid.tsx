import Image from "next/image"
import Link from "next/link"
import ContentEditor from "../util/content-editor";

interface Props {
    content: string;
    services: any
    imageData: string
}

export default function ServiceGrid({
    content,
    services,
}: Props) {
    return (
        <div className="section">
            <div className="container">
                {content &&
                    <div className="content pb-14">
                        <ContentEditor
                            content={content}
                        />
                    </div>
                }
                <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                    {services?.map((node: any) => {
                        return (
                            <li key={node._id} className="relative">
                                <Link href={`services/${node?.slug.current}`}>
                                    <div className="group block w-full overflow-hidden rounded-sm">
                                        {node?.imageData?.asset?.url ?
                                            <Image
                                                src={node?.imageData?.asset?.url}
                                                alt={node?.imageData?.asset?.altText}
                                                className="object-cover group-hover:opacity-75 transition-all duration-500"
                                                width={800}
                                                height={800}
                                            />
                                            :
                                            <div></div>
                                        }
                                    </div>
                                    <p className="pointer-events-none mt-2 block">{node.title}</p>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
