export function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold text-green-600 mb-2">
          ✅ Order Placed!
        </h2>
        <p className="text-gray-700 mb-4">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
        <a
          href="/my-orders"
          className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          View My Orders
        </a>
      </div>
    </div>
  );
}
