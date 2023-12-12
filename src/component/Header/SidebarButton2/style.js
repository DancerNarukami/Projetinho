import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #212B38; 
  font-size: 20px;
  padding: 10px;
  padding-left:20px
  cursor: pointer;
  border-radius: 10px;
  margin: 0 15px 20px;

  font-size: 15px;
  font-weight: bold;
  color: #8f99bd;
  text-align: center;
  line-height: 35px;
  border: solid 1px #8f99bd;


  > svg {
    margin: 0 20px;
  }

  &:hover {
    background-color: #white;
    color: white;
  }
`;