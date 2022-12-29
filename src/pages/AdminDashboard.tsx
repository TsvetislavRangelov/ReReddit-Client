import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useLocation, Navigate } from "react-router";
import AnnouncementInput from "../api/types/AnnouncementInput";
import { AuthContextType } from "../api/types/AuthTyped";
import UserFilter from "../components/UserFilter";
import { AuthContext } from "../context/AuthProvider";
import { client, publishMessage } from "../websocket/stompClient";
import DatePicker from "react-date-picker";
import { AxiosInstance } from "axios";
import useAxiosPrivate from "../custom-hooks/useAxiosPrivate";
import useRefresh from "../custom-hooks/useRefresh";
import { getActivityLogCount } from "../api/ActivityLogAPI";


const AdminDashboard = () => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<AnnouncementInput>();
    const { auth, saveAuth } = React.useContext(AuthContext) as AuthContextType;
    const [date, setDate] = useState(new Date());
    const [logTotal, setLogTotal] = useState<number>();
    const location = useLocation();
    const refresh = useRefresh();
    const axiosPrivate = useAxiosPrivate(
      refresh,
      auth,
      saveAuth
    ) as AxiosInstance;

    useEffect(() => {
        getActivityLogCount(axiosPrivate).then((res) => {
            console.log(res);
            setLogTotal(res);
        })
    }, [])

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
        <h1 className=" text-white">Statistics Timeframe</h1>
        <div>
        <Button className="mr-2" variant="primary" type="button">Today</Button>
        <DatePicker className="dtp" onChange={(value: Date) => {
            setDate(value);
            //console.log(date.toLocaleDateString("en-CA"));
            getActivityLogCount(axiosPrivate, value.toLocaleDateString("en-CA")).then((res) => {
                console.log(res);
                setLogTotal(res.count);
            })
        }} value={date} format="y-MM-dd"></DatePicker>
        </div>
        <div className="flex flex-row mt-6">
            <div className="mr-2  text-white">
                <h5>New Users 1</h5>
                
            </div>
            <div className="mr-2  text-white">
                <h5>Censors 3</h5>
            </div>
            </div>
            <div className="flex flex-row mt-6  text-white">
            <div className="mr-2 text-white">
                <h5>New Subreddits 4</h5>
                
            </div>
            <div className="mr-2  text-white">
                <h5>Logins {logTotal}</h5>
                
            </div>
        </div>
        <div className="mt-4  text-white">
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
        <div  className="mt-4  text-white">
        <h1 className="ml-4">User List</h1>
        <UserFilter></UserFilter>
      </div>
    </div>)
    
}
export default AdminDashboard;