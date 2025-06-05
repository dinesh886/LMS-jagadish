import React from 'react'
import TeachersIndex from './TeachersIndex/TeachersIndex'
import Layout from './TeachersLayout/Layout'
import { Routes, Route } from "react-router-dom";
import Trashed from  '../Teachers/Trashed/Trashed';
import Archived from '../Teachers/Archived/Archived';

const Teachers = () => {
  return (
    
  
        <Routes>
          {/* Define the parent route with Layout */}
          <Route path="/" element={<Layout />}>
           
        <Route index element={<TeachersIndex />} />
        {/* Child route  */}
        <Route path="allteachers" element={<TeachersIndex />} />
            <Route path="Trashed" element={<Trashed />} />
            <Route path="Archived" element={<Archived />} />
          

          
          </Route>

        </Routes>
      
  )
}

export default Teachers