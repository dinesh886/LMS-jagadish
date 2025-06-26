import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Class from './Components/institute-dashboard/class-batch/class';
import Institute from './Components/institute-dashboard/dashboard/institute/institute';
import QuestionBank from './Components/institute-dashboard/QuestionBanks/QuestionBank';
import Trashed from './Components/institute-dashboard/QuestionBanks/Sidebar/Trashed/Trashed';
import Test from './Components/institute-dashboard/Test/Test';
import Teachers from './Components/institute-dashboard/Teachers/Teachers';
import Subscription from './Components/institute-dashboard/Subscription/Subscription';
import General from './Components/institute-dashboard/General/General';
import MainDashboard from './Components/institute-dashboard/MainDashboard/MainDashboard';
import TeachersRoutes from "./Components/teachersRoutes";
import StudentRoutes from './Routes/StudentRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Changed to min.css
import PathLostPage from './Components/PathLostPage/PathLostPage';

function App() {
  return (
    <Router basename='/lmsinstitutejune5'>
      <Routes>
     
     
        {/* Define routes for institute Dashboard components */}
        <Route path="/" element={<MainDashboard />} />
        <Route path="/MainDashboard/*" element={<MainDashboard />} />
        <Route path="/class/*" element={<Class />} />
        <Route path="/QuestionBank/*" element={<QuestionBank />} />
        <Route path="/Test/*" element={<Test />} />
        <Route path="/teachers/*" element={<Teachers />} />
        <Route path="/subscription/*" element={<Subscription />} />

        {/* Teachers Dashboard Routes */}
        <Route path="/teachers-dashboard/*" element={<TeachersRoutes />} />
        {/* student */}
          <Route path="/student/*" element={<StudentRoutes />} />
          <Route path="*" element={<PathLostPage />} />
 
      </Routes>
      <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light" // <- Set theme here
/>
    </Router>
  );
}

export default App;