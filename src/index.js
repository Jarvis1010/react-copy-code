import React from 'react';
import ReactDOM from 'react-dom';
import hljs from 'highlight.js';
import styled from 'styled-components';
import icon from './clipboardIcon';

const baseStyle = `
  & .clipWrapper{
    display:flex;
    flex-flow:column;
    & pre{
      margin-top:0;
    }
    & button{
      max-width:150px;
      height:auto;
      border:none;
      padding-bottom:0;
      display:flex;
      align-items:center;
      & *{
        margin:0 2px;
        fill:currentColor
      }
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
    this.updateComponent();
  }

  componentDidUpdate() {
    this.updateComponent();
  }

  updateComponent() {
    this.codeToClipboard();
    if (this.props.highlight) {
      this.highlightCode();
    }
  }

  highlightCode() {
    const domNode = ReactDOM.findDOMNode(this);
    let nodes = domNode.querySelectorAll('pre code');
    nodes.forEach(node => {
      hljs.highlightBlock(node);
    });
  }

  codeToClipboard() {
    const domNode = ReactDOM.findDOMNode(this);
    let nodes = domNode.querySelectorAll('pre');
    nodes.forEach(node => {
      const newNode = this.createNewNode(node);
      const parent = node.parentNode;
      parent.replaceChild(newNode, node);
    });
  }

  createNewNode(node) {
    const button = document.createElement('button');
    const div = document.createElement('div');
    const span = document.createElement('span');
    div.className = 'clipWrapper';
    span.innerText = 'Copy to Clipboard';
    button.innerHTML = icon;
    button.appendChild(span);
    button.setAttribute('onclick', `copyToClipBoard(this)`);
    div.appendChild(button);
    div.appendChild(node.cloneNode(true));
    return div;
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

CodeToClipboard.defaultProps = {
  children: null,
  element: null,
  innerHtml: false,
  highlight: false,
};

export default CodeToClipboard;
