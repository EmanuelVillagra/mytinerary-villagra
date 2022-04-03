import "./App.css";
import Indecs from "./pages";
import { useEffect } from "react";
import Cities from "./pages/cities";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InConstruction from "./components/inConstruction";
import DetailPage from "./pages/cardDetails";
import SignUp from "./components/SignUp/signup";
import SignIn from "./components/SignUp/signin";
import { connect } from "react-redux";
import userActions from "./redux/actions/userActions";
import Snack from "./components/Snackbar";
import Activities from "./components/activities.js";

const App = (props) => {
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      props.verifyToken(token);
    }
  }, []);

  return (
    <div className="App">
      <Snack />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Indecs />} />
          <Route path="*" element={<InConstruction />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/cities/detail/:_id" element={<DetailPage />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
};
const mapDispatchToProps = {
  verifyToken: userActions.verifyToken,
};
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
