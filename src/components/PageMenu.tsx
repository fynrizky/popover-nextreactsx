import React, { useState } from 'react'

interface Todo {
  id: number;
  name: string;
  // completed: boolean;
  card_images: cardImages[]
}

interface cardImages {
  id: number;
  image_url: string;
}

interface Props {
  todos?: Todo[];
}

const PageMenu = ({ todos }: Props) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleTodoClick = (todo: Todo) => {
    setSelectedTodo(todo);
  }

  const handleCloseClick = () => {
    setSelectedTodo(null);
  };

  if (!todos) {
    return <div>No todos found</div>;
  }

  return (
    <div>
      <div style={{paddingLeft: "30px", paddingTop:"30px"}}>
          <h1>STAPLE YUGIOH</h1>
      </div>
    <div style={{position: "relative",display: "flex"
    }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // divide into 3 columns
          gap: "10px",
          position:"relative",
          padding: "30px"
          }}>
            {todos.map(todo => (
            <div key={todo.id} style={{cursor:"pointer"}} onClick={() => handleTodoClick(todo)}>
              <div >
                {todo.card_images.map(card => (
                  <img key={card.id} width="80px" src={card.image_url} alt="" />
                ))}
              </div>
            </div>
            ))}
        </div>
    </div>
      {selectedTodo && (
        <div style={{
            position: "absolute",
                top: "0",
                left: "0",
                bottom: "0",
                right: "0",
                backgroundColor: "rgba(0,0,0,0.5)",
        }}>
            <div style={{
                position: "fixed",
                top: "50%",
                left: "50%",
            }}>
              <div style={{position: "absolute",
              top: "50%",
              left: "50%",
              padding: "20px",
              transform: "translate(-50%, -50%)",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
            }}>
              <h2>{selectedTodo.name}</h2>
                {selectedTodo.card_images.map(card => (
                  <img src={card.image_url} width="180px" alt="" />
                  ))}
                <button onClick={handleCloseClick}>Close</button>
              </div>
            
            </div>
        </div>
      )}
    </div>
  )
}

export default PageMenu;

