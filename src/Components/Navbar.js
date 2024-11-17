import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom"; 
import Logo from "./Logo"; 

const NavBar = (props) => {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [searchResults, setSearchResults] = useState([]);  // State to hold search results
  const [loading, setLoading] = useState(false);  // State to manage loading state
  const [error, setError] = useState(null);  // State to manage error state

  // Debounced Search Handler
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        handleSearchSubmit();  // Trigger search when user stops typing for 500ms
      }
    }, 500); // Delay in milliseconds

    return () => clearTimeout(timeoutId); // Cleanup previous timeout if user types again
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);  // Update search query as user types
  };

  const handleSearchSubmit = async () => {
    if (!searchQuery) return;  // If the search query is empty, do nothing

    setLoading(true);  // Set loading to true while fetching results
    setError(null);    // Reset error state

    const apiKey = props.apiKey;  // Replace with your API key
    const url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status === "ok" && data.articles.length > 0) {
        setSearchResults(data.articles);  // Set search results
      } else {
        setSearchResults([]);  // Clear results if no articles found
        setError("No results found");  // Set error if no results
      }
    } catch (error) {
      setError("Error fetching news data. Please try again later.");  // Set error on API failure
    } finally {
      setLoading(false);  // Set loading to false once the API call is complete
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");  // Clear search input
    setSearchResults([]);  // Clear search results
  };

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Logo />
          <Link className="navbar-brand" to="/">
            SnapNews
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            </ul>
            {/* Search Bar */}
            <form className="d-flex border" onSubmit={(e) => e.preventDefault()}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button className="btn btn-outline-success" type="button" onClick={handleSearchSubmit}>
                Search
              </button>
              {searchQuery && (
                <button className="btn btn-outline-danger ms-2" type="button" onClick={handleClearSearch}>
                  Clear
                </button>
              )}
            </form>
          </div>
        </div>
      </nav>

      {/* Display Search Results */}
      <div className="container mt-5">
        {loading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <div>
            {searchResults.length > 0 ? (
              <div className="row">
                {searchResults.map((article, index) => (
                  <div className="col-md-4" key={index}>
                    <div className="card">
                      <img src={article.urlToImage} alt={article.title} className="card-img-top" />
                      <div className="card-body">
                        <h5 className="card-title">{article.title}</h5>
                        <p className="card-text">{article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                          Read more
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No results found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
