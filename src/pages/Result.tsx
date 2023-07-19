import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const Result = () => {
  const { resultString } = useParams();
  const navigate = useNavigate();
  console.log(resultString);
  return (
    <>
      <div>{resultString}</div>
      <Link to={'/signin'}>SignIn</Link>
      <Link to={'/main'}>Main</Link>
      <Link
        to={'..'}
        onClick={e => {
          e.preventDefault();
          navigate(-1);
        }}>
        Go Back
      </Link>
    </>
  );
};

export default Result;
