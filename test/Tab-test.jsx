import test from 'tape';
import sinon from 'sinon';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import MockWrapper from './MockWrapper';
import Tab from '../src/Tab';

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
  const wrapper = ReactTestUtils.renderIntoDocument(
    <MockWrapper mockManager={manager}>
      <Tab tabId='foo'>
        bar
      </Tab>
    </MockWrapper>
  );
  const tab = ReactTestUtils.findRenderedComponentWithType(wrapper, Tab);
  const tabNode = ReactDOM.findDOMNode(tab);

  t.deepEqual(manager.tabs, [{
    element: tab,
    node: tabNode,
    tabId: 'foo',
  }]);
  t.equal(manager.activeTabId, 'foo');

  t.equal(tabNode.tagName.toLowerCase(), 'div');
  t.notOk(tabNode.getAttribute('id'));
  t.notOk(tabNode.getAttribute('class'));
  t.notOk(tabNode.getAttribute('style'));
  t.equal(tabNode.getAttribute('tabindex'), '0');
  t.equal(tabNode.getAttribute('role'), 'tab');
  t.equal(tabNode.getAttribute('aria-controls'), 'foo');
  t.equal(tabNode.innerHTML, 'bar');

  t.end();
});

test('Tab with all props and element child', t => {
  const manager = mockManager();
  const wrapper = ReactTestUtils.renderIntoDocument(
    <MockWrapper mockManager={manager}>
      <Tab
        manager={manager}
        tabId='foo'
        className='bar'
        tag='li'
        id='hooha'
        style={{ top: '1em' }}
      >
        <div>goat</div>
      </Tab>
    </MockWrapper>
  );
  const tab = ReactTestUtils.findRenderedComponentWithType(wrapper, Tab);
  const tabNode = ReactDOM.findDOMNode(tab);

  t.deepEqual(manager.tabs, [{
    element: tab,
    node: tabNode,
    tabId: 'foo',
  }]);
  t.equal(manager.activeTabId, 'foo');

  t.equal(tabNode.tagName.toLowerCase(), 'li');
  t.equal(tabNode.getAttribute('id'), 'hooha');
  t.equal(tabNode.getAttribute('class'), 'bar');
  t.equal(tabNode.getAttribute('style').replace(/[ ;]/g, ''), 'top:1em');
  t.equal(tabNode.getAttribute('tabindex'), '0');
  t.equal(tabNode.getAttribute('role'), 'tab');
  t.equal(tabNode.getAttribute('aria-controls'), 'foo');
  t.equal(tabNode.children.length, 1);
  t.equal(tabNode.firstChild.tagName.toLowerCase(), 'div');
  t.equal(tabNode.firstChild.innerHTML, 'goat');

  t.end();
});

test('Tab that is not first to register, is not active', t => {
  const manager = mockManager();
  manager.tabs.push({ tabId: 'prior' });
  manager.activeTabId = 'prior';
  const wrapper = ReactTestUtils.renderIntoDocument(
    <MockWrapper mockManager={manager}>
      <Tab tabId='foo'>
        bar
      </Tab>
    </MockWrapper>
  );
  const tab = ReactTestUtils.findRenderedComponentWithType(wrapper, Tab);
  const tabNode = ReactDOM.findDOMNode(tab);

  t.deepEqual(manager.tabs, [{ tabId: 'prior' }, {
    element: tab,
    node: tabNode,
    tabId: 'foo',
  }]);
  t.equal(manager.activeTabId, 'prior');

  t.equal(tabNode.tagName.toLowerCase(), 'div');
  t.notOk(tabNode.getAttribute('id'));
  t.notOk(tabNode.getAttribute('class'));
  t.notOk(tabNode.getAttribute('style'));
  t.equal(tabNode.getAttribute('tabindex'), '-1');
  t.equal(tabNode.getAttribute('role'), 'tab');
  t.equal(tabNode.getAttribute('aria-controls'), 'foo');
  t.equal(tabNode.innerHTML, 'bar');

  t.end();
});

test('Active Tab with a function child', t => {
  const manager = mockManager();
  const child = sinon.spy();
  ReactTestUtils.renderIntoDocument(
    <MockWrapper mockManager={manager}>
      <Tab tabId='foo'>
        {child}
      </Tab>
    </MockWrapper>
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
    <MockWrapper mockManager={manager}>
      <Tab tabId='foo'>
        {child}
      </Tab>
    </MockWrapper>
  );

  t.ok(child.calledOnce);
  t.deepEqual(child.getCall(0).args, [{ isActive: false }]);

  t.end();
});

test('Tab click on first tab', t => {
  const manager = mockManager();
  const wrapper = ReactTestUtils.renderIntoDocument(
    <MockWrapper mockManager={manager}>
      <Tab tabId='foo'>
        bar
      </Tab>
    </MockWrapper>
  );
  const tab = ReactTestUtils.findRenderedComponentWithType(wrapper, Tab);
  const tabNode = ReactDOM.findDOMNode(tab);

  ReactTestUtils.Simulate.click(tabNode);
  t.ok(manager.changeTab.calledOnce);
  t.deepEqual(manager.changeTab.getCall(0).args, [0]);

  t.end();
});

test('Tab click on second tab', t => {
  const manager = mockManager();
  manager.tabs.push({ tabId: 'prior' });
  const wrapper = ReactTestUtils.renderIntoDocument(
    <MockWrapper mockManager={manager}>
      <Tab tabId='foo'>
        bar
      </Tab>
    </MockWrapper>
  );
  const tab = ReactTestUtils.findRenderedComponentWithType(wrapper, Tab);
  const tabNode = ReactDOM.findDOMNode(tab);

  ReactTestUtils.Simulate.click(tabNode);
  t.ok(manager.changeTab.calledOnce);
  t.deepEqual(manager.changeTab.getCall(0).args, [1]);

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
  const wrapper = ReactTestUtils.renderIntoDocument(
    <MockWrapper mockManager={manager}>
      <Tab tabId='foo'>
        bar
      </Tab>
    </MockWrapper>
  );
  const tab = ReactTestUtils.findRenderedComponentWithType(wrapper, Tab);
  const tabNode = ReactDOM.findDOMNode(tab);

  ReactTestUtils.Simulate.keyDown(tabNode, enterEvent);
  t.notOk(enterEvent.preventDefault.called);
  t.notOk(manager.changePrev.called);
  t.notOk(manager.changeNext.called);

  ReactTestUtils.Simulate.keyDown(tabNode, leftEvent);
  t.ok(leftEvent.preventDefault.called);
  t.ok(manager.changePrev.calledOnce);
  t.notOk(manager.changeNext.called);

  ReactTestUtils.Simulate.keyDown(tabNode, upEvent);
  t.ok(upEvent.preventDefault.called);
  t.ok(manager.changePrev.calledTwice);
  t.notOk(manager.changeNext.called);

  ReactTestUtils.Simulate.keyDown(tabNode, rightEvent);
  t.ok(rightEvent.preventDefault.called);
  t.ok(manager.changePrev.calledTwice);
  t.ok(manager.changeNext.calledOnce);

  ReactTestUtils.Simulate.keyDown(tabNode, downEvent);
  t.ok(downEvent.preventDefault.called);
  t.ok(manager.changePrev.calledTwice);
  t.ok(manager.changeNext.calledTwice);

  t.end();
});
