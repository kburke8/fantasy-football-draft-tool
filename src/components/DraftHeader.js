import React from 'react';
import { Button } from "./ui/button";

const DraftHeader = ({ showSettings, setShowSettings, undoLastAction, resetDraft }) => (
  <div className="flex justify-between items-center mb-2">
    <h1 className="text-xl font-bold text-gray-100">Fantasy Football Draft Tool</h1>
    <div>
      <Button size="sm" onClick={() => setShowSettings(!showSettings)} className="bg-gray-700 text-gray-300 hover:bg-gray-600 mr-2">
        {showSettings ? 'Hide Settings' : 'Show Settings'}
      </Button>
      <Button size="sm" onClick={undoLastAction} className="bg-gray-700 text-gray-300 hover:bg-gray-600 mr-2">Undo</Button>
      <Button size="sm" onClick={resetDraft} className="bg-gray-700 text-gray-300 hover:bg-gray-600">Reset Draft</Button>
    </div>
  </div>
);

export default DraftHeader;