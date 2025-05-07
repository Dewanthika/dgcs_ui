interface ICompany {
  _id?: string;
  userId: string;
  creditLimit: number;
  discount: number;
  paymentTerms: string;
  status: string;
}

export default ICompany;
