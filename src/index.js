import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const baseStyle = `
  & .clipWrapper{
    display:flex;
    flex-flow:column;
    & button{
      max-width:100px;
    }
  }
`;

class CodeToClipboard extends React.Component {
  componentDidMount() {
    window.copyToClipBoard = node => {
      const text = node.parentNode.querySelector('code').innerText;
      let textarea = document.createElement('textarea');
      textarea.id = 't';
      textarea.style.height = 0;
      document.body.appendChild(textarea);
      textarea.value = text;
      let selector = document.querySelector('#t');
      selector.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    };
    this.codeToClipboard();
  }

  componentDidUpdate() {
    this.codeToClipboard();
  }

  codeToClipboard() {
    const domNode = ReactDOM.findDOMNode(this);
    let nodes = domNode.querySelectorAll('pre');
    nodes.forEach(node => {
      const parent = node.parentNode;
      const button = document.createElement('button');
      const div = document.createElement('div');
      div.className = 'clipWrapper';
      button.innerText = 'Copy to Clipboard';
      button.setAttribute('onclick', `copyToClipBoard(this)`);
      div.appendChild(button);
      div.appendChild(node.cloneNode(true));
      parent.replaceChild(div, node);
    });
  }

  render() {
    const { children, element, innerHTML } = this.props;
    let Element = element
      ? styled[element]`${baseStyle}`
      : styled.div`${baseStyle}`;

    if (innerHTML) {
      return <Element dangerouslySetInnerHTML={{ __html: children }} />;
    } else {
      return <Element>{children}</Element>;
    }
  }
}

export default CodeToClipboard;
