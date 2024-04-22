import React from 'react';
import { NavLink } from 'react-router-dom'; // Assuming you're using React Router
import styled from 'styled-components';

class Test2 extends React.Component {
  handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation(); // Prevent the event from bubbling up to the parent div
    console.log('Child div clicked');
  }

  render() {
    return (
      <NavLink to="/">
        <Parent>
          Parent Div (Nav Link)
          <div className='c' onClick={this.handleClick}>
            Child Div
          </div>
        </Parent>
      </NavLink>
    );
  }
}

export default Test2;
const Parent = styled.div`
    border: 1px solid black;
    height: 7rem;
    width: 50%;
    display: flex;
    flex-direction: column;

    .c{
        border: 1px solid black;
        padding-top: 10px;
        width: 10%;
        background-color: aqua;
    }
`