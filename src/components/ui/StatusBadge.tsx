interface StatusBadgeProps {
    status: string
    type: "order" | "user" | "inventory" | "payment" | "general"
  }
  
  const StatusBadge = ({ status, type }: StatusBadgeProps) => {
    let colorClass = ""
  
    switch (type) {
      case "order":
        colorClass =
          status === "Delivered"
            ? "bg-green-100 text-green-800"
            : status === "Processing"
              ? "bg-blue-100 text-blue-800"
              : status === "Shipped"
                ? "bg-purple-100 text-purple-800"
                : status === "Cancelled"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
        break
      case "user":
        colorClass =
          status === "active"
            ? "bg-green-100 text-green-800"
            : status === "inactive"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
        break
      case "inventory":
        colorClass =
          status === "In Stock"
            ? "bg-green-100 text-green-800"
            : status === "Low Stock"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
        break
      case "payment":
        colorClass =
          status === "Paid"
            ? "bg-green-100 text-green-800"
            : status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : status === "Failed"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
        break
      case "general":
      default:
        if (status.includes("Admin")) {
          colorClass = "bg-purple-100 text-purple-800"
        } else if (status.includes("Staff")) {
          colorClass = "bg-blue-100 text-blue-800"
        } else if (status.includes("Individual")) {
          colorClass = "bg-green-100 text-green-800"
        } else if (status.includes("Company")) {
          colorClass = "bg-orange-100 text-orange-800"
        } else if (status.toLowerCase().includes("active") || status.toLowerCase().includes("success")) {
          colorClass = "bg-green-100 text-green-800"
        } else if (status.toLowerCase().includes("pending") || status.toLowerCase().includes("warning")) {
          colorClass = "bg-yellow-100 text-yellow-800"
        } else if (status.toLowerCase().includes("error") || status.toLowerCase().includes("fail")) {
         
        //   colorClass = "bg-red-  || status.toLowerCase().includes(\"fail\")) {
          colorClass = "bg-red-100 text-red-800"
        } else {
          colorClass = "bg-blue-100 text-blue-800"
        }
        break
    }
  
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${colorClass}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }
  
  export default StatusBadge
  
  