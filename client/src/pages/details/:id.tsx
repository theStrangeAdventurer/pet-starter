import React, { useEffect } from 'react'
import axios from 'axios';
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
    </div>
  )
}

export default DetailsPage;