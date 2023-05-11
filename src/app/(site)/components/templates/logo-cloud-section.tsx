import Image from "next/image";
import ContentEditor from "../util/content-editor"
import Styles from "./logo-cloud.module.css"

interface Props {
    images: any;
    content: string[];
    backgroundStyles: any
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
    backgroundStyles
}: Props) {
    return (
        <div className="section" style={backgroundStyles}>
            <div className="container">
                <div className="content text-center">
                    <ContentEditor 
                        content={content}
                    />
                </div>
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
