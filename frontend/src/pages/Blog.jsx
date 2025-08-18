import React, { useEffect, useState } from "react";
import { getPosts } from "../services/sanityServices";

const BlogCard = ({ blog }) => {
  return (
    <a
      href={`/blog/${blog?.slug?.current}`}
      className="text-decoration-none text-dark"
    >
      <div className="card shadow-sm h-100 border-0">
        <img
          src={blog?.coverImage?.asset?.url}
          alt={blog?.title}
          className="card-img-top img-fluid"
        />
        <div className="card-body">
          <p className="text-uppercase small fw-bold text-secondary mb-2">
            {blog?.tag}
          </p>
          <h5 className="card-title fw-semibold">{blog?.title}</h5>
          <p className="text-muted mb-0">
            {new Date(blog?.date).toDateString()}
          </p>
        </div>
      </div>
    </a>
  );
};

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      console.log("Sanity posts: ", response);
      setBlogs(response);
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container py-4">
      <div className="row g-4">
        {blogs.map((blog, index) => (
          <div className="col-md-4" key={index}>
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
