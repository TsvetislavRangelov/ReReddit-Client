import React from "react";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { axiosPrivate } from "../api/AxiosPrivate";
import { AuthContextType } from "../api/types/AuthTyped";
import LoggedInUser from "../api/types/LoggedInUser";
import { getUsers } from "../api/UserAPI";
import { AuthContext } from "../context/AuthProvider";
import { v4 as uuidv4 } from "uuid";
import UserFilterProps from "./props/UserFilterProps";

const UserFilter = ({ client }: UserFilterProps) => {
  const { auth, saveAuth } = React.useContext(AuthContext) as AuthContextType;
  const [users, setUsers] = useState<LoggedInUser[]>();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LoggedInUser[]>();
  const [buttonText, setButtonText] = useState<string>('Ban');

  useEffect(() => {
    getUsers(axiosPrivate).then((res) => {
      setUsers(res);
    });
  }, []);

  const sendMessage = (message: string, receiver: string) => {
    const payload = {
      id: uuidv4(),
      sender: auth.username,
      receiver: receiver,
      body: message,
    };
    console.log(payload);
    client.publish({
      destination: `/user/${receiver}/queue/messages`,
      body: JSON.stringify(payload),
    });
  };

  const handleChange = (e: any) => {
    setQuery(e.target.value);
    const res = users?.filter((user) => {
      if (e.target.value === "") {
        return users;
      }
      return user.username.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setResults(res);
  };

  return (
    <div>
      <Form>
        <Form.Control
          type="search"
          value={query}
          onChange={handleChange}
          style={{ color: "white", backgroundColor: "black" }}
          placeholder="Search a user"
        />
      </Form>
      <ul>
        {query === ""
          ? ""
          : results?.map((user) => {
              return (
                <div className="flex flex-row mt-1">
                  <li className="mr-2" key={user.username}>
                    {user.username}
                  </li>
                  <Button
                    className=""
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      if(buttonText === 'Ban'){
                        setButtonText('Unban');
                      }
                      else{
                        setButtonText('Ban');
                      }
                    }}
                  >
                    {buttonText}
                  </Button>
                </div>
              );
            })}
      </ul>
    </div>
  );
};

export default UserFilter;
