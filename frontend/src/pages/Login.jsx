import React, { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Divider,
  Group,
  Image,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
// @ts-ignore
import loginBg from '../assets/img/login-bg.png';
import { login, reset, register } from '../features/auth/authSlice';

const useStyles = createStyles((theme) => {
  const { height, width } = useViewportSize();
  return {
    bg: {
      minHeight: height,
      backgroundSize: 'contain',
      backgroundImage: `url(${loginBg})`,
    },
    wrapper: {
      minHeight: height - 172,
      height: height,
      backgroundSize: 'cover',
      background: 'rgba(32, 31, 31, 0.85)',
      display: 'flex',
      justifyContent: 'end',
      alignItems: 'center',

      [`@media (max-height: ${theme.breakpoints.sm}px)`]: {
        minHeight: height,
      },
      [`@media (max-width: 1180px)`]: {
        justifyContent: 'center',
      },
    },

    form: {
      borderRight: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
      width: '35%',
      minWidth: 580,
      maxWidth: 640,
      paddingTop: 80,
      marginRight: 96,
      borderRadius: 32,

      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
        maxWidth: '100%',
      },
    },

    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontSize: 36,
    },

    subTitle: {
      color: '#888',
      fontSize: 28,
    },

    logo: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      width: 120,
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    },

    footer: {
      position: 'fixed',
      bottom: '32px',
      left: '50%',
      marginLeft: '-136px',
      color: '#FFF',
    },
  };
});

const Login = () => {
  const { height, width } = useViewportSize();
  const { classes } = useStyles();
  const fullWidth = useMemo(() => {
    return 780 > width;
  }, [width]);
  const [indexStatus, setIndexStatus] = useState('login');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const { username, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    if (indexStatus === 'register') {
      if (password !== confirmPassword) {
        toast.error('输入的密码不一致，请检查并重新输入！');
        return false;
      }
    }
    const userData = {
      username,
      password,
    };

    indexStatus === 'register' ? dispatch(register(userData)) : dispatch(login(userData));
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <div className={classes.bg}>
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} align="left" mt={50}>
            管理后台
          </Title>
          <Title order={2} className={classes.subTitle} align="left" mt={8} mb={24}>
            欢迎登录
          </Title>
          <Divider size="md" mb={24} color="#707070" />

          <TextInput
            name="username"
            placeholder="用户名"
            size="lg"
            radius="lg"
            mb="md"
            onChange={onChange}
          />
          <PasswordInput
            name="password"
            placeholder="密码"
            mt="md"
            size="lg"
            radius="lg"
            onChange={onChange}
          />
          {indexStatus === 'register' ? (
            <PasswordInput
              name="confirmPassword"
              placeholder="确认密码"
              mt="md"
              size="lg"
              radius="lg"
              onChange={onChange}
            />
          ) : null}
          <Group
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
            }}>
            <Button
              fullWidth={fullWidth}
              mt="xl"
              size="md"
              color="blue"
              radius="xl"
              sx={{ width: '100%' }}
              onClick={onSubmit}>
              {indexStatus === 'register' ? '注册' : '登录'}
            </Button>
            {indexStatus === 'register' ? (
              <Text align="center" mt="md">
                已有账号?{' '}
                <Anchor color="blue" weight={700} onClick={() => setIndexStatus('login')}>
                  登录
                </Anchor>
              </Text>
            ) : (
              <Text align="center" mt="md">
                还没有账号?{' '}
                <Anchor
                  color="blue"
                  weight={700}
                  onClick={() => setIndexStatus('register')}>
                  注册
                </Anchor>
              </Text>
            )}
          </Group>
        </Paper>
      </div>
      <div className={classes.footer}>
        <Text>Copyright 2022 © All rights Reserved.</Text>
      </div>
    </div>
  );
};

export default Login;
