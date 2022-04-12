import React, { useState } from "react";
import MaterialTable from "material-table";

export default function Table() {
  type IType =
    | "string"
    | "boolean"
    | "numeric"
    | "date"
    | "datetime"
    | "time"
    | "currency";
  const string: IType = "string";

  const [columns, setColumns] = useState([
    { title: "Name", field: "name", type: "string" as const },
    {
      title: "Surname",
      field: "surname",
      initialEditValue: "initial edit value",
      type: "string" as const
    },
    { title: "Birth Year", field: "birthYear", type: "string" as const },
    {
      title: "Birth Place",
      field: "birthCity",
      lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
      type: "string" as const
    }
  ]);

  const [data, setData] = useState([
    {
      name: "Mehmet",
      surname: "Baran",
      birthYear: 1987,
      birthCity: 63,
      type: string
    },
    {
      name: "Zerya Betül",
      surname: "Baran",
      birthYear: 2017,
      birthCity: 34,
      type: string
    }
  ]);
  
  return (
    <div className="Table">
      <MaterialTable
        title="Editable Preview"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: (newData:any) =>    
            new Promise((resolve:any, reject) => {
              setTimeout(() => {
                setData([...data, newData]);
                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData:any, oldData:any) =>
            new Promise((resolve:any, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData: any) =>
            new Promise((resolve: any, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve();
              }, 1000);
            })
        }}
      />
    </div>
  );
}
