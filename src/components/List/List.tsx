import React, { useCallback, useEffect, useState } from 'react';
import { ListItem } from '../ListItem/ListItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectListByFilter } from '../../redux/selectors';
import { addError, loadMessages } from '../../redux/actions';
const url = 'http://localhost:3001/todos';

enum REQUEST_STATUS {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR
}

export const List = () => {
  const list = useSelector(selectListByFilter);
  const [requestState, setRequestState] = useState(REQUEST_STATUS.IDLE);
  const dispatch = useDispatch();

  const fetchMyAPI = useCallback(async () => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (!response.ok) {
      throw data.error;
    } else {
      return data;
    }
  }, []);

  useEffect(() => {
    setRequestState(REQUEST_STATUS.LOADING);
    fetchMyAPI()
      .then(data => {
        dispatch(loadMessages({ list: data }));
        setRequestState(REQUEST_STATUS.SUCCESS);
      })
      .catch(e => {
        dispatch(addError({ error: e }));
        setRequestState(REQUEST_STATUS.ERROR);
      });
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
