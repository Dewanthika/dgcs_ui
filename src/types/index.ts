// Product types
export interface Product {
  id: number;
  productID: string;
  productName: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  categoryID: string;
  productDescription: string;
  imageUrl: string;
  weight: number;
  createdAt: string;
  uploadedAt: string;
  stock: number;
}

export interface ProductFormData {
  productName: string;
  price: string;
  categoryID: string;
  productID: string;
  productDescription: string;
  images: File[];
  weight: string;
  createdAt: string;
  uploadedAt: string;
  stock: string;
  isHot?: boolean;
}

// Inventory types
export interface Inventory {
  id: number;
  inventoryID: string;
  productID: number;
  productName: string;
  totalQty: number;
  usedTime: string;
  damageQty: number;
  updatedAt: string;
  reorderQty: number;
  minThreshold: number;
  maxThreshold: number;
  category: string;
  price: number;
  imageUrl: string;
}

// Order types
export interface OrderItem {
  orderItemID: string;
  productID: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  orderID: string;
  userID: string;
  customerName: string;
  contact: string;
  deliveryAddress: string;
  orderWeight: number;
  deliveryCharge: number;
  orderType: string;
  paymentMethod: string;
  orderStatus: string;
  totalAmount: number;
  orderDate: string;
  orderItems: OrderItem[];
}

// Company types
export interface Company {
  id: number;
  companyID: string;
  cmpName: string;
  cmpPhone: string;
  cmpAddress: string;
  billRefNo: string;
  paymentTerms: string;
  creditLimit: string;
}
