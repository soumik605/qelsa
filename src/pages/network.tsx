import React from 'react'
import { NetworkPage } from '../components/NetworkPage'
import Layout from '../layout'

const Network = () => {
  return (
    <Layout activeSection={"connections"}>
      <NetworkPage />
    </Layout>
  )
}

export default Network