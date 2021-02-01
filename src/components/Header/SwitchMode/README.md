# SwitchMode Component

It is used to render button for switching to the dark mode.

## Code example
How to use SwitchMode component:
```
<SwitchMode
  classBlock="switch-mode"
  icon={`${darkMode ? "fas" : "far"} fa-moon`}
  onToggle={() => setDarkMode(!darkMode)}
  label="Dark Mode"
/>
```