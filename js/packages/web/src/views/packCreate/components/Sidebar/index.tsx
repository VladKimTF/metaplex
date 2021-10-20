import React from 'react-dom';
import { Steps } from 'antd';

import useWindowDimensions from '../../../../utils/layout';

import { STEPS_TITLES } from './data';
import { SidebarProps } from './interface';
import { memo } from 'react';

const { Step } = Steps;

const Sidebar = ({ step }: SidebarProps) => {
  const { width } = useWindowDimensions();

  return (
    <div className="sidebar-wrapper">
      <Steps
        className="sidebar-steps"
        direction={width < 768 ? 'horizontal' : 'vertical'}
        current={step}
      >
        {Object.entries(STEPS_TITLES).map(([step, title]) => (
          <Step title={title} key={step} />
        ))}
      </Steps>
    </div>
  );
};

export default memo(Sidebar);
