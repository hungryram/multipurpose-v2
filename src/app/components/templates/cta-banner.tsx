import { ctaData } from "../../../../sample/data";
import ContentEditor from "../util/content-editor";

interface Props {
  content: string
}

export default function CallToActionBanner({
  content
}: Props) {
  return (
    <div>
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="content">
            {content ?
              <ContentEditor
                content={content}
              />
              :
              <div dangerouslySetInnerHTML={{ __html: ctaData.content }} />
            }
          </div>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
