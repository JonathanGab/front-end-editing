import './App.css';
import DrawerContextProvider from './Contexts/DrawerContext';
import JsonParserContextProvider from './Contexts/JsonParserContext';

import Router from './Router';

export default function App() {
  return (
    <JsonParserContextProvider>
      <DrawerContextProvider>
        <Router />
      </DrawerContextProvider>
    </JsonParserContextProvider>
  );
}
