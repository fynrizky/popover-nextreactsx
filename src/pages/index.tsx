import React from 'react';
import PageMenu from '@/components/PageMenu';
import axios from 'axios';

interface Todo {
  id: number;
  name: string;
  type: string;
  desc: string;
  card_images: cardImages[];
}

interface cardImages {
  id: number;
  image_url: string;
}

interface Props {
  todos?: Todo[];
}

const Home = ({ todos }: Props) => {
  if (!todos) {
    return <div>Loading todos...</div>;
  }

  return (
    <div style={{ backgroundColor: '#C8C8C8', display:'flex', justifyContent:'center', alignItems:'center', }}>
    <div style={{ backgroundColor: '#FFFFFF', position:'relative', maxWidth:'70vh', minWidth: '45vh', minHeight: '100vh'}}>
      <PageMenu todos={todos} />
    </div>   
    </div>   
  )
}

Home.getInitialProps = async () => {
  const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php`);
  const data = await response.data;
  const todos = data.data.slice(0, 12551);

  return {
     todos,
  }
}

export default Home;
