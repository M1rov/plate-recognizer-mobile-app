interface CarOperation {
  is_last: boolean;
  registered_at: string;
  operation: {
    ua: string;
  };
  department: string;
  color: {
    ua: string;
  };
  address: string;
}

export interface CarInfo {
  digits: string;
  vin: string;
  vendor: string;
  model: string;
  model_year: number;
  region: {
    name_ua: string;
  };
  photo_url: string;
  is_stolen: boolean;
  operations: CarOperation[];
}
