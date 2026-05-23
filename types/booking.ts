export interface CharterInquiry {
  yachtId: string;
  startDate: string;
  endDate: string;
  guestCount: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message?: string;
}

export type BookingStatus =
  | "inquiry"
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";
