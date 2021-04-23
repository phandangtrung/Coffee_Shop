const mongoose = require("mongoose");
const {productsSchema} = require("./products");

const ordersSchema = new mongoose.Schema({
  customerName: { type: String, require: false, unique: false },
  customerPhone: { type: String, required: false },
  customerAddress: { type: String, require: false },
  totalPrices: { type: Number, require: false },
  status: { type: Boolean, default: false },
  note: { type: String, required: false },
  createAt: { type: Date, require: false },
  doneAt: { type: Date, require: false },
  productlist:[
    
    {
      _id: false,
      pro: productsSchema, 
      quantity: { type: Number, require: false },
    }
  ],
  // productlist:[
  //   {
  //     pro: productsSchema, 
  //     quantity: { type: Number, require: false },
  //   }
  // ],
  // productlist: [
  //   {
  //     _id: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
  //     name: { type: String, require: true, unique: true },
  //     alias: { type: String, require: false },
  //     size_M: { type: Boolean, default: false },
  //     size_L: { type: Boolean, default: false },
  //     prices: { type: Number, require: false },
  //     description: { type: String, require: false },
  //     imagesProduct: { type: String, require: false },
  //     categoryId: { type: String, required: false },
  //     quantity: { type: Number, require: false },
  //   },
  // ],
  userId: { type: String, required: false },
  shipperId: { type: String, required: false },
});

// const ordersSchema = new mongoose.Schema({
//   customerName: { type: String, require: false, unique: false },
//   customerPhone: { type: String, required: false },
//   customerAddress: { type: String, require: false },
//   totalPrices: { type: Number, require: false },
//   status: { type: Boolean, default: false },
//   note: { type: String, required: false },
//   createAt: { type: Date, require: false },
//   doneAt: { type: Date, require: false },
//   productlist: { type: Array, require: false },
//   userId: { type: String, required: false },
//   shipperId: { type: String, required: false },
// });

module.exports = mongoose.model("Order", ordersSchema);
