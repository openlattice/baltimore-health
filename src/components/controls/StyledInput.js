import styled, { css } from 'styled-components';

const style = css`
  display: flex;
  flex: 0 1 auto;
  width: ${props => props.width || '100%'};
  height: 45px;
  font-size: 16px;
  line-height: 19px;
  border-radius: 3px;
  background-color: #f9f9fd;
  border: solid 1px #dcdce7;
  color: #2e2e34;
  padding: 12px 20px;
  margin-bottom: ${props => (props.padBottom ? 20 : 0)}px;

  &:focus {
    box-shadow: inset 0 0 0 1px rebeccapurple;
    outline: none;
    background-color: #ffffff;
  }

  &::placeholder {
    color: #8e929b;
  }

  &:disabled {
    border-radius: 3px;
    background-color: #f9f9fd;
    border: solid 1px #dcdce7;
    color: #8e929b;
    font-weight: normal;
    cursor: default;
  }
`;

const StyledInput = styled.input`${style}`;
export const StyledTextArea = styled.textarea`
  ${style}
  height: 100px !important;
`;

export default StyledInput;
