// create board
let cell_dim = 20;
let board_size="20x40"; let b_height=20; let b_width=40;
let s_w=b_width*cell_dim
let s_h=b_height*cell_dim
let b = jsboard.board({attach:"game", size:board_size});
b.cell("each").style({width:cell_dim.toString()+"px", height:cell_dim.toString()+"px"});
document.getElementById("table_wrapper").style.width=s_w.toString()+"px";
document.getElementById("table_wrapper").style.height=s_h.toString()+"px";

document.getElementById("game").addEventListener("wheel", function(e) {
	if(e.deltaY < 0){
		cell_dim=cell_dim*1.3;
		b.cell("each").style({width:cell_dim.toString()+"px", height:cell_dim.toString()+"px"});
	}
		if(e.deltaY > 0){
		cell_dim=cell_dim/1.3;
		if(cell_dim<20)cell_dim=20;
		b.cell("each").style({width:cell_dim.toString()+"px", height:cell_dim.toString()+"px"});
	}
	s_w=b_width*cell_dim
	s_h=b_height*cell_dim
	document.getElementById("game").style.width=s_w.toString()+"px";
	document.getElementById("game").style.height=s_h.toString()+"px";
});