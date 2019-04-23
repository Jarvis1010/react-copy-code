import * as React from "react";
import { renderToString } from "react-dom/server";
import * as hljs from "highlight.js";
import styled from "styled-components";
import icon from "./clipboardIcon";

const Element = styled.div`
  & .clipWrapper {
    display: flex;
    flex-flow: column;
    position: relative;

    &:hover button {
      display: flex;
    }

    & pre {
      margin-top: 0;
    }

    & button {
      npmax-width: 150px;
      height: auto;
      border: none;
      display: none;
      align-items: center;
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.3em;
      background: rgba(255, 255, 255, 0.5);

      & * {
        margin: 0 2px;
        fill: currentColor;
      }
      & svg {
        background: #eee;
        height: 22px;
        width: auto;
      }
    }
  }
`;

export interface CodeBlockProps {
  children: any;
  element: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  useInnerHtml: boolean;
  highlight: boolean;
  onCopy: Function;
  svg?: React.ComponentType<any>;
}

class CodeBlock extends React.Component<CodeBlockProps, {}> {
  private node = React.createRef<HTMLDivElement>();
  static defaultProps: CodeBlockProps = {
    children: null,
    element: "div" as keyof JSX.IntrinsicElements,
    useInnerHtml: false,
    highlight: false,
    onCopy: (): any => null
  };

  componentDidMount() {
    const { onCopy } = this.props;
    if (window && document) {
      (window as any)["copyToClipBoard"] = (node: any) => {
        node = node ? node : {};
        const text =
          node.parentNode && node.parentNode.querySelector("code").innerText;
        let textarea = document.createElement("textarea");
        textarea.id = "t";
        textarea.style.height = "0";
        document.body.appendChild(textarea);
        textarea.value = text;
        let selector = document.querySelector("#t") as HTMLInputElement;
        selector.select();
        if (document.execCommand) {
          document.execCommand("copy");
        }
        document.body.removeChild(textarea);
        onCopy();
      };
    }
    this.updateComponent();
  }

  componentDidUpdate() {
    this.updateComponent();
  }

  componentWillUnmount() {
    (window as any)["copyToClipBoard"] = undefined;
  }

  updateComponent() {
    this.codeToClipboard();
    if (this.props.highlight) {
      this.highlightCode();
    }
  }

  highlightCode() {
    const nodes = this.node.current.querySelectorAll("pre code");

    Array.from(nodes).forEach(node => {
      hljs.highlightBlock(node);
    });
  }

  codeToClipboard() {
    const nodes = this.node.current.querySelectorAll("pre");

    Array.from(nodes).forEach(node => {
      const newNode = this.createNewNode(node);
      const parent = node.parentNode;
      parent.replaceChild(newNode, node);
    });
  }

  createNewNode(node: HTMLElement) {
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

  render() {
    const {
      children,
      element,
      useInnerHtml,
      onCopy,
      highlight,
      ...props
    } = this.props;
    const el = styled.hasOwnProperty(element as string)
      ? element
      : ("div" as keyof JSX.IntrinsicElements);

    if (useInnerHtml) {
      return (
        <Element
          as={el}
          ref={this.node}
          {...props}
          dangerouslySetInnerHTML={{ __html: children }}
        />
      );
    } else {
      return (
        <Element as={el} ref={this.node} {...props}>
          {children}
        </Element>
      );
    }
  }
}

export default CodeBlock;
