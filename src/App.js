import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/Navbar";
import News from "./Components/News";
import Footer from "./Components/Footer";
import "./App.css";

function App() {
  const pageSize = 12; // Set page size for all news categories
  const country = "us"; // Default country for news articles
  const apiKey = process.env.REACT_APP_SnapNews_API; // Replace with your own API key
  
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar apiKey={apiKey} />
        </header>
        <div className="App-body">
          <Routes>
            {/* Routes for all categories */}
            <Route
              path="/"
              element={<News key="general" pageSize={pageSize} country={country} category="general" apiKey={apiKey} />}
            />
            <Route
              path="/business"
              element={<News key="business" pageSize={pageSize} country={country} category="business" apiKey={apiKey} />}
            />
            <Route
              path="/entertainment"
              element={<News key="entertainment" pageSize={pageSize} country={country} category="entertainment" apiKey={apiKey} />}
            />
            <Route
              path="/health"
              element={<News key="health" pageSize={pageSize} country={country} category="health" apiKey={apiKey} />}
            />
            <Route
              path="/science"
              element={<News key="science" pageSize={pageSize} country={country} category="science" apiKey={apiKey} />}
            />
            <Route
              path="/sports"
              element={<News key="sports" pageSize={pageSize} country={country} category="sports" apiKey={apiKey} />}
            />
            <Route
              path="/technology"
              element={<News key="technology" pageSize={pageSize} country={country} category="technology" apiKey={apiKey} />}
            />
            {/* Fallback route */}
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </div>
        {/* Footer outside of Routes to keep it on all pages */}
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
