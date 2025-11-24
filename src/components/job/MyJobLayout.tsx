import { Bookmark, FileText, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Layout from "./layout";

const MyJobLayout = ({ children }) => {
  const router = useRouter();

  return (
    <Layout>
      <div className="mt-[-2rem] min-h-screen">
        <div className="glass-strong border-glass-border w-fit p-1 rounded-2xl flex space-x-1 mt-1 mb-6">
          <Button onClick={() => router.push("/jobs/my-jobs/saved")} className="text-white flex items-center text-neon-cyan bg-neon-cyan/20 px-1 py-0.5">
            <Bookmark className="w-4 h-4 mr-2" />
            Saved
          </Button>
          <Button onClick={() => router.push("/jobs/my-jobs/inProgress")} className="text-white flex items-center data-[state=active]:text-neon-cyan data-[state=active]:bg-neon-purple/20">
            <FileText className="w-4 h-4 mr-2" />
            In Progress
          </Button>
          <Button onClick={() => router.push("/jobs/my-jobs/applied")} className="text-white flex items-center data-[state=active]:text-neon-cyan data-[state=active]:bg-neon-green/20">
            <Send className="w-4 h-4 mr-2" />
            Applied
          </Button>
        </div>

        {children}
      </div>
    </Layout>
  );
};

export default MyJobLayout;
