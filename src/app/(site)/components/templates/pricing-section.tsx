import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { pricingTiers } from '../../../../../sample/data';
import Styles from "./pricing.module.css"
import HeaderSection from './header-section';

interface Props {
    name: string;
    price: string;
    href: string;
    features: string[],
    description: string,
    packageType: string;
    ctaText: string;
}

interface Pricing {
    packages: any;
    columnNumber: number;
    content: any;
    textAlign: string;
    primaryButtonLink: string;
    primaryButtonText: string;
    primaryButtonStyle: any;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    secondaryButtonStyle: any;
    backgroundStyles: any;
}

export function PricingTable({
    name,
    price,
    href,
    features,
    description,
    packageType,
    ctaText,
}: Props) {
    return (
        <div className="pt-16 lg:px-8 lg:pt-0 xl:px-14">
            <h3 id={name.replace(/ /g, '')} className="text-base font-semibold leading-7 text-gray-900">
                {name}
            </h3>
            <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-5xl font-bold tracking-tight text-gray-900">{price}</span>
                <span className="text-sm font-semibold leading-6 text-gray-600">/{packageType}</span>
            </p>
            {href &&
                <a
                    href={href}
                    aria-describedby={name}
                    className={Styles.pricingCta}
                >
                    {ctaText}
                </a>
            }
            {description && <p className="mt-10 text-sm font-semibold leading-6 text-gray-900">{description}</p>}
            {features &&
                <ul role="list" className="mt-6 space-y-3 text-sm leading-6 text-gray-600">
                    {features?.map((feature: string) => {
                        return (
                            <li key={feature.replace(/ /g, '')} className="flex gap-x-3">
                                <CheckCircleIcon className="h-6 w-5 flex-none accent" aria-hidden="true" />
                                {feature}
                            </li>
                        )
                    })}
                </ul>
            }
        </div>
    )
}

export default function PricingSection({
    packages,
    columnNumber,
    content,
    textAlign,
    primaryButtonLink,
    primaryButtonText,
    primaryButtonStyle,
    secondaryButtonLink,
    secondaryButtonText,
    secondaryButtonStyle,
    backgroundStyles
}: Pricing) {
    return (
        <div className="section" style={backgroundStyles}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
                <div className="mt-20 flow-root">
                    <div className={`${Styles.pricingGrid} grid lg:grid-cols-${columnNumber} grid-cols-1`}>
                        {packages ? packages?.map((node: any, i: any) => {
                            return (
                                <PricingTable
                                    key={i}
                                    name={node?.name}
                                    price={node?.price}
                                    packageType={node?.packageType}
                                    ctaText={node?.buttonText}
                                    href={node?.link}
                                    features={node?.details}
                                    description={node?.content}
                                />
                            )
                        })
                            :
                            pricingTiers.map((node, i) => {
                                return (
                                    <PricingTable
                                        key={i}
                                        name={node?.name}
                                        price={node?.price}
                                        packageType={node?.packageType}
                                        features={node?.features}
                                        href={node?.href}
                                        ctaText={node?.ctaText}
                                        description={node?.description}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
