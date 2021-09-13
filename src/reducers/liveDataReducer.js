import * as LiveOrderAction from '../types/liveDataType';

const initialState = {
    liveOrders: [],
    liveTrades:[],
};

export default function LiveReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LiveOrderAction.ADD_LIVE_ORDER_DATA:
            if(state.liveOrders.length > 30) {
              state.liveOrders = state.liveOrders.slice(Math.max(state.liveOrders.length - 30, 0));
            }
            else {
              state.liveOrders.push(payload);
            }
        return {
      ...state,
    };
    case LiveOrderAction.ADD_LIVE_TRADE_DATA:
      state.liveTrades.push(payload);
      return {
    ...state,
    };
      default:
      return state;
  }
}
