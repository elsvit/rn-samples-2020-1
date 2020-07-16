import {FormikProps, withFormik} from 'formik';
import * as React from 'react';
import {ScrollView, Text, View} from 'react-native';
import * as yup from 'yup';

import SafeAreaBackground from 'components/blocks/SafeAreaBackground';
import {MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH} from 'constants/data';
import {ERROR_MSG as ERROR_MSG_DEF} from 'constants/errorMsg';
import STYLES from 'constants/styles';
import {trimValues} from 'services/utils';
import styled from 'styled-components';
import {DEFAULT_SIGNIN_USER, ISignInUser} from 'types/IAuth';
import {Button, InputMaterial, LogoImage} from 'ui';


interface IOwnProps {
  onSignIn: (user: ISignInUser) => void;
  onSignUp: () => void;
}

type ILoginViewProps = IOwnProps & FormikProps<ISignInUser>;

const ERROR_MSG = ERROR_MSG_DEF || {};

export const yupSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email(ERROR_MSG.EMAIL_NOT_VALID)
    .required(ERROR_MSG.EMAIL_REQUIRED),
  password: yup
    .string()
    .trim()
    .required(ERROR_MSG.PASSWORD_REQUIRED)
    .min(MIN_PASSWORD_LENGTH, ERROR_MSG.PASSWORD_NOT_VALID)
    .max(MAX_PASSWORD_LENGTH, ERROR_MSG.PASSWORD_NOT_VALID),
});

const LoginView = ({
  values,
  errors,
  touched,
  onSignIn,
  onSignUp,
  handleSubmit,
  setFieldValue,
  setFieldTouched,
}: ILoginViewProps) => {
  const setValue = (type: string, val: string) => {
    setFieldValue(type, val);
    setFieldTouched(type, true);
  };

  return (
    <SafeAreaBackground>
      <WrapperScrollable
        contentContainerStyle={{
          alignItems: 'flex-start',
          paddingHorizontal: 20,
          paddingTop: 40,
          minHeight: 200,
          paddingBottom: 20,
        }}
      >
        <LogoContainer>
          <LogoImage />
        </LogoContainer>

        <TitleContainer>
          <TitleText>SOME TEXT</TitleText>
        </TitleContainer>

        <InputMaterial
          label="Email"
          value={values.email}
          error={touched.email ? errors.email : ''}
          onChangeText={(val: string) => setValue('email', val)}
        />

        <InputMaterial
          label="Password"
          secureTextEntry
          value={values.password}
          error={touched.password ? errors.password : ''}
          onChangeText={(val: string) => setValue('password', val)}
        />

        <ButtonsContainer>
          <Button label="SIGN IN" onPress={handleSubmit} />
          <JoinWrapper>
            <Button label="JOIN" onPress={onSignUp} hasBorder={false} />
          </JoinWrapper>
        </ButtonsContainer>
      </WrapperScrollable>
    </SafeAreaBackground>
  );
};

const WrapperScrollable = styled(ScrollView)`
  flex: 1;
`;

const LogoContainer = styled(View)`
  flex: 1;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const TitleContainer = styled(View)`
  flex: 1;
  width: 100%;
  margin-top: 28px;
  margin-bottom: 28px;
  justify-content: flex-start;
  align-items: center;
`;

const TitleText = styled(Text)`
  font-family: ${STYLES.fontFamily.bold};
  font-size: ${STYLES.fontSize.title}px;
  color: ${STYLES.color.white};
`;

const ButtonsContainer = styled(View)`
  width: 100%;
  padding: 0 15%;
  align-items: center;
  margin-top: 0;
`;

const JoinWrapper = styled(View)`
  margin-top: 17px;
`;

export default withFormik<IOwnProps, ISignInUser>({
  mapPropsToValues() {
    return DEFAULT_SIGNIN_USER;
  },
  validationSchema: yupSchema,
  validateOnChange: true,
  async handleSubmit(values, { props }) {
    props.onSignIn(trimValues(values, Object.getOwnPropertyNames(DEFAULT_SIGNIN_USER)));
  },
})(LoginView);
