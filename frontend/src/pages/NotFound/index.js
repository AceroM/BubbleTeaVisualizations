import React from "react";
import "./NotFound.scss";

import AbsoluteImage from "../../components/Styled/AbsoluteImage";

import fourOhFour from "../../static/404.png";

function NotFound() {
  return (
    <div>
      <AbsoluteImage
        className="notfound"
        src={fourOhFour}
        top={0}
        imgWidth={"80vw"}
      />
      <h1> Your tea could not be found! </h1>
    </div>
  );
}

export default NotFound;
