import "./App.css";
import { useEffect, useState } from "react";
import Table from "./Table/Table";

function App() {
  const [users, setUsers] = useState({});

  useEffect(() => {
    fetch("https://gorest.co.in/public/v1/users", {
      method: "GET",
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_aToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const { data } = users;
  console.log(data);

  return (
    <div className="App">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">Status</th>
          </tr>
        </thead>

        <Table data={data}></Table>
      </table>
    </div>
  );
}

export default App;
