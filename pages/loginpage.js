// import Login from "../components/Login"
// import Logout from "../components/Logout"
// import { auth } from "../configurations/firebase";

// const LoginPage = () => {

   

//     if (auth?.currentUser == null ){
//         let obj = <Login/>
//         return(obj);
//     } else {
//         let obj = <Logout/>
//         return(obj);
//     }

//     // return(
//     //     obj
//     //    );
// }

// export default LoginPage;


import React from 'react';
import Login from "../components/Login";
import Logout from "../components/Logout";
import { auth } from "../configurations/firebase";

const LoginPage = () => {
  return auth?.currentUser ? <Logout /> : <Login />;
}

export default LoginPage;
