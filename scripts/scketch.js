// create board
let cell_dim = 20;
let board_size="20x40"; let b_height=20; let b_width=40;
let b = jsboard.board({attach:"game", size:board_size});
b.cell("each").style({width:cell_dim.toString()+"px", height:cell_dim.toString()+"px"});
let s;
let table=document.getElementById("game");
table.addEventListener("wheel", function(e) {
	if(e.deltaY < 0){
		cell_dim=cell_dim*2;
		b.cell("each").style({width:cell_dim.toString()+"px", height:cell_dim.toString()+"px"});
		X=table.getBoundingClientRect().x;
		let movedx=X-e.clientX;
		let movedy=X-e.clientY;
		table.style.left=movedx.toString()+"px";
		table.style.top=movedy.toString()+"px";
	}
		if(e.deltaY > 0){
		cell_dim=cell_dim/2;
		if(cell_dim<20)cell_dim=20;
		b.cell("each").style({width:cell_dim.toString()+"px", height:cell_dim.toString()+"px"});
	}
	s=cell_dim*b_width+4+b_width*2;
	s=s.toString();
	table.style.width=s+"px";
});

s=cell_dim*b_height+6+b_height*3;
s=s.toString();
document.getElementById("table_wrapper").style.maxHeight=s+"px";
s=cell_dim*b_width+4+b_width*2;
s=s.toString();
document.getElementById("table_wrapper").style.maxWidth=s+"px";

var w_knight = jsboard.piece({text:"WK", textIndent:"-9999px", background:"url('images/w_knight.png') no-repeat", width:"auto", height:"auto", margin:"0 auto" });
b.cell([0,1]).place(w_knight.clone());


// let X; let Y;
// table.onmousedown = mouseIsDown;
// table.onclick = mouseIsClicked;

// function mouseIsClicked(e){
	// X=e.clientX;
	// Y=e.clientY;
// }


// function mouseIsDown(e){
	// let X2=e.clientX;
	// let Y2=e.clientY;
	// let Xm=X2-X;
	// console.log(Xm);
// }



