interface IProduct {
  _id?: string;
  productName: string;
  productDescription?: string;
  price?: number;
  weight?: number;
  stock?: number;
  categoryID: string;
  imageURL?: string;
  image?: string; // For file upload
  createdAt?: Date;
}

export default IProduct;
