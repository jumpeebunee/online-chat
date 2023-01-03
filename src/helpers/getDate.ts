const getDate = (milliseconds: string) => {
  const date = new Date(+milliseconds * 1000);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  return `${hour}:${minutes}`;
}

export default getDate; 