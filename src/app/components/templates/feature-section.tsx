// import { features } from "../../../../sample/data"
import Styles from "./feature-section.module.css"
import * as HeroIcons from '@heroicons/react/24/outline';

interface Props {
    backgroundStyles: any;
    columnNumber: number;
    blocks: any
}

export default function FeatureSection({
    backgroundStyles,
    columnNumber,
    blocks
}: Props) {
    return (
        <div className="section" style={backgroundStyles}>
            <div className="container">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Everything you need to deploy your app
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
                        pulvinar et feugiat blandit at. In mi viverra elit nunc.
                    </p>
                </div>
                <div className={Styles.featureGridWrap}>
                    <dl className={`${Styles.featureGridContainer} grid grid-cols-1 lg:grid-cols-${columnNumber}`}>
                        {blocks?.map((node: any) => {

                            const IconComponent = HeroIcons[node.icon as keyof typeof HeroIcons];
                            const blockLink: any = node?.blockLinking?.internalLink
                            const linkUrl =
                                (blockLink?._type === "pages" && `/${node.blockLinking?.internalLink.slug}`) ||
                                (blockLink?._type === "blog" && `/blog/${node.blockLinking?.internalLink.slug}`) ||
                                (blockLink?._type === "legal" && `/legal/${node.blockLinking?.internalLink.slug}`) ||
                                (blockLink?._type === "services" && `/services/${node.blockLinking?.internalLink.slug}`) ||
                                (blockLink?._type === "team" && `/team/${node.blockLinking?.internalLink.slug}`) ||
                                (blockLink?._type === "locations" && `/locations/${node.blockLinking?.internalLink.slug}`) ||
                                (node.blockLinking?.externalUrl && `${node.blockLinking?.externalUrl}`);
                            return (
                                <div key={node._key} className={Styles.featureCardContainer}>
                                    <dt className={Styles.featureCard} style={{
                                        color: node?.headingColor?.hex
                                    }}>
                                        {IconComponent && (
                                            <IconComponent className="h-5 w-5 flex-none" style={{
                                                color: node?.iconColor?.hex
                                            }} aria-hidden="true" />
                                        )}                                        
                                        {node.value}
                                    </dt>
                                    <dd className={Styles.featureCardContent}>
                                        <p className="flex-auto" style={{
                                            color: node?.contentColor?.hex
                                        }}>{node.content}</p>
                                        <p className="mt-6">
                                            <a href={linkUrl} className={`${Styles.featureCardCta}`} aria-label={`Link to ${node?.value}`} style={{
                                                color: node?.linkColor?.hex
                                            }}>
                                                {node?.button?.text} <span aria-hidden="true">→</span>
                                            </a>
                                        </p>
                                    </dd>
                                </div>
                            )
                        })}
                    </dl>
                </div>
            </div>
        </div>
    )
}
