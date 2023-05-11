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
  'imageData': featuredImage {
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
'allBlog': *[_type == 'blog'][0...3] {
  ...,
  'imageData': coverImage {
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

const otherDocumentSections = groq`
'allServices': *[_type == 'services'] {
  ...,
  'imageData': featuredImage {
    asset->{
      'altText':altText,
      'lqip':metadata.lqip,
      url
    }
  },
},
'allTeam': *[_type == 'team'] {
  ...,
  'imageData': image {
    asset->{
      'altText':altText,
      'lqip':metadata.lqip,
      url
    }
  },
},
'allBlog': *[_type == 'blog'] {
  ...,
  'coverImageData': coverImage {
    asset->{
      'altText':altText,
      'lqip':metadata.lqip,
      url
    }
  },
},
'allTestimonial': *[_type == 'testimonials']{
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
// app/blog/page.tsx
export const blogPage = groq`
  {
    'blog': *[_type == 'blog']{
      _id,
      title,
      date,
      'slug': slug.current,
      'imageData': coverImage {
        asset-> {
          altText,
          'lqip':metadata.lqip,
          url
        }
      },
    }
  }
`

// FOR app/services/page.tsx
export const servicesPage = groq`
  {
    'services': *[_type == 'services']{
      ...,
      'imageData': featuredImage {
        asset-> {
          altText,
          'lqip':metadata.lqip,
          url
        }
      },
    }
  }
`
//  app/team/page.tsx
export const teamPage = groq`
  {
    'team': *[_type == 'team']{
      ...,
      'imageData': image {
        asset-> {
          altText,
          'lqip':metadata.lqip,
          url
        }
      },
    }
  }
`

//  app/legal/page.tsx
export const legalPage = groq`
  {
    'pageSetting': *[_type == 'pageSetting'][0]{
      legal {
        title,
        content,
        seo {
          ...
        }
      }
    },
    'legal': *[_type == 'legal']{
      _id,
      title,
      'slug': slug.current
    }
  }
`


// 
// FOR /app/[slug]/page.tsx
// 
export async function getPage(slug: string) {
  return client.fetch(groq`
    *[_type == "pages" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      'featuredImageData': featuredImage {
        asset->{
          'altText':altText,
          'lqip':metadata.lqip,
          url
        }
      },
      ${profile}
      ${otherDocumentSections}
      pageBuilder[]{
        ...,
        ${pageBuilderData}
    }
    }`,
    { slug }
  )
}

// 
// FOR /app/services/[slug]/page.tsx
// 
export async function getServices(slug: string) {
  return client.fetch(groq`
    *[_type == "services" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      ${profile}
      ${otherDocumentSections}
      pageBuilder[]{
        ...,
        ${pageBuilderData}
    }
    }`,
    { slug }
  )
}

// 
// FOR /app/team/[slug]/page.tsx
// 
export async function getTeam(slug: string) {
  return client.fetch(groq`
    *[_type == "team" && slug.current == $slug][0]{
      _id,
      name,
      about,
      "slug": slug.current,
      position,
      contactInformation {
        ...
      },
      socialAccounts {
        ...
      },
      seo {
        ...
      },
      'imageData': image {
        asset->{
          url,
          altText,
          lqip
        }
      }
    }`,
    { slug }
  )
}

// 
// FOR /app/blog/[slug]/page.tsx
// 
export async function getBlog(slug: string) {
  return client.fetch(groq`
  {
    'profileSettings': *[_type == 'profile'][0]{
      settings {
        websiteName
      }
    },
    'blog': *[_type == "blog" && slug.current == $slug][0]{
      _id,
      title,
      content,
      "slug": slug.current,
      seo {
        ...
      },
      "author": author->{
        name,
        'avatar': picture{
          asset->{
            url,
            altText,
            lqip
          }
        }
      },
      'imageData': coverImage {
        asset->{
          url,
          altText,
          lqip
        }
      }
    }
  }
  `,
    { slug }
  )
}