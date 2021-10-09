/* eslint-disable object-curly-newline */
/* eslint-disable no-plusplus */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import React, { useState, useRef, useCallback } from 'react';
import TodoList from 'components/TodoList';
import TodoTemplate from 'components/TodoTemplate';
import TodoInsert from 'components/TodoInsert';

function createBulkTodos() {
  let array = [];
  for (let i = 0; i <= 2500; i++) {
    array = [
      ...array,
      ...[
        {
          id: i,
          text: `할 일 ${i}`,
          checked: false,
        },
      ],
    ];
  }
  console.log('doing');
  return array;
}

const App = () => {
  const [todos, setTodos] = useState(createBulkTodos);
  // useState에 함수를 넣어주면 컴포넌트가 처음 렌더링 될때만 createBulkTodos 함수가 실행된다.

  const nextId = useRef(2501);

  // todos 배열이 매번 업더에트 되면 onRemove와 onToggle 함수도 새롭게 바뀐다.
  // onRemove와 onToggle함수는 배열 상태를 업데이트 하는 과정에서 최신 상태의 todos를 참조하기 때문에
  // todos 배열이 바뀔 때마다 함수가 새로 만들어 집니다.

  const onInsert = useCallback((text) => {
    const todo = [
      {
        id: nextId.current,
        text,
        checked: false,
      },
    ];
    setTodos((prev) => [...prev, ...todo]);
    nextId.current += 1; // nextId 1씩 더해줘야 한다.
  }, []);

  const onRemove = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const onToggle = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
