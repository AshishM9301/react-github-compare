import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';

import { fetchUser, addUser } from './actions';
import { Row, Col, Button, Input, Form, Layout, Typography } from 'antd';
import { UserOutlined, LoadingOutlined } from '@ant-design/icons';
import FormItem from 'antd/lib/form/FormItem';
import GridCard from './GridCard';

const { Title } = Typography;
const { Content } = Layout;

function Github() {
  const [userName, setuserName] = useState({ name: '' });
  const [Users] = useState([]);
  const [UserNames] = useState([]);
  const [Revolving, setRevolving] = useState(false);
  const [ServerData, setServerData] = useState(false);
  const [Loading, setLoading] = useState(true);

  const user = useSelector((state) => state.github.user);
  const users = useSelector((state) => state.github.users);
  const message = useSelector((state) => state.message.message);
  const dispatch = useDispatch();

  const { name } = userName;
  const handleChange = (text) => (e) => {
    setuserName({ ...userName, [text]: e.target.value });
  };

  const onAddtoRedux = (userData) => {
    console.log(userData);
    Users.push(userData);
    console.log(Users);
    setLoading(false);
    dispatch(addUser(Users));
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(fetchUser(userName.name));
    setRevolving(true);
    console.log(name);
  };

  const getUserFromDataBase = (e) => {
    setLoading(true);
    setRevolving(true);
    e.preventDefault();
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        UserNames.push(...data.users);
        console.log(UserNames);
        UserNames.map((user) => dispatch(fetchUser(user.userName)));
        setServerData(true);
        setRevolving(false);
        setLoading(false);
      });
  };

  return (
    <div>
      {user?.login && onAddtoRedux(user)}
      <>
        <ToastContainer />
        <Layout style={{ minHeight: '100vh' }}>
          <Content className='text-center mt-12'>
            <Title>Github Profile Comparer</Title>
            <Row justify='center' align='middle' className='md:w-2/3 mx-auto'>
              <Col>
                <Button type='secondary' onClick={getUserFromDataBase}>
                  Show all the User in DataBase
                </Button>
              </Col>
            </Row>
          </Content>

          <Row justify='center' align='middle'>
            <Col
              className={`bg-white  ${
                user ? `py-12 px-8` : `py-32 px-32`
              } shadow mt-6`}>
              <Content>
                <Form
                  name='customized_github'
                  layout='inline'
                  className='flex justify-center '>
                  <FormItem
                    name='username'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}>
                    <Input
                      placeholder='Enter Username'
                      onChange={handleChange('name')}
                      value={name}
                      prefix={<UserOutlined className='site-form-item-icon' />}
                      style={{ width: '20rem' }}
                    />
                  </FormItem>

                  <FormItem>
                    <Button type='primary' onClick={handleClick}>
                      Submit
                    </Button>
                  </FormItem>
                </Form>
              </Content>
            </Col>
          </Row>
          {Loading ? (
            <div
              className={`${
                Revolving ? 'block' : 'hidden'
              } flex justify-center mt-4`}>
              <LoadingOutlined
                style={{ fontSize: '10rem', color: '#2d3748' }}
                className={`flex justify-center text-gray-700`}
              />
            </div>
          ) : (
            <Content className='my-12 justify-center flex md:w-2/3 flex-wrap mx-auto'>
              {users?.map((user) => (
                <Row justify='center' align='middle'>
                  <Col>
                    <GridCard
                      loading={Loading}
                      serverData={ServerData}
                      {...user}
                    />
                  </Col>
                </Row>
              ))}
            </Content>
          )}
          <Content className='flex flex-col justify-end py-6'>
            <Title level={4} className='text-center'>
              @Created by Ashish Kumar Mahto
            </Title>
          </Content>
        </Layout>
      </>
      <div className='hidden'> {message && toast.info(message)}</div>
    </div>
  );
}

export default Github;
