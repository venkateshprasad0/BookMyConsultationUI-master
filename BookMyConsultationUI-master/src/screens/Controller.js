import React from "react";
import Home from "../screens/home/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BookAppointment from "./doctorList/BookAppointment";
import DoctorDetails from "./doctorList/DoctorDetails";

const Controller = () => {
  const baseUrl = "http://localhost:8080/";
  return (
    <Router>
      <div className="main-container">
      <Route
          path="/bookappointment/:doctorId/:doctorFName/:doctorSName"
          render={(props) => <BookAppointment {...props} baseUrl={baseUrl} />}
        />
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} baseUrl={baseUrl} />}
        />
      </div>
    </Router>
  );
};

export default Controller;
