const PageLabelUpdater = () => {
  const context = usePageContext();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !context) return null; // ✅ Prevents errors during SSR

  const { setPageLabelName, setDeviceType } = context;

  useEffect(() => {
    let label = "home";
    if (router.pathname !== "/") {
      label = router.pathname.replace(/^\//, "").replace("/", "-");
    }
    setPageLabelName(label);
  }, [router.pathname, setPageLabelName]);

  useEffect(() => {
    const updateDeviceType = () => {
      setDeviceType(window.innerWidth >= 780 ? "desktop" : "mobile");
    };

    updateDeviceType();
    window.addEventListener("resize", updateDeviceType);
    return () => window.removeEventListener("resize", updateDeviceType);
  }, [setDeviceType]);

  return null;
};

