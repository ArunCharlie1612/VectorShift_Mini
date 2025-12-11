import React from 'react';
import { Handle, Position } from 'reactflow';

export const NodeBase = ({ id, title, children, style = {}, leftHandles = [], rightHandles = [] }) => {
  const mergedStyle = { ...style };

  return (
    <div className="node-base" style={mergedStyle}>
      <div className="node-title">{title}</div>
      <div className="node-content">{children}</div>

      {/* left (target) handles */}
      {leftHandles.map((h, i) => (
          <Handle
            key={`left-${i}`}
            type={h.type || 'target'}
            position={Position.Left}
            id={`${id}-${h.id}`}
            isConnectable={true}
            style={{ pointerEvents: 'auto', zIndex: 10, ...(h.style || {}) }}
          />
      ))}

      {/* right (source) handles */}
      {rightHandles.map((h, i) => (
          <Handle
            key={`right-${i}`}
            type={h.type || 'source'}
            position={Position.Right}
            id={`${id}-${h.id}`}
            isConnectable={true}
            style={{ pointerEvents: 'auto', zIndex: 10, ...(h.style || {}) }}
          />
      ))}
    </div>
  );
};

export default NodeBase;
