export interface CalendlyQuestionAnswer {
  question: string;
  answer: string;
}

export interface CalendlyPayload {
  event_uri: string;
  name: string;
  email: string;
  start_time: string;
  questions_and_answers?: CalendlyQuestionAnswer[];
}

export interface CalendlyEvent {
  event: string;
  payload: CalendlyPayload;
}
