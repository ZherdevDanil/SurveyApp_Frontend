import { Option } from "./option.model";

export interface Question {
  id: number;
  text: string;
  type: 'TEXT' | 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';
  position: number;
  options?: Option[];
}
