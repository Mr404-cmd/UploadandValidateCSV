import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { userInstance } from "../config/axios";
import { toast } from "react-toastify";

function fileUpload() {
  const [file, setFile] = useState('')
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const getData = await userInstance.get("/getcsv");
      setItems(getData.data);
    }
    fetchData();
  }, []);
const onChange =async e =>{
setFile(e.target.files[0]);
}

  const handleUpload = async()=>{
    const formData = new FormData()
      formData.append('file',file)
    const uploadfile = await userInstance.post("/upload",formData);
    if(uploadfile){
      toast.success("File Uploaded successfully")
    }
  }

  const submit = async (e) => {
    e.preventDefault();
    const dbstore =  await userInstance.post("/storecsv");
    if(dbstore){
      toast.success("saved successfully")
    }else{
      toast.error("please update csv file")
    }
  };

  return (
    <div className="user-list">
      <h1>CSV File Upload and handling data</h1>

      <Form onSubmit={submit}>
      <input type="file" name="avatar" onChange={onChange} accept=".csv"/>
      <Button onClick={handleUpload}>Upload</Button>
      <h1> Render Data</h1>

      <Table className="crud-table">
        <thead>
          <tr>
            <th>userName</th>
            <th>email</th>
            <th>age</th>
            <th>salary</th>
            <th>mobile</th>
            <th>address</th>
            <th>profession</th>
            <th>adhar</th>
            <th>pan</th>
            <th>gender</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id+index}>
              {isNaN(item.userName) && item.userName.includes('@') ===false  ? <td>{item.userName}</td> : <td style={{color:"red"}}>{item.userName}</td>}
              {isNaN(item.email) && item.email.includes('@')  ? <td>{item.email}</td> : <td style={{color:"red"}}>{item.email}</td>}
              {(isNaN(item.age)===false && item.age<100) ? <td>{item.age}</td> : <td style={{color:"red"}}>{item.age}</td>}
              {isNaN(item.salary)===false && item.salary.includes('@') ===false && item.salary.length<=6  ? <td>{item.salary}</td> : <td style={{color:"red"}}>{item.salary}</td>}
              {(isNaN(item.mobile)===false && item.mobile.length === 10) ? <td>{item.mobile}</td> : <td style={{color:"red"}}>{item.mobile}</td>}
              {(isNaN(item.address) && item.address.length <=50) && item.address.includes('@') ===false ? <td>{item.address}</td> : <td style={{color:"red"}}>{item.address}</td>}
              {(isNaN(item.profession) && item.profession.length <= 20) && item.profession.includes('@') ===false ? <td>{item.profession}</td> : <td style={{color:"red"}}>{item.profession}</td>}
              {(isNaN(item.adhar)===false && item.adhar.length === 16) ? <td>{item.adhar}</td> : <td style={{color:"red"}}>{item.adhar}</td>}
              {(isNaN(item.pan) && item.pan.length <= 16) ? <td>{item.pan}</td> : <td style={{color:"red"}}>{item.pan}</td>}
              {(isNaN(item.gender) && item.gender.length <= 6 ) ? <td>{item.gender}</td> : <td style={{color:"red"}}>{item.gender}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
            <br />
      <Button type="submit" className="btn save-btn">
          Save
        </Button>
      </Form>
    </div>
  );
}
export default fileUpload;
