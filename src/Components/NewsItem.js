import React, { Component } from 'react';

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl } = this.props;
        return (
            <div className="my-3">
                <div
                    className="card shadow-lg"
                    // style={{
                    //     width: '20rem',
                    //     border: 'none',
                    //     borderRadius: '12px',
                    //     overflow: 'hidden',
                    //     transition: 'transform 0.3s ease',
                    // }}
                >
                    <img
                        src={
                            !imageUrl
                                ? 'https://via.placeholder.com/300x200?text=No+Image'
                                : imageUrl
                        }
                        className="card-img-top"
                        alt="News"
                        style={{
                            objectFit: 'cover',
                            height: '12rem',
                        }}
                    />
                    <div
                        className="card-body d-flex flex-column"
                        style={{ padding: '1.2rem' }}
                    >
                        <h5
                            className="card-title text-truncate"
                            style={{
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                color: '#333',
                            }}
                            title={title}
                        >
                            {title || 'Untitled News'}
                        </h5>
                        <p
                            className="card-text text-muted"
                            style={{
                                fontSize: '0.95rem',
                                lineHeight: '1.5',
                                marginBottom: '1rem',
                                height: '4rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                            title={description}
                        >
                            {description || 'No description available for this news article.'}
                        </p>
                        <a
                            rel="noreferrer"
                            href={newsUrl}
                            target="_blank"
                            className="btn btn-sm btn-dark button mt-auto"
                        >
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsItem;
