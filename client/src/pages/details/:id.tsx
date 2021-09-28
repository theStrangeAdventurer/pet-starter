import React, { useEffect } from 'react'
import axios from 'axios';
import { Link } from 'src/@core/components/Link';

import './detailsId.css';

export const getSSRProps = async (params: RouteParams = {}) => {
  const response = await axios.get(`/api/details/${params.id}`);
  return { ssrData: response.data, ...params };
};

const DetailsPage = (props: any) => {
  useEffect(() => {
    console.log('My props is', props);
    
  }, []);

  return (
    <div className="detail">
      <h1>DetailsPage</h1>
      <Link to='/'>Go to main pages</Link>
    </div>
  )
}

export default DetailsPage;