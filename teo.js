let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;// playerX,playerO
//2-D array
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8], 
    [2, 4, 6], 
    [3, 4, 5], 
    [6, 7, 8], 
    [1, 4, 7], 
    [2, 5, 8]
];
const play=[0,1,2,3,4,5,6,7,8];

const getrandnum=()=>{
    return(Math.floor(Math.random()*9));   
}

const playcomp=()=>{
    let num=getrandnum();
    if(boxes[num].disabled==false)
    {
        // console.log(num);
        boxes[num].innerText="X";
        boxes[num].disabled=true;
        turnO=true;
    }
    else{
        playcomp();
    }
}

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
  };
  const showWinner=(winner)=>{
    if(winner==="X"){
        msg.innerText="You lost!!";
    }
    else{
        msg.innerText="You Win!!";
    }
    msgContainer.classList.remove("hide"); 
  }
  const pritntDraw=()=>{
    msg.innerText="It's a Draw !";
    msgContainer.classList.remove("hide"); 
  }
  
boxes.forEach((box) => {
    count=0;
    box.addEventListener("click", () => {
        // console.log("Box was clicked!");
        if(turnO==true&&box.disabled==false){
            box.innerText="O";
            event.target.style.color="red";
            box.disabled=true;
            turnO=false;
            checkWinner();
            boxes.forEach((box)=>{
                if(box.disable==true)
                {
                    count++;
                }
            })
            console.log(count);
            if(count<5)
            {
                playcomp();
            }  
        }
        checkWinner();
    });
});
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};
const enableBoxes=()=>{
    for(let box of boxes)
    {
        box.disabled=false;
        box.innerText="";
    }
};

const checkWinner=()=>{
    let winner=0;
    count=0;
    for(let pattern of winPatterns)
    {
      let pos1=boxes[pattern[0]].innerText;
      let pos2=boxes[pattern[1]].innerText;
      let pos3=boxes[pattern[2]].innerText;
      if(pos1!=""&&pos2!=""&&pos3!="")
        {
            if(pos1===pos2&&pos2===pos3)
            {
                winner=pos1;
                console.log("You are Winner! "+winner);
                showWinner(winner);
                disableBoxes();
            } 
            else
            {
                count++;
            }
        }
    }
    if(count>=8)
    {
        pritntDraw();
        disableBoxes();
    }
}
newGameBtn.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);



