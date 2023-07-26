import Router from './routes/Router';
import { CookiesProvider } from 'react-cookie';


export default function App() {
  return (
      <CookiesProvider>
        <Router />
      </CookiesProvider>
  );
}