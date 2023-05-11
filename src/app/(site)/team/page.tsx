import { client } from "../../../../sanity/lib/client"
import { teamPage } from "../../../../lib/groq-data"
import TeamCard from "../components/templates/team-card"

export default async function TeamSection() {
    
    const team = await client.fetch(teamPage)

    return (
        <div className="section">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our team</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
                        best results for our clients.
                    </p>
                </div>
                <ul
                    role="list"
                    className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                >
                    {team?.team?.map((person: any) => {
                        return (
                            <TeamCard 
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
