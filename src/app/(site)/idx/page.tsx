export default function IdxPage() {
    return (
        <div>
            <div className="section">
                <div className="container">
                    <h1>IDX PAGE</h1>
                </div>
            </div>
            <div 
                dangerouslySetInnerHTML={{ __html: `{idx_body}` }}
            />
        </div>
    )
}