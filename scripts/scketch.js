
let cell_dim = 24;
let board_size="15x30"; let b_height=25; let b_width=30;
let b = jsboard.board({attach:"game", size:board_size});
let table=document.getElementById("game");
let zoomed=false;
let init_pos=[table.getBoundingClientRect().x,table.getBoundingClientRect().x];

b.cell("each").style({width:cell_dim.toString()+"px", height:cell_dim.toString()+"px", background:"url('images/basic_tile.png') no-repeat",backgroundSize:"100% 100%"});

var w_knight = jsboard.piece({text:"WK", textIndent:"-9999px", background:"url('images/r_wizard.png') no-repeat",backgroundSize:"100% 100%", width:"24px", height:"24px", margin:"0 auto"});
b.cell([0,0]).place(w_knight.clone());











/* let movedx=X-e.clientX;
let movedy=X-e.clientY;
movedx=movedx*2-4;	
movedy=movedy*2-2;
table.style.left=movedx.toString()+"px";
table.style.top=movedy.toString()+"px"; 
X=table.getBoundingClientRect().x; 

table.addEventListener("wheel", function(e) {
	if(e.deltaY < 0){
		if(!zoomed){
			cell_dim=cell_dim*2;
			b.cell("each").style({width:cell_dim.toString()+"px", height:cell_dim.toString()+"px"});
			zoomed=true;
		}
	}
		if(e.deltaY > 0){
			if(zoomed){
			cell_dim=cell_dim/2;
			b.cell("each").style({width:cell_dim.toString()+"px", height:cell_dim.toString()+"px"});
			zoomed=false;
		}
	}
	let s=cell_dim*b_width+4+b_width*2;
	s=s.toString();
	table.style.width=s+"px";
});

s=cell_dim*b_height+6+b_height*3;
s=s.toString();
document.getElementById("table_wrapper").style.maxHeight=s+"px";
s=cell_dim*b_width+4+b_width*2;
s=s.toString();
document.getElementById("table_wrapper").style.maxWidth=s+"px";



*/



