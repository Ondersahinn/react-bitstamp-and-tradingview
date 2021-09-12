

  const subscribeMsg = {
    "event": "bts:subscribe",
    "data": {
        "channel": "order_book_btcusd"
    }
    };
    export const initWebsocket = (url) => {
        const ws = new WebSocket(url);
        const bidsPlaceholder = [];

        ws.onopen = function() {
            ws.send(JSON.stringify(subscribeMsg));
        };

        ws.onmessage = function(evt) {
            const response = JSON.parse(evt.data);

            switch (response.event) {
                case 'data': {
                    serializeData(response.data);
                    break;
                }
                case 'bts:request_reconnect': {
                    initWebsocket();
                    break;
                }
                default:
                    break
            }

        };
        ws.onclose = function () {
            console.log('Websocket connection closed');
            initWebsocket();
        };
    }
    function serializeData(data) {

    const bidsPlaceholder = document.getElementById("bids_placeholder"),
    asksPlaceholder = document.getElementById("asks_placeholder");
    if(data.data === undefined) {
        bidsPlaceholder.innerHTML = '';
        asksPlaceholder.innerHTML = '';
        const bids = data.bids.slice(Math.max(data.bids.length - 15, 0));
        for (let i = 0; i < 15; i++) {
            bidsPlaceholder.innerHTML = bidsPlaceholder.innerHTML + 'Fiyat: ' +  bids[i][1]+ '  Miktar:' + bids[i][0] + 'Toplam: ' + bids[i][1]*bids[i][0] +'<br />';
        }
        const asks = data.asks.slice(Math.max(data.asks.length - 15, 0));
        for (let i = 0; i < 15; i++) {
            asksPlaceholder.innerHTML = asksPlaceholder.innerHTML + 'Fiyat: ' +  asks[i][1] + '  Miktar:' + asks[i][0]  + '<br />';
        }
    }
        
    }
 function serializeBidsData(data) {
        const bidsPlaceholder = [];
        const sortingData = data.sort(function(a, b){return a - b});
        sortingData.forEach((data) => {
            bidsPlaceholder.push (`
                <li>
                    <span>${data[0]}</span>
                    <span>${data[1]}</span>
                    <span>${(data[0]*data[1])}</span>
                </li> `)
        })
       
    }
    export function serializeAsksData(data) {
        const asksPlaceholder = [];
        const sortingData = data.sort(function(a, b){ return b - a});
        sortingData.forEach((data) => {
            asksPlaceholder.push(
                <li>
                    <span>{data[0]}</span>
                    <span>{data[1]}</span>
                    <span>{(data[0]*data[1])}</span>
                </li>
            )
        })
        return asksPlaceholder;
    }