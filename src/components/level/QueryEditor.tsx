import React from 'react';
import './QueryEditor.css';

interface QueryEditorProps {
  value: string;
  onChange: (value: string) => void;
  onExecute: () => void;
  isLoading?: boolean;
  placeholder?: string;
}

export const QueryEditor: React.FC<QueryEditorProps> = ({
  value,
  onChange,
  onExecute,
  isLoading = false,
  placeholder = 'Enter your PromQL query here...',
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      onExecute();
    }
  };

  return (
    <div className="query-editor">
      <textarea
        className="query-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isLoading}
        rows={3}
      />
      <div className="query-editor-footer">
        <span className="query-hint">Tip: Press Cmd/Ctrl + Enter to execute</span>
      </div>
    </div>
  );
};
