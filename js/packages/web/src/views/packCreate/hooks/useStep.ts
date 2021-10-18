import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { CreatePackSteps } from '../types';

const useStep = (): {
  step: CreatePackSteps;
  goToNextStep: (nextStep?: CreatePackSteps) => void;
} => {
  const [step, setStep] = useState<CreatePackSteps>(
    CreatePackSteps.SelectItems,
  );
  const history = useHistory();
  const { stepParam }: { stepParam: string } = useParams();

  const goToNextStep = (nextStep?: CreatePackSteps) => {
    const historyNextStep = nextStep === undefined ? step + 1 : nextStep;
    history.push(`/admin/pack/create/${historyNextStep.toString()}`);
  };

  useEffect(() => {
    if (stepParam) {
      return setStep(parseInt(stepParam));
    }

    goToNextStep(CreatePackSteps.SelectItems);
  }, [stepParam]);

  return { step, goToNextStep };
};

export default useStep;
