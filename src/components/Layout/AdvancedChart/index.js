import React from "react";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

const AdvancedChart = () => {

    

    return(
        <>
           <TradingViewWidget
                symbol="BITSTAMP:BTCUSD"
                theme={Themes.DARK}
                locale="fr"
                autosize
                interval={15}
            />
        </>
    );
}
export default AdvancedChart;