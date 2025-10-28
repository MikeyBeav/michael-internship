import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Countdown from "../UI/Countdown";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let url = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore';
        
        if (filter === 'likes_high_to_low') {
          url += '?filter=likes_high_to_low';
        } else if (filter === 'price_high_to_low') {
          url += '?filter=price_high_to_low';
        } else if (filter === 'price_low_to_high') {
          url += '?filter=price_low_to_high';
        }
        
        const response = await axios.get(url);
        setItems(response.data);
        setVisibleItems(8);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching explore items:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [filter]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const getFilteredAndSortedItems = () => {
    let filteredItems = [...items];
    
    switch (filter) {
      case "price_low_to_high":
        break;
      case "price_high_to_low":
        break;
      case "likes_high_to_low":
        break;
      default:
        break;
    }
    
    return filteredItems.slice(0, visibleItems);
  };

  const loadMore = () => {
    setVisibleItems(prev => prev + 4);
  };

  return (
    <>
      <div>
        <select id="filter-items" value={filter} onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
          .skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
          }
          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `
      }} />
      {loading ? (
        new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <div className="skeleton" style={{ width: '50px', height: '50px', borderRadius: '50%' }}></div>
              </div>
              <div className="skeleton" style={{ height: '16px', borderRadius: '4px', margin: '10px 0', width: '80px' }}></div>

              <div className="nft__item_wrap">
                <div className="skeleton" style={{ height: '300px', borderRadius: '12px' }}></div>
              </div>
              <div className="nft__item_info">
                <div className="skeleton" style={{ height: '24px', borderRadius: '4px', marginBottom: '8px' }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="skeleton" style={{ height: '20px', borderRadius: '4px', width: '60px' }}></div>
                  <div className="skeleton" style={{ height: '16px', borderRadius: '4px', width: '40px' }}></div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        getFilteredAndSortedItems().map((item, index) => (
          <div
            key={item.id || index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${item.authorId || item.id || index}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={`Creator: ${item.authorName || 'Unknown'}`}
                >
                  <img className="lazy" src={item.authorImage || AuthorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              <Countdown expiryDate={item.expiryDate} />

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <Link to={`/item-details/${item.nftId || item.id || index}`}>
                  <img 
                    src={item.nftImage || nftImage} 
                    className="lazy nft__item_preview" 
                    alt={item.title || "NFT"} 
                  />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to={`/item-details/${item.nftId || item.id || index}`}>
                  <h4>{item.title || "Untitled NFT"}</h4>
                </Link>
                <div className="nft__item_price">{item.price || "0.00"} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes || 0}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      
      {!loading && visibleItems < items.length && (
        <div className="col-md-12 text-center">
          <button onClick={loadMore} id="loadmore" className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
