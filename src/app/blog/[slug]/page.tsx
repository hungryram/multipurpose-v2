import React from 'react'
import { getBlog } from '../../../../lib/groq-data'
import Image from 'next/image'
import ContentSimple from '@/app/components/templates/content-simple'

type Props = {
    params: {
        slug: string
    }
}

export default async function BlogSlug({ params }: Props) {
    const slug = params.slug
    const post = await getBlog(slug)
    const postImage = post?.imageData?.asset
    const avatar = post?.author?.avatar?.asset

    return (
        <div className="bg-white px-6 py-32 lg:px-8">
            <div className="mx-auto max-w-3xl leading-7 text-gray-800">
                <div className="mb-10 text-center content">
                    <h1>{post.title}</h1>
                </div>
                {post?.author?.name &&
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
                            <h4 className="text-lg font-bold">{post.author.name}</h4>
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
                        content={post?.content}
                    />
                </div>
            </div>
        </div>
    )
}
