import React from 'react'
import Layout from '../layout'
import { JobPostingPage } from '../components/JobPostingPage'

const JobPost = () => {
  return (
    <Layout activeSection={"jobs"}>
      <JobPostingPage />;
    </Layout>
  )
}

export default JobPost