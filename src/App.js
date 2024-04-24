import { useState } from "react";
import Login from "./component/Login/Login";
import SignUp from "./component/SignUp/SignUp";
import { StreamChat } from "stream-chat";
import Cookies from 'universal-cookie'
import { Chat } from "stream-chat-react";
import JoinGame from "./component/JoinGame/JoinGame";
import './App.css'

function App() {
  const api_key = "gp35cxsaxeg3";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false)

  const handleLogOut = () => {
    cookies.remove('token');
    cookies.remove('userID');
    cookies.remove('username');
    cookies.remove('firstName');
    cookies.remove('lastName');
    cookies.remove('hashedPassword');
    cookies.remove('channelName');
    client.disconnectUser();
    setIsAuth(false)
  }

  if (token) {
    client.connectUser({
      id: cookies.get("userID"),
      name: cookies.get("username"),
      firstName: cookies.get("firstName"),
      lastName: cookies.get("lastName"),
      hashedPassword: cookies.get("hashedPassword"),

    }, token).then((user) => {
      setIsAuth(true)
    })
  }
  return (
    <div className="App">

      {isAuth ? (
        <Chat client={client}>
          <JoinGame onClick={handleLogOut}/>
        </Chat>
      ) : (
        <div className="log-in">
          <h1>Tic Tac Toe Authentication</h1>
           <div className="Authentication">
              <SignUp setIsAuth={setIsAuth} />
              <Login setIsAuth={setIsAuth} />
           </div>
        </div>
      )}

    </div>
  );
}

export default App;
