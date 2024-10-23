import { useEffect } from "react";
import CustomBox from "./CustomBox";

function AdminHome(){

    useEffect(()=>{
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
        myHeaders.append("Content-Type", "application/json");
        

        
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };
        
        fetch("http://localhost:8080/auth/admin/", requestOptions)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.error(error));


    })

    return (
        <CustomBox>
        Hey
        </CustomBox>
    );
}

export default AdminHome;