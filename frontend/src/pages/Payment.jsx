import axios from "axios";
import { API } from "../utils/api";

export default function Payment() {
  const pay = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      `${API}/payment/create`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://securegw-stage.paytm.in/order/process";

    form.innerHTML = `
      <input name="mid" value="${res.data.mid}" />
      <input name="orderId" value="${res.data.orderId}" />
      <input name="txnToken" value="${res.data.txnToken}" />
    `;

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={pay}
        className="bg-black text-white px-8 py-4 rounded-xl"
      >
        Buy Premium ₹199
      </button>
    </div>
  );
}
