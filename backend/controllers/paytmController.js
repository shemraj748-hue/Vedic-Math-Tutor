import { initiatePayment } from "../config/paytm.js";
import User from "../models/User.js";
import crypto from "crypto";

export const createOrder = async (req, res) => {
  const user = req.user;

  const orderId = "ORDER_" + Date.now();
  const amount = "199.00"; // Premium price

  const paytmData = await initiatePayment(orderId, amount, user._id.toString());

  res.json({
    orderId,
    txnToken: paytmData.body.txnToken,
    amount,
    mid: process.env.PAYTM_MID
  });
};

export const paymentCallback = async (req, res) => {
  const paytmChecksum = req.body.CHECKSUMHASH;
  const isVerifySignature = PaytmChecksum.verifySignature(
    req.body,
    process.env.PAYTM_MERCHANT_KEY,
    paytmChecksum
  );

  if (!isVerifySignature) {
    return res.status(400).send("Checksum mismatch");
  }

  if (req.body.STATUS === "TXN_SUCCESS") {
    const user = await User.findById(req.body.CUST_ID);

    user.plan = "premium";
    user.aiChatsUsed = 0;
    user.premiumExpiry = new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    );

    await user.save();
  }

  res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
};
