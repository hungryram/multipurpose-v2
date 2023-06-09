export default function IdxPage() {
  return (
    <div className="section">
      <div className="container">
        <div className="content">
          <h1>IDX PAGE</h1>
          <div dangerouslySetInnerHTML={{ __html: `{idx_body}` }}/>
        </div>
      </div>
    </div>
  )
}