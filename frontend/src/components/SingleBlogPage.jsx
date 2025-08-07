import react from "react";
import image1 from "../assets/images/article1.avif";

function SingleBlogPage() {
  return (
    <div>
      <img src={image1} alt="image"></img>
      <div>
        <h2>Toppic 1</h2>
        <p>Topic 1 content</p>
        <p>insert image</p>
      </div>
    </div>
  );
}

export default SingleBlogPage;
