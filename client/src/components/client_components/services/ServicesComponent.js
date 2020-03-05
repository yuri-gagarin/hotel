import React, { useState } from "react";
import roomDefault from "./../../../static_images/services_images/room_default.jpg";
import restaurantDefault from "./../../../static_images/services_images/restaurant_default.jpg";

const ServicesComponent = (props) => {
  const { history } = props;
  const handleRoomsClick = (e) => {
    // console.log(e);
    history.push("/rooms");
    return true;
  };
  const handleRestaurantClick = (e) => {
    console.log(e);
  };
  const handleExtrasClick = (e) => {
    console.log(e);
  };
  return (
    <section className="bg-light page-section" id="portfolio">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="section-heading text-uppercase">Services</h2>
            <h3 className="section-subheading text-muted">A little about our hotel</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-6 portfolio-item">
            <a className="portfolio-link" data-toggle="modal" href="#portfolioModal1" onClick={handleRoomsClick}> 
              <div className="portfolio-hover">
                <div className="portfolio-hover-content">
                  <i className="fas fa-plus fa-3x"></i>
                </div>
              </div>
              <img className="img-fluid" src={roomDefault} alt="" />
            </a>
            <div className="portfolio-caption">
              <h4>Rooms</h4>
              <p className="text-muted">Rooms in our hotel</p>
            </div>
          </div>
          <div className="col-md-4 col-sm-6 portfolio-item">
            <a className="portfolio-link" data-toggle="modal" href="#portfolioModal2" onClick={handleRestaurantClick}>
              <div className="portfolio-hover">
                <div className="portfolio-hover-content">
                  <i className="fas fa-plus fa-3x"></i>
                </div>
              </div>
              <img className="img-fluid" src={restaurantDefault} alt="" />
            </a>
            <div className="portfolio-caption">
              <h4>Restaurant</h4>
              <p className="text-muted">Breakfast, Lunch and Dinner menus</p>
            </div>
          </div>
          <div className="col-md-4 col-sm-6 portfolio-item">
          <a className="portfolio-link" data-toggle="modal" href="#portfolioModal3" onClick={handleExtrasClick}>
            <div className="portfolio-hover">
              <div className="portfolio-hover-content">
                <i className="fas fa-plus fa-3x"></i>
              </div>
            </div>
            <img className="img-fluid" src={roomDefault} alt="" />
          </a>
          <div className="portfolio-caption">
            <h4>Extras</h4>
            <p className="text-muted">Pool And Sauna</p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default ServicesComponent;