import { formatDistanceToNow } from 'date-fns';

const getDateToNow = (date:string) => {
  const validDate = new Date(+date);  
  return formatDistanceToNow(validDate, {addSuffix: true});
}

export default getDateToNow;