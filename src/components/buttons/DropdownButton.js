/*
 * @flow
 */

import React from 'react';
import styled, { css } from 'styled-components';

import downArrowIcon from '../../assets/svg/down-arrow.svg';
import selectedDownArrowIcon from '../../assets/svg/down-arrow-white.svg';
import BasicButton from './BasicButton';

type Props = {
  title :string,
  options :{ label :string, onClick :() => void }[],
  openAbove? :boolean,
  fullSize? :boolean
}

type State = {
  open :boolean
}

const DropdownButtonWrapper = styled.div`
  border: none;
  ${(props) => {
    if (props.open) {
      return css`
        box-shadow: 0 2px 8px -2px rgba(17, 51, 85, 0.15);
      `;
    }
    return '';
  }}
  width: ${props => (props.fullSize ? '100%' : 'auto')};
  display: flex;
  flex: 0 auto;
  flex-direction: column;
  margin: 0;
  padding: 0;
  position: relative;
`;

const BaseButton = styled(BasicButton)`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 600;
  position: relative;

  img {
    margin-left: 10px;
  }

  background-color: ${props => (props.open ? '#8e929b' : '#f0f0f7')};
  color: ${props => (props.open ? '#ffffff' : '#8e929b')};

  &:hover {
    background-color: ${props => (props.open ? '#8e929b' : '#f0f0f7')} !important;
    color: ${props => (props.open ? '#ffffff' : '#8e929b')} !important;
  }
`;

const MenuContainer = styled.div`
  background-color: #fefefe;
  border-radius: 5px;
  border: 1px solid #e1e1eb;
  position: absolute;
  z-index: 1;
  min-width: max-content;
  max-width: ${props => (props.fullSize ? '100%' : '400px')};
  width: ${props => (props.fullSize ? '100%' : 'auto')};
  visibility: ${props => (props.open ? 'visible' : 'hidden')}};
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
  top: ${props => (props.openAbove ? 'auto' : '45px')};
  bottom: ${props => (props.openAbove ? '45px' : 'auto')};
  right: ${props => (props.openAbove ? 'auto' : '0')};;
  left: ${props => (props.openAbove ? '0' : 'auto')};;
  overflow: visible;
  display: flex;
  flex-direction: column;

  button {
    width: 100%;
    padding: 15px 20px;
    text-transform: none;
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    color: #555e6f;
    border: none;
    min-width: fit-content !important;

    &:hover {
      background-color: #e6e6f7;
    }
  }
`;

export default class DropdownButton extends React.Component<Props, State> {

  static defaultProps = {
    openAbove: false,
    fullSize: false
  };

  constructor(props :Props) {
    super(props);
    this.state = {
      open: false
    };
  }

  toggleDropdown = (e) => {
    e.stopPropagation();
    this.setState({ open: !this.state.open });
  };

  getOptionFn = (optionFn) => {
    return (e) => {
      e.stopPropagation();
      optionFn(e);
    }
  }

  handleOnClick = (e) => {
    e.stopPropagation();
    this.setState({ open: false });
  }

  render() {
    const imgSrc = this.state.open ? selectedDownArrowIcon : downArrowIcon;
    return (
      <DropdownButtonWrapper open={this.state.open} {...this.props}>
        <BaseButton open={this.state.open} onClick={this.toggleDropdown} onBlur={this.toggleDropdown}>
          {this.props.title}
          <img src={imgSrc} role="presentation" />
        </BaseButton>
        <MenuContainer open={this.state.open} {...this.props}>
          {this.props.options.map(option =>
            (
              <button key={option.label} onClick={this.handleOnClick} onMouseDown={option.onClick}>
                {option.label}
              </button>))
          }
        </MenuContainer>
      </DropdownButtonWrapper>
    );
  }
}
