import React from 'react'
import DetailsPage from 'src/pages/details/:id';
import MainPage from 'src/pages/index';

export const App = (props: CommonPageProps) => {
  const renderContent = () => {
    if (props.route === "/details/:id") {
      return <DetailsPage {...props} />
    }
    return <MainPage {...props}/>
  }

  return (
    <div>
      {renderContent()}
    </div>
  )
}
