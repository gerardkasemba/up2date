// components/CodeSnippet.js
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { light } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeSnippet({ code }) {
  return (
    <div className="code-snippet bg-gray-900 text-white p-4 rounded-md overflow-x-auto">
      <SyntaxHighlighter language="javascript" style={light}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
