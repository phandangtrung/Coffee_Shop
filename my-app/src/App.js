import logo from "./logo.svg";
import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import axios from "axios";

function App() {
  const [isloading, setIsloading] = useState(false);
  const [userTk, setuserTk] = useState("");
  const responseSuccessGoogle = (response) => {
    setIsloading(true);
    console.log(">> này nè", response);
    axios({
      method: "POST",
      url: "http://localhost:5000/api/users/googlelogin",
      data: { tokenId: response.tokenId },
    }).then((response) => {
      console.log("Google Login Success", response);
      setIsloading(false);
    });
  };

  const responseErrorGoogle = (response) => {
    console.log(response);
  };

  const responseFacebook = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: "http://localhost:5000/api/users/facebooklogin",
      data: { accessToken: response.accessToken, userID: response.userID },
    }).then((response) => {
      console.log("Facebook Login Success, client side", response);
    });
  };

  return (
    <div className="App">
      <div>
        <h1> Login with GOOGLE</h1>
        {isloading ? (
          <div>Đang đăng nhập...</div>
        ) : (
          <GoogleLogin
            clientId="161356782679-supo9tgvceuf5u8ts0d0su6d3eg4sckf.apps.googleusercontent.com"
            buttonText="Login with google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={"single_host_origin"}
          />
        )}
      </div>

      <div>
        <h1> Login with FACEBOOK</h1>
        <FacebookLogin
          appId="2857642671221570"
          autoLoad={false}
          callback={responseFacebook}
        />
      </div>
    </div>
  );
}

export default App;
