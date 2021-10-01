import React, { useEffect } from 'react';
import axios from 'axios';

export const getSSRProps = async (params: RouteParams = {}) => {
  const response = await axios.get(`/api/details/${params.categoryId}`);
  return { ssrData: response.data, ...params };
};

const CategoryPage = (props: any) => {
  useEffect(() => {
    console.log('My props is', props);
  }, []);

  return (
    <div>
      <h1>CategoryPage</h1>
    </div>
  );
};

export default CategoryPage;
