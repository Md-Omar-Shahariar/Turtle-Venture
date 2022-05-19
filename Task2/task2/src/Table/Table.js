import React from "react";

const Table = ({ data }) => {
  console.log(data);
  return (
    <tbody>
      {data?.map((d, index) => (
        <tr>
          <th scope="row">{index + 1}</th>
          <td>{d.id}</td>
          <td>{d.name}</td>
          <td>{d.email}</td>
          <td>{d.gender}</td>
          <td>{d.status}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default Table;
