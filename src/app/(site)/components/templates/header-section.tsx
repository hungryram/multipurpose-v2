import Link from "next/link"
import ContentEditor from "../util/content-editor"

export default function HeaderSection({
  content,
  textAlign,
  // PRIMARY
  buttonLink,
  primaryButtonText,
  primaryButtonStyle,
  // SECONDARY
  secondaryButtonLink,
  secondaryButtonText,
  secondaryButtonStyle
}: any) {

  const primaryButtonLinking =
    (buttonLink?.internalLink?._type === "pages" && `/${buttonLink?.internalLink.slug}`) ||
    (buttonLink?.internalLink?._type === "blog" && `/blog/${buttonLink?.internalLink.slug}`) ||
    (buttonLink?.internalLink?._type === "legal" && `/legal/${buttonLink?.internalLink.slug}`) ||
    (buttonLink?.internalLink?._type === "services" && `/services/${buttonLink?.internalLink.slug}`) ||
    (buttonLink?.internalLink?._type === "team" && `/team/${buttonLink?.internalLink.slug}`) ||
    (buttonLink?.externalUrl && `${buttonLink?.externalUrl}`)

  const secondaryButtonLinking =
    (secondaryButtonLink?.internalLink?._type === "pages" && `/${secondaryButtonLink?.internalLink.slug}`) ||
    (secondaryButtonLink?.internalLink?._type === "blog" && `/blog/${secondaryButtonLink?.internalLink.slug}`) ||
    (secondaryButtonLink?.internalLink?._type === "legal" && `/legal/${secondaryButtonLink?.internalLink.slug}`) ||
    (secondaryButtonLink?.internalLink?._type === "services" && `/services/${secondaryButtonLink?.internalLink.slug}`) ||
    (secondaryButtonLink?.internalLink?._type === "team" && `/team/${secondaryButtonLink?.internalLink.slug}`) ||
    (secondaryButtonLink?.externalUrl && `${buttonLink?.externalUrl}`)

  return (
    <>
      {primaryButtonLinking || secondaryButtonLinking ? (
        <div className={`content max-w-4xl ${textAlign}`}>
          <ContentEditor content={content} />
          <div className={`mt-10 flex items-center gap-x-6 ${textAlign}`}>
            {primaryButtonLinking && (
              <Link href={primaryButtonLinking} className="primary-button" style={primaryButtonStyle} target={buttonLink?.externalUrl && '_blank'}>
                {primaryButtonText}
              </Link>
            )}
            {secondaryButtonLinking && (
              <Link href={secondaryButtonLinking} className="secondary-button" style={secondaryButtonStyle} target={secondaryButtonLink.externalUrl && '_blank'}>
                {secondaryButtonText} <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className={`content max-w-4xl ${textAlign}`}>
          <ContentEditor content={content} />
        </div>
      )}

    </>
  )
}