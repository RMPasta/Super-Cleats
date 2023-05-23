import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./ItemsPageHeader.css";

export default function ItemsPageHeader() {
  const header1 = (
    <div className="items-header">
      <div className="text-container">
        <div className="items-header-text">
          Wow, you gotta be kidding me with these cleats!
        </div>
        <div className="items-header-small-text">Check out our cleats now</div>
      </div>
      <img
        className="items-header-image"
        src="https://supercleats-pics.s3.amazonaws.com/splash1.jpg"
        alt="items header cleats"
      />
    </div>
  );
  const header2 = (
    <div className="items-header">
      <div className="text-container">
        <div className="items-header-text">
          These are top notch sporting balls for kicking
        </div>
        <div className="items-header-small-text">
          Check out the ball selection
        </div>
      </div>
      <img
        className="items-header-image"
        src="https://supercleats-pics.s3.amazonaws.com/splash2.jpg"
        alt="items header cleats"
      />
    </div>
  );
  const header3 = (
    <div className="items-header">
      <div className="text-container">
        <div className="items-header-text">
          Short socks, long socks, we have every sock here!
        </div>
        <div className="items-header-small-text">
          Don't ask about if we have it because we DO
        </div>
      </div>
      <img
        className="items-header-image"
        src="https://supercleats-pics.s3.amazonaws.com/sock2.jpg"
        alt="items header cleats"
      />
    </div>
  );
  const header4 = (
    <div className="items-header">
      <div className="text-container">
        <div className="items-header-text">
          The most elite website for three specific soccer related items.
        </div>
        <div className="items-header-small-text">
          Don't miss this chance!
        </div>
      </div>
      <img
        className="items-header-image"
        src="https://supercleats-pics.s3.amazonaws.com/splash6.jpg"
        alt="items header cleats"
      />
    </div>
  );

  const headers = [header1, header2, header3, header4];

  const responsive = {
    400: { items: 1 },
    760: { items: 2 },
    1300: { items: 3 },
  };

  const stagePadding = {
    paddingLeft: 80,
    paddingRight: 80,
  };

  return (
    <div className="items-header-container">
      <AliceCarousel
        autoPlayInterval={4200}
        autoPlay
        infinite
        disableButtonsControls
        disableDotsControls
        stagePadding={stagePadding}
        responsive={responsive}
        mouseTracking
        items={headers}
      />
    </div>
  );
}
