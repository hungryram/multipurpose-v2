import Styles from "./feature-section.module.css"
import * as HeroIcons from '@heroicons/react/24/outline';
import HeaderSection from "./header-section";

interface Props {
    backgroundStyles: any;
    columnNumber: number;
    blocks: any;
    content: any;
    textAlign: string;
    primaryButtonLink: string;
    primaryButtonText: string;
    primaryButtonStyle: any;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    secondaryButtonStyle: any
}

export default function FeatureSection({
    backgroundStyles,
    columnNumber,
    blocks,
    content,
    textAlign,
    primaryButtonLink,
    primaryButtonText,
    primaryButtonStyle,
    secondaryButtonLink,
    secondaryButtonText,
    secondaryButtonStyle
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
                <div className={Styles.featureGridWrap}>
                    <dl className={`${Styles.featureGridContainer} grid grid-cols-1 lg:grid-cols-${columnNumber} ${content && 'mt-20'}`}>
                        {blocks?.map((node: any) => {

                            const IconComponent = HeroIcons[node.icon as keyof typeof HeroIcons];
                            const blockLink: any = node?.blockLinking?.internalLink
                            const linkUrl =
                                (blockLink?._type === "pages" && `/${node.blockLinking?.internalLink.slug}`) ||
                                (blockLink?._type === "blog" && `/blog/${node.blockLinking?.internalLink.slug}`) ||
                                (blockLink?._type === "legal" && `/legal/${node.blockLinking?.internalLink.slug}`) ||
                                (blockLink?._type === "services" && `/services/${node.blockLinking?.internalLink.slug}`) ||
                                (blockLink?._type === "team" && `/team/${node.blockLinking?.internalLink.slug}`) ||
                                (blockLink?._type === "team" && `/team/${node.blockLinking?.internalLink.slug}`) ||
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
