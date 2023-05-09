import Image from "next/image";
import { ctaData } from "../../../../sample/data";
import ContentEditor from "../util/content-editor";
import Styles from "./cta-fullwidthimage.module.css"

interface Props {
    image: string;
    altText: string
    blurData: string
    content: string
    reverseColumn: boolean
}

export default function CalltoActionFullWidth({
    image,
    altText,
    blurData,
    content,
    reverseColumn
}: Props) {
    return (
        <div className={`${Styles.fullWidthWrapper} ${reverseColumn ? 'flex-row-reverse' : ''}`}>
            <div className="relative h-96 overflow-hidden md:left-0 md:h-full lg:w-1/2">
                <Image
                    className="h-full w-full object-cover"
                    src={image}
                    alt={altText}
                    placeholder={blurData ? 'blur' : 'empty'}
                    blurDataURL={blurData}
                    width={1000}
                    height={800}
                    
                />
            </div>
            <div className="relative mx-auto lg:w-1/2 justify-center flex items-center">
                <div className="lg:w-2/3 px-4 section">
                    <div className="content">
                        {content ?
                            <ContentEditor
                                content={content}
                            />
                            :
                            <div dangerouslySetInnerHTML={{ __html: ctaData.content }} />
                        }
                    </div>
                    <div className="mt-10 flex items-center gap-x-6 justify-start">
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
            </div>
        </div>
    )
}
