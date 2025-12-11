// llmNode.js

import React from 'react';
import NodeBase from './NodeBase';

export const LLMNode = ({ id, data }) => {
  const left = [
    { id: 'system', style: { top: '33%' } },
    { id: 'prompt', style: { top: '66%' } },
  ];

  const LLMModels = [
    {
      name: 'openai_0',
      description: 'Most advanced model with 8K context length',
      Model : ['chatgpt-4o-latest', 'gpt-4o-mini', 'gpt-4o', 'gpt-4o-16k', 'gpt-4o-32k']

    }
  ]

  return (
    <NodeBase id={id} title="OpenAI" leftHandles={left} rightHandles={[{ id: 'response' }]} style={{ width: 280 }}>
      <div>
        <div className="node-id">{
            LLMModels[0].name
          }</div>

        <div className="panel">
          <div className="panel-title">Ensure that the Type in the output node is "Streamed Text"</div>
        </div>

        <div className="node-field">
          <label>System (Instructions) <span className="chip">Text</span></label>
          <div className="node-control">
            <input type="text" placeholder="Answer the Question based on Context" />
          </div>
        </div>

        <div className="node-field">
          <label>Prompt <span className="chip">Text</span></label>
          <div className="node-control">
            <textarea style={{ minHeight: 60 }} placeholder="Question" />
          </div>
        </div>

        <div className="node-field">
          <label>Model <span className="chip">Dropdown</span></label>
          <div className="node-control">
            <select>
              {
                LLMModels[0].Model.map((model) => (
                  <option key={model}>{model}</option>
                ))
              }
            </select>
          </div>
        </div>
      </div>
    </NodeBase>
  );
};

export default LLMNode;
