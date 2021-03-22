import logo from "./logo.svg";
import React from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";

function App() {
  const responseSuccessGoogle = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: "http://localhost:5000/api/users/googlelogin",
      data: { tokenId: response.tokenId },
    }).then((response) => {
      console.log(response);
    });
  };

  const responseErrorGoogle = (response) => {
    console.log("Lỗi rồi");
  };

  return (
    <div className="App">
      <h1> Login Google</h1>
      <GoogleLogin
        clientId="161356782679-supo9tgvceuf5u8ts0d0su6d3eg4sckf.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={"single_host_origin"}
      />
      ,
    </div>
  );
}

export default App;
