import ContentEditor from "../util/content-editor";
import { ctaData } from "../../../../../sample/data";

interface Props {
    content: string
}

export default function CalltoActionLeftText({
    content
}: Props) {
    return (
        <div>
            <div className="container px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between">
                <div className="content lg:w-1/3">
                    {content ?
                        <ContentEditor
                            content={content}
                        />
                        :
                        <div dangerouslySetInnerHTML={{ __html: ctaData.content }} />
                    }
                </div>
                <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
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
    )
}
