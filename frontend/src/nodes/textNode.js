// textNode.js

import React, { useState, useRef, useLayoutEffect, useMemo } from 'react';
import NodeBase from './NodeBase';

// Helper: extract unique valid JS variable names inside double curlies {{ name }}
const extractVariables = (text) => {
  const re = /{{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*}}/g;
  const vars = new Set();
  let m;
  while ((m = re.exec(text)) !== null) {
    vars.add(m[1]);
  }
  return Array.from(vars);
};

export const TextNode = ({ id, data }) => {
  const initial = data?.text ?? '{{input}}';
  const [currText, setCurrText] = useState(initial);
  const [size, setSize] = useState({ width: 220, height: 68 });
  const taRef = useRef(null);
  const measureRef = useRef(null);

  // sizing constraints
  const MIN_WIDTH = 180;
  const MAX_WIDTH = 520;
  const MIN_HEIGHT = 48;
  const MAX_HEIGHT = 520;
  const PAD = 24; // extra padding to account for node padding
  const BASE_HEIGHT = 48;

  const vars = useMemo(() => extractVariables(currText), [currText]);

  // measure textarea content to adjust node size
  useLayoutEffect(() => {
    const ta = taRef.current;
    const meas = measureRef.current;
    if (!ta || !meas) return;

    // ensure measurement element matches textarea font metrics
    try {
      const cs = window.getComputedStyle(ta);
      meas.style.font = cs.font;
      meas.style.letterSpacing = cs.letterSpacing;
      meas.style.fontWeight = cs.fontWeight;
      meas.style.lineHeight = cs.lineHeight;
    } catch (e) {
      // ignore on server-side or if computation fails
    }

    // determine longest unwrapped line width using hidden measure element
    const lines = currText.split('\n');
    let longest = 0;
    lines.forEach((ln) => {
      // set text preserving spaces
      meas.textContent = ln || ' ';
      const w = Math.ceil(meas.getBoundingClientRect().width);
      if (w > longest) longest = w;
    });

    const requiredWidth = longest + PAD;

    // If content fits under MAX_WIDTH, grow width first and keep height minimal
    if (requiredWidth <= MAX_WIDTH) {
      const newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, requiredWidth));
      // If user explicitly entered newlines, grow height to fit them
      if (lines.length > 1) {
        // allow textarea to compute required height
        ta.style.height = 'auto';
        ta.style.overflow = 'hidden';
        const h = Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, ta.scrollHeight + PAD));
        // apply
        ta.style.height = `${h}px`;
        setSize({ width: newWidth, height: h });
      } else {
        // single line: grow width and keep minimal height
        ta.style.height = `${BASE_HEIGHT}px`;
        ta.style.overflow = 'hidden';
        setSize({ width: newWidth, height: BASE_HEIGHT });
      }
    } else {
      // requiredWidth exceeds max: lock width to MAX_WIDTH and let textarea wrap and grow height
      const newWidth = MAX_WIDTH;
      ta.style.height = 'auto';
      ta.style.overflow = 'hidden';
      const h = Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, ta.scrollHeight + PAD));
      ta.style.height = `${h}px`;
      setSize({ width: newWidth, height: h });
    }

    // ensure we reset vertical scroll so first line is visible
    try { ta.scrollTop = 0; } catch (e) {}
  }, [currText]);

  const handleTextChange = (e) => setCurrText(e.target.value);

  // create leftHandles array with computed top positions so multiple handles space out
  const leftHandles = vars.map((name, idx) => {
    const n = vars.length;
    const topPercent = Math.round(((idx + 1) / (n + 1)) * 100);
    return { id: name, style: { top: `${topPercent}%` } };
  });

  return (
    <NodeBase id={id} title="Text" leftHandles={leftHandles} rightHandles={[{ id: 'output' }]} style={{ width: size.width }}>
      <div>
        

        <div className="node-field">
          <div className="node-control">
            <textarea
              className="text-area"
              ref={taRef}
              value={currText}
              onChange={handleTextChange}
              wrap="soft"
              style={{ height: size.height }}
            />
          </div>
        </div>

        <div className="node-note">Variables: {vars.length ? vars.join(', ') : 'none'}</div>

        {/* hidden measuring element used to compute unwrapped line widths */}
        <div
          ref={measureRef}
          style={{ position: 'absolute', visibility: 'hidden', whiteSpace: 'pre', left: -9999, top: -9999, fontSize: 13, fontFamily: 'inherit' }}
        />
      </div>
    </NodeBase>
  );
};

export default TextNode;
