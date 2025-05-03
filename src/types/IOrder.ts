interface IAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface IOrderItem {
  product: string;
  quantity: number;
  unitPrice: number;
}

interface IOrder {
  _id: string;
  id?: number; 
  userID: string;
  deliveryAddress: IAddress;
  orderWeight: number;
  deliveryCharge: number;
  orderType: string;
  orderStatus: string;
  orderDate: Date;
  totalAmount: number;
  paymentMethod: string;
  isBulkOrder?: boolean;
  isCredit?: boolean;
  isApproved?: boolean;
  items: IOrderItem[];
}

export default IOrder;
