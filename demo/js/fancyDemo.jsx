import React from 'react/addons';
import ariaTabPanel from '../../src/ariaTabPanel';

const { CSSTransitionGroup } = React.addons;

class FancyDemo extends React.Component {
  componentWillMount() {
    this.ariaTabPanel = ariaTabPanel();
  }

  render() {
    const { Tab, TabList, TabPanel } = this.ariaTabPanel;
    return (
      <div>
        <TabList>
          <ul className='FancyTabs-tablist'>
            <li className='FancyTabs-tablistItem'>
              <Tab tabId='1' className='FancyTabs-tab'>
                {demoTab.bind(null, (
                  <div>
                    <span className='FancyTabs-tabIcon FancyTabs-tabIcon--map' />
                    <span className='FancyTabs-tabText'>
                      Maps
                    </span>
                  </div>
                ))}
              </Tab>
            </li>
            <li className='FancyTabs-tablistItem'>
              <Tab tabId='2' className='FancyTabs-tab'>
                {demoTab.bind(null, (
                  <div>
                    <span className='FancyTabs-tabIcon FancyTabs-tabIcon--megaphone' />
                    <span className='FancyTabs-tabText'>
                      Megaphones
                    </span>
                  </div>
                ))}
              </Tab>
            </li>
            <li className='FancyTabs-tablistItem'>
              <Tab tabId='3' className='FancyTabs-tab'>
                {demoTab.bind(null, (
                  <div>
                    <span className='FancyTabs-tabIcon FancyTabs-tabIcon--trophy' />
                    <span className='FancyTabs-tabText'>
                      Trophies
                    </span>
                  </div>
                ))}
              </Tab>
            </li>
          </ul>
        </TabList>
        <div className='FancyTabs-panel'>
          <TabPanel tabId='1'>
            <div className='FancyTabs-panelInner'>
              Lorem <a href='#'>ipsum</a> dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </TabPanel>
          <TabPanel tabId='2'>
            <div className='FancyTabs-panelInner'>
              Ut <a href='#'>enim</a> ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>
          </TabPanel>
          <TabPanel tabId='3'>
            <div className='FancyTabs-panelInner'>
              Duis <a href='#'>aute</a> irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </TabPanel>
        </div>
      </div>
    );
  }
}

React.render(
  <FancyDemo />,
  document.getElementById('fancy-demo')
);

function demoTab(content, tabState) {
  let cl = 'FancyTabs-tabInner';
  if (tabState.isActive) cl += ' is-active';
  return (
    <div className={cl}>
      {content}
    </div>
  );
}
