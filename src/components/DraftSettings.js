import React from 'react';
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const DraftSettings = ({ settings, updateSettings, applySettings }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateSettings({ [name]: parseInt(value, 10) || value });
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4">
      <h2 className="text-lg font-semibold mb-2 text-gray-200">Draft Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Number of Teams</label>
          <Input
            type="number"
            name="numberOfTeams"
            value={settings.numberOfTeams}
            onChange={handleInputChange}
            className="mt-1 bg-gray-700 text-gray-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Draft Position</label>
          <Input
            type="number"
            name="draftPosition"
            value={settings.draftPosition}
            onChange={handleInputChange}
            className="mt-1 bg-gray-700 text-gray-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">QB Slots</label>
          <Input
            type="number"
            name="qbSlots"
            value={settings.qbSlots}
            onChange={handleInputChange}
            className="mt-1 bg-gray-700 text-gray-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">RB Slots</label>
          <Input
            type="number"
            name="rbSlots"
            value={settings.rbSlots}
            onChange={handleInputChange}
            className="mt-1 bg-gray-700 text-gray-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">WR Slots</label>
          <Input
            type="number"
            name="wrSlots"
            value={settings.wrSlots}
            onChange={handleInputChange}
            className="mt-1 bg-gray-700 text-gray-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">TE Slots</label>
          <Input
            type="number"
            name="teSlots"
            value={settings.teSlots}
            onChange={handleInputChange}
            className="mt-1 bg-gray-700 text-gray-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">FLEX Slots</label>
          <Input
            type="number"
            name="flexSlots"
            value={settings.flexSlots}
            onChange={handleInputChange}
            className="mt-1 bg-gray-700 text-gray-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Bench Slots</label>
          <Input
            type="number"
            name="benchSlots"
            value={settings.benchSlots}
            onChange={handleInputChange}
            className="mt-1 bg-gray-700 text-gray-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Players to Show per Position</label>
          <Input
            type="number"
            name="playersToShow"
            value={settings.playersToShow}
            onChange={handleInputChange}
            className="mt-1 bg-gray-700 text-gray-200"
          />
        </div>
      </div>
      <Button onClick={applySettings} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
        Apply Settings
      </Button>
    </div>
  );
};

export default DraftSettings;