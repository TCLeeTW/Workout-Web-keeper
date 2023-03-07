import React from "react";


function Header(props) {
  function SignIn(){
    props.login();
  }

  return (
    <header>
      <div className="row">
        <div className="col-9">
          <h1>Keeper</h1>
        </div>
        <div className="col-3">
          <button className="btn btn-outline-light" onClick={SignIn}>Sign In</button>
        </div>
      </div>

    </header>
  );
}

export default Header;
