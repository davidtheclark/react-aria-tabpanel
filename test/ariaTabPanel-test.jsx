import test from 'tape';
import React from 'react/addons';
import ariaTabPanel from '../src/ariaTabPanel';
import Tab from '../src/Tab';
import TabList from '../src/TabList';
import TabPanel from '../src/TabPanel';
import Manager from '../src/Manager';

const ReactTestUtils = React.addons.TestUtils;

test('Wrapped Tab component', t => {
  const shallowRenderer = ReactTestUtils.createRenderer();
  const atb = ariaTabPanel();
  const atbTabElement = React.createElement(atb.Tab, {
    foo: 1,
    bar: 2,
    children: 'baz',
  });
  shallowRenderer.render(atbTabElement);
  const rendered = shallowRenderer.getRenderOutput();

  t.equal(rendered.type, Tab);
  t.equal(rendered.props.foo, 1);
  t.equal(rendered.props.bar, 2);
  t.equal(rendered.props.children, 'baz');
  t.ok(rendered.props.manager instanceof Manager);
  t.end();
});

test('Wrapped TabList component', t => {
  const shallowRenderer = ReactTestUtils.createRenderer();
  const atb = ariaTabPanel();
  const child = React.createElement('div', {}, 'foo');
  const atbTabListElement = React.createElement(atb.TabList, {
    foo: 1,
    bar: 2,
    children: child,
  });
  shallowRenderer.render(atbTabListElement);
  const rendered = shallowRenderer.getRenderOutput();

  t.equal(rendered.type, TabList);
  t.equal(rendered.props.foo, 1);
  t.equal(rendered.props.bar, 2);
  t.equal(rendered.props.children, child);
  t.ok(rendered.props.manager instanceof Manager);
  t.end();
});

test('Wrapped TabPanel component', t => {
  const shallowRenderer = ReactTestUtils.createRenderer();
  const atb = ariaTabPanel();
  const child = React.createElement('div', {}, 'foo');
  const atbTabPanelElement = React.createElement(atb.TabPanel, {
    foo: 1,
    bar: 2,
    children: child,
  });
  shallowRenderer.render(atbTabPanelElement);
  const rendered = shallowRenderer.getRenderOutput();

  t.equal(rendered.type, TabPanel);
  t.equal(rendered.props.foo, 1);
  t.equal(rendered.props.bar, 2);
  t.equal(rendered.props.children, child);
  t.ok(rendered.props.manager instanceof Manager);
  t.end();
});
