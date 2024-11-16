import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 6,
    category: "general",  
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  getApiUrl = (page) =>
    `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=${page}&pageSize=${this.props.pageSize}`;

  async fetchArticles(page) {
    try {
      this.setState({ loading: true });
      let url = this.getApiUrl(page);
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: page,
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    await this.fetchArticles(this.state.page);
  }

  handlePrevClick = async () => {
    if (this.state.page > 1) {
      await this.fetchArticles(this.state.page - 1);
    }
  };

  handleNextClick = async () => {
    if (
      this.state.page + 1 <=
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
      await this.fetchArticles(this.state.page + 1);
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center border-bottom border-5">
          SnapNews - Top Headlines
        </h1>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div>
            <div className="row">
              {this.state.articles.map((element) => (
                <div className="col-lg-3 col-md-5 col-sm-5" key={element.url}>
                  <NewsItem
                    title={element.title || ""}
                    description={element.description || ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author || "Unknown"}
                    date={element.publishedAt}
                  />
                </div>
              ))}
            </div>
            <div className="container d-flex justify-content-between">
              <button
                disabled={this.state.page <= 1}
                type="button"
                className="btn btn-dark"
                onClick={this.handlePrevClick}
              >
                &larr; Previous
              </button>
              <button
                disabled={
                  this.state.page + 1 >
                  Math.ceil(this.state.totalResults / this.props.pageSize)
                }
                type="button"
                className="btn btn-dark"
                onClick={this.handleNextClick}
              >
                Next &rarr;
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default News;
