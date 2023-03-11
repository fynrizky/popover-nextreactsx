import React, { useState, useRef, useEffect } from 'react'

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
  const [selectedTodoIndex, setSelectedTodoIndex] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(()=> {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setSelectedTodoIndex(0);
        setSelectedTodo(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSelectedTodo, setSelectedTodoIndex])

    const handleCloseClick = () => {
      setSelectedTodo(null);
      setSelectedTodoIndex(0);
    };

  const handleTodoClick = (todo: Todo) => {
    setSelectedTodo(todo);
    setSelectedTodoIndex(0);
  }

  const handleNextClick = () => {
    if (selectedTodo && selectedTodoIndex < selectedTodo.card_images.length - 1) {
      setSelectedTodoIndex(selectedTodoIndex + 1);
    }
  }
  
  const handlePrevClick = () => {
    if (selectedTodo && selectedTodoIndex > 0) {
      setSelectedTodoIndex(selectedTodoIndex - 1);
    }
  }


  if (!todos) {
    return <div>No todos found</div>;
  }

  return (
    <div>
      <div style={{padding:"12px", filter: selectedTodo ? "blur(8px)" : ""}}>
          <h1>STAPLE YUGIOH</h1>
      </div>
    <div style={{position: "relative",display: "flex", justifyContent: 'center', padding: '18px', filter: selectedTodo ? "blur(8px)" : "",
    }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // divide into 3 columns
          gap: "20px",
          position:"relative",
          padding: "18px",
          backgroundColor: 'rgb(100, 100, 100, 0.2)',
          borderStyle: 'double'
          }}>
            {todos.map((todo, i) => (
            <div key={todo.id} style={{cursor:"pointer"}} onClick={() => handleTodoClick(todo)}>
              <div >
                  <img width="80px" src={todo.card_images[0].image_url} alt="" />
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
            <div  style={{
                position: "fixed",
                top: "50%",
                left: "50%",
            }}
            ref={ref}>
              <div style={{position: "absolute",
              top: "50%",
              left: "50%",
              padding: "18px",
              transform: "translate(-50%, -50%)",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgb(999,999,999,0.5)",
              borderRadius: "10px",
              // height: selectedTodo.card_images.length > 1 ? "50vh" : "",
              // overflow: selectedTodo.card_images.length > 1 ? "auto" : "",
            }}>
              <div style={{display: "flex", justifyContent: "space-between", marginTop: '-8px', marginBottom: "8px"}}>
                <div></div>
                <button style={{backgroundColor: "transparent", 
                border: "none", cursor: "pointer", fontSize: "24px"}} onClick={handleCloseClick}>×</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "left" }}>
                <h2 style={{margin: 0}}>{selectedTodo.name}</h2>
                <div style={{ display: "flex", alignItems: "center", marginTop:'14px' }}>
                  {selectedTodo.card_images.length > 1 && (
                    <button 
                      style={{
                        padding: '10px', 
                        border: 'none', 
                        backgroundColor: selectedTodoIndex === 0 ? 
                        'rgb(910,910,910,0.1)' :
                        'rgb(900,900,900,0.3)',  
                        color:'white',
                        fontSize:'16px', 
                        borderRadius: '5px', 
                        cursor:'pointer',
                        margin: '5px'
                      }}
                      onClick={handlePrevClick} 
                      disabled={selectedTodoIndex === 0}
                    >
                      &lt;
                    </button>
                  )}
                  {selectedTodo.card_images[selectedTodoIndex] && (
                    <img src={selectedTodo.card_images[selectedTodoIndex].image_url} width="270px" alt="" />
                  )}
                  {selectedTodo.card_images.length > 1 && (
                    <button 
                      style={{
                        padding: '10px', 
                        border: 'none', 
                        backgroundColor: selectedTodoIndex === selectedTodo.card_images.length - 1 ? 'rgb(910,910,910,0.1)' : 
                        'rgb(900,900,900,0.3)', 
                        color:'white',
                        fontSize:'16px', 
                        borderRadius: '5px', 
                        cursor:'pointer',
                        margin: '5px'
                      }}
                      onClick={handleNextClick} 
                      disabled={selectedTodoIndex === selectedTodo.card_images.length - 1}
                    >
                      &gt;
                    </button>
                  )}
                </div>
              </div>

              
            </div>
            
            </div>
        </div>
      )}
    </div>
  )
}

export default PageMenu;

