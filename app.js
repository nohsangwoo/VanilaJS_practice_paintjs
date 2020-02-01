const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //2d그림을 그리기위해서 getContext("2d") 호출
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");


const INITIAL_COLOR = "#2c2c2c"; //처음 초기화된 색
const CANVAS_SIZE = 700;

ctx.fillStyle = "white";
ctx.fillRect(0,0, canvas.width, canvas.height);

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

ctx.lineWidth = 2.5;



let painting = false;
let filling =false;

function stopPainting() {
  painting = false;
}


function startPainting(){
    painting = true;
}


function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting){ // (painting === false상태)
      ctx.beginPath();   //path 시작 - 라인의 시작점을 잡아줌
      ctx.moveTo(x,y);  //시작점을 받아옴
  }else{ // (painting === true상태)
      ctx.lineTo(x,y);
      ctx.stroke();
  }  
}


function handleColorClick(event){       
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;      
    ctx.fillStyle = color;

}

function handleRangeChange(event){    
    ctx.lineWidth=event.target.value;   
}


function handleModeClick(){    
    if(filling===true){
        filling=false;
        mode.innerText = "FILL";
    }else{
        filling=true;
        mode.innerText = "PAINT";
    }  
}

function handleCanvasClick(){
    console.log(filling);
    if(filling){
        ctx.fillRect(0,0, canvas.width, canvas.height);
    }    
}

function handleCM(event){
    console.log(event);
    event.preventDefault();  //원래 실행되려는 행동을 막아줌
}

function handleSaveClick(event){
    //const image = canvas.toDataURL("image/jpeg");   //기본값은 png
    const image = canvas.toDataURL();   // "image/jpeg"  다른확장자로 변환시 
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    //console.log(link);
    link.click(); //클릭을 한것처럼 속임..클릭 한것으로 만듬.(링크의 다운로드가 실행됨)

}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);   //마우스가 캔버스 안에서 움직일때
  canvas.addEventListener("mousedown", startPainting);  //마우스왼쪽버튼을 캔버스 안에서 누를때
  canvas.addEventListener("mouseup", stopPainting);      //마우스왼쪽버튼을 캔버스 안에서 놓을때
  canvas.addEventListener("mouseleave", stopPainting);  //마우스가 캔버스에서 벗어날때  
  canvas.addEventListener("click", handleCanvasClick); //캔버스를 클릭했을때
  canvas.addEventListener("contextmenu", handleCM);  
}

//console.log(Array.from(colors)); //오브젝트를 배열로 만들어줌

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
//forEach안의 color는 어레이안 각각의 아이템을 대표하는 말임 mysql 의 Aliases(AS)같은 느낌


if(range){
    range.addEventListener("input", handleRangeChange);
}


if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}
