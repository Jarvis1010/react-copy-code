import React from "react";
import sinon from "sinon";
import toJSON from "enzyme-to-json";
import { shallow, mount, render } from "enzyme";
import CodeBlock from "./index";
import "jest-styled-components";

const code = `
const greeting = (greet = 'Hello') => (name = 'World') => {
    return greet + ' ' + name + '!';
  };
`;

const JSXBlock = ({ code }) => (
  <pre>
    <code>{code}</code>
  </pre>
);

const stringBlock = `<pre><code>${code}</code></pre>`;

describe("Copy to code", () => {
  it("Renders component with JSX", () => {
    const wrapper = mount(
      <CodeBlock>
        <JSXBlock code={code} />
      </CodeBlock>
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it("Renders component with highlight", () => {
    const wrapper = mount(
      <CodeBlock highlight>
        <JSXBlock code={code} />
      </CodeBlock>
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it("Renders custom element", () => {
    const wrapper = mount(
      <CodeBlock element="span">
        <JSXBlock code={code} />
      </CodeBlock>
    );
    const html = wrapper.html();
    expect(html.indexOf("span")).toBe(1);
    wrapper.unmount();
  });

  it("Renders div if incorrect prop", () => {
    const wrapper = mount(
      <CodeBlock element="bob">
        <JSXBlock code={code} />
      </CodeBlock>
    );
    const html = wrapper.html();
    expect(html.indexOf("div")).toBe(1);
    wrapper.unmount();
  });
  it("adds a div wrapper around pre code block", () => {
    const wrapper = mount(
      <CodeBlock>
        <JSXBlock code={code} />
      </CodeBlock>
    );
    const html = wrapper.html();
    expect(/class=\"clipWrapper\"/.test(html)).toBe(true);
    wrapper.unmount();
  });

  it("adds a button sibling to pre code block", () => {
    const wrapper = mount(
      <CodeBlock>
        <JSXBlock code={code} />
      </CodeBlock>
    );
    const html = wrapper.html();
    expect(/button/.test(html)).toBe(true);
    wrapper.unmount();
  });

  it("adds custom svg icon", () => {
    const testString =
      "m20.1 13.9l4.5 6.8h-8.9z m8.2 11.8h2.1l-10.3-15.4-10.2 15.4h2.1l2.3-3.6h11.7z m9-5.7q0 4.7-2.3 8.6t-6.3 6.2-8.6 2.3-8.6-2.3-6.2-6.2-2.3-8.6 2.3-8.6 6.2-6.2 8.6-2.3 8.6 2.3 6.3 6.2 2.3 8.6z";
    const SVG = () => (
      <svg>
        <g>
          <path d={testString} />
        </g>
      </svg>
    );
    const wrapper = mount(
      <CodeBlock svg={SVG}>
        <JSXBlock code={code} />
      </CodeBlock>
    );
    const html = wrapper.html();

    expect(new RegExp(testString, "g").test(html)).toBe(true);
    wrapper.unmount();
  });

  it("calls onCopy function", () => {
    const spy = sinon.spy();
    const wrapper = mount(
      <CodeBlock onCopy={spy}>
        <JSXBlock code={code} />
      </CodeBlock>
    );

    window.copyToClipBoard();
    expect(spy.calledOnce).toBe(true);
    wrapper.unmount();
  });
});

describe("Copy to code with innerHtml", () => {
  it("Renders component", () => {
    const wrapper = mount(<CodeBlock innerHtml>{stringBlock}</CodeBlock>);
    expect(toJSON(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it("Renders component with highlight", () => {
    const wrapper = mount(
      <CodeBlock highlight innerHtml>
        {stringBlock}
      </CodeBlock>
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
