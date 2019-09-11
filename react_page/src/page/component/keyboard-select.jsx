import React from 'react';
import RRS from 'react-responsive-select';
import './keyboard-select.css';
const onChange = (newValue) => console.log('onChange', newValue);
const onSubmit = () => console.log('onSubmit');
 
export const KeyboardUpDown = () => (
  <form>
    <RRS
      name="make"
      options={[
        { text: 'Any', value: 'null' },
        { text: 'Oldsmobile', value: 'oldsmobile', markup: <span>Oldsmobile</span> },
        { text: 'Ford', value: 'ford', markup: <span>Ford</span> },
        { text: 'Any', value: 'null' },
        { text: 'Oldsmobile', value: 'oldsmobile', markup: <span>Oldsmobile</span> },
        { text: 'Ford', value: 'ford', markup: <span>Ford</span> },
        { text: 'Any', value: 'null' },
        { text: 'Oldsmobile', value: 'oldsmobile', markup: <span>Oldsmobile</span> },
        { text: 'Ford', value: 'ford', markup: <span>Ford</span> },
        { text: 'Any', value: 'null' },
        { text: 'Oldsmobile', value: 'oldsmobile', markup: <span>Oldsmobile</span> },
        { text: 'Ford', value: 'ford', markup: <span>Ford</span> },
        { text: 'Any', value: 'null' },
        { text: 'Oldsmobile', value: 'oldsmobile', markup: <span>Oldsmobile</span> },
        { text: 'Ford', value: 'ford', markup: <span>Ford</span> }
      ]}
      selectedValue="oldsmobile"
      onSubmit={onSubmit}
      onChange={onChange}
    //   caretIcon={<CaretIcon />}
    />
  </form>
);
const CaretIcon = ()=>{
    return(
        <i className="icon"></i>
    );
}