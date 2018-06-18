import React from "react";
import { renderToString } from "react-dom/server";
import hljs from "highlight.js";
import styled from "styled-components";
import icon from "./clipboardIcon";

const baseStyle = `
  & .clipWrapper{

    display:flex;
    flex-flow:column;
    position:relative;

    &:hover button{
      display:flex;
    }

    & pre{
      margin-top:0;
    }

    & button{
      max-width:150px;
      height:auto;
      border:none;
      display:none;
      align-items:center;
      position:absolute;
      top:0;
      right:0;
      padding:0.3em;
      background:rgba(255,255,255,0.5);

      & *{
        margin:0 2px;
        fill:currentColor
      }
      & svg{
        background:#eee;
        height:22px;
        width:auto;
      }
    }
  }
`;

class CodeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.handleRef = this.handleRef.bind(this);
  }

  componentDidMount() {
    window.copyToClipBoard = node => {
      const text = node.parentNode.querySelector("code").innerText;
      let textarea = document.createElement("textarea");
      textarea.id = "t";
      textarea.style.height = 0;
      document.body.appendChild(textarea);
      textarea.value = text;
      let selector = document.querySelector("#t");
      selector.select();
      document.execCommand("copy");
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
    const nodes = this.node.querySelectorAll("pre code");

    Array.from(nodes).forEach(node => {
      hljs.highlightBlock(node);
    });
  }

  codeToClipboard() {
    const nodes = this.node.querySelectorAll("pre");

    Array.from(nodes).forEach(node => {
      const newNode = this.createNewNode(node);
      const parent = node.parentNode;
      parent.replaceChild(newNode, node);
    });
  }

  createNewNode(node) {
    const { svg: SVG } = this.props;
    const iconToRender = SVG ? renderToString(<SVG />) : icon;
    const button = document.createElement("button");
    const div = document.createElement("div");
    const span = document.createElement("span");
    div.className = "clipWrapper";
    span.innerText = "Copy";
    button.innerHTML = iconToRender;
    button.appendChild(span);
    button.setAttribute("onclick", `copyToClipBoard(this)`);
    div.appendChild(button);
    div.appendChild(node.cloneNode(true));
    return div;
  }

  handleRef(node) {
    this.node = node;
  }

  render() {
    const { children, element, innerHTML } = this.props;
    const Element = styled[element]
      ? styled[element]`
          ${baseStyle};
        `
      : styled.div`
          ${baseStyle};
        `;

    if (innerHTML) {
      return (
        <Element
          innerRef={this.handleRef}
          dangerouslySetInnerHTML={{ __html: children }}
        />
      );
    } else {
      return <Element innerRef={this.handleRef}>{children}</Element>;
    }
  }
}

CodeBlock.defaultProps = {
  children: null,
  element: "div",
  innerHtml: false,
  highlight: false
};

export default CodeBlock;
