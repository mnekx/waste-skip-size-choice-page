# 🛠️ Skip Size Selection App

A responsive and accessible React-based app that helps users select the most suitable waste skip size, designed with a focus on clean UI/UX, maintainable code, and interactive filtering.

## 🚀 Features

* 🔍 **Filter Panel**: Users can filter skip options by hire period, volume, or price using a floating, toggleable panel.
* 🧹 **Component-Based Design**: Built with modular, reusable components for ease of maintenance and scalability.
* 🖼️ **Carousel Display**: Filtered skip options are shown in a horizontally scrollable carousel.
* 🔘 **Selection Modal**: On clicking “Select Skip,” a modal shows skip details and allows continuation.
* 🎨 **Tailwind CSS**: Used for consistent and elegant styling.
* ✅ **Accessibility**: Implemented with keyboard navigation and Headless UI components.
* 🧪 **Testing**: Tested using **Vitest** and **@testing-library/react** for unit and interaction tests.

## ⚙️ Approach

### 1. **Project Setup**

* Initialized with `Vite` using React + TypeScript.
* Tailwind CSS configured for rapid UI prototyping.
* ESLint and Prettier added for consistent code quality.

### 2. **Data-Driven Architecture**

* Skip options are loaded from a remote JSON endpoint or local mock data.
* Each skip has attributes like `size`, `price`, `hirePeriod`
* A single image has been used for all skips, since the link API is not responding with images for each skip item

### 3. **Filtering Logic**

* A floating panel allows users to filter using checkboxes.
* State is maintained using `useState` and filters are applied with `Array.prototype.filter`.

### 4. **UI/UX Patterns**

* Carousel built using a scrollable container and `useRef`.
* Modal displayed using Headless UI’s `<Dialog />` component for accessibility.
* Floating filter panel toggles visibility, improving space use especially on mobile.

### 5. **Testing Strategy**

* Unit tests validate filtering, selection, and modal interaction.
* Accessibility tests ensure that keyboard and screen reader interactions are valid.

## 📂 Folder Structure

```
src/
├── components/         # Reusable components (FilterPanel, SkipCard, SkipModal, etc.)
├── sections/               # Mock or fetched data
├── hooks/              # Custom hooks (e.g., useClickOutside)
├── __tests__/          # Vitest + RTL test cases
├── sections/           # Section components
├── App.tsx             # Root component
├── main.tsx            # Entry point
```

## 🥪 Running the App

```bash
npm install
npm run dev
```

## 🥪 Running Tests

```bash
npm run test
```

## 📌 Future Improvements

* Use local storage to enhance performance
* Add lazy loading, pages for skips, just incase there might be millions of skips
* Further refactoring for subcomponents like SkipModalWithTransition, FilterPanel etc
* Add more unit and integration tests
