import React, { useEffect, useState } from 'react'
import ThreadCard from '../../components/ThreadCard/ThreadCard';
import facade from '../../facades/threadFacade'
import './Home.css'
import ThreadCreate from './ThreadCreate';
import userFacade from '../../facades/userFacade'

const Home = () => {
  const [threads, setThreads] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    facade.getAllThreads().then(res => {
      setThreads(res);
    });

    setHasToken(userFacade.getToken());

  }, [refresh]);

  const onCreateThread = () => {
    setIsModalOpen(true);
  }

  return (
    <div className='home'>
      <div className='home-box'>
        {
          hasToken ?
            <button className='btn-create-thread' onClick={onCreateThread}>Create Thread</button>
            :
            <button className='btn-create-thread' disabled>Create Thread</button>
        }
        {
          threads.map(el =>
            <div>
              <ThreadCard thread={el} />
              <hr />
            </div>
          )
        }
      </div>
      {
        !isModalOpen ? null :
          <ThreadCreate setRefresh={setRefresh} setIsModalOpen={setIsModalOpen} />
      }
    </div>
  )
}

export default Home