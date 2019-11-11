import React, { Component } from "react";
import TableauReport from "tableau-react";
import "./Report.scss";

class Report extends Component {
  render() {
    return (
      <div className="report">
        <TableauReport url="https://public.tableau.com/shared/FD9396NMW?:display_count=y&:origin=viz_share_link" />
        <TableauReport url="https://public.tableau.com/shared/G8QYD3H2T?:display_count=y&:origin=viz_share_link" />
        <TableauReport url="https://public.tableau.com/views/bubble_tea_no_averages_nyc/BubbleTeavsReviews?:display_count=y&:origin=viz_share_link" />
      </div>
    );
  }
}
export default Report;
