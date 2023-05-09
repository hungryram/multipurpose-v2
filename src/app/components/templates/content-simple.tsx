import ContentEditor from '../util/content-editor'

export default function ContentSimple({
    content,
    layoutType,
    heading
}: any) {
    return (
        <div className="section content">
            <div className={`${layoutType === 'twoColumn' && 'container'}`}>
                {layoutType === 'twoColumn' &&
                    <h2>{heading}</h2>
                }
                <div className={`mx-auto 
                ${layoutType === 'simpleFullWidth' && 'container'}
                ${layoutType === 'narrowContainer' && 'max-w-3xl'}
                ${layoutType === 'twoColumn' && 'columns-2'}
            `}>
                    <ContentEditor
                        content={content}
                    />
                </div>
            </div>
        </div>
    )
}
