import * as React from "react";
export interface CodeBlockProps {
    children: any;
    element: any;
    useInnerHtml: boolean;
    highlight: boolean;
    onCopy: Function;
    svg?: any;
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
