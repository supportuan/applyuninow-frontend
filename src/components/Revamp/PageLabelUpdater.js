import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { usePageContext } from "./context/PageContext";

const PageLabelUpdater = () => {
  const context = usePageContext();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { setPageLabelName, setDeviceType } = context || {};

  useEffect(() => {
    if (!mounted || !setPageLabelName) return;

    let label = "home";
    if (router.pathname !== "/") {
      label = router.pathname.replace(/^\//, "").replace("/", "-");
    }
    setPageLabelName(label);
  }, [router.pathname, setPageLabelName, mounted]);

  useEffect(() => {
    if (!mounted || !setDeviceType) return;

    const updateDeviceType = () => {
      setDeviceType(window.innerWidth >= 780 ? "desktop" : "mobile");
    };

    updateDeviceType();
    window.addEventListener("resize", updateDeviceType);
    return () => window.removeEventListener("resize", updateDeviceType);
  }, [setDeviceType, mounted]);

  if (!mounted || !context) return null;

  return null;
};

export default PageLabelUpdater;

