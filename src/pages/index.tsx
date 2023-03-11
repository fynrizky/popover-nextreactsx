import React from 'react';
import PageMenu from '@/components/PageMenu';
import axios from 'axios';

interface Todo {
  id: number;
  name: string;
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
    <div style={{ backgroundColor: '#FFFFFF', position: 'relative', margin: '0 35%', minHeight: '100vh' }}>
      <PageMenu todos={todos} />
    </div>   
  )
}

Home.getInitialProps = async () => {
  const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?staple=yes`);
  const data = response.data.data;
  const todos =  data.slice(0, 20);

  return {
      todos,
  }
}

export default Home;
