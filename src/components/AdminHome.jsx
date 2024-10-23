import { useEffect } from "react";

function AdminHome(){

    useEffect(()=>{
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
        

        
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };
        
        fetch("http://localhost:8080/auth/admin/", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            console.log(result)
            if(result==="Welcome to admin Profile"){
                console.log("Admin")
            }
        })
          .catch((error) => console.error(error));
    })

    return (
        <>
        </>
    );
}

export default AdminHome;