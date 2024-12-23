// import React from 'react'

import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes"

// import NavBar from "./Components/NavBar"

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App