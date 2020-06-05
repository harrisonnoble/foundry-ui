import React from 'react';
import UnstyledIcon from '@mdi/react';
import { mdiLoading } from '@mdi/js';
import styled, { StyledComponentBase } from 'styled-components';
import ButtonContainer, { ButtonTypes, ButtonContainerProps } from './ButtonContainers';
import Progress from '../Progress/Progress';

export type ButtonProps = {
  StyledContainer?: string & StyledComponentBase<any, {}, ButtonContainerProps>;
  iconPrefix?: string | JSX.Element;
  iconSuffix?: string | JSX.Element;
  isLoading?: boolean;
  isProcessing?: boolean;
  children?: string | Node;
  elevation?: number;
  type?: string;
  color?: string;
  onClick: (...args: any[]) => void;
};

const Icon = styled(UnstyledIcon)``;

const Text = styled.span`
  display: inline-block;
  margin-top: -8px;
  margin-bottom: -8px;
`;

export const StyledProgress = styled(Progress)`
  width: 5rem;
  height: 10px;
  margin-top: -5px;
  margin-bottom: -5px;
`;

const LeftIconContainer = styled(Text)`
  margin-right: 0.25rem;
`;

const RightIconContainer = styled(Text)`
  margin-left: 0.25rem;
`;

const Button = ({
  StyledContainer,
  iconPrefix,
  iconSuffix,
  isLoading,
  isProcessing,
  children,
  elevation = 0,
  type = ButtonTypes.fill,
  color,
  onClick,
}: ButtonProps) => {
  const Container = StyledContainer || ButtonContainer;
  return isLoading ? (
    <Container data-test-id="hsui-button" elevation={elevation} color={color} type={type}>
      <Progress />
    </Container>
  ) : (
    <Container
      data-test-id="hsui-button"
      onClick={onClick}
      elevation={elevation}
      color={color}
      type={type}
    >
      <Text>
        {!isProcessing &&
          iconPrefix &&
          (typeof iconPrefix === 'string' && iconPrefix !== '' ? (
            <LeftIconContainer>
              <Icon path={iconPrefix} size="1rem" />
            </LeftIconContainer>
          ) : (
            <LeftIconContainer>{iconPrefix}</LeftIconContainer>
          ))}
        {isProcessing && (
          <LeftIconContainer>
            <Icon path={mdiLoading} size="1rem" spin={1} />
          </LeftIconContainer>
        )}
        {children}

        {iconSuffix &&
          (typeof iconSuffix === 'string' ? (
            <RightIconContainer>
              <Icon path={iconSuffix} size="1rem" />
            </RightIconContainer>
          ) : (
            <RightIconContainer>{iconSuffix}</RightIconContainer>
          ))}
      </Text>
    </Container>
  );
};

Button.Container = ButtonContainer;
Button.Types = ButtonTypes;
export default Button;
