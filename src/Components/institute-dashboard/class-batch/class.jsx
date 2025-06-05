import React from "react";
import { Routes, Route } from "react-router-dom";
import ClassPage from "./classpage/classpage";
import ArchivePage from "./archive/archivepage";
import TrashPage from "./trashpage/trashpage";
import ClassDetailsArchive from './classdetailspage/ClassDetailsArchive/ClassDetailsArchive';
import ClassDetailsTrash from './classdetailspage/ClassDetailsTrash/ClassDetailsTrash'

import Layout from "./layout";
import AddClass from "./newclasspage/newclasspage";
import ClassDetailsPage from "./classdetailspage/classdetailspage";
import ActiveStudents from "./classdetailspage/ActiveStudents/ActiveStudents";
import InactiveStudents from "./classdetailspage/InactiveStudents/InactiveStudents";

const Class = () => {
  return (
    <Routes>
      {/* ✅ Layout wraps main routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<ClassPage />} />
        <Route path="AddClass" element={<AddClass />} />
        <Route path="ArchivePage" element={<ArchivePage />} />
        <Route path="TrashPage" element={<TrashPage />} />

        {/* ✅ Nested Class Details Route */}
        <Route path=":id/classdetailpage" element={<ClassDetailsPage />} />
        <Route path=":id/classdetailpage/activeStudents" element={<ActiveStudents />} />
        <Route path=":id/classdetailpage/inactiveStudents" element={<InactiveStudents />} />
        <Route path=":id/classdetailpage/archive" element={<ClassDetailsArchive />} />
        <Route path=":id/classdetailpage/trash" element={<ClassDetailsTrash />} />


      </Route>

    </Routes>
  );
};

export default Class;
