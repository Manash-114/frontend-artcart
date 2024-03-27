import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const FeaturedProducts = () => {
    return (
        <Wrapper>
            <Title>Featured Products</Title>
            <Container>
                <div className="Listitem item1">
                <Link to='sunset'><div className="image img1"></div></Link>
                    <div className="content">
                        <Star> <img src='./public/images/star.png' />
                            <span id='rating'>(5)</span>
                        </Star>
                        <div className="detail">
                            <Profile>
                                <div className="profile-icon">
                                    <img src='./public/images/profile.png' /></div>
                                <div className="profile-detail">
                                    <span id="profile-title">Title</span>
                                    <span id="profile-author">by- Author</span>
                                </div>
                            </Profile>
                            <Price>
                                <img src='./public/images/ruppee.png' /><span id="money">700</span></Price>
                        </div>
                    </div>
                </div>

                <div className="Listitem item2">
                <Link to='sunset'><div className="image img2"></div></Link>
                    <div className="content">
                        <Star> <img src='./public/images/star.png' />
                            <span id='rating'>(4)</span>
                        </Star>
                        <div className="detail">
                            <Profile>
                                <div className="profile-icon">
                                    <img src='./public/images/profile.png' /></div>
                                <div className="profile-detail">
                                    <span id="profile-title">Title</span>
                                    <span id="profile-author">by- Author</span>
                                </div>
                            </Profile>
                            <Price>
                                <img src='./public/images/ruppee.png' /><span id="money">340</span></Price>
                        </div>
                    </div>
                </div>

                <div className="Listitem item3">
                <Link to='sunset'><div className="image img3"></div></Link>
                    <div className="content">
                        <Star> <img src='./public/images/star.png' />
                            <span id='rating'>(5)</span>
                        </Star>
                        <div className="detail">
                            <Profile>
                                <div className="profile-icon">
                                    <img src='./public/images/profile.png' /></div>
                                <div className="profile-detail">
                                    <span id="profile-title">Title</span>
                                    <span id="profile-author">by- Author</span>
                                </div>
                            </Profile>
                            <Price>
                                <img src='./public/images/ruppee.png' /><span id="money">800</span></Price>
                        </div>
                    </div>
                </div>
            </Container>

            <Link to='red'><Button>See More</Button></Link>
        </Wrapper>
    )
}

export default FeaturedProducts

const Wrapper = styled.section`
    /* border: 1px solid black; */
    height: 95vh;
    /* background-color: aqua; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const Title = styled.h2`
    text-transform: uppercase;
    padding-top: 10px;
    text-align: center;
`
const Profile = styled.div`
    height: 50px;
    width: 150px;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
   
    .profile-icon{
        flex: 1;
        img{
            height: 35px;
            width: 30px;
        }
    }
    .profile-detail{
        flex: 3;
       display: flex;
       flex-direction: column;
       
       #profile-title{
            font-weight: 700;
       }
       #profile-author{
            font-size: 12px;
            font-weight: 500;
       }
    }
`
const Price = styled.div`
    #money{
        font-weight: 700;
        color: #0cd516;
        padding: 5px;
    }
`
const Star = styled.div`
    padding: 10px 30px;
    display: flex;
    gap: 5px;

   #rating{
    font-size: 14px;
    font-weight: 450;
    color: #6d4204;
   }
`
const Container = styled.div`
    
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 80%;
    width: 75%;
    gap: 30px;
    padding: 10px 180px;

    .Listitem{
        transition: box-shadow 0.3s ease; 
        &:hover {
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.7); 
        }
        height: 480px;
        width: 100%;
        border: 1px solid rgba(0, 0, 0, .4);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
        cursor: pointer;
        .image{
            height: 80%;
            width: 100%;
            background-color: antiquewhite;
           
        }
        .img1{
            background: url('/public/images/theme1.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            
        }
        
        .img2{
            background: url('/public/images/panther.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
        .img3{
            background: url('/public/images/nature.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
        .icon{
            display: flex;

        }
        .detail{
            display: flex;
            justify-content: space-between;
            padding: 0 18px;
            height: 48px;
        }
    }
`
const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
    margin-bottom: 20px;
    height: 50px;
    width: 160px;
   
`