import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';

function App() {

    return (
        <div className="App">

            <BrowserRouter>
                
                <main className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    )
}

export default App
