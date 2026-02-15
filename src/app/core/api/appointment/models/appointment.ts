export interface Appointment {
  appointmentId: number;
  userFullName: string;
  appointmentDateTime: string; status: string
}

export interface CreateAppointment {
  selectedDate: string;
}

// Define an interface for the feedback response
export interface FeedbackPayload {
  rate1: number
  rate2: number
  rate3: number
  rate4: number
  comment: string
}
export interface FeedBackResponse {
  id: number
  modelId: any
  userId: number
  customerId: number
  appointmentDate: string
  c4CId: any
  status: string
  type: string
  feedbackMessage: any
  rating: any
  zoomStartUrl: string
  zoomMeetingId: string
  zoomUrl: string
  startTime: string
  endTime: string
  rate1: number
  rate2: number
  rate3: number
  rate4: number
  comment: string
}
