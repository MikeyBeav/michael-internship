import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Countdown from "../UI/Countdown";

const AuthorItems = ({ authorId, author }) => {
  const [authorItems, setAuthorItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorItems = async () => {
      if (!authorId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`);
        setAuthorItems(response.data.nftCollection || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching author items:', error);
        setLoading(false);
      }
    };

    fetchAuthorItems();
  }, [authorId]);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading ? (
            new Array(8).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <div style={{ width: '50px', height: '50px', backgroundColor: '#f0f0f0', borderRadius: '50%' }}></div>
                  </div>
                  <div style={{ height: '16px', backgroundColor: '#f0f0f0', borderRadius: '4px', margin: '10px 0', width: '80px' }}></div>
                  <div className="nft__item_wrap">
                    <div style={{ height: '300px', backgroundColor: '#f0f0f0', borderRadius: '12px' }}></div>
                  </div>
                  <div className="nft__item_info">
                    <div style={{ height: '24px', backgroundColor: '#f0f0f0', borderRadius: '4px', marginBottom: '8px' }}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ height: '20px', backgroundColor: '#f0f0f0', borderRadius: '4px', width: '60px' }}></div>
                      <div style={{ height: '16px', backgroundColor: '#f0f0f0', borderRadius: '4px', width: '40px' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            authorItems.map((item, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id || index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/author/${authorId}`}>
                      <img className="lazy" src={author?.authorImage || AuthorImage} alt="" />
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
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
