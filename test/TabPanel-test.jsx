import test from 'tape';
import sinon from 'sinon';
import React from 'react/addons';
import TabPanel from '../src/TabPanel';

const ReactTestUtils = React.addons.TestUtils;

function mockManager() {
  return {
    tabPanels: [],
    activeTabId: null,
    moveFocusCurrent: sinon.spy(),
  };
}

test('TabPanel creation with only required props and a string child', t => {
  const manager = mockManager();
  const element = ReactTestUtils.renderIntoDocument(
    <TabPanel
      manager={manager}
      tabId='foo'
    >
      bar
    </TabPanel>
  );
  const node = React.findDOMNode(element);

  t.deepEqual(manager.tabPanels, [{ element, tabId: 'foo' }]);
  t.equal(manager.activeTabId, 'foo');

  t.equal(node.tagName, 'DIV');
  t.equal(node.getAttribute('id'), 'foo');
  t.notOk(node.getAttribute('class'));
  t.equal(node.getAttribute('role'), 'tabpanel');
  t.equal(node.getAttribute('aria-hidden'), 'false');
  t.equal(node.innerHTML, 'bar');

  t.end();
});

test('TabPanel creation with all possible props and an element child', t => {
  const manager = mockManager();
  const element = ReactTestUtils.renderIntoDocument(
    <TabPanel
      manager={manager}
      tabId='foo'
      className='bar'
      tag='section'
    >
      <div>hooha</div>
    </TabPanel>
  );
  const node = React.findDOMNode(element);

  t.deepEqual(manager.tabPanels, [{ element, tabId: 'foo' }]);
  t.equal(manager.activeTabId, 'foo');

  t.equal(node.tagName, 'SECTION');
  t.equal(node.getAttribute('id'), 'foo');
  t.equal(node.getAttribute('class'), 'bar');
  t.equal(node.getAttribute('role'), 'tabpanel');
  t.equal(node.getAttribute('aria-hidden'), 'false');
  t.equal(node.children.length, 1);
  t.equal(node.firstChild.tagName, 'DIV');
  t.equal(node.firstChild.innerHTML, 'hooha');

  t.end();
});

test('TabPanel that is not first to register, is not active', t => {
  const manager = mockManager();
  manager.tabPanels.push({ tabId: 'prior' });
  manager.activeTabId = 'prior';
  const element = ReactTestUtils.renderIntoDocument(
    <TabPanel
      manager={manager}
      tabId='foo'
    >
      bar
    </TabPanel>
  );
  const node = React.findDOMNode(element);

  t.deepEqual(manager.tabPanels, [{ tabId: 'prior' }, { element, tabId: 'foo' }]);
  t.equal(manager.activeTabId, 'prior');

  t.equal(node.tagName, 'DIV');
  t.equal(node.getAttribute('id'), 'foo');
  t.equal(node.getAttribute('aria-hidden'), 'true');
  t.equal(node.children.innerHTML, undefined);

  t.end();
});

test('Active TabPanel with a function child', t => {
  const child = sinon.spy();
  ReactTestUtils.renderIntoDocument(
    <TabPanel
      manager={mockManager()}
      tabId='foo'
    >
      {child}
    </TabPanel>
  );

  t.ok(child.calledOnce);
  t.deepEqual(child.getCall(0).args, [{ isActive: true }]);

  t.end();
});

test('Inactive TabPanel with a function child', t => {
  const manager = mockManager();
  manager.tabPanels.push({ tabId: 'prior' });
  manager.activeTabId = 'prior';
  const child = sinon.spy();
  ReactTestUtils.renderIntoDocument(
    <TabPanel
      manager={manager}
      tabId='foo'
    >
      {child}
    </TabPanel>
  );

  t.ok(child.calledOnce);
  t.deepEqual(child.getCall(0).args, [{ isActive: false }]);

  t.end();
});

test('TabPanel keydown', t => {
  const ctrlUpEvent = {
    key: 'ArrowUp',
    ctrlKey: true,
    preventDefault: sinon.spy(),
  };
  const upEvent = {
    key: 'ArrowUp',
    ctrlKey: false,
    preventDefault: sinon.spy(),
  };
  const manager = mockManager();
  const element = ReactTestUtils.renderIntoDocument(
    <TabPanel
      manager={manager}
      tabId='foo'
    >
      foo
    </TabPanel>
  );
  const node = React.findDOMNode(element);

  ReactTestUtils.Simulate.keyDown(node, upEvent);
  t.notOk(manager.moveFocusCurrent.called);
  t.notOk(upEvent.preventDefault.called);

  ReactTestUtils.Simulate.keyDown(node, ctrlUpEvent);
  t.ok(manager.moveFocusCurrent.called);
  t.ok(ctrlUpEvent.preventDefault.called);

  t.end();
});
