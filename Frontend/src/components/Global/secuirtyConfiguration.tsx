import React from "react";

import { jwtDecode, JwtPayload } from "jwt-decode";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const SecurityConfigutation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const loginToken = localStorage.getItem("loginToken");
       
        if (!loginToken) {
            navigate("/login");
            return
        }
        
        const decoded = jwtDecode<JwtPayload>(loginToken as string);
        const expTime = decoded.exp as number;
        const currentTime = Date.now() / 1000;
        const isAuthenticated = expTime < currentTime;
        //validate token and expiry time
        

        if (isAuthenticated) {
            navigate("/products");
        }


    }, [location.pathname, navigate]);

    return <div>
        <Outlet />
    </div>;
};

export default SecurityConfigutation;


