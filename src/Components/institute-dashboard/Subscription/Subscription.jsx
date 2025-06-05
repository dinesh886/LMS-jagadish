import React from 'react'
import Layout from './Layout/Layout'
import { Routes, Route } from "react-router-dom";
import SubscriptionIndex from './SubscriptionIndex/SubscriptionIndex';

const Subscription = () => {
  return (
    <Routes>
      {/* Define the parent route with Layout */}
      <Route path="/" element={<Layout />}>
        {/* Child route for TestIndex */}
        <Route index element={<SubscriptionIndex />} />
      
      </Route>
 
    </Routes>
  )
}

export default Subscription