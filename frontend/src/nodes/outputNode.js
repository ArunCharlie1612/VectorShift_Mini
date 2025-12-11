// outputNode.js

import React, { useState } from 'react';
import NodeBase from './NodeBase';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setOutputType(e.target.value);

  return (
    <NodeBase id={id} title="Output" leftHandles={[{ id: 'value' }]} style={{ width: 220 }}>
      <div>
        <div className="node-desc">Output data of different types from your workflow</div>
        <div className="node-id">{currName}</div>

        <div className="node-field">
          <label>Name</label>
          <div className="node-control">
            <input type="text" value={currName} onChange={handleNameChange} />
          </div>
        </div>

        <div className="node-field">
          <label>Type <span className="chip">Dropdown</span></label>
          <div className="node-control">
            <select value={outputType} onChange={handleTypeChange}>
              <option value="Text">Text</option>
              <option value="File">Image</option>
            </select>
          </div>
        </div>
      </div>
    </NodeBase>
  );
};

export default OutputNode;
