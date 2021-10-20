import { CreatePackSteps } from '../../types';

export interface SidebarProps {
  step: CreatePackSteps;
  setStep: (step: CreatePackSteps) => void;
}
