import React from 'react';
import { Card, Button } from 'antd';
import { TwitterOutlined, GithubOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { passMessage } from './actions/index';

function GridCard(props) {
  const dispatch = useDispatch();

  const onClickAddUser = (e) => {
    e.preventDefault();
    console.log(props.login);
    console.log(JSON.stringify(props.login));
    const data = { userName: props.login };
    fetch('/api/add/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(passMessage(data.message));
        } else {
          dispatch(passMessage(data.message));
        }
      });
  };
  return (
    <div className='m-4'>
      <Card
        title={props.login}
        style={{ width: 300 }}
        cover={
          <div
            className='w-24 rounded-full p-1 mt-4 border mx-auto shadow'
            style={{ width: '6rem', borderRadius: '100%' }}>
            <img
              alt={props.login}
              className='max-w-full rounded-full'
              style={{ borderRadius: '9999px' }}
              src={props.avatar_url}
            />
          </div>
        }>
        <p>UserName : {props.login}</p>
        <p>Name : {props.name}</p>
        <p>Followers : {props.followers}</p>
        <p>Following : {props.following}</p>
        <p>Public Repo : {props.public_repos}</p>
        <p>Public Gist : {props.public_gists}</p>
        <hr />
        <div className='mt-8 flex justify-around'>
          {props.twitter_username ? (
            <div>
              <TwitterOutlined style={{ fontSize: '3rem' }} />{' '}
              <p className='text-center'>{props.twitter_username}</p>
            </div>
          ) : null}
          <a href={props.url}>
            <GithubOutlined style={{ fontSize: '3rem' }} />
            <p className='text-center text-gray-900'>{props.login}</p>
          </a>
        </div>
        <div className={props.serverData ? 'hidden' : 'block'}>
          <Button size={2} onClick={onClickAddUser}>
            Add to DataBase
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default GridCard;
