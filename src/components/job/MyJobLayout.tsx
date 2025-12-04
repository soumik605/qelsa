import { Bookmark, FileText, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Layout from "./layout";

const MyJobLayout = ({ active_page, children }) => {
  const router = useRouter();

  return (
    <Layout active_job_page="my-jobs">
      <div className="mt-[-2rem] min-h-screen">
        <div className="glass-strong border-glass-border w-fit p-1 rounded-2xl flex space-x-1 mt-1 mb-6">
            <Button onClick={() => router.push("/jobs/my-jobs/saved")} className={`text-white flex items-center text-white px-1 py-0.5 ${active_page === "saved" ? "bg-neon-cyan/20" : ""}`}>
            <Bookmark className="w-4 h-4 mr-2" />
            Saved
            </Button>
          <Button onClick={() => router.push("/jobs/my-jobs/inProgress")} className={`text-white flex items-center text-white px-1 py-0.5 ${active_page === "in_progress" ? "bg-neon-purple/20" : ""}`}>
            <FileText className="w-4 h-4 mr-2" />
            In Progress
          </Button>
          <Button onClick={() => router.push("/jobs/my-jobs/applied")} className={`text-white flex items-center text-white px-1 py-0.5 ${active_page === "applied" ? "bg-neon-green/20" : ""}`}>
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
