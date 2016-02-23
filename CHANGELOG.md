# Changelog

## 4.0.2
- Fix more leftover ES2015 bugs (stupid :(), and fix ESLint config to catch them.
- Change `react` and `react-dom` to `peerDependencies`.

## 4.0.1
- Fix bug caused by leftover ES2015 code.

## 4.0.0
- Add `letterNavigation` option, via prop in `Wrapper`.
- Add `aria-describedby` on `TabPanel`s (pointing to id of their
  corresponding `Tab`).
  - Add `active` props to `Tab` and `TabPanel` for statelessness.
- Remove `tabId` prop from `Tab` and `id` prop from `TabPanel`.
  Now the `TabPanel`'s `tabId` prop should correspond with some `Tab`'s
  `id` prop; and the `TabPanel`'s DOM node will automatically get an
  id attribute of `\`${props.tabId}-panel\``.

## 3.0.3
- Add `aria-selected` property to active tab.

## 3.0.1
- Fix bug in `index.js`.

## 3.0.0
- Add `id` prop to `TabPanel`, and use it for the DOM node's id attribute (rather than `tabId`).
  Intended to push this with 2.0.0, as it is a slight but breaking change.

## 2.0.0
- Upgrade to react 0.14 and its companion react-dom.
- Use React's `context` to simplify the API, which involves adding the `Wrapper` component.
- Add `style` prop to all components.

## 1.0.1
- Fix PropTypes validation of TabPanel.

## 1.0.0
- Initial release.
