
let cell_dim = 24;
let board_size="15x30"; let b_height=15; let b_width=30;
let b = jsboard.board({attach:"game", size:board_size});
let table=document.getElementById("game");
let zoomed=false;
let init_pos=[table.getBoundingClientRect().x,table.getBoundingClientRect().x];

b.cell("each").style({width:cell_dim.toString()+"px", height:cell_dim.toString()+"px", background:"url('images/basic_tile.png') no-repeat",backgroundSize:"100% 100%"});

let r_wizard = jsboard.piece({text:"RW", textIndent:"-9999px", background:"url('images/r_wizard.png') no-repeat",backgroundSize:"100% 100%", width:"24px", height:"24px", margin:"0 auto"});
let b_wizard = jsboard.piece({text:"BW", textIndent:"-9999px", background:"url('images/b_wizard.png') no-repeat",backgroundSize:"100% 100%", width:"24px", height:"24px", margin:"0 auto"});
let r_barb = jsboard.piece({text:"RB", textIndent:"-9999px", background:"url('images/r_barb.png') no-repeat",backgroundSize:"100% 100%", width:"24px", height:"24px", margin:"0 auto"});
let b_barb = jsboard.piece({text:"BB", textIndent:"-9999px", background:"url('images/b_barb.png') no-repeat",backgroundSize:"100% 100%", width:"24px", height:"24px", margin:"0 auto"});

r_wizard.pm=3;
b_wizard.pm=3;
r_barb.pm=5;
b_barb.pm=5;

let r_team=[
	r_wizard.clone(),
	r_barb.clone()
];

let b_team=[
	b_wizard.clone(),
	b_barb.clone()
];

b.cell([8,8]).place(r_team[0]);
b.cell([1,0]).place(r_team[1]);
b.cell([0,29]).place(b_team[0]);
b.cell([1,29]).place(b_team[1]);


// variables for piece to move and its locs
var bindMoveLocs, bindMovePiece;

for (var i=0; i<b_team.length; i++){ 
	b_team[i].addEventListener("click", function() { showMoves(this); });
}
for (var i=0; i<r_team.length; i++){ 
	r_team[i].addEventListener("click", function() { showMoves(this); });
}
function showMoves(piece) {

    resetBoard();
	var thisPiece = b.cell(piece.parentNode).get();
    var newLocs = [];
    var loc;
    loc = b.cell(piece.parentNode).where();
    // movement for wizards
    if (thisPiece=="RW"||thisPiece=="BW") {
		newLocs.push(loc);
		let stop=newLocs.length;
       // for (let i=0; i<r_wizard.pm; i++){
			for (let j=0; j<stop; j++){
				newLocs.push(
				[loc[0]+1,loc[1]],
				[loc[0]-1,loc[1]],
				[loc[0],loc[1]+1],
				[loc[0],loc[1]-1]
				);
				//console.log(newLocs);
			}
		//} 
	}
	// remove illegal moves by checking 
    // content of b.cell().get()
	removeIllegalMoves(newLocs);
	console.log(newLocs);
    // bind green spaces to movement of piece
    bindMoveLocs = newLocs.slice();
	console.log(bindMoveLocs);
    bindMovePiece = piece; 
    bindMoveEvents(bindMoveLocs);
	
}


// bind move event to new piece locations
function bindMoveEvents(locs) {
    for (var i=0; i<locs.length; i++) {
        b.cell(locs[i]).DOM().classList.add("green");
		console.log(locs[i]);
        b.cell(locs[i]).on("click", movePiece);  
    }
}

// actually move the piece
function movePiece() {
    var userClick = b.cell(this).where();
    if (bindMoveLocs.indexOf(userClick)) {
        b.cell(userClick).place(bindMovePiece);
        resetBoard();
    }
}


// remove previous green spaces and event listeners
function resetBoard() {
    for (var r=0; r<b.rows(); r++) {
        for (var c=0; c<b.cols(); c++) {
            b.cell([r,c]).DOM().classList.remove("green");
            b.cell([r,c]).removeOn("click", movePiece);
        }
    }
}

function removeIllegalMoves(arr) {
        var fixedLocs = [];
        for (var i=0; i<arr.length; i++) 
            if (b.cell(arr[i]).get()==null)
                fixedLocs.push(arr[i]); 
        newLocs = fixedLocs;
}




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



