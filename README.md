# react-copy-code

react-copy-code is a component that will add a "copy to clipboard" button to 'pre code' blocks that are rendered as it's children.  Children can be jsx, other components, or an html string by setting the `innerHtml` prop.  If the `highlight` prop is set, it also uses [highlight.js](https://highlightjs.org/) to add the proper classes needed for highlighting code.

## Installation

`npm install react-copy-code`

## Usage

```
import CodeBlock from 'react-copy-code';

const App=()=>(
   <CodeBlock>
      {write the rest of your component here} 
      {using as many pre code blocks you want}
   </CodeBlock>
);
```
or
```
import CodeBlock from 'react-copy-code';

const App=()=>(
   <CodeBlock innerHtml>
      {html string is passed in as the only child}
   </CodeBlock>
);
```
## Props

| name       | type | default | description |
| ----------- |:-----:|:--------:| ------------ |
| element    | string         | "div"     | Allows you to specify which element the component renders as|
| innerHTML | bool         | false | If this is set to true, it is expecting the html string to be passed as the only child.  **Warning**: uses dangerouslySetInnerHTML so be sure you trust the source |
| highlight   | bool    |  false  | If this is set to true, It will use highlight.js to add classes that correspond to highlight.js css theme.  Checkout [documentation](https://highlightjs.org/) for highlight.js for more details  |
 
## Contributing

In lieu of a formal styleguide, please format your code using 'prettier' prior to commit.

## Release History
* 1.0.0 Initial Stable Release
* 1.0.1 - 1.0.3 Updated Documentation
* 1.0.4 Update to be compatable with react 15.6
* 1.0.5 Icon style fits on to one line