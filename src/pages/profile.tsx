import React from 'react'
import Layout from '../layout'
import { MySpacePage } from '../components/MySpacePage'

const Profile = () => {
  return (
    <Layout activeSection={"profile"}>
      <MySpacePage />;
    </Layout>
  )
}

export default Profile