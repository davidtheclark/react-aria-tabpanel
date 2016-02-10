import React from 'react';
import ReactDOM from 'react-dom';
import { Wrapper, Tab, TabList, TabPanel} from '../../src';

class StatefulDemo extends React.Component {
  render() {
    return (
      <Wrapper>
        <TabList>
          <ul className='Tabs-tablist'>
            <li className='Tabs-tablistItem'>
              <Tab tabId='t1' className='Tabs-tab'>
                {demoTab.bind(null, 'one')}
              </Tab>
            </li>
            <li className='Tabs-tablistItem'>
              <Tab tabId='t2' className='Tabs-tab'>
                {demoTab.bind(null, 'two')}
              </Tab>
            </li>
            <li className='Tabs-tablistItem'>
              <Tab tabId='t3' className='Tabs-tab'>
                {demoTab.bind(null, 'three')}
              </Tab>
            </li>
          </ul>
        </TabList>
        <div className='Tabs-panel'>
          <TabPanel tabId='t1'>
            Lorem <a href='#'>ipsum</a> dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </TabPanel>
          <TabPanel tabId='t2'>
            Ut <a href='#'>enim</a> ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </TabPanel>
          <TabPanel tabId='t3'>
            Duis <a href='#'>aute</a> irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </TabPanel>
        </div>
      </Wrapper>
    );
  }
}

ReactDOM.render(
  <StatefulDemo />,
  document.getElementById('stateful-demo')
);

function demoTab(content, tabState) {
  let cl = 'Tabs-tabInner';
  if (tabState.isActive) cl += ' is-active';
  return (
    <div className={cl}>
      {content}
    </div>
  );
}
