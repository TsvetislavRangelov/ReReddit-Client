import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { axiosPrivate } from "../api/AxiosPrivate";
import LoggedInUser from "../api/types/LoggedInUser";
import { getUsers } from "../api/UserAPI";
import { PersonBadge } from "react-bootstrap-icons";

const UserFilter = () => {
  const [users, setUsers] = useState<LoggedInUser[]>();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LoggedInUser[]>();

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
                <div className="mr-6 mt-2 border-2 rounded border-stone-500">
                  <li className="" key={user.username}>
                    <NavLink
                      className="no-underline text-green-400 flex flex-row hover:text-red-500 justify-center"
                      to={`/user/${user.id}`}
                    >
                      <PersonBadge size={25} />
                      <h4>{user.username}</h4>
                    </NavLink>
                  </li>
                </div>
              );
            })}
      </ul>
    </div>
  );
};

export default UserFilter;
