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

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections');
        setCollections(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
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
    <section id="section-collections" className="no-bottom" data-aos="fade" data-aos-delay="0.2s">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
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
                {new Array(6).fill(0).map((_, index) => (
                  <div key={index} className="px-2">
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <div style={{ height: '200px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}></div>
                      </div>
                      <div className="nft_coll_pp">
                        <div style={{ width: '50px', height: '50px', backgroundColor: '#f0f0f0', borderRadius: '50%' }}></div>
                      </div>
                      <div className="nft_coll_info">
                        <div style={{ height: '20px', backgroundColor: '#f0f0f0', borderRadius: '4px', marginBottom: '8px' }}></div>
                        <div style={{ height: '16px', backgroundColor: '#f0f0f0', borderRadius: '4px', width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <Slider {...sliderSettings}>
                {collections.map((collection, index) => (
                  <div key={collection.id || index} className="px-2">
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${collection.nftId || collection.id || index}`}>
                          <img src={collection.nftImage || nftImage} className="lazy img-fluid" alt={collection.title || "NFT"} />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${collection.authorId || collection.id || index}`}>
                          <img className="lazy pp-coll" src={collection.authorImage || AuthorImage} alt={collection.authorName || "Author"} />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collection.title || "Collection Name"}</h4>
                        </Link>
                        <span>ERC-{collection.code || "721"}</span>
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

export default HotCollections;
