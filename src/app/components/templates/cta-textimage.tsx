import Image from "next/image";
import ContentEditor from "../util/content-editor";
import { ctaData } from "../../../../sample/data";
import Styles from "./cta-textimage.module.css"

interface Props {
    image: string;
    altText: string
    blurData: string
    content: string
    reverseColumn: boolean
}

export default function CalltoActionTextImage({
    image,
    altText,
    blurData,
    content,
    reverseColumn
}: Props) {
    return (
        <div className="section">
            <div className="container">
                <div className={`${Styles.ctaTextImageWrapper} ${reverseColumn ? 'flex-row-reverse' : ''}`}>
                    <div className={`${Styles.ctaContent} lg:w-1/2`}>
                        <div className="content">
                            {content ?
                                <ContentEditor
                                    content={content}
                                />
                                :
                                <div dangerouslySetInnerHTML={{ __html: ctaData.content }} />
                            }
                        </div>
                        <div className="mt-10 flex items-center gap-x-6 ustify-start">
                            <a
                                href="#"
                                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Get started
                            </a>
                            <a href="#" className="text-sm font-semibold leading-6 text-white">
                                Learn more <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        {image ?
                            <Image
                                src={image}
                                alt={altText}
                                placeholder={blurData ? 'blur' : 'empty'}
                                blurDataURL={blurData}
                                width={1824}
                                height={1080}
                            />
                            :
                            <img src={ctaData.image} alt="placeholder" />
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}
