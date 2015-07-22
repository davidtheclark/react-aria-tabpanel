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
            <li className='Tabs-tablistItem'>
              <Tab tabId='1' className='Tabs-tab'>
                {tabState => {
                  let cl = 'Tabs-tabInner Tabs-tabInner--first';
                  if (tabState.isActive) cl += ' is-active';
                  return (
                    <div className={cl}>
                      one
                    </div>
                  );
                }}
              </Tab>
            </li>
            <li className='Tabs-tablistItem'>
              <Tab tabId='2' className='Tabs-tab'>
                {tabState => {
                  let cl = 'Tabs-tabInner';
                  if (tabState.isActive) cl += ' is-active';
                  return (
                    <div className={cl}>
                      two
                    </div>
                  );
                }}
              </Tab>
            </li>
            <li className='Tabs-tablistItem'>
              <Tab tabId='3' className='Tabs-tab'>
                {tabState => {
                  let cl = 'Tabs-tabInner';
                  if (tabState.isActive) cl += ' is-active';
                  return (
                    <div className={cl}>
                      three
                    </div>
                  );
                }}
              </Tab>
            </li>
          </ul>
        </TabList>
        <div className='Tabs-panel'>
          <TabPanel tabId='1'>
            tab panel 1
            <button>inner focusable</button>
          </TabPanel>
          <TabPanel tabId='2'>
            tab panel 2
            <button>inner focusable</button>
          </TabPanel>
          <TabPanel tabId='3'>
            tab panel 3
            <button>inner focusable</button>
          </TabPanel>
        </div>
      </div>
    );
  }
}

React.render(
  <StatefulDemo />,
  document.getElementById('stateful-demo')
);
