import React from 'react'
import Header from '../components/Header'
import AddTask from '../components/Admin/AddTask'
import UpdateTask from '../components/Admin/UpdateTask'
import ShowTask from '../components/ShowTasks/ShowTask'

function HomePage() {
  return (
    <div>
      <Header/>
      <AddTask/>
      <ShowTask/>
      <UpdateTask/>
    </div>
  )
}

export default HomePage
