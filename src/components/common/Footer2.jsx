import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer2 = () => {
  return (
   <Wrapper>
    <Container>
        <div className="logo-section">
            <div className="image">Artcart</div>
            <p>Email us : support@artcart.com</p>
        </div>

        <div className="detail-section">
            <h2>ArtCart</h2>
            <ul>
                <StyledLink><li>About us</li></StyledLink>
                <StyledLink><li>FAQS</li></StyledLink>
                <StyledLink><li>Privacy Policy</li></StyledLink>
            </ul>
        </div>
        <div className="social-section">
        <h2>Follow Us</h2>
            <ul>
                <li><StyledLink to='#' >About us</StyledLink></li>
                <li><StyledLink to='#'>FAQS</StyledLink></li>
                <li><StyledLink to='#'>Privacy Policy</StyledLink></li>
               
            </ul>
        </div>
        <div className="connect-section">
        <h2>Grow With us</h2>
            <ul>
                <StyledLink><li>Be a Seller</li></StyledLink>
                <StyledLink><li>Become an Affiliate</li></StyledLink>
            </ul>
        </div>
    </Container>
    <Copyright>
        <hr id='line'></hr>
        All @copyright reserved 2024
    </Copyright>
   </Wrapper>
  )
}

export default Footer2

const Wrapper = styled.section`
    height: 38vh;
    background-image: linear-gradient(45deg, #107286, #3dfadb);
    display: flex;
   
    flex-direction: column;
    
`
const StyledLink = styled(Link)`
    text-decoration: none;
`
const Container = styled.div`
    margin: 20px 20px 0;
    height: 30rem;
    
    display: grid;
    grid-template-columns: repeat(4,1fr);
    
    gap: 10px;

    .image{
        font-size: 20px;
        font-weight: 400;
    }
    ul{
        list-style: none;
    }
    
   p{
    font-weight: 400;
   }
    .logo-section{
       
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        
    }
    .detail-section{
      
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      
    }
    .social-section{
        
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

    }
    .connect-section{
        
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

       
    }

`
const Copyright = styled.p`
    text-align: center;
   
    padding-bottom: 20px;
   
    #line{
        width: 90%;
        background-color: black;
        border: none;
        height: 1px;
    }
   
`
