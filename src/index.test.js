import React from 'react';
import toJSON from 'enzyme-to-json';
import { mount } from 'enzyme';
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

  it('Renders component with innerHtml', () => {
    const wrapper = mount(<CodeBlock innerHtml>{stringBlock}</CodeBlock>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('Renders component with highlight', () => {
    const wrapper = mount(
      <CodeBlock highlight><JSXBlock code={code} /></CodeBlock>
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('has a pre code block', () => {
    const wrapper = mount(<CodeBlock><JSXBlock code={code} /></CodeBlock>);
    expect(wrapper.find('pre code').exists()).toBe(true);
  });

  it('has code in a pre code block', () => {
    const wrapper = mount(<CodeBlock><JSXBlock code={code} /></CodeBlock>);
    expect(wrapper.find('pre code').text()).toBe(code);
  });

  //   it('has div wrapper', () => {
  //     const wrapper = mount(<CodeBlock><JSXBlock code={code} /></CodeBlock>);
  //     expect(wrapper.find('.clipWrapper').exists()).toBe(true);
  //   });
});
