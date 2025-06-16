// components/StripeButton.js
'use client';

export default function StripeButton() {
  return (
    <>
      <script async src="https://js.stripe.com/v3/buy-button.js"></script>
      <div className="stripe-button-container">
        <stripe-buy-button
          buy-button-id="buy_btn_1RaSlCE2shKTNR9MbQSGVUMW"
          publishable-key="pk_live_51P8c4AE2shKTNR9MVARQB4La2uYMMc2shlTCcpcg8EI6MqqPV1uN5uj6UbB5mpfReRKd4HL2OP1LoF17WXcYYeB000Ot1l847E"
        />
      </div>
      <style jsx>{`
        .stripe-button-container {
          margin: 20px 0;
          display: flex;
          justify-content: center;
        }
        stripe-buy-button {
          max-width: 100%;
        }
      `}</style>
    </>
  );
}