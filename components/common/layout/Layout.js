import React, { useEffect } from "react";
import Header from "./header/Header";
import { Container } from "react-bootstrap";
import {useRouter} from "next/router";


const Layout = ({ children }) => {
const router=useRouter()
    // console.log("rrr0",router.asPath.includes("products"))

  return (
    <>
        {!router.asPath.includes("products")&&<Header/>}
      {/*<Header />*/}

      <Container className="py-5">{children}</Container>
    </>
  );
}

export default Layout;
