import MessageView from './components/MessageView';
import MessageBox from './components/MessageBox';

function App() {
  const messages = [
    {senderUsername: "User1", unixTimestamp: Date.now(), messageText: "First message on the app"},
    {senderUsername: "User2", unixTimestamp: Date.now(), messageText: "Second message on the app"},
    {senderUsername: "User3", unixTimestamp: Date.now(), messageText: "Third message on the app"},
    {senderUsername: "User4", unixTimestamp: Date.now(), messageText: "Fourth message on the app"},
    {senderUsername: "User5", unixTimestamp: Date.now(), messageText: "Fifth message on the app"},
    {senderUsername: "User6", unixTimestamp: Date.now(), messageText: "Sixth message on the app"},
    {senderUsername: "User7", unixTimestamp: Date.now(), messageText: "Seventh message on the app"},
  ]

  return (
    <>
      <MessageView messages={messages}/>
      <MessageBox />
    </>
  );
}

export default App;
