import ICategory from "./ICategory";

interface IProduct {
  _id?: string;
  productName: string;
  productDescription?: string;
  price?: number;
  weight?: number;
  stock?: number;
  categoryID: string | ICategory;
  imageURL?: string;
  image?: string; // For file upload
  createdAt?: Date;
  isHot?: boolean;
}

export default IProduct;
