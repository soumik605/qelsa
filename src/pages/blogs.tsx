import React from 'react'
import { BlogPlatform } from '../components/BlogPlatform'
import Layout from '../layout'

const Blogs = () => {
  return (
    <Layout activeSection={"home"}>
      <BlogPlatform />
    </Layout>
  )
}

export default Blogs