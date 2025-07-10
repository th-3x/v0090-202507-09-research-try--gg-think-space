/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useRef, useState, useEffect } from "react";
import c from "clsx";
import PhotoViz from "./PhotoViz";
import PhotoVizClean from "./PhotoViz-Clean";

import useStore from "./store";
import Sidebar from "./Sidebar";

import {
  setLayout,
  sendQuery,
  clearQuery,
  setXRayMode,
  toggleSidebar,
  triggerGoBack,
} from "./actions";

const searchPresets = [
  'winter', 
  'mathematical concepts', 
  'underwater animals', 
  'circular shapes'
]

export default function App() {
  const layout = useStore.use.layout();
  const isFetching = useStore.use.isFetching();
  const xRayMode = useStore.use.xRayMode();
  const caption = useStore.use.caption();
  const isSidebarOpen = useStore.use.isSidebarOpen();
  const highlightNodes = useStore.use.highlightNodes();
  const canGoBack = useStore.use.canGoBack();
  const [value, setValue] = useState("");
  const [searchPresetIdx, setSearchPresetIdx] = useState(0)
  const [activeTab, setActiveTab] = useState("clean"); // Tab state
  const inputRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSearchPresetIdx(n => {
        const nextIdx = n === searchPresets.length - 1 ? 0 : n + 1;
        console.log('Search preset cycling:', searchPresets[nextIdx]);
        return nextIdx;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Debug current preset
  console.log('Current search preset:', searchPresets[searchPresetIdx]);

  return (
    <main>
      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          onClick={() => setActiveTab("clean")}
          className={c("tab-button", { active: activeTab === "clean" })}
        >
          Clean Architecture
        </button>
        <button
          onClick={() => setActiveTab("original")}
          className={c("tab-button", { active: activeTab === "original" })}
        >
          Original
        </button>
      </div>

      {/* Render active PhotoViz component */}
      {activeTab === "clean" ? <PhotoVizClean /> : <PhotoViz />}
      
      <Sidebar />
      <footer>
        <div className="caption">
          {caption && (
            <>
              <div />
              {caption}
            </>
          )}
        </div>
        <div className="input">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && value) {
                sendQuery(value);
                inputRef.current.blur();
              }
            }}
            ref={inputRef}
            placeholder={`Search images for… “${searchPresets[searchPresetIdx]}”`}
          />
          <img
            src="/spinner.svg"
            className={c("spinner", { active: isFetching })}
          />
          <button
            onClick={() => {
              clearQuery();
              setValue("");
            }}
            className={c("clearButton", { active: highlightNodes })}
          >
            ×
          </button>
        </div>

        <div className="controls">
          <div>
            <button
              onClick={triggerGoBack}
              className={c("goBackButton", { active: canGoBack, disabled: !canGoBack })}
              disabled={!canGoBack}
              title="Go back to previous zoom position"
            >
              ← back
            </button>
          </div>
          <div>
            <button
              onClick={() => setLayout("sphere")}
              className={c({ active: layout === "sphere" })}
            >
              sphere
            </button>
            <button
              onClick={() => setLayout("grid")}
              className={c({ active: layout === "grid" })}
            >
              grid
            </button>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={xRayMode}
                onChange={() => setXRayMode(!xRayMode)}
              />
              x-ray
            </label>
          </div>
        </div>
      </footer>
      <button
        onClick={toggleSidebar}
        className={c("sidebarButton iconButton", { active: isSidebarOpen })}
        aria-label="Toggle photo list"
        title="Toggle photo list"
      >
        <span className="icon">list</span>
      </button>
    </main>
  );
}
