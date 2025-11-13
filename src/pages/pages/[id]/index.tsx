import { PageView } from '@/components/PageView'
import Layout from '@/layout'
import React from 'react'

const PageDetails = () => {
  return (
    <Layout activeSection={"pages"}>
      <PageView pageId="1" isAdmin={false} />;
    </Layout>
  )
}

export default PageDetails