import React from "react";
import { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";
import { getProductsApi } from "../../Configuration/Const";
const GetProducrs = () => {
  const [getProducts, setProducts] = useState([]);
  const [isloading, setLoading] = useState(true)
  useEffect(() => {
    getData();
  }, []);  
  const getData = async () => {
    try {
      const response = await getProductsApi; // Call the API
      const result = await response.json(); 
  
      console.log("Result from API Members list", result);
  
      if (result.length === 0) {
        console.log("No Data!");
      }
  
      setProducts(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Delete the product
        await fetch(`http://localhost:5000/Admin/dellProduct/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              console.log("Resource deleted successfully");
              // Call getData to fetch updated product list
              getData();
            } else {
              console.error("Error deleting resource");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        
        Swal.fire(
          'Deleted!',
          'Your Prodcut has been deleted.',
          'success'
        )
      }
    });
  };
  
  return (

    <>
    {isloading?(
      <Loader />
    ):( <table className="table align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr>
            <th>Title</th>
            <th>description</th>
            <th>SKU</th>
            <th>points</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {getProducts.map((product)=>{
          return(
            <tr>
            <td>
              <div class="d-flex align-items-center">
                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  class="rounded-circle"
                />
                <div class="ms-3">
                  <p class="fw-bold mb-1">{product.title}</p>
                </div>
              </div>
            </td>
            <td>
              <p class="fw-normal mb-1">{product.description}</p>
            </td>
            <td>
              <p class="fw-normal mb-1">{product.id}</p>
            </td>
            <td>
              <p class="fw-normal mb-1">{product.points}</p>
            </td>
            <td className="d-flex">
            <NavLink to={`/Admin/Dashboard/UpdateProduct/${product._id}`}>
              <button type="button" className="btn btn-warning btn-sm me-2">
              <i class="fa-solid fa-pen-to-square"></i>
              </button>
              </NavLink>
              <button onClick={() => {
                      handleDelete(product._id);
                      // toast.error("Data Delete successfully");
                      console.log(product._id);
                    }} type="button" className="btn btn-danger btn-sm ">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
          )
        })}
          {/* <tr>
            <td>
              <div class="d-flex align-items-center">
                <img
                  src="./logo192.png"
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  class="rounded-circle"
                />
                <div class="ms-3">
                  <p class="fw-bold mb-1">testing Purpose</p>
                  <p class="text-muted mb-0">Tjesting Purpose</p>
                </div>
              </div>
            </td>
            <td>
              <p class="fw-normal mb-1">Testing Purpose</p>
              <p class="text-muted mb-0">Testing Purpose</p>
            </td>
            <td>
              <p class="fw-normal mb-1">098763</p>
            </td>
            <td>
              <p class="fw-normal mb-1">200</p>
            </td>
            <td className="">
              <button type="button" className="btn btn-warning btn-sm me-2">
                Edit
              </button>
              <button type="button" className="btn btn-danger btn-sm ">
                Delete
              </button>
            </td>
          </tr> */}
        </tbody>
      </table>)}
     
    </>
  );
};

export default GetProducrs;
