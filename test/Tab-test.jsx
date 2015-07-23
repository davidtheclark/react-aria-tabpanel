import test from 'tape';
import sinon from 'sinon';
import React from 'react/addons';
import Tab from '../src/Tab';

const ReactTestUtils = React.addons.TestUtils;

function mockManager() {
  return {
    tabs: [],
    activeTabId: null,
    currentTabIndex: -1,
    changeTab: sinon.spy(),
    changePrev: sinon.spy(),
    changeNext: sinon.spy(),
  };
}

test('Tab with only required props and a string child', t => {
  const manager = mockManager();
  const element = ReactTestUtils.renderIntoDocument(
    <Tab
      manager={manager}
      tabId='foo'
    >
      bar
    </Tab>
  );
  const node = React.findDOMNode(element);

  t.deepEqual(manager.tabs, [{
    element,
    node,
    tabId: 'foo',
  }]);
  t.equal(manager.activeTabId, 'foo');

  t.equal(node.tagName, 'DIV');
  t.notOk(node.getAttribute('id'));
  t.notOk(node.getAttribute('class'));
  t.equal(node.getAttribute('tabindex'), '0');
  t.equal(node.getAttribute('role'), 'tab');
  t.equal(node.getAttribute('aria-controls'), 'foo');
  t.equal(node.innerHTML, 'bar');

  t.end();
});

test('Tab with all props and element child', t => {
  const manager = mockManager();
  const element = ReactTestUtils.renderIntoDocument(
    <Tab
      manager={manager}
      tabId='foo'
      className='bar'
      tag='li'
      id='hooha'
    >
      <div>goat</div>
    </Tab>
  );
  const node = React.findDOMNode(element);

  t.deepEqual(manager.tabs, [{
    element,
    node,
    tabId: 'foo',
  }]);
  t.equal(manager.activeTabId, 'foo');

  t.equal(node.tagName, 'LI');
  t.equal(node.getAttribute('id'), 'hooha');
  t.equal(node.getAttribute('class'), 'bar');
  t.equal(node.getAttribute('tabindex'), '0');
  t.equal(node.getAttribute('role'), 'tab');
  t.equal(node.getAttribute('aria-controls'), 'foo');
  t.equal(node.children.length, 1);
  t.equal(node.firstChild.tagName, 'DIV');
  t.equal(node.firstChild.innerHTML, 'goat');

  t.end();
});

test('Tab that is not first to register, is not active', t => {
  const manager = mockManager();
  manager.tabs.push({ tabId: 'prior' });
  manager.activeTabId = 'prior';
  const element = ReactTestUtils.renderIntoDocument(
    <Tab
      manager={manager}
      tabId='foo'
    >
      bar
    </Tab>
  );
  const node = React.findDOMNode(element);

  t.deepEqual(manager.tabs, [{ tabId: 'prior' }, {
    element,
    node,
    tabId: 'foo',
  }]);
  t.equal(manager.activeTabId, 'prior');

  t.equal(node.tagName, 'DIV');
  t.notOk(node.getAttribute('id'));
  t.notOk(node.getAttribute('class'));
  t.equal(node.getAttribute('tabindex'), '-1');
  t.equal(node.getAttribute('role'), 'tab');
  t.equal(node.getAttribute('aria-controls'), 'foo');
  t.equal(node.innerHTML, 'bar');

  t.end();
});

test('Active Tab with a function child', t => {
  const manager = mockManager();
  const child = sinon.spy();
  ReactTestUtils.renderIntoDocument(
    <Tab
      manager={manager}
      tabId='foo'
    >
      {child}
    </Tab>
  );

  t.ok(child.calledOnce);
  t.deepEqual(child.getCall(0).args, [{ isActive: true }]);

  t.end();
});

test('Inactive Tab with a function child', t => {
  const manager = mockManager();
  manager.tabs.push({ tabId: 'prior' });
  manager.activeTabId = 'prior';
  const child = sinon.spy();
  ReactTestUtils.renderIntoDocument(
    <Tab
      manager={manager}
      tabId='foo'
    >
      {child}
    </Tab>
  );

  t.ok(child.calledOnce);
  t.deepEqual(child.getCall(0).args, [{ isActive: false }]);

  t.end();
});

test('Tab click', t => {
  const managerA = mockManager();
  const elementA = ReactTestUtils.renderIntoDocument(
    <Tab
      manager={managerA}
      tabId='foo'
    >
      bar
    </Tab>
  );
  const nodeA = React.findDOMNode(elementA);

  ReactTestUtils.Simulate.click(nodeA);
  t.ok(managerA.changeTab.calledOnce);
  t.deepEqual(managerA.changeTab.getCall(0).args, [0]);

  const managerB = mockManager();
  managerB.tabs.push({ tabId: 'prior' });
  const elementB = ReactTestUtils.renderIntoDocument(
    <Tab
      manager={managerB}
      tabId='foo'
    >
      bar
    </Tab>
  );
  const nodeB = React.findDOMNode(elementB);

  ReactTestUtils.Simulate.click(nodeB);
  t.ok(managerB.changeTab.calledOnce);
  t.deepEqual(managerB.changeTab.getCall(0).args, [1]);

  t.end();
});

test('Tab keydown', t => {
  const upEvent = {
    key: 'ArrowUp',
    preventDefault: sinon.spy(),
  };
  const downEvent = {
    key: 'ArrowDown',
    preventDefault: sinon.spy(),
  };
  const leftEvent = {
    key: 'ArrowLeft',
    preventDefault: sinon.spy(),
  };
  const rightEvent = {
    key: 'ArrowRight',
    preventDefault: sinon.spy(),
  };
  const enterEvent = {
    key: 'Enter',
    preventDefault: sinon.spy(),
  };
  const manager = mockManager();
  const element = ReactTestUtils.renderIntoDocument(
    <Tab
      manager={manager}
      tabId='foo'
    >
      bar
    </Tab>
  );
  const node = React.findDOMNode(element);

  ReactTestUtils.Simulate.keyDown(node, enterEvent);
  t.notOk(enterEvent.preventDefault.called);
  t.notOk(manager.changePrev.called);
  t.notOk(manager.changeNext.called);

  ReactTestUtils.Simulate.keyDown(node, leftEvent);
  t.ok(leftEvent.preventDefault.called);
  t.ok(manager.changePrev.calledOnce);
  t.notOk(manager.changeNext.called);

  ReactTestUtils.Simulate.keyDown(node, upEvent);
  t.ok(upEvent.preventDefault.called);
  t.ok(manager.changePrev.calledTwice);
  t.notOk(manager.changeNext.called);

  ReactTestUtils.Simulate.keyDown(node, rightEvent);
  t.ok(rightEvent.preventDefault.called);
  t.ok(manager.changePrev.calledTwice);
  t.ok(manager.changeNext.calledOnce);

  ReactTestUtils.Simulate.keyDown(node, downEvent);
  t.ok(downEvent.preventDefault.called);
  t.ok(manager.changePrev.calledTwice);
  t.ok(manager.changeNext.calledTwice);

  t.end();
});
