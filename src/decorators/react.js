import React, { useEffect } from 'react';
import { Node } from 'global';
import { addons, makeDecorator } from '@storybook/addons';
import { EVENT_CODE_RECEIVED } from '../shared';
import { parameters } from '.';

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

const ReactWrapper = ({ setCode, children }) => {
  let wrapperRef = React.createRef();
  useEffect(() => {
    setCode(wrapperRef.current.innerHTML);
  });
  return <div ref={wrapperRef}>{children}</div>;
};

const HtmlWrapper = ({ srcDoc }) => {
  return <div style={{position:'absolute',top:0,left:0,right:0,bottom:0}}>
            <iframe style={{width:'100%',height:'100%'}} frameBorder={0} marginHeight={0} marginHeight={0} allowFullScreen={true} scrolling='yes' srcDoc={srcDoc}></iframe>
         </div>;
};

export const withHTMLDOC = makeDecorator({
  ...parameters,
  wrapper: (getStory, context, { options = {} }) => {

    const channel = addons.getChannel();
    const element = getStory();

    if(React.isValidElement(element)){
      return (
        <ReactWrapper
          setCode={html => {
            channel.emit(EVENT_CODE_RECEIVED, { html, options });
          }}
        >
          {element}
        </ReactWrapper>
      );
    }else{
      let html
      if (typeof element === 'string') {
        html = element;
      } else if (element instanceof Node) {
        html = element.outerHTML;
      }
      channel.emit(EVENT_CODE_RECEIVED, { html, options });
      return <HtmlWrapper srcDoc={html}/>;
    }
  },
});

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}
