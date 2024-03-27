import React from 'react'
import styled from 'styled-components'

const Dashboard = () => {
    return (
        <Wrapper>
            <div className="container">
                <div className="activity">
                    <h2>Module</h2>
                    sales</div>

                <div className="activity">
                    <h2>Module</h2>
                    purchase</div>

                <div className="activity">
                    <h2>Module</h2>
                    orders</div>
            </div>

            <div className="function-container">
                <h1>Items</h1>
            </div>
        </Wrapper>
    )
}

export default Dashboard

const Wrapper = styled.section`
    padding: 10px;
    .container{
      display: flex;
      padding: 10px;
      justify-content: space-between;
      align-items: center;
      height: 8rem;
      gap: 10rem;

      .activity{
        
        display: flex;
        flex-direction: column;
        justify-content: center;
      align-items: center;
      flex: 1;
      height: 80%;
      background-color: #b5c0ca;
      border-radius: 1rem;
    }
    }
   .function-container{
    width: 100%;
    height: 26
    rem;
    background-color: #dfbce8;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    justify-content: center;
   }
`