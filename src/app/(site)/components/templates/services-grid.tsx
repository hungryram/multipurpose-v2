import Image from "next/image"
import Link from "next/link"
import HeaderSection from "./header-section";

interface Props {
    content: string;
    services: any
    imageData: string
    textAlign: string;
    primaryButtonLink: string;
    primaryButtonText: string;
    primaryButtonStyle: any;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    secondaryButtonStyle: any;
    backgroundStyles: any
}

export default function ServiceGrid({
    services,
    content,
    textAlign,
    primaryButtonLink,
    primaryButtonText,
    primaryButtonStyle,
    secondaryButtonLink,
    secondaryButtonText,
    secondaryButtonStyle,
    backgroundStyles
}: Props) {
    return (
        <div className="section" style={backgroundStyles}>
            <div className="container">
                {(content || primaryButtonLink || secondaryButtonLink) && (
                    <HeaderSection
                        content={content}
                        textAlign={textAlign}
                        // PRIMARY
                        buttonLink={primaryButtonLink}
                        primaryButtonText={primaryButtonText}
                        primaryButtonStyle={primaryButtonStyle}
                        // SECONDARY
                        secondaryButtonLink={secondaryButtonLink}
                        secondaryButtonText={secondaryButtonText}
                        secondaryButtonStyle={secondaryButtonStyle}
                    />
                )}
                <ul role="list" className={`grid md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8 ${content && 'mt-16'}`}>
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
                                    <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{node.title}</h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        {node?.detail}
                                    </p>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
