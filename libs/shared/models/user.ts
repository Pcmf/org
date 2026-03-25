export interface User {
  id?: string;
  _id?: string;
  name: string;
  isAdmin: boolean;
  email: string;
  phone: string;
  apartment: string;
  street: string;
  zip: string;
  city: string;
  country: string;
  password?: string;
}
