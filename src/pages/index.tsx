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

export const getServerSideProps = async () => {
  const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php`);
  const todos = response.data.data;
  // const todos = data.slice(0, 12551);

  return {
    props: {
      todos,
    }
  }
}

export default Home;
