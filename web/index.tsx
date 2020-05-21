import React from "react";
import ReactDOM from "react-dom";

class OwlIndex extends React.Component
{
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