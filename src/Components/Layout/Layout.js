 import React from 'react'
 import NavBarComponent from '../Navbar/NavBarComponent'
 
 const Layout = (props) => {
   return (
     <>
       <NavBarComponent/>
       {props.children}

     
     </>
   )
 }
 
 export default Layout