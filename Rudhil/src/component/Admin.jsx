import React, { useState } from "react";
import ProdList from "../pages/ProdList";
import "./style.css";
// import NavAdmin from "./NavAdmin";

const Admin = () => {
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [Tin, setTin] = useState("");
  // const [image, setImage] = useState(null);
  // const [imagePath, setImagePath] = useState([]);
  // const [category, setCategory] = useState("");

  const sendCustomer = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("Name", Name);
    formData.append("Tin", Tin);
    formData.append("Address", Address);

    fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
      });
  };

  return (
    <div className="fluid bg-secondary">
      {/* <NavAdmin /> */}
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="col-12">
          <div
            className="bg-white text-black my-2"
            style={{ borderRadius: "1rem", maxWidth: "980px", marginLeft: "330px", padding: "30px", alignItems: "center" }}
          >
            <div className="p-1 d-flex flex-column align-items-right">
              <h5 className="fw-bold mb-4 text-uppercase">Customer</h5>
              <form
                onSubmit={sendCustomer}
                style={{ borderRadius: "1rem", maxWidth: "800px" }}
              >
                <div className="mb-4 input-group-sm w-100" > 
                  
                  <input
                    className="lg form-control"
                    id="name"
                    placeholder="Lastname, Firstname, Middlename"
                    type="text"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-4 input-group-sm w-100">
                  
                  <input
                    className="lg form-control"
                    id="tin"
                    placeholder="Tin #"
                    
                    value={Tin}
                    onChange={(e) => setTin(e.target.value)}
                  />
                </div>
                <div className="mb-4 input-group-sm w-100">
                  
                  <textarea
                    className="lg form-control"
                    id="address"
                    placeholder="Address"
                    value={Address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
                </div>
                
                <button
                  className="btna lg mx-2 px-2 text-light"
                  type="submit"
                >
                  Add +
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ProdList />
    </div>
  );
};

export default Admin;
