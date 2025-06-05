import React, { useState } from "react";
import { Routes, Route } from "react-router-dom"; // Added Outlet
import Trashed from "./Sidebar/Trashed/Trashed";
import Layout from "./Layout/Layout";
import Questionindex from "./Questionindex/Questionindex"; // Import the index route
import Archived from "./Archived/Archived";
import All from "../QuestionBanks/All/All";
import Sidebar from "../QuestionBanks/Sidebar/Sidebar"; // Import Sidebar
import Modal from "../QuestionBanks/NewQBModal/Modal";
import ConfirmationModal from "../QuestionBanks/NewQBModal/ConfirmationModal"; // Import confirmation modal
import Header from "../../header/header";
import TopBar from "../class-batch/classtopbar/classtopbar";
import QuestionsAdd from "./QuestionsAdd/QuestionsAdd";
import { useParams, useNavigate } from "react-router-dom";
import QuestionDetail from "./QuestionDetail/QuestionDetail";
import AddQuestionTrash from "./AddQuestionTrash/AddQuestionTrash";

const QuestionBank = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [editRow, setEditRow] = useState(null); // To track the row being edited

  return (
    <div className="question-bank-layout">
      <div className="content-area">
        {/* Nested Routes */}
        <Routes>
          {/* Define the parent route with Layout */}
          <Route path="/" element={<Layout />}>
            {/* Child routes */}
            <Route index element={<Questionindex />} /> {/* Default route */}
            <Route path="Trashed" element={<Trashed />} />
            <Route path="Archived" element={<Archived />} />
            <Route path="All" element={<All />} />
            <Route path=":id/add" element={<QuestionsAdd />} />

           
            {/* Nested route inside Trashed */}
            <Route path="Trashed/:id/add" element={<AddQuestionTrash />} />


            <Route path="question-bank/:id/question/:questionId" element={<QuestionDetail />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default QuestionBank;
