# react-copy-code

## Installation

`npm install react-copy-code`

## Usage

```
import CodeBlock from 'react-copy-code';

const App=()=>(
   <CodeBlock>
      {write the rest of your component here using as many pre code blocks you want}
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
| element    | string         | "div"     | Allows to specify which element the component renders as|
| innerHtml | bool         | false | If this is set to true, it is expecting the html string to be passed as the only child.  **Warning**: uses dangerouslySetInnerHTML so be sure you trust the source |
| highlight   | bool    |  false  | If this is set to true, It will use highlight.js to add classes that correspond to highlight.js css theme  |
 
## Contributing

In lieu of a formal styleguide, please format your code using 'prettier' prior to commit.

## Release History
* 1.0.0 Initial Stable Release