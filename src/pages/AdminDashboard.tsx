import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useLocation, Navigate } from "react-router";
import AnnouncementInput from "../api/types/AnnouncementInput";
import { AuthContextType } from "../api/types/AuthTyped";
import UserFilter from "../components/UserFilter";
import { AuthContext } from "../context/AuthProvider";
import { client, publishMessage } from "../websocket/stompClient";
import { v4 as uuidv4 } from "uuid";

const AdminDashboard = () => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<AnnouncementInput>();
    const [announcement, setAnnouncement] = useState<string>();
    const { auth, saveAuth } = React.useContext(AuthContext) as AuthContextType;
    const location = useLocation();

    if(!auth.username || !auth.roles.includes("ADMIN")){
        return <Navigate to="/Login" state={{ from: location }} />;
    }

    const onSubmit: SubmitHandler<AnnouncementInput> = async (body) => {
        if(!client.active){
            client.activate();
        }
        publishMessage(auth.username, '/topic/messages', body.body);
    }
  
    return (<div className="flex flex-col align-center items-center">
        <h1>DASHBOARD</h1>

        <div>
            <h4>Send an announcement to all users</h4>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Control
                type="text"
                style={{ color: "white", backgroundColor: "black" }}
                placeholder="Enter an announcement"
                {...register("body", {required: true})}
                >
                    
                </Form.Control>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
        <div  className="mt-4">
        <h1 className="ml-4">User List</h1>
        <UserFilter client={client}></UserFilter>
      </div>
    </div>)
    
}
export default AdminDashboard;