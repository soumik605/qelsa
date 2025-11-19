import { Bookmark, Briefcase, FileText, Send } from "lucide-react";
import Layout from "./layout";

const MyJobLayout = ({ children }) => {
  return (
    <Layout>
      <div className="mt-[-2rem] min-h-screen">
        <div className="glass border-glass-border mb-6">
          <div className="data-[state=active]:bg-neon-cyan/20">
            <Bookmark className="w-4 h-4 mr-2" />
            Saved
          </div>
          <div className="data-[state=active]:bg-neon-purple/20">
            <FileText className="w-4 h-4 mr-2" />
            In Progress
          </div>
          <div className="data-[state=active]:bg-neon-green/20">
            <Send className="w-4 h-4 mr-2" />
            Applied
          </div>
          <div className="data-[state=active]:bg-neon-pink/20">
            <Briefcase className="w-4 h-4 mr-2" />
            Posted
          </div>
        </div>

        {children}
      </div>
    </Layout>
  );
};

export default MyJobLayout;
