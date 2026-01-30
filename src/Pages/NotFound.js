import React, { Component } from "react";
import {Link} from 'react-router-dom'
// import notFound from "../images/notFound.png"
// import { Helmet } from "react-helmet";

export const NotFound = () => {
    return (
		<div className="container px-12 m-auto my-12 text-center">
      {/* <Helmet>
			<title>404 Not Found</title>
			<meta name="description" content= '404 Not Found'/>
			<meta name="keywords" content= '404 Not Found' />
		</Helmet> */}
            <div className="max-w-lg m-auto">
              Not Found
                {/* <img  alt="pageNotFound" src={notFound}/> */}
            </div>
            <h3 className="mt-6 text-2xl font-WavehausBold text-ThemeBlue"> Page not found</h3>
       
            <p className="mb-6 text-blue">The page you are looking for might have been removed.</p>
            <Link to="/" className="px-6 py-3 my-4 text-sm transition-all duration-150 ease-linear rounded-full shadow outline-none cursor-pointer font-WavehausSemiBold bg-green text-ThemeBlue get-started focus:outline-none bg-lightBlue-500 active:bg-lightBlue-600 hover:shadow-lg">Go To Home</Link>
	 </div>
    );
  }

