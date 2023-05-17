import BlogCard from "./blog-card"
import { format, parseISO } from 'date-fns'
import HeaderSection from "./header-section"

interface Props {
    blog: any;
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

export default function BlogSection({
    blog,
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
                <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {blog?.map((post: any) => {

                        const parsedDate = parseISO(post?.date)
                        const postImage = post?.imageData?.asset

                        return (
                            <BlogCard
                                key={post?._id}
                                title={post?.title}
                                slug={`blog/${post.slug.current}`}
                                date={format(parsedDate, 'LLLL	d, yyyy')}
                                image={postImage?.url}
                                blurData={postImage?.lqip}
                                altText={postImage?.altText}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
