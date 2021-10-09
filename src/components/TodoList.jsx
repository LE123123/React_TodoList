import React, { useCallback } from 'react';
import { List } from 'react-virtualized'; // 불피요한 렌더링 필요없게 만들어 주는 거
import TodoListItem from './TodoListItem';
import 'css/TodoList.scss';

const TodoList = ({ todos, onRemove, onToggle }) => {
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [onRemove, onToggle, todos],
  );
  return (
    <List
      className="TodoList"
      width={512}
      height={513}
      rowCount={todos.length}
      rowHeight={57}
      rowRenderer={rowRenderer}
      list={todos}
      style={{ outline: 'none' }}
    />
  );
};

export default React.memo(TodoList);
// 현재 상태에서는 불 필요한 리렌더링이 발생하지 않습니다.
// 하지만 App컴포넌트에 다른 state가 추가되어 해당 값들이 업데이트될 때는
// TodoList 컴포넌트가 불필요한 리렌더링을 할 수 있기 때문이다. -> 미리 React.memo를 통해 최적화를 해 준 것이다.
