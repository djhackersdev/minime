export interface Tickets {
  freeCar?: {
    validFrom: Date;
    // Valid To cannot be controlled, it is always 14 days after issue date.
  };
  freeContinue?: {
    validFrom: Date;
    validTo: Date;
  };
}
