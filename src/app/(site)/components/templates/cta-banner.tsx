import { ctaData } from "../../../../../sample/data";
import HeaderSection from "./header-section";

interface Props {
  content: string;
  backgroundStyles: any;
  primaryButtonLink: string;
  primaryButtonText: string;
  primaryButtonStyle: any;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  secondaryButtonStyle: any;
  textAlign: string;
}

export default function CallToActionBanner({
  backgroundStyles,
  content,
  primaryButtonLink,
  primaryButtonText,
  primaryButtonStyle,
  secondaryButtonLink,
  secondaryButtonText,
  secondaryButtonStyle,
  textAlign
}: Props) {
  return (
    <div className="section" style={backgroundStyles}>
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
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
          <div dangerouslySetInnerHTML={{ __html: ctaData.content }} />
          }
        </div>
      </div>
    </div>
  )
}
