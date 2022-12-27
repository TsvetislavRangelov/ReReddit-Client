import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useLocation, Navigate } from "react-router";
import AnnouncementInput from "../api/types/AnnouncementInput";
import { AuthContextType } from "../api/types/AuthTyped";
import UserFilter from "../components/UserFilter";
import { AuthContext } from "../context/AuthProvider";
import { client, publishMessage } from "../websocket/stompClient";

const AdminDashboard = () => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<AnnouncementInput>();
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
        <h1>Statistics Timeframe</h1>
        <div>
        <Button className="mr-2" variant="primary" type="button">Today</Button>
            <Button className="mr-2" variant="primary" type="button">7 days</Button>
            <Button className="mr-2" variant="primary" type="button">14 days</Button>
            <Button className="mr-2" variant="primary" type="button">1 month</Button>
            <Button className="mr-2" variant="primary" type="button">6 months</Button>
        </div>
        <div className="flex flex-row mt-6">
            <div className="mr-2">
                <h5>New Users 1</h5>
                
            </div>
            <div className="mr-2">
                <h5>Censors 3</h5>
                
            </div>
            </div>
            <div className="flex flex-row mt-6">
            <div className="mr-2">
                <h5>New Subreddits 4</h5>
                
            </div>
            <div className="mr-2">
                <h5>Logins 5</h5>
                
            </div>
        </div>
        <div className="mt-4">
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
        <UserFilter></UserFilter>
      </div>
    </div>)
    
}
export default AdminDashboard;