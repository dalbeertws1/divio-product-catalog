type Nav = {
  title: string
}

const Navbar = (props: Nav) => {
  function handlelogout(){
    localStorage.clear();
    window.location.href="/login"
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">{props.title}</a>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/home">Home</a>
          </li>

        </ul>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>

        </button>
        <div className="collapse navbar-collapse rightcls" id="navbarText">
          {/* <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="/">Home</a>
      </li>
    
    </ul> */}
          <div className="d-flex justify-content-end">
            <div className="p-2 bd-highdark">
              {localStorage.getItem("email") ? <>
              {localStorage.getItem("email")} <button className="btn btn-primary" onClick={(e) => { e.preventDefault(); handlelogout() }}>{'Logout'}</button></> : <><button className="btn btn-warning" onClick={(e) => { e.preventDefault(); window.location.href="/" }}>{'Login'}</button> <button className="btn btn-danger" onClick={(e) => { e.preventDefault(); window.location.href="/" }}>{'Sign Up'}</button></>}

            </div>

          </div>
        </div>
      </nav>
    </div>
  )
}
export default Navbar
