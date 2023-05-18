/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\admin\[[...index]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import { colorInput } from "@sanity/color-input";
import { MdOutlineDesignServices, MdPersonOutline } from "react-icons/md"
// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schema'
import {media} from 'sanity-plugin-media'


//  DOCUMENTS
import appearance from './sanity/schemas/documents/appearance'
import authorType from './sanity/schemas/documents/author'
import postType from './sanity/schemas/documents/blog'
import homeDocument from './sanity/schemas/documents/home'
import profileDocument from './sanity/schemas/documents/profile'
import pagesDocument from './sanity/schemas/documents/pages'
import appearanceDocument from './sanity/schemas/documents/appearance'
import testimonialsDocument from './sanity/schemas/documents/testimonials'
import teamDocument from './sanity/schemas/documents/team'
import navigationDocument from './sanity/schemas/documents/navigation'
import servicesDocument from './sanity/schemas/documents/services'
import legalDocument from './sanity/schemas/documents/legal'
import pageSettingsDocument from "./sanity/schemas/documents/page-settings"
// OBJECTS
import contentObject from './sanity/schemas/objects/content'
import seoObject from './sanity/schemas/objects/seo'
import contactObject from './sanity/schemas/objects/contact'
import youtubeObject from './sanity/schemas/objects/youtube'
import locationObject from './sanity/schemas/objects/location'
import socialObject from './sanity/schemas/objects/social'
import mainColorObject from './sanity/schemas/objects/maincolors'
import headerMenuObject from './sanity/schemas/objects/headermenu'
import brandingObject from './sanity/schemas/objects/branding'
import imagecolorObject from './sanity/schemas/objects/imagecolor'
import submenuObject from './sanity/schemas/objects/submenu'
import navigationObject from './sanity/schemas/objects/navigation'
import textcolorObject from './sanity/schemas/objects/textcolor'
import linksObject from './sanity/schemas/objects/links'
import editorLinkObject from './sanity/schemas/objects/editorLink'
import buttonSettingsObject from './sanity/schemas/objects/button-settings'
import secondaryButtonObject from './sanity/schemas/objects/secondary-button'
import imageObject from './sanity/schemas/objects/image'
import codeBlockObject from './sanity/schemas/objects/codeBlock'
import backgroundStylesObject from './sanity/schemas/objects/background-style'
import formBuilderObject from './sanity/schemas/objects/form-builder'

//  PAGEBUILDER
import heroBuilder from './sanity/schemas/pagebuilder/hero'
import contactBuilder from './sanity/schemas/pagebuilder/contact'
import fullWidthTextImageBuilder from './sanity/schemas/pagebuilder/fullwidth-text-image'
import bannerBuilder from './sanity/schemas/pagebuilder/call-to-action'
import disclosureBuilder from './sanity/schemas/pagebuilder/disclosure'
import codeBuilder from './sanity/schemas/pagebuilder/code'
import testimonialsBuilder from './sanity/schemas/pagebuilder/testimonials'
import imageGalleryBuilder from './sanity/schemas/pagebuilder/image-gallery'
import featuredGridBuilder from './sanity/schemas/pagebuilder/featured-grid'
import textImageBuilder from './sanity/schemas/pagebuilder/text-and-image'
import leadFormBuilder from './sanity/schemas/pagebuilder/lead-form'
import pricingBuilder from './sanity/schemas/pagebuilder/pricing'
import logosBuilder from './sanity/schemas/pagebuilder/logos'
import customReviewBuilder from './sanity/schemas/pagebuilder/custom-review'
import teamSectionBuilder from './sanity/schemas/pagebuilder/team-section'
import blogSectionBuilder from './sanity/schemas/pagebuilder/blog-section'
import iconSectionBuilder from './sanity/schemas/pagebuilder/icon-section'
import servicesSectionBuilder from './sanity/schemas/pagebuilder/service-section'
import contentBuilder from './sanity/schemas/pagebuilder/content'
import { CustomActions } from './sanity/actions';
import { settingsPlugin } from './sanity/settings';


export default defineConfig({
  basePath: '/admin',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema: {
    types: [
            // DOCUMENTS
      // settingsType,
      appearanceDocument,
      profileDocument,
      pageSettingsDocument,
      homeDocument,
      navigationDocument,
      pagesDocument,
      servicesDocument,
      teamDocument,
      testimonialsDocument,
      // pressDocument,
      postType,
      authorType,
      legalDocument,
      // OBJECTS
      textcolorObject,
      contentObject,
      editorLinkObject,
      youtubeObject,
      buttonSettingsObject,
      secondaryButtonObject,
      imageObject,
      seoObject,
      contactObject,
      locationObject,
      socialObject,
      mainColorObject,
      headerMenuObject,
      linksObject,
      brandingObject,
      imagecolorObject,
      backgroundStylesObject,
      submenuObject,
      navigationObject,
      codeBlockObject,
      formBuilderObject,
      // PAGEBUILDER
      heroBuilder,
      codeBuilder,
      testimonialsBuilder,
      imageGalleryBuilder,
      pricingBuilder,
      teamSectionBuilder,
      blogSectionBuilder,
      contactBuilder,
      bannerBuilder,
      iconSectionBuilder,
      disclosureBuilder,
      fullWidthTextImageBuilder,
      leadFormBuilder,
      textImageBuilder,
      featuredGridBuilder,
      servicesSectionBuilder,
      contentBuilder,
      customReviewBuilder,
      logosBuilder,
    ]
  },
  plugins: [
    deskTool({
      structure: (S) => {

        const profileListItem = // A singleton not using `documentListItem`, eg no built-in preview
          S.listItem()
            .title(profileDocument.title || '')
            .icon(MdPersonOutline)
            .child(
              S.editor()
                .id(profileDocument.name)
                .schemaType(profileDocument.name)
                .documentId(profileDocument.name)
            )

        const appearanceListItem = // A singleton not using `documentListItem`, eg no built-in preview
          S.listItem()
            .title(appearanceDocument.title || '')
            .icon(MdOutlineDesignServices)
            .child(
              S.editor()
                .id(appearanceDocument.name)
                .schemaType(appearanceDocument.name)
                .documentId(appearanceDocument.name)
            )

        const PageSettingsListItem = // A singleton not using `documentListItem`, eg no built-in preview
          S.listItem()
            .title(pageSettingsDocument.title || '')
            .child(
              S.editor()
                .id(pageSettingsDocument.name)
                .schemaType(pageSettingsDocument.name)
                .documentId(pageSettingsDocument.name)
            )

        // The default root list items (except custom ones)
        const defaultListItems = S.documentTypeListItems().filter((listItem) => {
          const listItemID = listItem.getId();
          return (
            listItemID &&
            ![appearanceDocument.name, pageSettingsDocument.name, 'media.tag', profileDocument.name].includes(listItemID)
          );
        });
        
        

        return S.list()
          .title('Content')
          .items([profileListItem, appearanceListItem, PageSettingsListItem, S.divider(), ...defaultListItems])
      },
    }),
    settingsPlugin({ type: appearanceDocument.name }),
    settingsPlugin({ type: profileDocument.name }),
    settingsPlugin({ type: pageSettingsDocument.name }),
    colorInput(),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    media(),
  ]
})
