
import Image from "next/image";
import React, { useState } from "react";
import InfoModal from "../modal/InfoModal";

const BlogCard = ({ image, author, date, description, link }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const statement = "Our Blogs & News section is currently under development and will be launching soon. Stay tuned!";
    const handeReadMore = () => {
        setShowSuccess(true);
    }
    return (
        <div className="blog-card">
            <Image src={image} alt="Blog" className="card-image" />
            <div className="card-content">
                <div className="card-header">
                    <span className="author">{author}</span>
                    <span className="date">{date}</span>
                </div>
                <p className="description">{description}</p>
                <button onClick={handeReadMore} className="read-more">
                    Read more <span>→</span>
                </button>
                {showSuccess && <InfoModal message={statement} onClose={() => setShowSuccess(false)} />}
            </div>
        </div>
    );
};

export default BlogCard;
