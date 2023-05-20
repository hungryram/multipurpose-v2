import Image from "next/image";
import { heroData } from "../../../../../sample/data";
import Styles from "./hero.module.css"
import HeaderSection from "./header-section";

interface Props {
    content: string[];
    image: any;
    altText: string;
    blurData: "blur" | "empty" | undefined;
    primaryButtonLink: string;
    primaryButtonText: string;
    primaryButtonStyle: any;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    secondaryButtonStyle: any;
    textAlign: string;
    textColor: string;
    imageOverlayColor: any
}

export default function Hero({
    content,
    image,
    altText,
    blurData,
    primaryButtonLink,
    primaryButtonText,
    primaryButtonStyle,
    secondaryButtonLink,
    secondaryButtonText,
    secondaryButtonStyle,
    textAlign,
    textColor,
    imageOverlayColor
}: Props) {

    const imageOverlay = {
        background:
            `rgba(${imageOverlayColor?.rgb?.r ?? '0'}, ${imageOverlayColor?.rgb?.g ?? '0'}, ${imageOverlayColor?.rgb?.b ?? '0'}, ${imageOverlayColor?.rgb?.a ?? '0.2'})`,
    };

    return (
        <div className={`relative isolate inset-0`}>
            <Image
                src={image ? image : heroData.image}
                alt={altText}
                placeholder={blurData ? 'blur' : 'empty'}
                blurDataURL={blurData}
                className={Styles.heroImage}
                width={2000}
                height={0}
                sizes="100vw"
            />
            <div className="absolute inset-0" style={imageOverlay}></div>
            <div className={`container ${Styles.heroInnerContainer}`}>
                <div style={{
                    color: textColor
                }}>
                    {(content || primaryButtonLink || secondaryButtonLink) ? (
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
                    ) :
                        <div dangerouslySetInnerHTML={{ __html: heroData.content }} />
                    }
                </div>
            </div>
        </div>
    )
}