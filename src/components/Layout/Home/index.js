import React from "react";
import AdvancedChart from "../AdvancedChart";
import LiveOrders from "../LiveOrders";
import LiveTrades from "../LiveTrades";
import OrderBook from "../OrderBook";
function Home() {

  return (
    <>
      <OrderBook />
      <div className="live-data-full-part">
        <div className="chart-full-part">
          <AdvancedChart />
          </div>
          <LiveTrades />
      </div>
      <LiveOrders />
    </>
  );
}



export default Home;
