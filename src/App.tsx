import { Outlet } from "react-router-dom"
import { LayoutKit } from "./components/layout"

function App() {
  return (
    <LayoutKit>
      <Outlet />
    </LayoutKit>
  )
  
}

export default App
