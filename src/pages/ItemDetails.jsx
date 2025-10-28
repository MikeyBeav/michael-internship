import React, { useState, useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [nftData, setNftData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchNftDetails = async () => {
      if (!nftId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`);
        setNftData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching NFT details:', error);
        setLoading(false);
      }
    };

    fetchNftDetails();
  }, [nftId]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <div style={{ 
                    height: '400px', 
                    backgroundColor: '#f0f0f0', 
                    borderRadius: '12px',
                    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'loading 1.5s infinite'
                  }}></div>
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <div style={{ 
                      height: '36px', 
                      backgroundColor: '#f0f0f0', 
                      borderRadius: '4px', 
                      marginBottom: '20px',
                      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                      backgroundSize: '200% 100%',
                      animation: 'loading 1.5s infinite'
                    }}></div>
                    <div style={{ 
                      height: '80px', 
                      backgroundColor: '#f0f0f0', 
                      borderRadius: '4px', 
                      marginBottom: '20px',
                      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                      backgroundSize: '200% 100%',
                      animation: 'loading 1.5s infinite'
                    }}></div>
                  </div>
                </div>
              </div>
            </div>
            <style dangerouslySetInnerHTML={{
              __html: `
                @keyframes loading {
                  0% { background-position: 200% 0; }
                  100% { background-position: -200% 0; }
                }
              `
            }} />
          </section>
        </div>
      </div>
    );
  }

  if (!loading && !nftData) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div style={{ textAlign: 'center', padding: '50px' }}>
                    <h2>NFT Not Found</h2>
                    <p>The NFT you're looking for doesn't exist or there was an error loading the data.</p>
                    <Link to="/" className="btn-main">Go Back Home</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={nftData?.nftImage || nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={nftData?.title || "NFT"}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {nftData?.title || "Untitled NFT"}
                    {nftData?.tag && <span style={{ color: '#888', fontWeight: 'normal' }}> #{nftData.tag}</span>}
                  </h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {nftData?.views || 0}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {nftData?.likes || 0}
                    </div>
                  </div>
                  <p>
                    {nftData?.description || "No description available for this NFT."}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nftData?.ownerId || nftData?.authorId || nftData?.author?.id}`}>
                            <img className="lazy" src={nftData?.ownerImage || nftData?.authorImage || nftData?.author?.authorImage || AuthorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nftData?.ownerId || nftData?.authorId || nftData?.author?.id}`}>
                            {nftData?.ownerName || nftData?.authorName || nftData?.author?.authorName || "Unknown"}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nftData?.authorId || nftData?.creatorId || nftData?.author?.id}`}>
                            <img className="lazy" src={nftData?.authorImage || nftData?.creatorImage || nftData?.author?.authorImage || AuthorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nftData?.authorId || nftData?.creatorId || nftData?.author?.id}`}>
                            {nftData?.authorName || nftData?.creatorName || nftData?.author?.authorName || "Unknown"}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{nftData?.price || "0.00"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
