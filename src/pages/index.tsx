import React, { useEffect } from 'react';
import PageMenu from '@/components/PageMenu';
import axios from 'axios';
import { GetServerSideProps } from 'next';

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
  image_url_small: string;
}

type Props = {
  todos?: Todo[] | null
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

//get data s
export const getServerSideProps: GetServerSideProps<Props> = async() => {
    
  try {
  //tanda (!) berarti nilainya pasti ada
  // tanda as string berarti diasumsikan string
  // tanda ?? artinya default artinya ada atau undefined 
  const response = await axios.get(process.env.YGOPRODECK_API!);
  // console.log("response", response)
  const data = response.data.data;
  // console.log("data", data)
  const todos = Array.isArray(data) ? data.slice(0, 12532) : [];
  // console.log("data", data)

  return {
    props: {
      todos,
    },
  };
} catch (error) {
  return {
    props: {
      todos: [],
    },
  };
}

}

export default Home;

