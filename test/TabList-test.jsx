import test from 'tape';
import React from 'react/addons';
import TabList from '../src/TabList';

const ReactTestUtils = React.addons.TestUtils;

test('TabList creation with only required props', t => {
  const element = ReactTestUtils.renderIntoDocument(
    <TabList manager={{}}>
      <div>foo</div>
    </TabList>
  );
  const node = React.findDOMNode(element);

  t.equal(node.tagName, 'DIV');
  t.notOk(node.getAttribute('id'));
  t.notOk(node.getAttribute('class'));
  t.equal(node.getAttribute('role'), 'tablist');
  t.equal(node.firstChild.tagName, 'DIV');
  t.equal(node.firstChild.innerHTML, 'foo');

  t.end();
});

test('TabList creation with all props', t => {
  const element = ReactTestUtils.renderIntoDocument(
    <TabList
      manager={{}}
      id='bar'
      className='baz'
      tag='ul'
    >
      <p>foo</p>
      <p>foofoo</p>
    </TabList>
  );
  const node = React.findDOMNode(element);

  t.equal(node.tagName, 'UL');
  t.equal(node.getAttribute('id'), 'bar');
  t.equal(node.getAttribute('class'), 'baz');
  t.equal(node.getAttribute('role'), 'tablist');
  t.equal(node.children.length, 2);
  t.equal(node.firstChild.tagName, 'P');
  t.equal(node.firstChild.innerHTML, 'foo');
  t.equal(node.children[1].tagName, 'P');
  t.equal(node.children[1].innerHTML, 'foofoo');

  t.end();
});
