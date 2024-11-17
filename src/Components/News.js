import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import { debounce } from "lodash"; // Adding lodash to debounce scroll events
import LoadingBar from 'react-top-loading-bar'; // Import the LoadingBar component

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 6,
    category: "general",
    // apiKey: 'dbe57b028aeb41e285a226a94865f7a7'// Replace with your actual API key
  };
  
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      endReached: false,
      error: null, // Error state to handle errors
      progress: 0, // Progress state for the loading bar
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - SnapNews`;
  }

  getApiUrl = (page) =>
    `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${this.props.pageSize}`;

  async fetchArticles(page) {
    try {
      this.setState({ loading: true });
      
      // Start loading bar progress
      this.setState({ progress: 10 }); // Starting at 10% as the request begins

      let url = this.getApiUrl(page);
      let data = await fetch(url);
      let parsedData = await data.json();

      if (!data.ok) throw new Error("Failed to fetch articles");

      // Increase progress as data is fetched
      this.setState({ progress: 50 }); // Midway progress

      this.setState((prevState) => ({
        page: page,
        articles: [...prevState.articles, ...parsedData.articles],
        totalResults: parsedData.totalResults,
        loading: false,
        progress: 100, // Completed
        endReached: prevState.articles.length + parsedData.articles.length >= parsedData.totalResults,
      }));

      // Reset loading progress after a short delay
      setTimeout(() => this.setState({ progress: 0 }), 500);
      
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false, error: error.message, progress: 0 });
    }
  }

  async componentDidMount() {
    await this.fetchArticles(this.state.page);

    // Debounced scroll event handler to optimize performance
    this.handleScroll = debounce(this.handleScroll, 300);
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = async () => {
    const { page, totalResults, articles, endReached } = this.state;

    if (!endReached && window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      if (articles.length < totalResults) {
        await this.fetchArticles(page + 1);
      }
    }
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    const { loading, articles, endReached, error, progress } = this.state;

    return (
      <div className="container my-3">
        {/* Top Loading Bar */}
        <LoadingBar
          color="#20a39e" // Customize the color
          progress={progress} // Set the progress
          onLoaderFinished={() => this.setState({ progress: 0 })} // Reset progress after loading finishes
        />
        
        <h1 className="text-center mt-5 pt-5 rounded-bottom border-bottom border-5">
          SnapNews - {this.capitalizeFirstLetter(this.props.category)} Top Headlines
        </h1>
        <div>
          <div className="row">
            {articles.map((element) => (
              <div className="col-lg-3 col-md-5 col-sm-5" key={element.url}>
                <NewsItem
                  title={element.title || ""}
                  description={element.description || ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author || "Unknown"}
                  time={element.publishedAt}
                />
              </div>
            ))}
          </div>
          {loading && <Spinner />}
          {endReached && !loading && (
            <div className="text-center my-3">
              <p className="text-muted">
                You have reached the end. <br />
                Explore more categories.
              </p>
            </div>
          )}
          {error && !loading && (
            <div className="text-center my-3">
              <p className="text-danger">{error}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default News;
