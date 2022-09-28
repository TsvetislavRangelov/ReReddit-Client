import{ useEffect } from 'react';
import './App.css';
import { useGetUsers } from "./api/UserAPI";

function App() {
  const [users, error, loading,  getUsers] = useGetUsers();
  
  useEffect(() => {
    getUsers();
  }, [])

  if(error){
    return <div>A {error.message} has occured</div>
  }
  if(loading){
    return <div>Loading...</div>
  }
  if(!users){
    return <div>No data was found.</div>
  }

  const userRenderer = users.map(user => (
    (
      <div key={user.id}>
        {user.id} - {user.username}
        </div>
    )
  ))
  return (
    <div>
      <h1>Random placeholder text</h1>
      <div>{userRenderer}</div>
    </div>
  );
};

export default App;
