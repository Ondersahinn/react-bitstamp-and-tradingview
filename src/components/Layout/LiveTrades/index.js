import React ,{ useEffect,useState } from 'react';
import { connect } from "react-redux";
import { PropTypes } from 'prop-types';
import {
    addLiveTradeData
  } from '../../../action/liveDataAction';


function LiveTrades(props) {

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [subscription] = useState({
    event: 'bts:subscribe',
    data: {
      channel: 'live_trades_btcusd'
    }
  });
  const ws = new WebSocket('wss://ws.bitstamp.net');
  const initWebsocket = () => {
    ws.onopen = () => {
      ws.send(JSON.stringify(subscription));
    };
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      const resData = [];
      switch (response.event) {
        case 'trade':
          if(response.data) {
            setOrders(resData);
            const date = new Date(parseInt(response.data.microtimestamp));
            response.data.microtimestamp = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            props.addLiveTradeData(response.data);
            console.log(props.liveTrades)
            setOrders(props.liveTrades);
            setLoading(true);
          }
          else {
            setLoading(false);

          }
          break;
        case 'bts:request_reconnect':
          initWebsocket();
          break;
        default:
          break;
      }
    };
    ws.onclose = () => {
      initWebsocket();
    };
  };

  useEffect(() => {
    initWebsocket();
}, [orders ,subscription]);

  return (
      <div className="live-trade-data-grid-part">
        <table>
          <thead>
            <tr>
              <th>TÜR</th>
              <th>Fiyat </th>
              <th>Miktar(BTC)</th>
              <th>Saat</th>
            </tr>
          </thead>
          <tbody>

            {
                loading ?
                orders.map((el, index) => (
                    <tr key={index}>
                      <td style={{color: el.type === 0 ? 'green' : 'red'}}> {el.type === 0 ? 'BUY(BTC)' : 'SELL'} </td>
                      <td> {el.price} </td>
                      <td> {el.amount} </td>
                      <td> {el.microtimestamp}</td>
                    </tr>
                  )) : ''
              }
            </tbody>
        </table>
      </div>
  );
}


const mapDispatchToProps = dispatch => {
    return {
        addLiveTradeData: data => dispatch(addLiveTradeData(data))
    }
  }
    const mapStateToProps = (state) => ({
        liveTrades: state.liveData.liveTrades,
  });

  LiveTrades.propTypes = {
    addLiveTradeData: PropTypes.func.isRequired,
    };

 export default connect(mapStateToProps,mapDispatchToProps)(LiveTrades);

