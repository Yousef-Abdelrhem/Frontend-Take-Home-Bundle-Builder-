import camerIcon from '../assets/icons/camerIcon.png';
import planIcon from '../assets/icons/planIcon.png';
import sensorsIcon from '../assets/icons/sensorsIcon.png';
import accessoriesIcon from '../assets/icons/accessoriesIcon.png';
import type { Step as StepType } from '../data/catalog';

const STEP_ICON_MAP: Record<StepType['id'], string> = {
  cameras: camerIcon,
  plan: planIcon,
  sensors: sensorsIcon,
  accessories: accessoriesIcon,
};

interface StepIconProps {
  stepId: StepType['id'];
  className?: string;
}

export default function StepIcon({ stepId, className = 'h-8 w-8' }: StepIconProps) {
  return <img src={STEP_ICON_MAP[stepId]} alt="" className={className} />;
}
