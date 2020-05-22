import React from "react";
import ReactDOM from "react-dom";

class OwlIndex extends React.Component
{
  componentDidMount()
  {
    var owlWatchConnection=new WebSocket("ws://fox:2001/owlstatus");

    owlWatchConnection.addEventListener("message",(e)=>{
      console.log("got message",e);
    });
  }

  render()
  {
    return <div>
      hello
    </div>;
  }
}

function main()
{
  ReactDOM.render(<OwlIndex/>,document.querySelector(".main"));
}

window.onload=main;