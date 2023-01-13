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
import { getPostCount } from "../api/PostAPI";
import { PersonAdd, EnvelopePaper, Key, BarChart } from "react-bootstrap-icons";

const AdminDashboard = () => {
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm<AnnouncementInput>();
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
    });
    countNewUsersForDay(axiosPrivate).then((res) => {
      setUserTotal(res);
    });
    getPostCount(axiosPrivate).then((res) => {
      setPostTotal(res);
    });
  }, []);

  if (!auth.username || !auth.roles.includes("ADMIN")) {
    return <Navigate to="/Login" state={{ from: location }} />;
  }

  const onSubmit: SubmitHandler<AnnouncementInput> = async (body) => {
    if (!client.active) {
      client.activate();
    }
    publishMessage(auth.username, "/topic/messages", body.body);
  };

  const handleColor = (dataCount: number): string => {
    if (dataCount === 0) {
      return "red";
    } else if (dataCount < 10) {
      return "yellow";
    } else {
      return "green";
    }
  };

  return (
    <div className="flex flex-col align-center items-center">
      <div className="flex flex-row ">
        <div className="bg-gray-800 mt-4">
          <div className="flex flex-row">
            <h1 className=" text-white ml-2">Statistics </h1>
            <BarChart color="green" size={30} className="mt-3 ml-1" />
          </div>
          <Button
            className="mr-2 ml-2 mb-1 w-48 h-8"
            variant="primary"
            type="button"
            onClick={() => {
              getActivityLogCount(axiosPrivate).then((res) => {
                setLogTotal(res);
              });
              countNewUsersForDay(axiosPrivate).then((res) => {
                setUserTotal(res);
              });
              getPostCount(axiosPrivate).then((res) => {
                setPostTotal(res);
              });
            }}
          >
            Total
          </Button>
          <DatePicker
            className="dtp bg-white"
            onChange={(value: Date) => {
              try {
                setDate(value);
                getActivityLogCount(
                  axiosPrivate,
                  value.toLocaleDateString("en-CA")
                ).then((res) => {
                  console.log(res);
                  if (res.count) {
                    setLogTotal(res.count);
                  } else {
                    setLogTotal(res);
                  }
                });
                countNewUsersForDay(
                  axiosPrivate,
                  value.toLocaleDateString("en-CA")
                ).then((res) => {
                  setUserTotal(res);
                });
                getPostCount(
                  axiosPrivate,
                  value.toLocaleDateString("en-CA")
                ).then((res) => {
                  setPostTotal(res);
                });
              } catch (err) {
                console.error(err);
              }
            }}
            value={date}
            format="y-MM-dd"
          ></DatePicker>
          <div className="mt-6">
            <div className="mr-2 ml-2 text-white flex flex-row">
              <h3>Users: {userTotal}</h3>
              <PersonAdd size={30} color={handleColor(userTotal!)} />
            </div>
          </div>
          <div className="mt-6 text-white">
            <div className="mr-2  ml-2 text-white flex flex-row">
              <h3>Posts: {postTotal}</h3>
              <EnvelopePaper
                size={27}
                color={handleColor(postTotal!)}
                className="ml-2"
              />
            </div>
            <div className="mr-2 ml-2 mt-6 text-white flex flex-row">
              <h3>Logins: {logTotal}</h3>
              <Key
                size={27}
                color={handleColor(logTotal!)}
                className="ml-1 mt-1"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-4 ml-4  text-white bg-gray-800 ">
          <h1 className="m-2 pl-4">Send an announcement to all users</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Control
              as="textarea"
              style={{ color: "white", backgroundColor: "black" }}
              placeholder="Enter an announcement"
              rows={6}
              {...register("body", { required: true })}
            ></Form.Control>
            <Button className="mt-2 mb-2 ml-2" variant="primary" type="submit">
              Send
            </Button>
            <Button
              className="ml-2"
              variant="danger"
              onClick={() => resetField("body")}
            >
              Clear
            </Button>
          </Form>
        </div>
      </div>
      <div className="mt-2 w-50 text-white bg-gray-800">
        <h1 className="m-2">Filter logged accounts</h1>
        <UserFilter></UserFilter>
      </div>
    </div>
  );
};
export default AdminDashboard;
