import styled from 'styled-components';
import { FONT_FAMILY } from 'constants/typography';
import { WHITE } from 'constants/colours';

export const Error = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${WHITE};
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-family: ${FONT_FAMILY};
  font-size: 24px;
`;

export const Image = styled.img`
  width: ${({ props }) => props.width || 'auto'};
  height: ${({ props }) => props.height || 'auto'};
  margin-top: ${({ props }) => props.marginTop || 'auto'};
  margin-bottom: ${({ props }) => props.marginBottom || 'auto'};
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  max-width: 100%;
  max-height: 100%;
  position: relative;
`;

export const Loading = styled.div`
  opacity: ${({ loading }) => (loading ? '1' : '0')};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${WHITE};
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-family: ${FONT_FAMILY};
  font-size: 24px;
  transition: opacity 0.5s;
`;
