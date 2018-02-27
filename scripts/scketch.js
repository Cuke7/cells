// create board
let cell_dim = 20;
let board_size="20x40"; let b_height=20; let b_width=40;
let b = jsboard.board({attach:"game", size:board_size});
b.cell("each").style({width:cell_dim.toString()+"px", height:cell_dim.toString()+"px"});

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
	s=cell_dim*b_width+4+b_width*2;
	s=s.toString();
	document.getElementById("game").style.width=s+"px";
});


document.getElementById("table_wrapper").style.maxHeight="465px";
document.getElementById("table_wrapper").style.maxWidth="929px";

var w_knight = jsboard.piece({text:"WK", textIndent:"-9999px", background:"url('images/w_knight.png') no-repeat", width:"auto", height:"auto", margin:"0 auto" });
b.cell([7,1]).place(w_knight.clone());