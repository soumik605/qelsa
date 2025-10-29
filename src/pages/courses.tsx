"use client";

import React from 'react'
import Layout from '../layout'
import { CoursesPage } from '../components/CoursesPage'

const Courses = () => {
  return (
    <Layout activeSection={"courses"}>
      <CoursesPage />
    </Layout>
  )
}

export default Courses