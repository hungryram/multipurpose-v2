import { notFound } from "next/navigation"
import { blogPage } from "../../../../lib/groq-data"
import { client } from "../../../../sanity/lib/client"
import BlogCard from "../components/templates/blog-card"
import { format, parseISO } from 'date-fns'
import { Metadata } from 'next';
import ContentEditor from "../components/util/content-editor"

// GENERATES SEO
export async function generateMetadata(): Promise<Metadata> {
  const post = await client.fetch(blogPage)

  return {
    title: post?.pageSetting?.blog?.seo?.title_tag,
    description: post?.pageSetting?.blog?.seo?.meta_description,
    themeColor: post?.appearances?.mainColors?.primaryColor?.hex,
    metadataBase: new URL(post?.profileSettings?.settings?.websiteName),
    alternates: {
      canonical: 'blog/' + post?.blog?.slug
    },
    openGraph: {
      title: post?.blog?.seo?.title_tag,
      description: post?.blog?.seo?.meta_description,
      url: 'blog/' + post?.blog?.slug,
      siteName: post?.profileSettings?.company_name,
      images: post?.blog?.imageData?.asset?.url,
      locale: 'en-US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: post?.blog?.seo?.title_tag,
      description: post?.blog?.seo?.meta_description,
      creator: '@' + post?.profileSettings?.seo?.twitterHandle,
    },
    icons: {
      icon: post.appearances?.branding?.favicon?.asset?.url,
      shortcut: post.appearances?.branding?.favicon?.asset?.url,
      apple: post.appearances?.branding?.favicon?.asset?.url,
    },
  }
}

export default async function BlogPage() {

  const posts = await client.fetch(blogPage)

  if (!posts) {
    notFound()
  }

  return (
    <div className="section">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{posts?.pageSetting?.blog?.title}</h2>
          {posts?.pageSetting?.blog?.content &&
            <div className="mt-10">
              <ContentEditor
                content={posts?.pageSetting?.blog?.content}
              />
            </div>
          }
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
    </div >
  )
}