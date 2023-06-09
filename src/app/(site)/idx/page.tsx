import { NextPage } from 'next';

type IdxPageProps = {
    idx_body: string;
  };
  
  const IdxPage: NextPage<IdxPageProps> = ({ idx_body }) => {
    return (
      <div className='container'>
        <div className="section content">
            <h1>Test</h1>
        </div>
        {idx_body}
      </div>
    );
  };
  
  export default IdxPage;
  