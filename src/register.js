import React from 'react';
import { AddonPanel } from '@storybook/components';
import { addons, types } from '@storybook/addons';
// console.log(types);
// TAB: "tab"
// PANEL: "panel"
// TOOL: "tool"
// PREVIEW: "preview"
// NOTES_ELEMENT: "notes-element"
import Panel from './Panel';

addons.register('dbp/htmlDocumentMarkup', () => {
  addons.add('markup/panel', {
    title: 'htmlDocument',
    type: types.PANEL,
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <Panel />
      </AddonPanel>
    ),
  });
});
