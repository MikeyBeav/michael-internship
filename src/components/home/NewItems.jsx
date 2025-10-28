import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Countdown from "../UI/Countdown";


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
    <section id="section-items" className="no-bottom" data-aos="fade" data-aos-delay="0.4s">
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
              <Slider {...sliderSettings}>
                {new Array(8).fill(0).map((_, index) => (
                  <div key={index} className="px-2">
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
                ))}
              </Slider>
            ) : (
              <Slider {...sliderSettings}>
                {newItems.map((item, index) => (
                  <div key={item.id || index} className="px-2">
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
