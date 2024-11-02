export type UserType = {
  _id: string;
  name: string;
  role: string;
  isActivated: boolean;
};

export type CustomerType = UserType & {
  phone: number;
  liveLocation: {
    latitude: number;
    longitude: number;
  };
  address: string;
};

export type DeliveryPartnerType = UserType & {
  email: string;
  password: string;
  branch: string;
};

export type AdminType = UserType & {
  email: string;
  password: string;
};

export type BranchType = {
  _id: string;
  name: string;
  liveLocation: {
    latitude: number;
    longitude: number;
  };
  address: string;
  deliveryPartners: string[];
};

export type CategoryType = {
  _id: string;
  name: string;
  image: string;
};

export type ProductType = {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  discountPrice: number;
  quantity: string;
  category: string;
};

export type CounterType = {
  name: string;
  sequence_value: number;
};

export type OrderType = {
  orderId: string;
  customer: string;
  deliveryPartner: string;
  branch: string;
  products: {
    id: string;
    item: string;
    quantity: number;
  }[];
  deliveryLocation: {
    latitude: number;
    longitude: number;
    address: string;
  };
  pickupLocation: {
    latitude: number;
    longitude: number;
    address: string;
  };
  deliveryPersonLocation: {
    latitude: number;
    longitude: number;
    address: string;
  };
  status: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
};
