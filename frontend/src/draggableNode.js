// draggableNode.js

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
    event.target.style.cursor = 'grabbing';
  };

  const Icon = ({ t }) => {
    // small inline SVG icons per type
    const commonProps = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' };
    switch (t) {
      case 'customInput':
        return (
          <svg {...commonProps}><rect x="3" y="6" width="18" height="12" rx="2" stroke="#111827" strokeWidth="1.2"/></svg>
        );
      case 'customOutput':
        return (
          <svg {...commonProps}><path d="M4 12h16" stroke="#111827" strokeWidth="1.6" strokeLinecap="round"/></svg>
        );
      case 'text':
        return (
          <svg {...commonProps}><path d="M4 7h16M4 12h10M4 17h8" stroke="#111827" strokeWidth="1.4" strokeLinecap="round"/></svg>
        );
      case 'llm':
        return (
          <svg {...commonProps}><circle cx="12" cy="8" r="3" stroke="#111827" strokeWidth="1.2"/><path d="M5 20c2-4 6-6 7-6s5 2 7 6" stroke="#111827" strokeWidth="1.2" strokeLinecap="round"/></svg>
        );
      default:
        return (
          <svg {...commonProps}><circle cx="12" cy="12" r="8" stroke="#111827" strokeWidth="1.2"/></svg>
        );
    }
  };

  return (
    <div
      className={`node-button`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      <div className="icon"><Icon t={type} /></div>
      <div className="label">{label}</div>
    </div>
  );
};
  