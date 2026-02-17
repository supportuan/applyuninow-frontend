import Header from "../src/components/Revamp/Header";
import Footer from "../src/components/Revamp/Footer";
import React, { useEffect } from "react";
import Layout from "../src/components/Revamp/Layout/Layout";
import { PageProvider, usePageContext } from '../src/components/Revamp/context/PageContext';
import { useRouter } from "next/router";
import '../src/css/base.css';
// import "../src/styles/explore.css";
import { AppContextProvider, useAppContext } from '../src/context/Appcontext';
import { store } from "../src/store/index.js";
import { Provider } from "react-redux";
import Head from 'next/head';
import api from "../src/api/index.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-FVM5WF3HZ3';

const PageLabelUpdater = () => {
  const { setPageLabelName, setDeviceType, setPrerequisiteData, setIsPrerequisiteLoaded, setWindowType } = usePageContext();
  const router = useRouter();
  const { BASE_URL } = useAppContext();

  const transformedPath = (path) => path.replace(/^\//, '').replace('/', '-');

  useEffect(() => {
    /*if (typeof window !== 'undefined') {
       import('flowbite');
     }*/
    let label = "homepage";
    if (router.pathname !== '/') {
      label = transformedPath(router.pathname);
    }
    setPageLabelName(label);
    document.querySelector('body')?.attributes?.class ? document.querySelector('body')?.attributes?.removeNamedItem('class') : '';
    document.querySelector('body')?.classList?.add(label);
  }, [router.pathname, setPageLabelName]);


  useEffect(() => {
    const updateDeviceType = () => {
      setDeviceType(window.innerWidth >= 1000 ? 'desktop' : 'mobile');
    };

    updateDeviceType(); // Initial check
    window.addEventListener("resize", updateDeviceType);
    return () => window.removeEventListener("resize", updateDeviceType);
  }, [setDeviceType]);

  useEffect(() => {
    const updateWindowType = () => {
      setWindowType(
        window.innerWidth >= 1500 ? 'xlarge' :
          window.innerWidth >= 1400 ? 'large' :
            window.innerWidth >= 1200 ? 'medium' :
              window.innerWidth >= 1000 ? 'small' :
                window.innerWidth >= 700 ? 'msmall' : 'xsmall'
      );
    };

    updateWindowType();
    window.addEventListener("resize", updateWindowType);
    return () => window.removeEventListener("resize", updateWindowType);
  }, [setWindowType]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!window.gtag) {
      // Load external GA script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(script);

      // Inline GA config
      script.onload = () => {
        const inlineScript = document.createElement('script');
        inlineScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `;
        document.head.appendChild(inlineScript);
      };
    }

    // Track route changes
    const handleRouteChange = (url) => {
      if (window.gtag) {
        window.gtag('config', GA_ID, {
          page_path: url,
        });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };

  }, [router.events, GA_ID])

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const fetchedKey = 'prerequisiteFetched';
    const dataKey = 'prerequisiteData';
    
    // Check if data is already in sessionStorage
    const cachedData = sessionStorage.getItem(dataKey);
    if (cachedData && sessionStorage.getItem(fetchedKey)) {
      try {
        const parsedData = JSON.parse(cachedData);
        setPrerequisiteData(parsedData);
        setIsPrerequisiteLoaded(true);
        return;
      } catch (e) {
        // If parsing fails, clear cache and fetch fresh data
        sessionStorage.removeItem(fetchedKey);
        sessionStorage.removeItem(dataKey);
      }
    }

    const fetchData = async () => {
      try {
        const url = `${BASE_URL}/prerequisite`;
        const res = await api.get(url, {});
        const prerequisiteData = res?.data;
        setPrerequisiteData(prerequisiteData);
        // Store in sessionStorage for future use
        sessionStorage.setItem(fetchedKey, 'true');
        sessionStorage.setItem(dataKey, JSON.stringify(prerequisiteData));
      } catch (err) {
        // Reset on error to allow retry
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem(fetchedKey);
          sessionStorage.removeItem(dataKey);
        }
      } finally {
        setIsPrerequisiteLoaded(true);
      }
    };
    
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [BASE_URL])

  return null;
};

// useEffect(() => {
//   screen.orientation.addEventListener("change", () => {
//     console.log(`The orientation of the screen is: ${screen.orientation}`);
//   });
// },[]);



function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Head>
        <title>ApplyUniNow | ApplyUniNow guides you through the best career upskilling selection and university enrollment. Book a free consultation.</title>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/x-icon" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        <meta name="google-site-verification" content="mEBDJKtdTSmhcou56Z7QZKbJ5cU6I8sVelYfxQ_aTfM" />
        <meta name="keywords" content="Scholarships, Visa, Admissions, Universities, Tuition, Funding, Exchange, Overseas, Education, Application, Study Abroad, Student Visa, Global Education, University Rankings, Tuition Fees, Scholarship Programs, Admission Process, International Students, Visa Requirements, Affordable Universities, Study Budget, Abroad Study Finance, Global Study Journey" />
        <meta itemProp="description" content="ApplyUniNow – Your Study Abroad Dream Is Our Commitment. Secure early guaranteed visa and 100% scholarship opportunities for your overseas education journey." />
        <meta name="description" content="ApplyUniNow – Your Study Abroad Dream Is Our Commitment. Secure early guaranteed visa and 100% scholarship opportunities for your overseas education journey." />
       
      </Head>
      <Provider store={store}>
        <div className="app-container">
          <PageProvider>
            <PageLabelUpdater />
            <Header />
            <Layout>
              <Component {...pageProps} />
              <ToastContainer />
            </Layout>
            <Footer />
          </PageProvider>
        </div>
      </Provider>
    </AppContextProvider>
  );
}

export default MyApp;

