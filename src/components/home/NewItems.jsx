import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const CustomPrevArrow = ({ onClick }) => (
  <button 
    onClick={onClick}
    style={{
      position: 'absolute',
      left: '-22.5px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'white',
      border: '1px solid grey',
      borderRadius: '50%',
      width: '45px',
      height: '45px',
      zIndex: 10,
      fontSize: '16px',
      color: 'black',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    ❮
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button 
    onClick={onClick}
    style={{
      position: 'absolute',
      right: '-22.5px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'white',
      border: '1px solid grey',
      borderRadius: '50%',
      width: '45px',
      height: '45px',
      zIndex: 10,
      fontSize: '16px',
      color: 'black',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    ❯
  </button>
);

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  const formatCountdown = (expiryDate) => {
    if (!expiryDate) return "";
    
    const expiry = new Date(expiryDate).getTime();
    const timeDiff = expiry - currentTime;
    
    if (timeDiff <= 0) return "Expired";
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      return "";
    }
    
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else {
      return `${hours}h ${minutes}m ${seconds}s`;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems');
        setNewItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching new items:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    swipeToSlide: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true
        }
      }
    ]
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12" style={{ position: 'relative' }}>
            <style dangerouslySetInnerHTML={{
              __html: `
                .slick-prev:before,
                .slick-next:before {
                  display: none !important;
                }
                .slick-prev.slick-arrow,
                .slick-next.slick-arrow {
                  background: transparent !important;
                }
              `
            }} />
            {loading ? (
              <Slider {...sliderSettings}>
                {new Array(8).fill(0).map((_, index) => (
                  <div key={index} className="px-2">
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <div style={{ width: '50px', height: '50px', backgroundColor: '#f0f0f0', borderRadius: '50%' }}></div>
                      </div>
                      <div style={{ height: '20px', backgroundColor: '#f0f0f0', borderRadius: '4px', margin: '10px 0' }}></div>

                      <div className="nft__item_wrap">
                        <div style={{ height: '300px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}></div>
                      </div>
                      <div className="nft__item_info">
                        <div style={{ height: '20px', backgroundColor: '#f0f0f0', borderRadius: '4px', marginBottom: '8px' }}></div>
                        <div style={{ height: '16px', backgroundColor: '#f0f0f0', borderRadius: '4px', width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <Slider {...sliderSettings}>
                {newItems.map((item, index) => (
                  <div key={item.id || index} className="px-2">
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to="/author"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={`Creator: ${item.authorName || 'Unknown'}`}
                        >
                          <img className="lazy" src={item.authorImage || AuthorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {formatCountdown(item.expiryDate) && (
                        <div className="de_countdown">{formatCountdown(item.expiryDate)}</div>
                      )}

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

                        <Link to="/item-details">
                          <img
                            src={item.nftImage || nftImage}
                            className="lazy nft__item_preview"
                            alt={item.title || "NFT"}
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to="/item-details">
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
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
