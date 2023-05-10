import { client } from "../../../sanity/lib/client"
import { blogPage } from "../../../lib/groq-data"
import Image from "next/image"
import Link from "next/link"
import { format, parseISO } from 'date-fns'


export default async function BlogPage() {

  const posts = await client.fetch(blogPage)

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts?.blog?.map((post: any) => {
            const parsedDate = parseISO(post?.date)
            const postImage = post?.imageData?.asset
            return (
              <article
                key={post.id}
                className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
              >
                <Image
                  src={postImage.url}
                  alt={postImage?.altText}
                  placeholder={postImage?.lqip ? 'blur' : 'empty'}
                  blurDataURL={postImage?.lqip}
                  className="absolute inset-0 -z-10 h-full w-full object-cover"
                  width={800}
                  height={800}
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                  <time className="mr-8" dateTime={parsedDate}>{format(parsedDate, 'LLLL	d, yyyy')}</time>
                  <div className="-ml-4 flex items-center gap-x-4">
                    {/* <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                      <circle cx={1} cy={1} r={1} />
                    </svg> */}
                    {/* <div className="flex gap-x-2.5">
                      <Image
                        src={post.}
                        alt={''}
                        className="h-6 w-6 flex-none rounded-full bg-white/10"
                      />
                      {post.author.name}
                    </div> */}
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                  <Link href={`blog/${post.slug}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
