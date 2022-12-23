import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import FrontPage from "./pages/FrontPage";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import PostPage from "./pages/PostPage";
import CreatePostPage from "./pages/CreatePostPage";
import ProfilePage from "./pages/ProfilePage";
import InboxPage from "./pages/InboxPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<FrontPage></FrontPage>} />
        <Route path="/Register" element={<Register />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/Login" element={<Login></Login>} />
        <Route path="/submit" element={<CreatePostPage></CreatePostPage>} />
        <Route path="/user/:id" element={<ProfilePage></ProfilePage>} />
        <Route path="/inbox/:id" element={<InboxPage></InboxPage>} />
        <Route path="/AdminDashboard" element={<AdminDashboard></AdminDashboard>}></Route>
        <Route path="/"></Route>
      </Routes>
    </>
  );
}

export default App;
