import Image from "next/image";
import ContentEditor from "../util/content-editor";
import { heroData } from "../../../../sample/data";
import Styles from "./hero.module.css"
import { urlForImage } from "../../../../sanity/lib/image";

interface Props {
    content: string[];
    image: any;
    altText: string;
    blurData: "blur" | "empty" | undefined;
}

export default function Hero({
    content,
    image,
    altText,
    blurData
}: Props) {

    return (
        <div className="relative isolate inset-0">
            <Image
                src={image ? urlForImage(image).url() : heroData.image}
                alt={altText}
                placeholder={blurData ? blurData : 'empty'}
                className={Styles.heroImage}
                width={2000}
                height={0}
                sizes="100vw"
            />
            <div className="absolute inset-0" style={{
                backgroundColor: 'rgba(0,0,0,0.4)'
            }}></div>
            <div className={Styles.heroInnerContainer}>
                <div className={`${Styles.heroContent} content`}>
                    {content ?
                        <ContentEditor
                            content={content}
                        />
                        :
                        <div dangerouslySetInnerHTML={{ __html: heroData.content }}/>
                }
                </div>
            </div>
        </div>
    )
}