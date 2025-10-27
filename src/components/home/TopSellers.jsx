import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers');
        setTopSellers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching top sellers:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="section-popular" className="pb-5" data-aos="fade" data-aos-delay="0.6s">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading ? (
                new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <div style={{ 
                        width: '50px', 
                        height: '50px', 
                        backgroundColor: '#f0f0f0', 
                        borderRadius: '50%' 
                      }}></div>
                    </div>
                    <div className="author_list_info">
                      <div style={{ 
                        height: '20px', 
                        backgroundColor: '#f0f0f0', 
                        borderRadius: '4px', 
                        marginBottom: '4px' 
                      }}></div>
                      <div style={{ 
                        height: '16px', 
                        backgroundColor: '#f0f0f0', 
                        borderRadius: '4px', 
                        width: '60%' 
                      }}></div>
                    </div>
                  </li>
                ))
              ) : (
                topSellers.map((seller, index) => (
                  <li key={seller.id || index}>
                    <div className="author_list_pp">
                      <Link to={`/author/${seller.authorId || seller.id || index}`}>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage || AuthorImage}
                          alt={seller.authorName || "Author"}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${seller.authorId || seller.id || index}`}>{seller.authorName || "Unknown Artist"}</Link>
                      <span>{seller.price || "0.00"} ETH</span>
                    </div>
                  </li>
                ))
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
