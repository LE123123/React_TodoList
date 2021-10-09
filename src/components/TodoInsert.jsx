import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import 'css/TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState('');

  // 리 렌더링 될 때 마다 함수를 새로 만드는 것이 아니라, 한 번 함수를 만들고 재사용 할 수 있도록 useCallback Hook을
  // 사용 하는 것이 좋다.
  const onChange = useCallback((event) => {
    const {
      target: { value: inputValue },
    } = event;
    setValue(inputValue);
  }, []);

  const onSubmit = useCallback(
    (event) => {
      onInsert(value);
      setValue('');
      event.preventDefault();
    },
    [onInsert, value],
  );

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input type="text" placeholder="할 일을 입력하세요" onChange={onChange} />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
