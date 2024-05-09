const axios = require("axios");
const Payment = require("../../models/payment");
const Order = require("../../models/order");

module.exports = new (class {
  //START PAY
  async startPAy(req, res) {
    const params = {
      merchant_id: "6cded376-3063-11e9-a98e-005056a205be",
      amount: req.body.amount,
      callback_url: process.env.REDIRECT_ADDRESS,
      description: "فروشگاه عسل",
    };
    try {
      const response = await axios.post(process.env.ZARINPA_STRT, params);
      if (response.data.data.code === 100) {
        let newPayment = new Payment({
          resNumber: response.data.data.authority,
          userId: req.user.id,
          orderId: req.body.orderId,
          amount: req.body.amount,
        });
        await newPayment.save();
      }
      return res
        .status(200)
        .json(
          `https://www.zarinpal.com/pg/StartPay/${response.data.data.authority}`
        );
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //CALLBACK TO PAY
  async verifyPay(req, res) {
    try {
      const { Status, Authority } = req.query;
      const payment = await Payment.findOne({ resNumber: Authority });
      if (!payment) {
        console.log("هم چین تراکنشی وجود ندارد");
        return redirect("https://www.yahoo.com");
      }
      if (Status !== "OK") {
        console.log("پرداخت احتمالا توسط کاربر لغو شده است");
        return res.redirect("https://www.google.com");
      }
      const params = {
        merchant_id: "6cded376-3063-11e9-a98e-005056a205be",
        authority: Authority,
        amount: payment.amount,
      };
      const response = await axios.post(
        "https://api.zarinpal.com/pg/v4/payment/verify.json",
        params
      );
      if (response.data.data.code === 100) {
        payment.status = true;
        await payment.save();
        const order = await Order.findOne({ _id: payment.orderId });
        order.payStatus = true;
        console.log("پرداخت شما با موفقیت اننجام شد");
        return res.redirect("http://212.23.201.180:3000");
      }
      console.log("پرداخت شما متاسفانه موفقیت آمیز نبوده است");
      return res.redirect("https://www.google.com");
    } catch (error) {
      res.status(500).json(error);
    }
  }
})();
