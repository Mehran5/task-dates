import styled from 'styled-components';

export const FlexContainer = styled.div`
    display: flex;
    flex-flow: wrap;
    justify-content: center;
   
`;

export const Content = styled.div`
    padding: 20px;
    border: 1px solid #ebebeb;
    padding: 50px;
    background: #e2e1e1;
    margin: 60px;
    border-radius: 10px;
    box-shadow: 0px 0px 15px 0px #ebebeb;
    max-height: 635px;
    overflow-x: auto;
`;

export const ContentName = styled.span`
    font-size: 16px;
    font-family: "Segoe UI",Roboto;
`;

export const SlotButton = styled.button`
    appearance: button;
    background-color: #405cf5;
    border-radius: 6px;
    border-width: 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    font-family: "Segoe UI",Roboto;
    font-size: 100%;
    height: 44px;
    line-height: 1.15;
    margin: 12px 0 0;
    outline: none;
    overflow: hidden;
    padding: 0 25px;
    :hover {
        color: #405cf5;
        background-color: #fff;
    }
`;