import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/jobs/smart_matches");
  }, [router]);

  return null;
};

export default Index;
