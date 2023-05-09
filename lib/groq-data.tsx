import { groq } from "next-sanity";
import { client } from "../sanity/lib/client";

export const pageBuilderData = groq`
'backgroundImage': background.background {
  image {
    asset-> {
      'altText': altText,
      'lqip': metadata.lqip,
      url
    }
  }
},
'imageData': image {
  asset-> {
    'altText': altText,
    'lqip': metadata.lqip,
    url
  }
},
'childBlocks': blocks[] {
  ...,
  'blockLinking': button {
    'buttonText': text,
    externalUrl,
    linkType,
    newTab,
    internalLink->{
      title,
      'slug': slug.current,
      _type
    }
  },
  image {
    asset-> {
      'altText': altText,
      'lqip': metadata.lqip,
      url
    }
  }
},
'childImage': images[] {
  asset->{
    'altText': altText,
    'lqip': metadata.lqip,
    url
  }
},
'buttonLinking': button.button{
  'buttonText': text,
  linkType,
  externalUrl,
  newTab,
  internalLink->{
    title,
    'slug': slug.current,
    _type
  }
},
'secondButtonLinking': secondaryButton.button{
  'buttonText': text,
  linkType,
  externalUrl,
  newTab,
  internalLink->{
    title,
    'slug': slug.current,
    _type
  }
},
`

const homeOtherDocumentSections = groq`
'allServices': *[_type == 'services'][0..6] {
  ...,
  'imageData': headerImage {
    asset->{
      'altText':altText,
      'lqip':metadata.lqip,
      url
    }
  },
},
'allTeam': *[_type == 'team'][0...4] {
  ...,
  'imageData': image {
    asset->{
      'altText':altText,
      'lqip':metadata.lqip,
      url
    }
  },
},
'allBlog': *[_type == 'blog'][0...4] {
  ...,
  'coverImageData': coverImage {
    asset->{
      'altText':altText,
      'lqip':metadata.lqip,
      url
    }
  },
},
'allTestimonial': *[_type == 'testimonials'][0..5]{
  ...
},
`

const profile = groq`
'profileSettings': *[_type == 'profile'][0]{
  ...,
},
`

export const homePageData = groq`
{
  'homeAppearance': *[_type == 'appearances'][0]{
  'homePage': homePage-> {
    pageBuilder[]{
        ...,
      ${pageBuilderData}
    }
    }
  },
  ${homeOtherDocumentSections}
  ${profile}
}
`

export async function getPage(slug: string) {
  return client.fetch(groq`
    *[_type == "pages" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      ${profile}
      pageBuilder[]{
        ...,
        ${pageBuilderData}
    }
    }`,
    { slug }
  )
}