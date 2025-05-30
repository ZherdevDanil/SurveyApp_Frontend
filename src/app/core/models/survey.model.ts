import { Question } from './question.model';

export interface Survey {
  id: number;
  title: string;
  description: string;
  requireAuth: boolean;
  public: boolean;
  questions: Question[]; 
  isActive:boolean;
  activeFrom:string;
  activeUntil:string;

}
