import Header from "./components/Header";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from "./pages/SignIn";
function App() {


  
  return (
    <BrowserRouter>
      <Header />
      <main className="App mt-4 container">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
