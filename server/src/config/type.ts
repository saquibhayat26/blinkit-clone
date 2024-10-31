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
