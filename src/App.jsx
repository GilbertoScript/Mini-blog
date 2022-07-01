import './App.scss';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {

    return (
        <div className="App">

            <BrowserRouter>
                <Navbar />
                <main className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </main>
                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default App
