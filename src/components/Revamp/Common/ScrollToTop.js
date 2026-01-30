import { useEffect } from "react";
//import { useLocation } from "react-router-dom";
import { useRouter } from "next/router";

const ScrollToTop = () => {
  //const { pathname } = useLocation();
  const router = useRouter();
 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);

  return null;
};

export default ScrollToTop;
