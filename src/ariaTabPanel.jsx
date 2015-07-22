import React from 'react';
import Manager from './Manager';
import Tab from './Tab';
import TabList from './TabList';
import TabPanel from './TabPanel';

export default function(options) {
  const manager = new Manager(options);
  return {
    Tab: class TabWrapper extends React.Component {
      render() {
        return <Tab manager={manager} {...this.props} />;
      }
    },
    TabList: class TabListWrapper extends React.Component {
      render() {
        return <TabList manager={manager} {...this.props} />;
      }
    },
    TabPanel: class TabPanelWrapper extends React.Component {
      render() {
        return <TabPanel manager={manager} {...this.props} />;
      }
    },
  };
}
