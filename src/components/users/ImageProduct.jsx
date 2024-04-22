import React, { useState } from 'react'
import styled from 'styled-components'

const ImageProduct = ({data}) => {
  const [curImage, setImage] = useState(0);
  const handleImageClick = (index) => {
    setImage(index);
  };

  // console.log(data)
  return (
    <Wrapper>
      {data ? (
        <Container>
        <div className="main-screen">
          <div className="main-figure">
          <img src={data.images[curImage]} alt={data.title} />
          </div>
          
      </div>

      <div className="grid-cols"> 
        {data.images.map((i, index) => (
          <div className="figure" key={index} onClick={() => handleImageClick(index)} >
               <img src={i} alt={data.title} />
          </div>  
        ))}
      </div>
      </Container>
      ): (
        <></>
      )}
      
    </Wrapper>
  )
}

export default ImageProduct

const Container = styled.div`
`

const Wrapper = styled.section`
  display: flex;
  flex: 1;
 
  display: flex;
  justify-content: center;
  align-items: center;

  .main-screen{
    
    display: flex;
    flex: 1;
    padding: 10px;
    justify-content: center;
    overflow: hidden;
    /* margin-bottom: 13%; */
  }
  .main-figure{
    height: 300px;
    
  }
  .main-figure > img{
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .grid-cols{
    background-color: #eef2f5;
    flex: 1;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 10px 10%;
    gap: 10px;
    margin-top: 5%;

  }
  .figure{
    height: 80%;
    padding: 10px;
  }
  .figure > img{
     cursor: pointer;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`
