import React from 'react'
import Layout from '../layout'
import { PageView } from '../components/PageView'

const PageDetails = () => {
  return (
    <Layout activeSection={"pages"}>
      <PageView pageId="1" isAdmin={false} />;
    </Layout>
  )
}

export default PageDetails