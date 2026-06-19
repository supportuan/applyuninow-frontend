// // import { Layout } from "./Layout/Layout";
// // import { ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import { ErrorBoundary } from './components/ErrorBoundry';
// import Header from "./components/Revamp/Header";
// import Footer from "./components/Revamp/Footer";
// import React, { useEffect } from "react";
// import Layout from "./components/Revamp/Layout/Layout";
// import { PageProvider, usePageContext } from './components/Revamp/context/PageContext';
// import { useLocation } from "react-router-dom";


// // const OurFallbackComponent = ({ error, componentStack, resetErrorBoundary }) => (
// //   <div>
// //     <h1>
// //       An error occurred:
// //       {error.message}
// //     </h1>
// //     <h1>
// //       An error occurred:
// //       {componentStack}
// //     </h1>
// //     <button onClick={resetErrorBoundary}>Try again</button>
// //   </div>
// // );

// const PageLabelUpdater = () => {
//   const { setPageLabelName, setDeviceType } = usePageContext();
//   const location = useLocation();
//   const transformedPath = (path) =>  path.replace(/^\//, '').replace('/', '-');

//   useEffect(() => {
//     let label = "home";
//     if(location.pathname === '/'){
//       label = "home";
//     } else {
//       label = transformedPath(location.pathname);
//     }
//     setPageLabelName(label);
//   }, [location.pathname, setPageLabelName]);

//   useEffect(() => {
//     let deviceType = 'desktop';
//     if(window.innerWidth >= 780){
//       deviceType = 'desktop';
//     } else {
//       deviceType = 'mobile';
//     }
//     setDeviceType(deviceType);
//   },[window.innerWidth, setDeviceType]);
  
//   return null;
// } 

// const App = () => {

//   return (
//     // <div>
//     //   <ErrorBoundary
//     //     FallbackComponent={OurFallbackComponent}
//     //   >
//     //     {/* <Layout /> */}
//     //     {/* <ToastContainer /> */}
//     //   </ErrorBoundary>

//     // </div>

//     <div className="app-container">
//       <React.Fragment>
//         <PageProvider>
//           <PageLabelUpdater />
//           <Header />
//           <Layout />
//           <Footer />
//         </PageProvider>
//       </React.Fragment>
//     </div>
//   );
// }


// export default App;

import Header from "./components/Revamp/Header";
import Footer from "./components/Revamp/Footer";
import React, { useEffect } from "react";
import RevampLayout from "./components/Revamp/Layout/Layout";
import { PageProvider, usePageContext } from './components/Revamp/context/PageContext';
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import { RouterContext } from "next/dist/shared/lib/router-context";
import HeroComp from './components/Revamp/Home/HeroComp';
import IndustryList from './components/Revamp/Common/IndustryList';
import Services from './components/Revamp/Common/Services';
import UniversityList from './components/Revamp/Common/UniversityList';
import TechJourney from './components/Revamp/Common/TechJourney';
import TestPref from './components/Revamp/TestPref';
import USPs from './components/Revamp/Common/USPs';
import FAQs from './components/Revamp/Common/FAQs';
import Testimonials from './components/Revamp/Common/Testimonials';
import { uList } from './components/Revamp/utils/helpers';


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

const NextRouterBridge = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const mockRouter = {
    pathname: location.pathname,
    query: Object.fromEntries(new URLSearchParams(location.search)),
    asPath: location.pathname + location.search,
    push: (url) => navigate(url),
    replace: (url) => navigate(url, { replace: true }),
    back: () => navigate(-1),
    prefetch: () => Promise.resolve(),
    events: { on: () => {}, off: () => {}, emit: () => {} },
    isFallback: false,
    isReady: true,
    basePath: '',
    locale: undefined,
    locales: undefined,
    defaultLocale: undefined,
    isLocaleDomain: false,
    isPreview: false,
    route: location.pathname,
  };
  return (
    <RouterContext.Provider value={mockRouter}>
      {children}
    </RouterContext.Provider>
  );
};



const App = () => {

  return (
    <div className="app-container">
      <React.Fragment>
        <PageProvider>
          <NextRouterBridge>
          <PageLabelUpdater />
          <Header />
          <RevampLayout>
            <Routes>
              <Route path="/" element={
                <>
                  <HeroComp />
                  <IndustryList />
                  <Services />
                  <UniversityList infoList={uList} />
                  <TechJourney />
                  <TestPref />
                  <USPs />
                  <FAQs />
                  <Testimonials />
                </>
              } />
              <Route path="*" element={
                <>
                  <HeroComp />
                  <IndustryList />
                  <Services />
                  <UniversityList infoList={uList} />
                  <TechJourney />
                  <TestPref />
                  <USPs />
                  <FAQs />
                  <Testimonials />
                </>
              } />
            </Routes>
          </RevampLayout>
          <Footer />
          </NextRouterBridge>
        </PageProvider>
      </React.Fragment>
    </div>
  );
}


export default App;