import React, { Activity, type ReactNode } from 'react';

interface ActivityViewProps {
  /** The content to be rendered */
  children: ReactNode;
  /**
   * If true, the content is visible (active).
   * If false, the content is hidden but keeps its state.
   */
  isActive: boolean;
}

/**
 * ActivityView component using React's Activity API
 * Allows content to be hidden without losing state
 *
 * @param {ActivityViewProps} props - Component props
 * @returns {React.ReactElement} Component wrapping the content in an Activity
 */
const ActivityView = ({ children, isActive }: ActivityViewProps): React.ReactElement => {
  return <Activity mode={isActive ? 'visible' : 'hidden'}>{children}</Activity>;
};

export default ActivityView;
