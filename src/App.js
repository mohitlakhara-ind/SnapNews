import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/Navbar";
import News from "./Components/News";
import "./App.css";

function App() {
  const pageSize = 12; // Set page size for all news categories
  const country = "us"; // Default country for news articles

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <div className="App-body">
          <Routes>
            {/* Routes for all categories */}
            <Route
              path="/"
              element={
                <News
                  key="general"
                  pageSize={pageSize}
                  country={country}
                  category="general"
                />
              }
            />
            <Route
              path="/business"
              element={
                <News
                  key="business"
                  pageSize={pageSize}
                  country={country}
                  category="business"
                />
              }
            />
            <Route
              path="/entertainment"
              element={
                <News
                  key="entertainment"
                  pageSize={pageSize}
                  country={country}
                  category="entertainment"
                />
              }
            />
            <Route
              path="/health"
              element={
                <News
                  key="health"
                  pageSize={pageSize}
                  country={country}
                  category="health"
                />
              }
            />
            <Route
              path="/science"
              element={
                <News
                  key="science"
                  pageSize={pageSize}
                  country={country}
                  category="science"
                />
              }
            />
            <Route
              path="/sports"
              element={
                <News
                  key="sports"
                  pageSize={pageSize}
                  country={country}
                  category="sports"
                />
              }
            />
            <Route
              path="/technology"
              element={
                <News
                  key="technology"
                  pageSize={pageSize}
                  country={country}
                  category="technology"
                />
              }
            />
            {/* Fallback route */}
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
