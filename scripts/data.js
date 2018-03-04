// Spells : 

let fireball={
	btn_id: "fireball",
	source: "images/fireball.png",
	sight: 8,
	damage: 10,
	pa: 5,
	type: "classic",
	action: function(){
		resetBoard();
		let visionLocs=[];
		loc = b.cell(SelectedPiece.parentNode).where();
		for(let j=-this.sight; j<this.sight; j++){
			for(let k=-this.sight;k<this.sight; k++){
				if(abs(j)+abs(k)<this.sight){
					if(k!=0 || j!=0){
						visionLocs.push([loc[0]+j,loc[1]+k]);
					}
				}
			}
		}
		console.log(visionLocs);
		//visionLocs=removeIllegalMoves(visionLocs);
		console.log(visionLocs);
		let obsLocs=[];
		for(let j=-this.sight; j<this.sight; j++){
			for(let k=-this.sight;k<this.sight; k++){
				if(abs(j)+abs(k)<this.sight){
					if(k!=0 || j!=0){
						if(b.cell([loc[0]+j,loc[1]+k]).get()!=null && b.cell([loc[0]+j,loc[1]+k]).get()!=bindMoveCell.get() && b.cell([loc[0]+j,loc[1]+k]).get()!="OOB"){
							obsLocs.push([loc[0]+j,loc[1]+k]);
						}
					}
				}
			}
		}
		for (var i=0; i<visionLocs.length; i++) {
			b.cell(visionLocs[i]).DOM().classList.add("blue");
		}
	}
}

let heal={
	btn_id: "heal",
	source: "images/heal.png",
	sight: 3,
	effect: 5,
	pa: 3,
	type: "buff",
	hasLineOfSight: false
}

let root={
	btn_id: "root",
	source: "images/root.png",
	sight: 2,
	effect: -2,
	dammage: 10,
	pa: 3,
	type: "classic",
	hasLineOfSight: true
}

let claw={
	btn_id: "claw",
	source: "images/claw.png",
	sight: 1,
	dammage: 20,
	pa: 3,
	type: "classic",
	hasLineOfSight: true
}


// Classes : 

let wizard={
	pm:3,
	pa:8,
	pv:20,
	spell_number: 2,
	spell_list: [fireball, heal],
	display_menu: function() {showMoves(this); this.display_spells()},
	display_spells: function(){
		for (let i=0; i<this.spell_list.length; i++){
			document.getElementById(this.spell_list[i].btn_id).style.display="inline-block";
		}
	}
}

let barb={
	pm:6,
	pa:6,
	pv:40,
	spell_number: 2,
	spell_list: [root, claw],
	display_menu: function() {showMoves(this); this.display_spells()},
	display_spells: function(){
		for (let i=0; i<this.spell_list.length; i++){
			document.getElementById(this.spell_list[i].btn_id).style.display="inline-block";
		}
	}
}





