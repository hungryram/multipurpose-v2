'use client'
import { Disclosure } from '@headlessui/react'
import { FiChevronUp } from 'react-icons/fi'
import ContentEditor from '../util/content-editor'
import HeaderSection from './header-section'

interface Props {
    disclosure: any;
    disclosureBackgroundColor: any;
    disclosureTextColor: any;
    disclosureContentColor: any;
    backgroundStyles: any;
    content: any;
    textAlign: string;
    primaryButtonLink: string;
    primaryButtonText: string;
    primaryButtonStyle: any;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    secondaryButtonStyle: any
}

export default function DisclosureSection({
    disclosure,
    disclosureBackgroundColor,
    disclosureTextColor,
    disclosureContentColor,
    backgroundStyles,
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
        <div className="section">
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
                {disclosure.map((node: any) => {
                    return (
                        <div className="w-full" key={node._key}>
                            <div className="mx-auto w-full md:max-w-2xl rounded-2xl p-2">
                                <Disclosure>
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full justify-between rounded-md px-4 py-2 text-left" style={{
                                                background: `${disclosureBackgroundColor?.hex ?? 'var(--primary-button-background)'}`,
                                                color: `${disclosureTextColor?.hex ?? 'var(--primary-button-text)'}`
                                            }}>
                                                {node?.heading && <span>{node.heading}</span>}
                                                <FiChevronUp
                                                    className={`${open ? 'rotate-180 transform' : ''
                                                        } h-5 w-5`}
                                                    style={{
                                                        color: `${disclosureTextColor?.hex ?? 'var(--primary-button-text)'}`
                                                    }}
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="px-4 pt-4 pb-2" style={{
                                                color: `${disclosureContentColor?.hex ?? '#000000'}`
                                            }}>
                                                {node.content &&
                                                    <ContentEditor
                                                        content={node.content}
                                                    />
                                                }
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
