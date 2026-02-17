import React, { useState, useEffect } from 'react';
import { usePageContext } from './context/PageContext';
import { useRouter } from 'next/router';

const PageLabelUpdater = () => {
  const context = usePageContext();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !context) return;
    const { setPageLabelName } = context;
    let label = "home";
    if (router.pathname !== "/") {
      label = router.pathname.replace(/^\//, "").replace("/", "-");
    }
    setPageLabelName(label);
  }, [mounted, context, router.pathname]);

  useEffect(() => {
    if (!mounted || !context) return;
    const { setDeviceType } = context;

    const updateDeviceType = () => {
      setDeviceType(window.innerWidth >= 768 ? "desktop" : "mobile");
    };

    updateDeviceType();
    window.addEventListener("resize", updateDeviceType);
    return () => window.removeEventListener("resize", updateDeviceType);
  }, [mounted, context]);

  if (!mounted || !context) return null;

  return null;
};

export default PageLabelUpdater;
