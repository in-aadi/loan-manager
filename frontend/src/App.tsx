import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from "@/pages/Login"
import SignupPage from "@/pages/Signup"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<LoginPage />} /> {/* fallback */}
      </Routes>
    </Router>
  )
}

export default App
