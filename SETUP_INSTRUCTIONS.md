# Setup Instructions

Due to PowerShell execution policy restrictions, you'll need to run these commands manually in your terminal.

## Step 1: Install Dependencies

Open a terminal in the PlantCare directory and run:

```bash
npm install
```

## Step 2: Start Development Server

After installation completes, run:

```bash
npm run dev
```

## Step 3: Open in Browser

The terminal will show a URL (usually http://localhost:5173). Open this URL in your browser.

## Step 4: Test the Application

Once the dev server is running, you can:
- Load sample plants from the dashboard
- Add new plants
- Edit and delete plants
- Test search, filters, and sorting
- Toggle dark mode
- Test watering and fertilizing
- Refresh the browser to test localStorage persistence

## Step 5: Production Build (Optional)

To create a production build:

```bash
npm run build
```

The build will be in the `dist` directory.
