import React from 'react';
import { ListItem } from '../ListItem/ListItem';
import { selectListByFilter } from '../../store';
import { useSelector } from 'react-redux';

export const List = () => {
  const list = useSelector(selectListByFilter);
  return (
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
  );
};
