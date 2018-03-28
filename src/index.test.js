import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow, mount, render } from 'enzyme';
import CodeBlock from './index';

const code = `
const greeting = (greet = 'Hello') => (name = 'World') => {
    return greet + ' ' + name + '!';
  };
`;

const JSXBlock = ({ code }) => <pre><code>{code}</code></pre>;

const stringBlock = `<pre><code>${code}</code></pre>`;

describe('Copy to code', () => {
  it('Renders component with JSX', () => {
    const wrapper = mount(<CodeBlock><JSXBlock code={code} /></CodeBlock>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('Renders component with highlight', () => {
    const wrapper = mount(
      <CodeBlock highlight><JSXBlock code={code} /></CodeBlock>
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('Renders custom element', () => {
    const wrapper = mount(
      <CodeBlock element="span"><JSXBlock code={code} /></CodeBlock>
    );
    const html = wrapper.html();
    expect(html.indexOf('span')).toBe(1);
  });

  it('Renders div if incorrect prop', () => {
    const wrapper = mount(
      <CodeBlock element="bob"><JSXBlock code={code} /></CodeBlock>
    );
    const html = wrapper.html();
    expect(html.indexOf('div')).toBe(1);
  });

  it('adds a div wrapper around pre code block', () => {
    const wrapper = mount(<CodeBlock><JSXBlock code={code} /></CodeBlock>);
    const html = wrapper.html();
    expect(/class=\"clipWrapper\"/.test(html)).toBe(true);
  });

  it('adds a button sibling to pre code block', () => {
    const wrapper = mount(<CodeBlock><JSXBlock code={code} /></CodeBlock>);
    const html = wrapper.html();
    expect(/button/.test(html)).toBe(true);
  });
});

describe('Copy to code with innerHtml', () => {
  it('Renders component', () => {
    const wrapper = mount(<CodeBlock innerHtml>{stringBlock}</CodeBlock>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('Renders component with highlight', () => {
    const wrapper = mount(
      <CodeBlock highlight innerHtml>{stringBlock}</CodeBlock>
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
