import React from 'react';
import { ListItem } from '../ListItem/ListItem';
import { useSelector } from 'react-redux';
import { selectListByFilter } from '../../redux/selectors';

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
