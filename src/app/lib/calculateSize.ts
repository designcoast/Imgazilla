export const scaleFormat = ({ type, value }) => {
  if (type === 'WIDTH' || type === 'HEIGHT') {
    return `${value}x${value}`;
  }

  return `${value || '1'}x`;
};
