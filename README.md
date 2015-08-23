# react-aria-tabpanel [![Build Status](https://travis-ci.org/davidtheclark/react-aria-tabpanel.svg?branch=master)](https://travis-ci.org/davidtheclark/react-aria-tabpanel)

A React component that helps you build *accessible* tabs, by providing keyboard interactions and ARIA attributes described in [the WAI-ARIA Tab Panel Design Pattern](http://www.w3.org/TR/wai-aria-practices/#tabpanel).

Please check out [the demo](http://davidtheclark.github.io/react-aria-tabpanel/demo/)

## Project Goal

A React component that provides a style- and markup-agnostic foundation for fully accessible tab panels. *You provide the inner elements*: **this module gives you wrapper components that will handle keyboard interactions and ARIA attributes**.

*If you think that this component does not satisfy the ARIA spec of if you know of other ways to make it more accessible, please file an issue.*

**If you like this kind of module (accessible, flexible, unstyled) you should also check out these projects:**
- [react-aria-modal](https://github.com/davidtheclark/react-aria-modal)
- [react-aria-menubutton](https://github.com/davidtheclark/react-aria-menubutton)

## Installation

```
npm install react-aria-tabpanel
```

One dependency: React 0.13x.

## Usage

There are two ways to consume this module:

- with CommonJS
- as a global UMD library

Using CommonJS, for example, you can simply `require()` the module to get the function `ariaTabPanel([options])`, like so:

```js
var ariaTabPanel = require('react-aria-tabpanel');

var myAmt = ariaTabPanel();
```

Using globals/UMD, you must do the following:

- Expose React globally
- Use one of the builds in the `dist/` directory

```html
<script src="react.min.js"></script>
<script src="node_modules/react-aria-menu-button/dist/ariaTabPanel.min.js"></script>
<script>
  var myAmt = ariaTabPanel();
</script>
```

**You *get to* (have to) write your own CSS, your own way!**

### ariaTabPanel([options])

Returns an object with three components: `Tab`, `TabList`, and `TabPanel`. Each of these is documented below.

```js
var myAmt = ariaTabPanel();
var MyAmtTab = myAmt.Tab;
var MyAmtTabList = myAmt.TabList;
var MyAmtTabPanel = myAmt.TabPanel;
```

#### options

All options are optional.

##### onChange

Type: `Function`

A callback to run when the user changes tabs (i.e. clicks a tab or navigates to another with the arrow keys). It will be passed the the newly activated tab's ID.

By default, the tabs maintain state internally. *Use this prop to make the tabs "stateless," and take control yourself.* You can run any arbitrary code when the user performs an action that indicates a tab change (e.g. change your route and update a store, etc.).

##### activeTabId

Type: `String`

Directly tell the tabs which one is active. By default, the first tab provided will be the initially active tab, and from then on the active tab state is managed internally. This prop, then, can be used two ways:

- to give the tabs an initial active tab other than the first, or
- if you have seized control of the state (via an `onChange` function), to continuously tell the tabs which one is active.

## Examples

The code below is from the examples in `demo/`.

```js
import React from 'react';
import ariaTabPanel from 'react-aria-tabpanel';

// This demo lets the tabs manage their own state

class StatefulDemo extends React.Component {
  componentWillMount() {
    this.ariaTabPanel = ariaTabPanel();
  }

  render() {
    const { Tab, TabList, TabPanel } = this.ariaTabPanel;
    return (
      <div>
        <TabList>
          <ul className='Tabs-tablist'>
            <li className='Tabs-tablistItem'>
              <Tab tabId='1' className='Tabs-tab'>
                {demoTab.bind(null, 'one')}
              </Tab>
            </li>
            <li className='Tabs-tablistItem'>
              <Tab tabId='2' className='Tabs-tab'>
                {demoTab.bind(null, 'two')}
              </Tab>
            </li>
            <li className='Tabs-tablistItem'>
              <Tab tabId='3' className='Tabs-tab'>
                {demoTab.bind(null, 'three')}
              </Tab>
            </li>
          </ul>
        </TabList>
        <div className='Tabs-panel'>
          <TabPanel tabId='1'>
            Lorem <a href='#'>ipsum</a> dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </TabPanel>
          <TabPanel tabId='2'>
            Ut <a href='#'>enim</a> ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </TabPanel>
          <TabPanel tabId='3'>
            Duis <a href='#'>aute</a> irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </TabPanel>
        </div>
      </div>
    );
  }
}
```

```js
import React from 'react';
import ariaTabPanel from 'react-aria-tabpanel';

// In this demo, the wrapping component manages the tabs' state

const tabData = [
  {
    title: 'one',
    id: '1',
    content: (
      <div>
        Lorem <a href='#'>ipsum</a> dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </div>
    ),
  },
  {
    title: 'two',
    id: '2',
    content: (
      <div>
        Ut <a href='#'>enim</a> ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </div>
    ),
  },
  {
    title: 'three',
    id: '3',
    content: (
      <div>
        Duis <a href='#'>aute</a> irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
    ),
  },
];

class StatelessDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: '2' };
  }

  componentWillMount() {
    this.ariaTabPanel = ariaTabPanel({
      onChange: this.setTab.bind(this),
      activeTabId: '2',
    });
  }

  setTab(newActiveTabId) {
    this.setState({ activeTab: newActiveTabId });
  }

  render() {
    const { Tab, TabList, TabPanel } = this.ariaTabPanel;
    const { activeTab } = this.state;

    const tabs = tabData.map((t, i) => {
      let innerCl = 'Tabs-tabInner';
      if (t.id === activeTab) innerCl += ' is-active';
      return (
        <li className='Tabs-tablistItem' key={i}>
          <Tab tabId={t.id} className='Tabs-tab'>
            <div className={innerCl}>
              {t.title}
            </div>
          </Tab>
        </li>
      );
    });

    const panels = tabData.map((p, i) => {
      return (
        <TabPanel tabId={p.id} key={i}>
          {p.content}
        </TabPanel>
      );
    });

    return (
      <div>
        <TabList>
          <ul className='Tabs-tablist'>
            {tabs}
          </ul>
        </TabList>
        <div className='Tabs-panel'>
          {panels}
        </div>
      </div>
    );
  }
}
```

## Component API

### `TabList`

Wrap the `Tab`s with a `TabList`.

A `TabList`'s children should React elements.

#### props

*All props are optional.*

##### tag

Type: `String` Default: `'div'`

The HTML tag for this element.

##### id

Type: `String`

An id value.

##### className

Type: `String`

A class value.

### `Tab`

The active tabs is focusable. Inactive tabs are not.

You can switch from one tab to another by clicking with the mouse or using the arrow keys.

A `Tab`'s children may be any of the following:

- A string
- A React element
- A function accepting the following tab-state object:
  ```js
  {
    isActive: Boolean // self-explanatory
  }
  ```

#### props

*All props are optional.*

##### tag

Type: `String` Default: `'div'`

The HTML tag for this element.

##### id

Type: `String`

An id value.

##### className

Type: `String`

A class value.

### `TabPanel`

The content area for your tabs. The active tab panel is visible; the inactive tab panels are not.

A `TabPanels`'s children may be any of the following:

- A string
- A React element
- A function accepting the following panel-state object:
  ```js
  {
    isActive: Boolean // self-explanatory
  }
  ```

#### props

*All props are optional.*

##### tag

Type: `String` Default: `'div'`

The HTML tag for this element.

##### id

Type: `String`

An id value.

##### className

Type: `String`

A class value.
