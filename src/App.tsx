import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Home } from './pages/Home';
import { LevelSelect } from './pages/LevelSelect';
import { Level } from './pages/Level';
import { Sandbox } from './pages/Sandbox';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/levels" element={<LevelSelect />} />
            <Route path="/level/:levelId" element={<Level />} />
            <Route path="/sandbox" element={<Sandbox />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
