import './Navbar.css'

export default function Navbar() {

  return (
    <>
      <nav>
        <div className="nav__logo">

          <a href="/">
            StayHealthy

            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              height="26" 
              width="26" 
              viewBox="0 0 1000 1000"
              style={{ fill: "#3685fb" }}
            >
              <path d="M776.6 876c-44.6-4-77.2-44.8-77.2-89.6v-70.4c36.8-28.8 63.2-71.2 72.8-119.2h8.8c42.4 0 76.8-34.4 76.8-76.8V440c0-42.4-34.4-76.8-76.8-76.8h-1.6c-12.8-96-96-171.2-196-171.2h-156c-100 0-183.2 75.2-196 171.2h-1.6c-42.4 0-76.8 34.4-76.8 76.8v80c0 42.4 34.4 76.8 76.8 76.8h8.8c9.6 48 36 90.4 72.8 119.2v70.4c0 44.8-32.8 85.6-77.2 89.6-44.8 4-80 41.6-80 86.4v37.6h707.2v-37.6c0-44.8-35.2-82.4-80-86.4z" />
            </svg>
          </a>

          <span>.</span>
        </div>

        <div className="nav__icon">

          <i className="fa fa-times fa fa-bars"></i>
        </div>

        <ul className="nav__links active">

          <li className="link">
            <a href="/">Home</a>
          </li>

          <li className="link">
            <a href="#">Appointments</a>
          </li>

          <li className="link">
            <a href="/sign-up">
              <button className="btn1">Sign Up</button>
            </a>
          </li>

          <li className="link">
            <a href="/login">
              <button className="btn1">Login</button>
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}