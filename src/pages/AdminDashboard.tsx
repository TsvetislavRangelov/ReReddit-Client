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
import { countNewUsersForDay } from "../api/UserAPI";
import { getPost, getPostCount } from "../api/PostAPI";


const AdminDashboard = () => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<AnnouncementInput>();
    const { auth, saveAuth } = React.useContext(AuthContext) as AuthContextType;
    const [date, setDate] = useState(new Date());
    const [logTotal, setLogTotal] = useState<number>();
    const [userTotal, setUserTotal] = useState<number>();
    const [postTotal, setPostTotal] = useState<number>();
    const location = useLocation();
    const refresh = useRefresh();
    const axiosPrivate = useAxiosPrivate(
      refresh,
      auth,
      saveAuth
    ) as AxiosInstance;

    useEffect(() => {
        getActivityLogCount(axiosPrivate).then((res) => {
            setLogTotal(res);
        })
        countNewUsersForDay(axiosPrivate).then((res) => {
            setUserTotal(res);
        })
        getPostCount(axiosPrivate).then((res) => {
            setPostTotal(res);
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
        <Button className="mr-2" variant="primary" type="button" onClick={() => {
            getActivityLogCount(axiosPrivate).then((res) => {
                setLogTotal(res);
            })
            countNewUsersForDay(axiosPrivate).then((res) => {
                setUserTotal(res);
            })
            getPostCount(axiosPrivate).then((res) => {
                setPostTotal(res);
            })
        }}>Total</Button>
        <DatePicker className="dtp" onChange={(value: Date) => {
            try{
                setDate(value);
                getActivityLogCount(axiosPrivate, value.toLocaleDateString("en-CA")).then((res) => {
                    console.log(res);
                    if(res.count){
                        setLogTotal(res.count);
                    }
                    else{
                        setLogTotal(res);
                    }
                })
                countNewUsersForDay(axiosPrivate, value.toLocaleDateString("en-CA")).then((res) => {
                    setUserTotal(res);
                })
                getPostCount(axiosPrivate, value.toLocaleDateString("en-CA")).then((res) => {
                    setPostTotal(res);
                })
            }
            catch(err){
                console.error(err)
            }
        }} value={date} format="y-MM-dd"></DatePicker>
        </div>
        <div className="flex flex-row mt-6">
            <div className="mr-2  text-white">
                <h5>Users {userTotal}</h5>
                
            </div>
            </div>
            <div className="flex flex-row mt-6  text-white">
            <div className="mr-2 text-white">
                <h5>Posts {postTotal}</h5>
                
            </div>
            <div className="mr-2  text-white">
                <h5>Logins {logTotal}</h5>
                
            </div>
        </div>
        <div className="mt-4  text-white">
            <h4>Send an announcement to all users</h4>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Control
                as="textarea"
                style={{ color: "white", backgroundColor: "black" }}
                placeholder="Enter an announcement"
                {...register("body", {required: true})}
                >
                    
                </Form.Control>
                <Button className="mt-2" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
        <div  className="mt-4  text-white">
        <h1 className="ml-2">Find A User</h1>
        <UserFilter></UserFilter>
      </div>
    </div>)
    
}
export default AdminDashboard;