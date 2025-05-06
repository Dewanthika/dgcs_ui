interface ICourier {
  serviceCompany: string;
  firstKGCost?: number;
  extraKGCost?: number;
  status?: "Active" | "Inactive";
}

export default ICourier;
