import * as actionType from '../actions/actionType';

const initialState = {
  cartAr: [],
  totalprice: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.BUY_PRODUCT:
      const productInCart = state.cartAr.find(
        (p) => p.id === action.payload.id,
      );
      if (!productInCart) {
        const newarrC = [...state.cartAr, action.payload];
        const objIndext = newarrC.findIndex(
          (obj) => obj.id == action.payload.id,
        );
        newarrC[objIndext] = {...newarrC[objIndext], quantity: 1};
        let pricet = 0;

        newarrC.map((pr) => (pricet = pricet + pr.prices * pr.quantity));
        return {
          cartAr: newarrC,
          totalprice: pricet,
        };
      } else {
        let newprocart = state.cartAr;
        const objIndext = newprocart.findIndex(
          (obj) => obj.id == action.payload.id,
        );
        if (newprocart[objIndext].quantity === 1) {
          newprocart[objIndext] = {...newprocart[objIndext], quantity: 2};
          // newprocart[objIndext].quantity = 2;
        } else {
          newprocart[objIndext].quantity = newprocart[objIndext].quantity + 1;
        }
        let pricet = 0;
        newprocart.map((pr) => (pricet = pricet + pr.prices * pr.quantity));
        return {cartAr: [...newprocart], totalprice: pricet};
      }
    case actionType.DELETE_PRODUCT:
      let newcart = state.cartAr;
      const objIndex = newcart.findIndex((obj) => obj.id == action.payload.id);
      let newtotal;
      newtotal =
        state.totalprice -
        newcart[objIndex].prices * newcart[objIndex].quantity;
      newcart.splice(objIndex, 1);
      console.log('>>newcart', newcart);
      return {cartAr: [...newcart], totalprice: newtotal};

    default:
      return state;
  }
};

export default cartReducer;
