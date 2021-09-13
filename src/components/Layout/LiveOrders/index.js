import React ,{ useEffect,useState } from 'react';
import { connect } from "react-redux";
import { PropTypes } from 'prop-types';
import {
    addLiveOrderData
  } from '../../../action/liveDataAction'
function LiveOrders(props) {

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const [subscription] = useState({
    event: 'bts:subscribe',
    data: {
      channel: 'live_orders_btcusd'
    }
  });
  const ws = new WebSocket('wss://ws.bitstamp.net');
  const initWebsocket = () => {
    const orderTypes = ['order_created', 'order_changed', 'order_deleted'];
    ws.onopen = () => {
      ws.send(JSON.stringify(subscription));
    };
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      switch (response.event) {
        case  orderTypes.find(x => x === response.event):
          if(response.data) {
            const date = new Date(parseInt(response.data.microtimestamp));
            response.data.microtimestamp = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            props.addLiveOrderData(response.data);
            setOrders(props.liveOrders);
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
}, [orders,subscription,props]);

  return (
      <div className="live-order-data-grid-part">
        <table>
          <thead>
            <tr>
              <th>Fiyat(USDT)</th>
              <th>Miktar(BTC)</th>
              <th>Saat</th>
            </tr>
          </thead>
          <tbody>

            {
              loading ?
                orders.map((el, index) => (
                    <tr key={index}>
                      <td style={{color: el.order_type === 0 ? 'green' : 'red'}}> {el.price} </td>
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
        addLiveOrderData: data => dispatch(addLiveOrderData(data))
    }
  }
    const mapStateToProps = (state) => ({
        liveOrders: state.liveData.liveOrders,
  });

  LiveOrders.propTypes = {
    addLiveOrderData: PropTypes.func.isRequired,
    };

 export default connect(mapStateToProps,mapDispatchToProps)(LiveOrders);

