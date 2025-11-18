export const generateRandomColorClass = () => {
  const colors = [
    'primary',
    'blue',
    'green',
    'yellow',
    'cyan',
    'pink',
    'indigo',
    'teal',
    'orange',
    'purple',
    'red',
  ];
  const index = Math.floor(Math.random() * colors.length);

  return [`text-${colors[index]}-50`, `bg-${colors[index]}-500`];
};
export const generateRandomColor = (hue = '500') => {
  const colors = [
    'primary',
    'blue',
    'green',
    'yellow',
    'cyan',
    'pink',
    'indigo',
    'teal',
    'orange',
    'purple',
    'red',
  ];
  const index = Math.floor(Math.random() * colors.length);

  console.log(`Color`, `var(--${colors[index]}-${hue});`);
  return `var(--${colors[index]}-${hue})`;
};
