import electron from 'electron';
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Link from 'next/link';

// prevent SSR webpacking
const ipcRenderer = electron.ipcRenderer || false;

const Home = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const onChange = (e) => setMessage(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    if (ipcRenderer) {
      ipcRenderer.send('add-message', message);
      setMessages([...messages, message]);
      setMessage(''); // clear the input value
    }
  };

  useEffect(() => {
    // componentDidMount()
    if (ipcRenderer) {
      setMessages(ipcRenderer.sendSync('get-messages'));
    }

    return () => {
      // componentWillUnmount()
    };
  }, []);

  return (
    <Layout title="home">
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href="/next">
            <a>Go to next page</a>
          </Link>
        </p>
        <img src="/images/logo.png" />
        <hr />
        <h2>Enter your message:</h2>
        <form onSubmit={onSubmit}>
          <input type="text" value={message} onChange={onChange} />
        </form>
        <ul>
          {messages.map((m, i) => <li key={i}>{m}</li>)}
        </ul>
      </div>
    </Layout>
  );
};

export default Home;
