import { PackState } from '../../interface';
import { CreatePackSteps } from '../../types';

export interface CreatePackProps {
  confirm: (step?: CreatePackSteps) => void;
  setPackState: (values: Partial<PackState>) => void;
}
