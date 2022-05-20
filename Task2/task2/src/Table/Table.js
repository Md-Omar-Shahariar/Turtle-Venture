import React from "react";

const Table = ({ data }) => {
  console.log(data);
  return (
    <tbody>
      {data?.map((d, index) => (
        <tr key={`data-Index-${d.id}`}>
          <th scope="row">{index + 1}</th>
          <td>{d?.id || "ID"} </td>
          <td>{d?.name || "Name"}</td>
          <td>{d?.email || "Email"}</td>
          <td>{d?.gender || "Gender"}</td>
          <td>{d?.status || "Status"}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default Table;
