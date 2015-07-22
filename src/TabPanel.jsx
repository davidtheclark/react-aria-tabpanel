import React, { PropTypes } from 'react';

export default class TabPanel extends React.Component {
  componentWillMount() {
    const { manager, tabId } = this.props;
    const managedIndex = manager.tabPanels.push({
      tabId,
      element: this,
    }) - 1;
    if (!manager.openTab && managedIndex === 0) {
      manager.openTab = tabId;
    }
  }

  render() {
    const props = this.props;
    const isActive = props.manager.activeTab !== props.tabId;

    return React.createElement(props.tag, {
      className: props.className,
      id: props.id,
    }, kids);
  }
}

TabPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.function,
    PropTypes.string,
  ]).isRequired,
  tabId: PropTypes.string.isRequired,
  manager: PropTypes.object.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  tag: PropTypes.string,
};

TabPanel.defaultProps = {
  tag: 'div',
};
