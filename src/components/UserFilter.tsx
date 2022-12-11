import { useEffect, useState } from "react";
import { axiosPrivate } from "../api/AxiosPrivate";
import LoggedInUser from "../api/types/LoggedInUser";
import { getUsers } from "../api/UserAPI";

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
    console.log(query);
    const res = users?.filter((user) => {
      if (e.target.value === "") {
        return users;
      }
      return user.username.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setResults(res);
    console.log(results);
  };

  return (
    <div>
      <form>
        <input
          type="search"
          value={query}
          onChange={handleChange}
          style={{ color: "black" }}
        />
      </form>
      <ul>
        {query === ""
          ? ""
          : results?.map((user) => {
              return <li key={user.username}>{user.username}</li>;
            })}
      </ul>
    </div>
  );
};

export default UserFilter;
