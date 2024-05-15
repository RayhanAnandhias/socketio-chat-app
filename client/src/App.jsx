import Login from './components/Login/Login';
import { useCallback, useState } from 'react';
import Message from './components/Message/Message';

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleSetRoom = useCallback((room) => {
    setRoom(room);
  }, []);

  const handleSetLoggedIn = useCallback((isLoggedIn) => {
    setLoggedIn(isLoggedIn);
  }, []);

  return (
    <div>
      {!isLoggedIn ? (
        <Login
          username={username}
          setUsername={setUsername}
          room={room}
          setRoom={handleSetRoom}
          setLoggedIn={handleSetLoggedIn}
        />
      ) : (
        <Message room={room} username={username} />
      )}
    </div>
  );
}

export default App;
