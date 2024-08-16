# Fantasy Football Draft Tool

This is a React-based Fantasy Football Draft Tool designed to help users make informed decisions during their fantasy football drafts. It provides real-time player rankings, tier-based drafting, and customizable settings to enhance the draft experience.

## Features

- Real-time player rankings based on custom scoring
- Tier-based drafting system
- Position-specific player tables (QB, RB, WR, TE)
- Customizable draft settings (number of teams, roster positions, etc.)
- Target player highlighting
- Draft history tracking
- Undo functionality for draft picks
- Local storage persistence for draft progress
- Responsive design for use on various devices

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/fantasy-football-draft-tool.git
   ```

2. Navigate to the project directory:
   ```
   cd fantasy-football-draft-tool
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and visit `http://localhost:3000` to view the app.

## Usage

1. Configure your draft settings by clicking the "Show Settings" button.
2. Use the search bar to find specific players quickly.
3. Click the "Drafted" button to mark a player as drafted by another team.
4. Click the "Draft" button to add a player to your team.
5. Use the "Undo" button to reverse the last action.
6. Click "Reset Draft" to start over.
7. Use the "Edit Target Players" feature to highlight specific players you're targeting in the draft.

## Importing Your Own Player Data

This tool allows you to use your own player data. Follow these steps to import your data:

1. In the `src/data` directory, create a new file called `playerData.js`.
2. Copy the structure from `playerDataTemplate.js` into your new file.
3. Replace the template data with your actual player data.
4. Ensure your data follows the same structure as the template.

Example `playerData.js`:

```javascript
export const positions = ['QB', 'RB', 'WR', 'TE'];

export const playerData = [
  {
    rank: 1,
    name: "Jonathan Taylor",
    position: "RB",
    team: "IND",
    bye: 14,
    rv: 180,
    adp: {
      average: 1.2,
      espn: 1
    },
    gc: 1
  },
  // Add more players...
];
```

Note: Make sure not to commit your `playerData.js` file to the repository if it contains proprietary or sensitive information.

## Technologies Used

- React
- Tailwind CSS
- shadcn/ui components
- Local Storage for data persistence

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.