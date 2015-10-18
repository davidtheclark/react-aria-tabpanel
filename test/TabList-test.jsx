import test from 'tape';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import TabList from '../src/TabList';

test('TabList creation with only required props', t => {
  const element = ReactTestUtils.renderIntoDocument(
    <TabList>
      <div>foo</div>
    </TabList>
  );
  const node = ReactDOM.findDOMNode(element);

  t.equal(node.tagName.toLowerCase(), 'div');
  t.notOk(node.getAttribute('id'));
  t.notOk(node.getAttribute('class'));
  t.equal(node.getAttribute('role'), 'tablist');
  t.equal(node.firstChild.tagName.toLowerCase(), 'div');
  t.equal(node.firstChild.innerHTML, 'foo');

  t.end();
});

test('TabList creation with all props', t => {
  const element = ReactTestUtils.renderIntoDocument(
    <TabList
      id='bar'
      className='baz'
      tag='ul'
    >
      <p>foo</p>
      <p>foofoo</p>
    </TabList>
  );
  const node = ReactDOM.findDOMNode(element);

  t.equal(node.tagName.toLowerCase(), 'ul');
  t.equal(node.getAttribute('id'), 'bar');
  t.equal(node.getAttribute('class'), 'baz');
  t.equal(node.getAttribute('role'), 'tablist');
  t.equal(node.children.length, 2);
  t.equal(node.firstChild.tagName.toLowerCase(), 'p');
  t.equal(node.firstChild.innerHTML, 'foo');
  t.equal(node.children[1].tagName.toLowerCase(), 'p');
  t.equal(node.children[1].innerHTML, 'foofoo');

  t.end();
});
