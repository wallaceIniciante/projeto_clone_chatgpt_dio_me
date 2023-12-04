import {useState} from 'react'
import './styles/App.css';
import './styles/reset.css'
import {SideMenu} from'./components/SideMenu/SideMenu';
import { ChatMessage } from './components/ChatMessage/ChatMessage';
import { makeRequest } from './api/api';

function App() {

  const[input,setinput] = useState("")
  const[chatlog,setChatlog] = useState([{
    user:"gpt",
    message:"como posso te ajudar hoje?"
  }])

  async function handleSubmit(e){
    e.preventDefault()

    let response = await makeRequest({prompt: input})

    response = response.data.split('\n').map(line =>{
      return <p>key={line}{line}</p>})
  

    setChatlog([...chatlog,{
      user:'me',
      message:`${input}`
    },
    {
      user:'gpt',
      message:response
    }

    ])
  }

  return (
    <div className="App">
      <h1>React</h1>
      <SideMenu></SideMenu>

      <sction className='chatbox'>
        <div className='chat-log'>
          {chatlog.map((message,index)=>{
            return <ChatMessage key={index} message={message}></ChatMessage>
          })}

        </div>
        <div className='chat-input-holder'>
          <form onSubmit={handleSubmit}>
            <input
              rows='1'
              className='chat-input-text'
              value={input}
              onChange={e =>setinput(e.target.value)}/>
          </form>

        </div>
      </sction>
      
    
   
    </div>
  );
}

export default App;
 