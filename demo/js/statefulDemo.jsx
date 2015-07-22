import React from 'react';
import ariaTabPanel from '../../src/ariaTabPanel';

class StatefulDemo extends React.Component {
  componentWillMount() {
    this.ariaTabPanel = ariaTabPanel();
  }
  render() {
    const { Tab, TabList, TabPanel } = this.ariaTabPanel;
    return (
      <div>
        <TabList>
          <ul>
            <li>
              <Tab tabId='1'>
                one
              </Tab>
            </li>
            <li>
              <Tab tabId='2'>
                two
              </Tab>
            </li>
            <li>
              <Tab tabId='3'>
                three
              </Tab>
            </li>
          </ul>
        </TabList>
        <TabPanel tabId='1'>
          tab panel 1
        </TabPanel>
        <TabPanel tabId='2'>
          tab panel 2
        </TabPanel>
        <TabPanel tabId='3'>
          tab panel 3
        </TabPanel>
      </div>
    );
  }
}

React.render(
  <StatefulDemo />,
  document.getElementById('stateful-demo')
);
