import { notFound } from "next/navigation"
import { blogPage } from "../../../../lib/groq-data"
import { client } from "../../../../sanity/lib/client"
import BlogCard from "../components/templates/blog-card"
import { format, parseISO } from 'date-fns'


export default async function BlogPage() {

  const posts = await client.fetch(blogPage)

  if(!posts) {
    notFound()
  }

  return (
    <div className="section">
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
              <BlogCard
                key={post?._id}
                title={post?.title}
                slug={`blog/${post.slug}`}
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