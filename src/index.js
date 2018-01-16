import React from 'react';
import ReactDOM from 'react-dom';
import DOM from 'react-dom-factories';

class CodeToClipboard extends React.Component {
  // static defaultProps = {
  //   innerHTML: false,
  //   className: null,
  //   element: null,
  // };

  componentDidMount() {
    this.codeToClipboard();
    // window.copyToClipBoard = e => {
    //     const nodeToCopy = e.parentNode.querySelector('code');
    //     let textarea = document.createElement('textarea');
    //     textarea.id = 't';
    //     textarea.style.height = 0;
    //     document.body.appendChild(textarea);
    //     textarea.value = nodeToCopy.innerText;
    //     let selector = document.querySelector('#t');
    //     selector.select();
    //     document.execCommand('copy');
    //     document.body.removeChild(textarea);
    //   };
  }

  componentDidUpdate() {
    this.codeToClipboard();
  }

  codeToClipboard() {
    const domNode = ReactDOM.findDOMNode(this);
    const nodes = domNode.querySelectorAll('pre');
    nodes.forEach(node => console.log(node));
  }

  render() {
    const { children, className, element, innerHTML } = this.props;
    let Element = element ? DOM[element] : null;

    if (innerHTML) {
      if (!Element) {
        Element = DOM.div;
      }

      return Element(
        {
          dangerouslySetInnerHTML: { __html: children },
          className: className || null,
        },
        null
      );
    } else {
      if (Element) {
        return Element({ className }, children);
      } else {
        return <pre><code className={className}>{children}</code></pre>;
      }
    }
  }
}

export default CodeToClipboard;
