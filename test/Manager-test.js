import test from 'tape';
import sinon from 'sinon';
import Manager from '../src/Manager';

function mockManager(options) {
  const manager = new Manager(options);
  manager.activeTabId = manager.activeTabId || 'first';
  const firstTab = {
    tabId: 'first',
    element: { forceUpdate: sinon.spy() },
    node: { focus: sinon.spy() },
  };
  const secondTab = {
    tabId: 'second',
    element: { forceUpdate: sinon.spy() },
    node: { focus: sinon.spy() },
  };
  const firstTabPanel = {
    tabId: 'first',
    element: { forceUpdate: sinon.spy() },
  };
  const secondTabPanel = {
    tabId: 'second',
    element: { forceUpdate: sinon.spy() },
  };
  manager.tabs = [firstTab, secondTab];
  manager.tabPanels = [firstTabPanel, secondTabPanel];

  return manager;
}

test('Manager initialization without options', t => {
  const m = mockManager();
  t.equal(m.currentTabIndex, 0);
  t.equal(m.activeTabId, 'first');
  t.deepEqual(m.options, {});
  t.end();
});

test('Manager initialization with options', t => {
  const onChange = sinon.spy();
  const m = mockManager({
    onChange,
    activeTabId: 'second',
  });
  t.equal(m.currentTabIndex, 0);
  t.equal(m.activeTabId, 'second');
  t.deepEqual(m.options, {
    onChange,
    activeTabId: 'second',
  });
  t.end();
});

test('Manager#moveFocusCurrent', t => {
  const m = mockManager();
  sinon.stub(m, 'moveFocus');

  m.moveFocusCurrent();
  t.ok(m.moveFocus.calledOnce);
  t.deepEqual(m.moveFocus.getCall(0).args, [0]);

  m.currentTabIndex = 2;
  m.moveFocusCurrent();
  t.ok(m.moveFocus.calledTwice);
  t.deepEqual(m.moveFocus.getCall(1).args, [2]);

  t.end();
});

test('Manager#moveFocus', t => {
  const m = mockManager();
  m.moveFocus(0);
  t.ok(m.tabs[0].node.focus.calledOnce);
  m.moveFocus(1);
  t.ok(m.tabs[1].node.focus.calledOnce);
  t.end();
});

test('Manager#changeNext', t => {
  const m = mockManager();
  // Make it three tabs
  m.tabs.push({});
  m.tabPanels.push({});
  sinon.stub(m, 'changeTab');

  t.equal(m.currentTabIndex, 0);
  m.changeNext();
  t.ok(m.changeTab.calledOnce);
  t.deepEqual(m.changeTab.getCall(0).args, [1]);

  m.currentTabIndex = 1;
  m.changeNext();
  t.ok(m.changeTab.calledTwice);
  t.deepEqual(m.changeTab.getCall(1).args, [2]);

  m.currentTabIndex = 2;
  m.changeNext();
  t.ok(m.changeTab.calledThrice);
  t.deepEqual(m.changeTab.getCall(2).args, [0]);

  t.end();
});

test('Manager#changePrev', t => {
  const m = mockManager();
  // Make it three tabs
  m.tabs.push({});
  m.tabPanels.push({});
  sinon.stub(m, 'changeTab');

  t.equal(m.currentTabIndex, 0);
  m.changePrev();
  t.ok(m.changeTab.calledOnce);
  t.deepEqual(m.changeTab.getCall(0).args, [2]);

  m.currentTabIndex = 2;
  m.changePrev();
  t.ok(m.changeTab.calledTwice);
  t.deepEqual(m.changeTab.getCall(1).args, [1]);

  m.currentTabIndex = 1;
  m.changePrev();
  t.ok(m.changeTab.calledThrice);
  t.deepEqual(m.changeTab.getCall(2).args, [0]);

  t.end();
});

test('Manager#changeTab without onChange option', t => {
  const m = mockManager();
  sinon.stub(m, 'moveFocus');

  t.equal(m.currentTabIndex, 0);
  t.equal(m.activeTabId, 'first');

  // Same tab selected again
  m.changeTab(0);
  t.notOk(m.tabPanels[0].element.forceUpdate.called);
  t.notOk(m.tabPanels[1].element.forceUpdate.called);
  t.notOk(m.tabs[0].element.forceUpdate.called);
  t.notOk(m.tabs[1].element.forceUpdate.called);
  t.notOk(m.moveFocus.called);
  t.equal(m.currentTabIndex, 0);
  t.equal(m.activeTabId, 'first');

  // New tab selected
  m.changeTab(1);
  t.ok(m.tabPanels[0].element.forceUpdate.calledOnce);
  t.ok(m.tabPanels[1].element.forceUpdate.calledOnce);
  t.ok(m.tabs[0].element.forceUpdate.calledOnce);
  t.ok(m.tabs[1].element.forceUpdate.calledOnce);
  t.ok(m.moveFocus.calledOnce);
  t.deepEqual(m.moveFocus.getCall(0).args, [1]);
  t.equal(m.currentTabIndex, 1);
  t.equal(m.activeTabId, 'second');

  // Previous tab selected
  m.changeTab(0);
  t.ok(m.tabPanels[0].element.forceUpdate.calledTwice);
  t.ok(m.tabPanels[1].element.forceUpdate.calledTwice);
  t.ok(m.tabs[0].element.forceUpdate.calledTwice);
  t.ok(m.tabs[1].element.forceUpdate.calledTwice);
  t.ok(m.moveFocus.calledTwice);
  t.deepEqual(m.moveFocus.getCall(1).args, [0]);
  t.equal(m.currentTabIndex, 0);
  t.equal(m.activeTabId, 'first');

  t.end();
});
