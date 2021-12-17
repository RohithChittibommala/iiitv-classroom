/* eslint-disable react/prop-types */
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import CourseDetails from "./components/CourseDetails";
import InstructorsPage from "./components/Instructors";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/pages/Register";
import ApprovedCoursesPage from "./components/pages/ApprovedCoursesPage";
import PendingCourses from "./components/PendingCourses";
import ProfilePage from "./components/pages/ProfilePage";

function App() {
  const role = useSelector((state) => state.user.role);

  return (
    <div className="overflow-hidden">
      {role && <SideBar />}
      {role && <NavBar />}
      <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        closeOnClick
        theme={"colored"}
        pauseOnHover
      />
      <Routes>
        <Route
          path="/"
          element={
            <RequiredAuth redirectTo="/login">
              <Home />
            </RequiredAuth>
          }
        />
        <Route
          path="/instructors"
          element={
            <RequiredAuth redirectTo="/" allowedRoles={["admin"]}>
              <InstructorsPage />
            </RequiredAuth>
          }
        />

        <Route
          path="/courses"
          element={
            <RequiredAuth redirectTo="/" allowedRoles={["student"]}>
              <ApprovedCoursesPage />
            </RequiredAuth>
          }
        />

        <Route
          path="/course/:courseId"
          element={
            <RequiredAuth redirectTo="/">
              <CourseDetails />
            </RequiredAuth>
          }
        />

        <Route
          path="/profile"
          element={
            <RequiredAuth redirectTo="/">
              <ProfilePage />
            </RequiredAuth>
          }
        />

        <Route
          path="/login"
          element={
            <NotAllowedIfLoggedIn redirectTo="/">
              <Login />
            </NotAllowedIfLoggedIn>
          }
        />

        <Route
          path="/pending"
          element={
            <RequiredAuth redirectTo="/" allowedRoles={["instructor", "admin"]}>
              <PendingCourses />
            </RequiredAuth>
          }
        />

        <Route
          path="/register"
          element={
            <NotAllowedIfLoggedIn redirectTo="/">
              <Register />
            </NotAllowedIfLoggedIn>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

function RequiredAuth({ children, redirectTo, allowedRoles }) {
  const role = useSelector((state) => state.user.role);

  if (!role) return <Navigate to={redirectTo} />;

  if (allowedRoles) {
    const isAuthorized = allowedRoles.includes(role);
    return isAuthorized ? children : <Navigate to={redirectTo} />;
  }
  return children;
}

function NotAllowedIfLoggedIn({ children, redirectTo }) {
  const role = useSelector((state) => state.user.role);

  if (role) return <Navigate to={redirectTo} />;

  return children;
}

export default App;
