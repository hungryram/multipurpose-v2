import Image from "next/image"
import ContentEditor from "../util/content-editor"
import { urlForImage } from "../../../../../sanity/lib/image"
import HeaderSection from "./header-section"

interface Props {
    testimonials: any[];
    content: any;
    textAlign: string;
    primaryButtonLink: string;
    primaryButtonText: string;
    primaryButtonStyle: any;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    backgroundStyles: any;
    secondaryButtonStyle: any
}

export default function TestimonialSection({
    testimonials,
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
                <div className={`mx-auto px-6 lg:px-8 ${content && 'mt-10'}`}>
                    <div className="mx-auto flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
                        <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
                            {testimonials?.map((testimonial: any) => (
                                <div key={testimonial._id} className="pt-8 sm:inline-block sm:w-full sm:px-4">
                                    <figure className="rounded-2xl bg-gray-50 p-8 text-sm leading-6">
                                        <blockquote className="text-gray-900">
                                            {testimonial.testimonial &&
                                                <div className="content">
                                                    <ContentEditor
                                                        content={testimonial.testimonial}
                                                    />
                                                </div>
                                            }
                                        </blockquote>
                                        <figcaption className="mt-6 flex items-center gap-x-4">
                                            {testimonial?.image &&
                                                <Image
                                                    className="h-10 w-10 rounded-full"
                                                    src={urlForImage(testimonial?.image).url()}
                                                    alt={testimonial?.name}
                                                    width={100}
                                                    height={100}
                                                />
                                            }
                                            <div>
                                                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                                {testimonial?.position && <div className="text-gray-600">{testimonial?.position}</div>}
                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
