"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const server_1 = require("react-dom/server");
const highlight_js_1 = require("highlight.js");
const styled_components_1 = require("styled-components");
const clipboardIcon_1 = require("./clipboardIcon");
const Element = styled_components_1.default.div `
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
class CodeBlock extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.node = react_1.default.createRef();
    }
    componentDidMount() {
        const { onCopy } = this.props;
        if (window && document) {
            window["copyToClipBoard"] = (node) => {
                node = node ? node : {};
                const text = node.parentNode && node.parentNode.querySelector("code").innerText;
                let textarea = document.createElement("textarea");
                textarea.id = "t";
                textarea.style.height = "0";
                document.body.appendChild(textarea);
                textarea.value = text;
                let selector = document.querySelector("#t");
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
        window["copyToClipBoard"] = undefined;
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
            highlight_js_1.default.highlightBlock(node);
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
    createNewNode(node) {
        const { svg: SVG } = this.props;
        const iconToRender = SVG ? server_1.renderToString(react_1.default.createElement(SVG, null)) : clipboardIcon_1.default;
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
        const _a = this.props, { children, element, useInnerHtml, onCopy, highlight } = _a, props = __rest(_a, ["children", "element", "useInnerHtml", "onCopy", "highlight"]);
        const as = styled_components_1.default.hasOwnProperty(element) ? element : "div";
        if (useInnerHtml) {
            return (react_1.default.createElement(Element, Object.assign({ as: as, ref: this.node }, props, { dangerouslySetInnerHTML: { __html: children } })));
        }
        else {
            return (react_1.default.createElement(Element, Object.assign({ as: as, ref: this.node }, props), children));
        }
    }
}
CodeBlock.defaultProps = {
    children: null,
    element: "div",
    useInnerHtml: false,
    highlight: false,
    onCopy: () => null
};
exports.default = CodeBlock;
