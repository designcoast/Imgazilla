
export const calculateSize = ({ type, value, width, height }) => {
  if (type === 'WIDTH' || type === 'HEIGHT') {
    return `${value}x${value}`
  }

  const calcWidth = width * value;
  const calcHeight = height * value;

  return `${calcWidth}x${calcHeight}`
}