import * as React from 'react';
import { SafeAreaView, StatusBar, View, Image } from 'react-native';
import styled from 'styled-components';

import {StatusBarContent} from 'types/IScreen'
import bgImgSrc from 'images/bgWave.png';

export interface ISafeAreaBackground {
  bgImg?: ImageBitmapSource;
  bgColor?: string;
  children?: any;
  statusBarContent?: StatusBarContent
}

export default function SafeAreaBackground({ children, bgImg, bgColor, statusBarContent }: ISafeAreaBackground) {
  const src = bgImg || bgImgSrc;
  return (
    <Wrapper style={{ backgroundColor: bgColor }}>
      <StatusBar translucent backgroundColor="transparent" barStyle={statusBarContent || StatusBarContent.DARK}/>
      {(bgImg || !bgColor) && <BackgroundImage source={src} resizeMode="cover" />}
      <WrapperSafe>
          {children}
      </WrapperSafe>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  flex: 1;
`;

const WrapperSafe = styled(SafeAreaView)`
  flex: 1;
`;

const BackgroundImage = styled(Image)`
  flex: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
