import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom"

import "./Navbar.css"
export default function Navbar() {
  const navigate = useNavigate()
  const onlogout = () => {
    localStorage.setItem('id', "")
    localStorage.setItem('name', "")
    localStorage.setItem('email', "")
    localStorage.setItem('type', "")
    navigate('/login')
  }
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Facility Scheduler
      </Link>
      <ul>
        <CustomLink to="/student">Home</CustomLink>
        <CustomButton>Log Out</CustomButton>
        <CustomButton>Delete User</CustomButton>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
function CustomButton({ children, ...props }) {

  return (
    <li className={"new"}>
      <button {...props}>
        {children}
      </button>
    </li>
  )
}