import React, { useEffect } from 'react';
import { ListItem } from '../ListItem/ListItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectListByFilter } from '../../redux/selectors';
import { getElements } from '../../redux/actions';
import { Store } from '../../redux/reducers/todos';

enum REQUEST_STATUS {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR
}

export const List = () => {
  const list = useSelector(selectListByFilter);
  const requestState = useSelector((store: Store) => store.requestStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getElements());
  }, []);

  return (
    <>
      {requestState === REQUEST_STATUS.LOADING && 'Loading...'}
      <ul>
        {list.map((item, index) => (
          <ListItem
            key={item.id}
            item={item}
            isFirst={index === 0}
            isLast={index === list.length - 1}
          />
        ))}
      </ul>
    </>
  );
};
