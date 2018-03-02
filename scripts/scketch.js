let cell_dim;
let dim_s;
let board_size;
let b_height;
let b_width;
let b;
let table;
let b_team=[]
let r_team=[];
// variables for piece to move and its locs
let bindMoveLocs, bindMovePiece, bindMoveCell;


window.onload = function () {init();}

function init(){
	
	cell_dim=window.innerWidth/60;
	dim_s=cell_dim.toString()+"px";
	board_size="15x30"; b_height=15; b_width=30;
	b = jsboard.board({attach:"game", size:board_size});
	table=document.getElementById("game");
	init_menu();


	b.cell("each").style({width:dim_s, height:dim_s, background:"url('images/basic_tile.png') no-repeat",backgroundSize:"100% 100%"});

	let r_wizard = jsboard.piece({text:"RW", textIndent:"-9999px", background:"url('images/r_wizard.png') no-repeat",backgroundSize:"100% 100%", width:dim_s, height:dim_s, margin:"0 auto"});
	let b_wizard = jsboard.piece({text:"BW", textIndent:"-9999px", background:"url('images/b_wizard.png') no-repeat",backgroundSize:"100% 100%", width:dim_s, height:dim_s, margin:"0 auto"});
	let r_barb = jsboard.piece({text:"RB", textIndent:"-9999px", background:"url('images/r_barb.png') no-repeat",backgroundSize:"100% 100%", width:dim_s, height:dim_s, margin:"0 auto"});
	let b_barb = jsboard.piece({text:"BB", textIndent:"-9999px", background:"url('images/b_barb.png') no-repeat",backgroundSize:"100% 100%", width:dim_s, height:dim_s, margin:"0 auto"});


	r_team=[
	r_wizard.clone(wizard), // Add the wizard properties to the piece
	r_barb.clone(barb)
	];

	b_team=[
	b_wizard.clone(wizard),
	b_barb.clone(barb)
	];

	b.cell([8,8]).place(r_team[0]);
	b.cell([8,9]).place(r_team[1]);
	b.cell([9,16]).place(b_team[0]);
	b.cell([10,14]).place(b_team[1]);


	for (var i=0; i<b_team.length; i++){ 
		b_team[i].addEventListener("click", function() { showMoves(this); });
	}
	for (var i=0; i<r_team.length; i++){ 
		r_team[i].addEventListener("click", function() { showMoves(this); });
	}
}

function init_menu(){
	//document.getElementById("s_menu").style.minHeight="400px";
	//document.getElementById("console").style.minHeight="400px";
}

function showMoves(piece) {

    resetBoard();
    var newLocs = [];
    var loc;
    loc = b.cell(piece.parentNode).where();
	bindMoveCell= b.cell(piece.parentNode);
	newLocs.push(loc);
		
	for(let j=0; j<piece.pm; j++){
		let stop=newLocs.length;
		for (let i=0; i<stop; i++){
			loc=newLocs[i];
			newLocs.push(
			[loc[0]+1,loc[1]],
			[loc[0]-1,loc[1]],
			[loc[0],loc[1]+1],
			[loc[0],loc[1]-1]
			);
		}
		newLocs=removeIllegalMoves(newLocs);
	}
    // bind green spaces to movement of piece
    bindMoveLocs = newLocs.slice();
    bindMovePiece = piece; 
    bindMoveEvents(bindMoveLocs);
	
}


// bind move event to new piece locations
function bindMoveEvents(locs) {
    for (var i=0; i<locs.length; i++) {
        b.cell(locs[i]).DOM().classList.add("green");
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

// Remove illegals moves
function removeIllegalMoves(arr) {
        var fixedLocs = [];
        for (var i=0; i<arr.length; i++) 
            if (b.cell(arr[i]).get()==null && b.cell(arr[i]).get()!=bindMoveCell.get()){
                fixedLocs.push(arr[i]); 
			}
        newLocs = fixedLocs;
		return newLocs;
}



function showsight(){
}	




// bind vision event to new piece locations
// function bindVisionEvents(locs) {
    // for (var i=0; i<locs.length; i++) {
        // b.cell(locs[i]).DOM().classList.add("blue");
    // }
// }


// function getObstaclesLocs(arr) {
        // var fixedLocs = [];
        // for (var i=0; i<arr.length; i++) 
            // if (b.cell(arr[i]).get()!=null && b.cell(arr[i]).get()!=bindMoveCell.get() && b.cell(arr[i]).get()!="OOB"){
                // fixedLocs.push(arr[i]); 
			// }
        // newLocs = fixedLocs;
		// console.log("Obstacle array : ");
		// console.log(fixedLocs);
		// return newLocs;
// }


// function showVision(piece){
	// resetBoard();
    // var newLocs = [];
	// var obsLocs = [];
	// var visionLocs = [];
    // var loc;
    // loc = b.cell(piece.parentNode).where();
	// bindMoveCell= b.cell(piece.parentNode);
	// newLocs.push(loc);
		
	// for(let j=-7; j<7; j++){
		// for(let k=-7;k<7; k++){
			// if(abs(j)+abs(k)<7){
				// newLocs.push([loc[0]+j,loc[1]+k]);
			// }
		// }
		
	// }
	// obsLocs=getObstaclesLocs(newLocs);
	// newLocs=removeIllegalMoves(newLocs);
	// for (let i=0; i<obsLocs.length; i++){
		// let x1=bindMoveCell.where()[1];
		// let y1=bindMoveCell.where()[0];
		// let x0=obsLocs[i][1];
		// let y0=obsLocs[i][0];
		// for (let j=0; j<newLocs.length; j++){
			// let x2=newLocs[j][1];
			// let y2=newLocs[j][0];
			// dist=abs((y2-y1)*x0-(x2-x1)*y0+x2*y1-y2*x1)/Math.sqrt((y2-y1)*(y2-y1)+(x2-x1)*(x2-x1));
			// console.log(x2+":"+y2+"="+dist);
			// if(dist<1)visionLocs.push(newLocs[j]);
		// }
	// }
    // bindMovePiece = piece;
	//console.log(visionLocs);
    // bindVisionEvents(visionLocs);
// }

// function abs(number){
	// if(number<0)return -number;
	// return number;
// }

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



