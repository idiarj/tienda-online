import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom' // Import the Router component
import Testing from './components/testing'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/testing' Component={Testing}>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
