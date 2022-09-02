import './App.css';
import DrawerContextProvider from './Contexts/DrawerContext';
import JsonParserContextProvider from './Contexts/JsonParserContext';
import Router from './Router';

export default function App() {
  //TODO : fichier config .env / .js voir deploy
  // TODO : front
  return (
    <JsonParserContextProvider>
      <DrawerContextProvider>
        <Router />
      </DrawerContextProvider>
    </JsonParserContextProvider>
  );
}
