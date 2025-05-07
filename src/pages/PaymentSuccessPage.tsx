import { Link } from "react-router-dom"
import { Check } from "lucide-react"

const PaymentSuccessPage = () => {
  // In a real app, this data would come from your payment processor or API
  const paymentDetails = {
    amount: 10000,
    refNumber: "000085752257",
    paymentTime: "25-02-2023, 13:22:16",
    paymentMethod: "Card",
    senderName: "John Doe",
    orderAmount: 1000000,
    shippingFee: 193.0,
  }

  return (
    <div className="container py-8 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
          <Check className="w-12 h-12 text-green-500" />
        </div>

        {/* Success Message */}
        <h1 className="text-2xl text-gray-700 mb-4">Payment Success!</h1>
        <div className="text-4xl font-bold mb-8">LKR {paymentDetails.amount.toLocaleString()}</div>

        <div className="border-t border-gray-200 w-full max-w-md mx-auto"></div>
      </div>

      {/* Payment Details */}
      {/* <div className="max-w-md mx-auto space-y-6">
        <div className="flex justify-between">
          <div className="text-gray-600">Ref Number</div>
          <div className="font-medium">{paymentDetails.refNumber}</div>
        </div>

        <div className="flex justify-between">
          <div className="text-gray-600">Payment Time</div>
          <div className="font-medium">{paymentDetails.paymentTime}</div>
        </div>

        <div className="flex justify-between">
          <div className="text-gray-600">Payment Method</div>
          <div className="font-medium">{paymentDetails.paymentMethod}</div>
        </div>

        <div className="flex justify-between">
          <div className="text-gray-600">Sender Name</div>
          <div className="font-medium">{paymentDetails.senderName}</div>
        </div>

        <div className="flex justify-between">
          <div className="text-gray-600">Amount</div>
          <div className="font-medium">LKR {paymentDetails.orderAmount.toLocaleString()}</div>
        </div>

        <div className="flex justify-between">
          <div className="text-gray-600">Shipping Fee</div>
          <div className="font-medium">LKR {paymentDetails.shippingFee.toFixed(2)}</div>
        </div>
      </div> */}

      {/* Action Buttons */}
      <div className="mt-12 text-center">
        <Link to="/orders" className="bg-black text-white px-6 py-3 rounded inline-block mr-4">
          View Orders
        </Link>
        <Link to="/shop" className="border border-black px-6 py-3 rounded inline-block">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default PaymentSuccessPage

