// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    const toolbarTabs = [
        'General',
        'LLMs',
        'Knowledge Base',
        'Integrations',
        'Data Loaders',
        'Multi-Modal',
        'Logic',
        'Data Transformation',
        'Chat'
    ];
    return (
        <div className="pipeline-toolbar">
            <div className="toolbar-tabs">
                {toolbarTabs.map((tab, idx) => (
                    <div key={tab} className={"toolbar-tab cursor-pointer" + (tab === 'General' ? ' active' : '')}>
                        {tab}
                    </div>
                ))}
            </div>

            <div style={{ flex: 1 }} />

            <div className="node-palette">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
            </div>
        </div>
    );
};
