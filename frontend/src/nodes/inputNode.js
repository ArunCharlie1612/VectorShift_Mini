// inputNode.js

import React, { useState } from 'react';
import NodeBase from './NodeBase';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setInputType(e.target.value);
  // detect a single variable pattern like {{name}} in the input name
  const varMatch = currName && currName.match(/{{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*}}/);
  // if present, we want the user to see a single handle visually at 50% on the left
  // but still support both starting a connection (source) and receiving one (target).
  // React Flow requires separate source/target handles, so we render two handles
  // stacked at the same position. One is visible (the source) and the other is
  // invisible but still interactive (the target). This gives the UX of a single
  // visible left handle that can be used both ways.


  return (
    <NodeBase id={id} title="Input"
     {...(varMatch ? { leftHandles: [{ id: 'value1' }] } : {})}
     rightHandles={[{ id: 'value' }]} style={{ width: 220 }}>
      <div>
        <div className="node-desc">Pass data of different types into your workflow</div>
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
            <select value={inputType} onChange={handleTypeChange}>
              <option value="Text">Text</option>
              <option value="File">File</option>
            </select>
          </div>
        </div>
      </div>
    </NodeBase>
  );
};

export default InputNode;
