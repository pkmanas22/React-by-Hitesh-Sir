## Summary of Key Functions:
- `ThemeProvider:` Wraps components that need access to theme settings.
- `useTheme:` Custom hook that consumes the ThemeContext.
- `lightTheme / darkTheme:` Functions passed through the context to change the theme.
- `themeMode:` Tracks the current theme mode (light or dark).

## Context Flow:
- The App component maintains the theme state (`themeMode`).
- `ThemeProvider` supplies `themeMode`, `lightTheme`, and `darkTheme` to its child components.
- The `ThemeBtn` component uses `useTheme` to access and change the theme mode based on user interaction.