import * as React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  TouchableOpacityProps,
  ImageSourcePropType,
  View,
} from 'react-native';
import styled from 'styled-components';
import STYLES from 'constants/styles';

interface IButtonProps extends TouchableOpacityProps {
  label: string;
  color?: string;
  bgColor?: string;
  hasBorder?: boolean;
  image?: ImageSourcePropType;
  onPress: () => void;
  rotate?: number | boolean;
}

export default function Button({
  label,
  color = STYLES.color.white,
  bgColor = 'transparent',
  hasBorder = true,
  onPress,
  image,
  rotate,
  style,
  ...props
}: IButtonProps) {
  const borderColor = hasBorder ? color : 'transparent';
  let rotateStyle = null;
  if (rotate) {
    if (rotate === true) {
      rotateStyle = { transform: [{ rotate: '-90deg' }] };
    } else {
      rotateStyle = { transform: [{ rotate: `${rotate}deg` }] };
    }
  }
  return (
    <TouchableOpacityStyled
      onPress={onPress}
      activeOpacity={0.5}
      {...props}
      style={[style, { borderColor, backgroundColor: bgColor }, rotateStyle]}
    >
      <Label style={{ color }}>{label}</Label>
      {image && <IconImage source={image} resizeMode="contain" />}
    </TouchableOpacityStyled>
  );
}

const TouchableOpacityStyled = styled(TouchableOpacity)`
  flex: 1;
  width: 100%;
  height: ${STYLES.size.buttonHeight}px;
  max-height: ${STYLES.size.buttonHeight}px;
  overflow: hidden;
  border-radius: ${STYLES.size.buttonRadius}px;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  border-width: 2px;
`;

const Label = styled(Text)`
  width: 100%;
  font-family: ${STYLES.fontFamily.medium};
  font-style: normal;
  font-size: ${STYLES.fontSize.btn}px;
  line-height: ${STYLES.fontSize.label * 1.2}px;
  text-align: center;
`;

const IconImage = styled(Image)`
  width: 20px;
  height: 20px;
`;
