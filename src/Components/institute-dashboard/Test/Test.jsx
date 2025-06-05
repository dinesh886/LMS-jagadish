import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Test/TestLayout/Layout"; // Import Layout component
import TestIndex from "../Test/TestIndex/TestIndex"; // Import the main content for the route
import Alltest from "./AllTest/Alltest"; // Import Alltest component
import SharedWithMe from "./SharedWithMe/SharedWithMe";
import Dispatched from "./Dispatched/Dispatched";
import Undispatched from "./Undispatched/Undispatched";
import Archived from "./Archived/Archived";
import Trashed from "./Trashed/Trashed";
import TestAdd from "./TestAdd/TestAdd";
import TestDetail from "./TestDetail/TestDetail";
import TestQuestionAdd from './TestQuestionAdd/TestQuestionAdd'
import QuestionView from './QuestionsViewPage/QuestionsViewPage'

const Test = () => {
  return (
    <Routes>
      {/* Define the parent route with Layout */}
      <Route path="/" element={<Layout />}>
        {/* Child route for TestIndex */}
        <Route index element={<TestIndex />} />
        {/* Route for Alltest */}
        <Route path="alltest" element={<Alltest />} />
        <Route path="shared-with-me" element={<SharedWithMe />} />
        <Route path="dispatched" element={<Dispatched />} />
        <Route path="/undispatched" element={<Undispatched />} />
        <Route path="/archived" element={<Archived />} />
        <Route path="/trashed" element={<Trashed />} />
        <Route path=":id/movetest" element={<TestAdd />} />{" "}
        <Route path=":id/movetest/testquestionadd" element={<TestQuestionAdd />} />{" "}
        {/* Question details page */}
        <Route path=":id/movetest/viewquestions" element={<QuestionView />} />

        <Route path="test/:id/test/:testId" element={<TestDetail />} />

        {/* <Route path="/tag/:tagName" element={<TagPage />} /> */}
      </Route>

    </Routes>
  );
};

export default Test;
