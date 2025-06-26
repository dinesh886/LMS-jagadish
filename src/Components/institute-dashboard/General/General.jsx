import React from 'react'
import DashBoard from '../dashboard/dashboard'
import TestStatusBar from '../dashboard/teststaus/teststatus'
import { Helmet } from "react-helmet";
const General = () => {
  return (
    <>
      <Helmet>
        <title> General</title>
        <meta name="description" content="General Usage Overview" />
      </Helmet>
    <div>
      <DashBoard />
      <TestStatusBar />
     




    </div>
    </>
  )
}

export default General