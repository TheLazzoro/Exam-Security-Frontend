import React, { useEffect, useState } from 'react'
import ThreadCard from '../../components/ThreadCard/ThreadCard';
import facade from '../../facades/threadFacade'
import './Home.css'

const Home = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    facade.getAllThreads().then(res => {
      setThreads(res);
      console.log(res);
    });

  }, []);

  return (
    <div className='home'>
      <div className='home-box'>
        <button className='btn-create-thread'>Create Thread</button>
        {
          threads.map(el =>
            <div>
              <ThreadCard thread={el} />
              <hr/>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Home