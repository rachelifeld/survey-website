import React, { useState, useEffect } from 'react'
import FillingSurvey from './FillingSurvey';
import UserNav from './UserNav';

function Home() {
  return (
    <div id='html'>
      <UserNav />
      <div >
        <FillingSurvey />
      </div>
    </div>
  );
}

export default Home;
