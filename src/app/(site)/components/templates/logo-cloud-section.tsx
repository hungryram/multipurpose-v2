import Image from "next/image";
import Styles from "./logo-cloud.module.css"
import HeaderSection from "./header-section";

interface Props {
    images: any;
    backgroundStyles: any
    content: any;
    textAlign: string;
    primaryButtonLink: string;
    primaryButtonText: string;
    primaryButtonStyle: any;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    secondaryButtonStyle: any
}

function SampleData() {
    return (
        <div>
            <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/transistor-logo-white.svg"
                alt="Transistor"
                width={158}
                height={48}
            />
        </div>
    )
}

export default function LogoCloudSection({
    images,
    content,
    backgroundStyles,
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
                <div className={Styles.gridWrapper}>
                    {images ? images?.map((node: any) => {
                        return (
                            <div key={node?._id}>
                                <Image
                                    className={Styles.logoImage}
                                    src={node?.asset?.url}
                                    alt={node?.asset?.altText}
                                    width={200}
                                    height={48}
                                />
                            </div>
                        )
                    })
                        :
                        <>
                            <SampleData />
                            <SampleData />
                            <SampleData />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
