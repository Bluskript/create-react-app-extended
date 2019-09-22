import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeText } from '../../store/actions/AppActions';

const App = () => {
  const { text } = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <div className="header">
      <h1>{text}</h1>
      <input onInput={event => dispatch(changeText(event.currentTarget.value))} type="text" />
    </div>
  );
};

export default App;
