import React ,{ useEffect,useState } from 'react';

function OrderBook() {

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [subscription] = useState({
    event: 'bts:subscribe',
    data: {
      channel: 'order_book_btcusd'
    }
  });
  const ws = new WebSocket('wss://ws.bitstamp.net');
  const initWebsocket = () => {
    ws.onopen = () => {
      ws.send(JSON.stringify(subscription));
    };
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      switch (response.event) {
        case 'data':
          if(response.data) {
            response.data.bids = response.data.bids.slice(Math.max(response.data.bids.length - 15, 0));
            response.data.asks = response.data.asks.slice(Math.max(response.data.asks.length - 15, 0));
            response.data.asks = response.data.asks.sort((a, b) => a - b);
            response.data.bids = response.data.bids.sort((a, b) => b - a);
            setOrders(response.data);
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
      <div className="bids-and-ask-data-grid-part">
        <table>
          <thead>
            <tr>
              <th>Fiyat(USDT)</th>
              <th>Miktar(BTC)</th>
              <th>Toplam</th>
            </tr>
          </thead>
          <tbody>

            {
                loading ?
                orders.asks.map((el, index) => (
                  <tr key={index}>
                    <td style={{color: 'red'}}> {el[0]} </td>
                    <td> {el[1]} </td>
                    <td> {el[0]* el[1]}</td>
                  </tr>
                )) : ''
              }
            </tbody>
            <tbody>
            {
                loading ?
                orders.bids.map((el, index) => (
                  <tr key={index}>
                    <td style={{color:'green'}}> {el[0]} </td>
                    <td> {el[1]} </td>
                    <td> {el[0]* el[1]}</td>
                  </tr>
                )) : ''
              }
            </tbody>
        </table>
        
      </div>
  );
}



export default OrderBook;
