// import { Layout } from "./Layout/Layout";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { ErrorBoundary } from './components/ErrorBoundry';
import Header from "./components/Revamp/Header";
import Footer from "./components/Revamp/Footer";
import React, { useEffect } from "react";
import Layout from "./components/Revamp/Layout/Layout";
import { PageProvider, usePageContext } from './components/Revamp/context/PageContext';
import { useLocation } from "react-router-dom";


// const OurFallbackComponent = ({ error, componentStack, resetErrorBoundary }) => (
//   <div>
//     <h1>
//       An error occurred:
//       {error.message}
//     </h1>
//     <h1>
//       An error occurred:
//       {componentStack}
//     </h1>
//     <button onClick={resetErrorBoundary}>Try again</button>
//   </div>
// );

const PageLabelUpdater = () => {
  const { setPageLabelName, setDeviceType } = usePageContext();
  const location = useLocation();
  const transformedPath = (path) =>  path.replace(/^\//, '').replace('/', '-');

  useEffect(() => {
    let label = "home";
    if(location.pathname === '/'){
      label = "home";
    } else {
      label = transformedPath(location.pathname);
    }
    setPageLabelName(label);
  }, [location.pathname, setPageLabelName]);

  useEffect(() => {
    let deviceType = 'desktop';
    if(window.innerWidth >= 780){
      deviceType = 'desktop';
    } else {
      deviceType = 'mobile';
    }
    setDeviceType(deviceType);
  },[window.innerWidth, setDeviceType]);
  
  return null;
} 

const App = () => {

  return (
    // <div>
    //   <ErrorBoundary
    //     FallbackComponent={OurFallbackComponent}
    //   >
    //     {/* <Layout /> */}
    //     {/* <ToastContainer /> */}
    //   </ErrorBoundary>

    // </div>

    <div className="app-container">
      <React.Fragment>
        <PageProvider>
          <PageLabelUpdater />
          <Header />
          <Layout />
          <Footer />
        </PageProvider>
      </React.Fragment>
    </div>
  );
}


export default App;



