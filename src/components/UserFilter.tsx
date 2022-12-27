import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { axiosPrivate } from "../api/AxiosPrivate";
import { AuthContextType } from "../api/types/AuthTyped";
import LoggedInUser from "../api/types/LoggedInUser";
import { getUsers } from "../api/UserAPI";

const UserFilter = () => {
  const [users, setUsers] = useState<LoggedInUser[]>();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LoggedInUser[]>();
  const [buttonText, setButtonText] = useState<string>('Ban');

  useEffect(() => {
    getUsers(axiosPrivate).then((res) => {
      setUsers(res);
    });
  }, []);

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
