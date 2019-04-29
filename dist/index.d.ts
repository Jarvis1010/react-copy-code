import * as React from 'react';
export interface CodeBlockProps {
    children: any;
    element?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
    useInnerHtml: boolean;
    highlight: boolean;
    onCopy: Function;
    svg?: React.ComponentType<any>;
}
declare class CodeBlock extends React.Component<CodeBlockProps, {}> {
    private node;
    static defaultProps: CodeBlockProps;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    updateComponent(): void;
    highlightCode(): void;
    codeToClipboard(): void;
    createNewNode(node: HTMLElement): HTMLDivElement;
    render(): JSX.Element;
}
export default CodeBlock;
