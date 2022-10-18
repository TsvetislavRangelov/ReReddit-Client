import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import FrontPage from "./pages/FrontPage";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";
import ViewPost from "./components/ViewPost";
import Login from "./pages/Login";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<FrontPage></FrontPage>} />
        <Route path="/Register" element={<Register />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/Login" element={<Login></Login>} />
      </Routes>
    </>
  );
}

export default App;
