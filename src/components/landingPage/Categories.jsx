import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Categories = ({ data }) => {
  return (

    <Wrapper>
      <Title>Featured Category</Title>
      <Container>
        {data.map((item, index) => (
          <GridItem key={index}
            className={`grid-item item${index + 1}`}
            style={{ backgroundImage: `url(${item.img})` }}>

            <Link to={`/products/${item.cat}`} />
            <button>{item.cat}</button>
            
          </GridItem>
        ))}
      </Container>
    </Wrapper>
  )
}

export default Categories

const Wrapper = styled.section`
  height: 80vh;
`
const GridItem = styled.div`
  border: 1px solid #938c8cb9;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  transition: box-shadow 0.3s ease; 
  cursor: pointer;
  &:hover {
    box-shadow: 0px 6px 8px rgba(44, 211, 172, 0.7); 
  }

`;
const Title = styled.h2`
  display: flex;
  justify-content: center;
  height: 40px;
  padding-top: 20px;
  font-size: 2rem;
  text-transform: capitalize;
  color: #4eedad;
  margin: 1rem;
  margin-bottom: 2rem;
`

const Container = styled.div`
 
 height: 75%;
 position: relative;
 display: grid;
 grid-template-columns: repeat(3, 1fr);
 grid-template-rows: repeat(2, 1fr);
 gap: 10px;
 padding: 20px 100px;

  .grid-item {
  
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  button{
    text-transform: uppercase;
    height: 35px;
    width: 110px;
    background: linear-gradient(rgba(59, 59, 58, 0.692), rgba(0, 0, 0, 0.3));
    color: #ccdfd6;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    transition: box-shadow 0.3s ease; 
  &:hover {
    box-shadow: 0px 4px 8px rgba(84, 80, 80, 0.4); 
  }

  }
  
}

.item1{
  grid-row: 1 / span 2;
  
}
.item3{
  grid-column: 3;
  grid-row: 1/ span 2;
}

`


