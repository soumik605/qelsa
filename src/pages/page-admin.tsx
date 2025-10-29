import React from 'react'
import Layout from '../layout'
import { PageAdminView } from '../components/PageAdminView'

const PageAdmin = () => {
  return (
    <Layout activeSection={"pages"}>
      <PageAdminView pageId="1" />;
    </Layout>
  )
}

export default PageAdmin