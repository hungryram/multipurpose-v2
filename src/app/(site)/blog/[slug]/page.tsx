import { getBlog } from '../../../../../lib/groq-data'
import Image from 'next/image'
import ContentSimple from '../../components/templates/content-simple'
import ShareSocial from '../../components/templates/share-social'
import { notFound } from 'next/navigation'

type Props = {
    params: {
        slug: string
    }
}

export default async function BlogSlug({ params }: Props) {
    const slug = params.slug
    const post = await getBlog(slug)

    if(!post) {
        notFound()
    }

    const postImage = post?.blog?.imageData?.asset
    const avatar = post?.blog?.author?.avatar?.asset

    return (
        <div className="bg-white px-6 py-32 lg:px-8">
            <div className="mx-auto max-w-3xl leading-7 text-gray-800">
                <div className="mb-10 text-center content">
                    <h1>{post?.blog?.title}</h1>
                </div>
                {post?.blog?.author?.name &&
                    <div className="flex justify-center items-center mx-auto mb-20">
                        <div className="mr-4 flex-shrink-0">
                            <Image
                                src={avatar?.url}
                                alt={avatar?.altText}
                                placeholder={avatar?.lqip ? 'blur' : 'empty'}
                                blurDataURL={avatar?.lqip}
                                width={100}
                                height={100}
                                className="h-10 w-10 rounded-full"
                            />
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold">{post.blog.author.name}</h4>
                        </div>
                    </div>
                }
                <Image
                    src={postImage?.url}
                    alt={postImage?.altText}
                    placeholder={postImage?.lqip ? 'blur' : 'empty'}
                    blurDataURL={postImage?.lqip}
                    width={1500}
                    height={800}
                />
                <div className="content">
                    <ContentSimple
                        content={post?.blog?.content}
                    />
                </div>
                {/* <div className="mt-6">
                    <ShareSocial 
                        url={post?.profileSettings?.settings?.websiteName}
                    />
                </div> */}
            </div>
        </div>
    )
}
