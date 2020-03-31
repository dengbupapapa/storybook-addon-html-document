import { Node } from 'global';
import { addons, makeDecorator } from '@storybook/addons';
import { parameters } from '.';
import { EVENT_CODE_RECEIVED } from '../shared';
import path from 'path';

let div = document.createElement('div');
div.style.position = 'absolute';
div.style.top = '0';
div.style.left = '0';
div.style.right = '0';
div.style.bottom = '0';

let  iframe = document.createElement('iframe');
iframe.setAttribute('frameborder', 0);
iframe.setAttribute('marginheight', 0);
iframe.setAttribute('marginheight', 0);
iframe.setAttribute('allowfullscreen', true);
iframe.setAttribute('scrolling', 'yes');

iframe.style.width = '100%';
iframe.style.height = '100%';
div.appendChild(iframe);

export const withHTMLDOC = makeDecorator({
  ...parameters,
  wrapper: (getStory, context, { options = {},parameters }) => {

    const channel = addons.getChannel();
    const element = getStory();
    let html;

    if (typeof element === 'string') {
      html = element;
    } else if (element instanceof Node) {
      html = element.outerHTML;
    }

    channel.emit(EVENT_CODE_RECEIVED, { html, options });

    iframe.setAttribute('srcDoc', html);

    return div;
  },
});

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}
