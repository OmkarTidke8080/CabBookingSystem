import styles from "./App.module.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Landing from "./components/HomePage/landing";
import SignIn from "./components/options/SignIn";
import SignUp from "./components/options/SignUp"; 
import Layout from "./components/layout";

const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.app__outer}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            {/* <Route path="users" element={<Users />} />
            <Route path="cabs" element={<Cabs />} /> */}
          </Route>

          {/* Public pages outside layout */}
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
