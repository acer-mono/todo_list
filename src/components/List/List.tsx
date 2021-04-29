import React from 'react';
import { ListItem } from '../ListItem/ListItem';
import { useSelector } from 'react-redux';
import { selectListByFilter } from '../../redux/selectors';
//import { getElements } from '../../redux/actions';

export const List = () => {
  const list = useSelector(selectListByFilter);
  //const dispatch = useDispatch();

  /*  useEffect(() => {
    dispatch(getElements());
  }, []);*/

  return (
    <>
      {list.map(item => (
        <ListItem key={item.id} item={item} />
      ))}
    </>
  );
};
