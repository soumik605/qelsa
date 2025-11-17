import { PageAdminView } from "../components/PageAdminView";
import Layout from "../layout";

const PageAdmin = () => {
  return (
    <Layout activeSection={"pages"}>
      <PageAdminView page_id="1" />;
    </Layout>
  );
};

export default PageAdmin;
