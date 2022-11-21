import { AxiosInstance } from "axios";
import React from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContextType } from "../api/types/AuthTyped";
import ProfileCard from "../components/ProfileCard";
import { AuthContext } from "../context/AuthProvider";

const Profile = () => {
  const { auth, saveAuth } = React.useContext(AuthContext) as AuthContextType;
  const location = useLocation();

  if (!auth?.username) {
    return <Navigate to="/" state={{ from: location }}></Navigate>;
  }

  return (
    <div>
      <ProfileCard id={auth.id}></ProfileCard>
    </div>
  );
};

export default Profile;
