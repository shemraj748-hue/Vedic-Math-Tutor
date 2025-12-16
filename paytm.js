import PaytmChecksum from "paytmchecksum";
import https from "https";

export const initiatePayment = async (orderId, amount, userId) => {
  const paytmParams = {
    body: {
      requestType: "Payment",
      mid: process.env.PAYTM_MID,
      websiteName: "WEBSTAGING",
      orderId: orderId,
      callbackUrl: `${process.env.BASE_URL}/api/payment/callback`,
      txnAmount: {
        value: amount,
        currency: "INR"
      },
      userInfo: {
        custId: userId
      }
    }
  };

  const checksum = await PaytmChecksum.generateSignature(
    JSON.stringify(paytmParams.body),
    process.env.PAYTM_MERCHANT_KEY
  );

  paytmParams.head = { signature: checksum };

  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(paytmParams);

    const options = {
      hostname: "securegw-stage.paytm.in",
      port: 443,
      path: `/theia/api/v1/initiateTransaction?mid=${process.env.PAYTM_MID}&orderId=${orderId}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": postData.length
      }
    };

    let response = "";
    const req = https.request(options, res => {
      res.on("data", chunk => response += chunk);
      res.on("end", () => resolve(JSON.parse(response)));
    });

    req.on("error", err => reject(err));
    req.write(postData);
    req.end();
  });
};
