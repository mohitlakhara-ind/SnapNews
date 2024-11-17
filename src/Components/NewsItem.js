import React from "react";

const NewsItem = ({ title, description, imageUrl, newsUrl, time, author }) => {
  return (
    <div className="">
      <div
        className="card shadow-lg"
        style={{
          border: "none",
          borderRadius: "15px",
          overflow: "hidden",
          transition: "transform 0.3s ease",
        }}
      >
        <img
          src={
            !imageUrl
              ? "https://via.placeholder.com/300x200?text=No+Image"
              : imageUrl
          }
          className="card-img-top"
          alt="News"
          style={{
            objectFit: "cover",
            height: "15rem",
            transition: "transform 0.3s ease",
          }}
        />
        <div
          className="card-body d-flex flex-column"
          style={{
            padding: "1.5rem",
            backgroundColor: "#fff",
          }}
        >
          <h5
            className="card-title text-truncate"
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#333",
              marginBottom: "0.8rem",
            }}
            title={title}
          >
            {title || "Untitled News"}
          </h5>
          <p
            className="card-text text-muted"
            style={{
              fontSize: "1rem",
              lineHeight: "1.6",
              marginBottom: "1.2rem",
              height: "4.5rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={description}
          >
            {description || "No description available for this news article."}
          </p>

          <div className="card-footer bg-transparent border-0 pt-2 d-flex flex-column align-items-start">
            <div className="mb-1">
              <small className="text-muted">
                <strong>Author: </strong>
                {author || "Unknown"}
              </small>
            </div>
            <div>
              <small className="text-muted">
                <strong>Published: </strong>
                {time ? new Date(time).toLocaleString() : "Unknown Time"}
              </small>
            </div>
          </div>

          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-dark mt-auto"
            style={{
              alignSelf: "stretch",
              textAlign: "center",
              borderRadius: "5px",
              padding: "0.5rem",
              fontWeight: "500",
              transition: "background-color 0.3s ease",
            }}
            title="Read full article"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
