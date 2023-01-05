const getDate = (milliseconds: string) => {
  const date = new Date(+milliseconds * 1000);
  const hour = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hour}:${minutes}`;
}

export default getDate; 