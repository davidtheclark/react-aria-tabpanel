import AriaTabPanel from '..';
import test from 'tape';

test('AriaTabPanel is expected object', t => {
  t.deepEqual(Object.keys(AriaTabPanel), ['Tab', 'TabList', 'TabPanel', 'Wrapper']);
  t.end();
});
