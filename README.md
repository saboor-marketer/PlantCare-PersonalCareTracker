# PlantCare - Personal Plant Care Tracker

A complete, polished React application for managing houseplants and tracking their care schedules.

## Features

- **Dashboard**: Overview of all plants with care statistics and today's tasks
- **Plant Management**: Add, edit, view, and delete plants
- **Watering Tracking**: Mark plants as watered with automatic next watering date calculation
- **Fertilizing Tracking**: Optional fertilizing schedule management
- **Health Status**: Track plant health (Healthy, Needs Attention, Sick)
- **Search & Filter**: Search by name, species, or location; filter by health and care status
- **Sorting**: Sort plants by name, watering date, or age
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Local Storage**: All data persists in browser localStorage
- **Sample Data**: Option to load sample plants for testing

## Technologies Used

- React 18.3.1
- React Router DOM 6.26.0
- Bootstrap 5.3.3
- Vite 5.4.2
- JavaScript ES6+

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown in the terminal (usually http://localhost:5173)

## Building for Production

```bash
npm run build
```

The production build will be created in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation bar with theme toggle
│   ├── ThemeToggle.jsx     # Light/dark mode toggle
│   ├── EmptyState.jsx      # Empty state component
│   ├── ConfirmModal.jsx    # Delete confirmation modal
│   ├── CareStatusBadge.jsx # Care status badge component
│   ├── HealthBadge.jsx     # Health status badge component
│   ├── CareTimeline.jsx    # Care timeline visualization
│   ├── PlantCard.jsx       # Plant card component
│   ├── PlantFilters.jsx    # Filter and sort controls
│   └── PlantSearch.jsx     # Search input component
│
├── pages/
│   ├── Dashboard.jsx       # Main dashboard page
│   ├── Plants.jsx          # All plants page with filters
│   ├── AddPlant.jsx        # Add new plant page
│   ├── EditPlant.jsx       # Edit existing plant page
│   └── PlantDetails.jsx    # Individual plant details page
│
├── utils/
│   ├── storage.js          # localStorage operations
│   ├── dateUtils.js        # Date calculation utilities
│   ├── plantUtils.js       # Plant-related utilities
│   └── validation.js       # Form validation
│
├── data/
│   └── samplePlants.js     # Sample plant data
│
├── App.jsx                 # Main app component with routing
├── main.jsx                # React entry point
└── index.css               # Global styles and dark mode
```

## Usage

### Adding a Plant

1. Click "Add Plant" in the navigation
2. Fill in the required fields (name, species, watering frequency, last watered date)
3. Optionally add location, image URL, fertilizing schedule, and notes
4. Click "Add Plant"

### Tracking Care

- **Watering**: Click "Mark as Watered" on any plant card or details page
- **Fertilizing**: Click "Mark as Fertilized" (if fertilizing schedule is set)
- **Health**: Update health status when editing a plant

### Searching and Filtering

- Use the search bar to find plants by name, species, or location
- Apply filters for health status, care status, and location
- Sort plants by various criteria using the sort dropdown
- Click "Clear Filters" to reset all filters

### Dark Mode

- Click the theme toggle in the navigation bar
- Your preference is saved and persists across sessions

## Data Persistence

All plant data is stored in browser localStorage under the key `plantcare_plants`. Theme preference is stored under `plantcare_theme`.

## Browser Compatibility

Works in all modern browsers that support:
- ES6+ JavaScript
- localStorage
- CSS Grid and Flexbox

## Accessibility

- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Proper form labels and error messages
- Good color contrast in both light and dark modes

## License

MIT
