/**
 * @description Setting style
 * 
 * @param theme Dark theme and light theme
 */
export const parseTheme = (theme: {variable: string; value: string}[]): void => {
  const style = document.documentElement.style;

  theme.forEach(({ variable, value }) => {
    style.setProperty(variable, value);
  })
}
