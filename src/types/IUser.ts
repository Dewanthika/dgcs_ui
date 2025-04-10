import UserRoleEnum from "../constant/userRoleEnum";
import UserStatusEnum from "../constant/userStatusEnum";

interface IUser {
  _id?: string;

  fName: string;
  lName: string;
  email: string;
  phone: string;
  
  DOB: string;

  address: string;
  city: string;
  district: string;
  postal_code: string;

  userType: UserRoleEnum;
  status: UserStatusEnum;

  password: string;
  passwordConfirm?: string;

  companyName?: string;
  businessRegNo?: string;
  contactPerson?: string;
  businessRegImage?: string; 
}

export default IUser;
