import Lobby from './components/lobby/Lobby'
import { useNavigate } from 'react-router-dom';
import { cookies } from 'react-cookie';

export default function App() {
  return (
    <div className="App">
      <Lobby />
    </div>
  );
}