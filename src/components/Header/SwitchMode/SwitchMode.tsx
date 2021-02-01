import { FC } from 'react';
import './SwitchMode.scss';

interface SwitchModeProps {
  onToggle: () => void;
  label: string;
  icon: string;
  classBlock: string;
}

const SwitchMode: FC<SwitchModeProps> = ({ onToggle, label, icon, classBlock: block }): JSX.Element => {
  return (
    <div className={`switch-mode flex flex-ai-c`} onClick={onToggle}>
        <i className={`${icon} switch-mode-icon`} />
        <p className='switch-mode-label'>{label}</p>
    </div>
  )
}

export default SwitchMode;