# react-copy-code

react-copy-code is a component that will add a "copy to clipboard" button to 'pre code' blocks that are rendered as it's children. Children can be jsx, other components, or an html string by setting the `innerHtml` prop. If the `highlight` prop is set, it also uses [highlight.js](https://highlightjs.org/) to add the proper classes needed for highlighting code.

## Installation

`npm install react-copy-code`

## Usage

```javascript
import CodeBlock from 'react-copy-code';

const App = () => (
   <CodeBlock>
      {write the rest of your component here}
      {using as many pre code blocks you want}
   </CodeBlock>
);
```

or

```javascript
import CodeBlock from 'react-copy-code';

const App = () => (
   <CodeBlock innerHtml>
      {html string is passed in as the only child}
   </CodeBlock>
);
```

## Props

| name      |      type      | default | description                                                                                                                                                                                     |
| --------- | :------------: | :-----: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| element   |     string     |  "div"  | Allows you to specify which element the component renders as                                                                                                                                    |
| innerHTML |      bool      |  false  | If this is set to true, it is expecting the html string to be passed as the only child. **Warning**: uses dangerouslySetInnerHTML so be sure you trust the source                               |
| highlight |      bool      |  false  | If this is set to true, It will use highlight.js to add classes that correspond to highlight.js css theme. Checkout [documentation](https://highlightjs.org/) for highlight.js for more details |
| svg       | ReactComponent |  null   | Allows you to pass in any SVG based React Component as the button icon                                                                                                                          |
| onCopy    |    function    |  no-op  | Allows you to pass in a function to run when the copy button is clicked                                                                                                                         |

## Contributing

In lieu of a formal styleguide, please format your code using 'prettier' prior to commit.

## Release History

- 2.0.1 Make safer for SSR
- 2.0.0 Update to latest version of react
- 1.2.2 Remove react and react-dom as dependancy and put it as a peer-dependancy
- 1.2.1 Remove webpack as dependancy and put it as a dev dependancy like it was always supposed to be
- 1.2.0 onCopy prop that allows you to pass a function to run when the `copy button` is clicked
- 1.1.1 Update capabilities for older browsers(PR from absoludity)
- 1.1.0 Custom SVG Icon can be passed as the button icon
- 1.0.6 Reduce Button Real estate
- 1.0.5 Icon style fits on to one line
- 1.0.4 Update to be compatable with react 15.6
- 1.0.1 - 1.0.3 Updated Documentation
- 1.0.0 Initial Stable Release
