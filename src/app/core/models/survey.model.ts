import { Question } from './question.model';

export interface Survey {
  id: number;
  title: string;
  description: string;
  requireAuth: boolean;
  anonymous: boolean;
  questions: Question[]; 
}
