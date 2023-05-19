import TeamCard from "./team-card"
import HeaderSection from "./header-section";

interface Props {
    team: any;
    content: any;
    textAlign: string;
    primaryButtonLink: string;
    primaryButtonText: string;
    primaryButtonStyle: any;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    secondaryButtonStyle: any;
    backgroundStyles: any
}

export default function TeamComponent({
    team,
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
                <ul
                    role="list"
                    className={`mx-auto grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 ${content && 'mt-16'}`}
                >
                    {team?.map((person: any) => {
                        return (
                            <TeamCard
                                key={person?._id}
                                name={person.name}
                                position={person.position}
                                image={person?.imageData?.asset?.url}
                                slug={`team/${person.slug.current}`}
                            />
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
