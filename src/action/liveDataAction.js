import * as LiveOrderAction from '../types/liveDataType';

export function addLiveOrderData(liveOrderData) {
  return {
    type: LiveOrderAction.ADD_LIVE_ORDER_DATA,
    payload:liveOrderData
  };
}

export function addLiveTradeData(tradeDate) {
  return {
    type: LiveOrderAction.ADD_LIVE_TRADE_DATA,
    payload:tradeDate
  };
}


