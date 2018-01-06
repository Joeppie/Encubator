"use strict";

//enumerations
const  material_id = { Iron: 1,Titanium : 2, Naonite: 3,Trinium : 4, Xanion: 5,Ogonite:6, Avorion: 7 };
const m = material_id; //shorthand
const material_name ={}; //Reverse of material: instead of getting an number by index, it gives an index by number.
for(var mat in material_id) { material_name[material_id[mat]] = mat }
const order = {matters:"matters",undefined:undefined}

const light_2_heavy_mats = [m.Trinium,m.Titanium,m.Naonite,m.Xanion,m.Avorion,m.Iron];

function id(id) { return id}; //Clarification for syntax function.

/**
 * Contains the default, or working configuration for a block type that can be in a cube.
 * 
 * @class BlockConfiguration
 */
class BlockConfiguration {
   /**
    * Creates an instance of BlockConfiguration.
    * @param {Block_Name} name of the block
    * @param {array of material} allowedMaterials Ordered list of Materials, by preference of which the block should be constructed.
    * @memberof BlockConfiguration
    */
   constructor(blockName,amount,allowedMaterials,orientation)
    {
        this.BlockName = blockName;
        this.amount = Number.isInteger(amount) && amount >0 ? amount : 0;
		this.allowedMaterials = allowedMaterials ? allowedMaterials : Object.keys(material_name); //All materials.
		this.material = this.default;
		this.orientation = orientation;
		this.order=	order.undefined;
		this.relativeScale = 1;
	}

	/**
	 * Indicates what the order of the materials in the allowedMaterials array is.
	 * 
	 * @param {order} o 
	 * @returns this BlockConfiguration
	 * @memberof BlockConfiguration
	 */
	orderBy(o){
		this.order = o;
		return this;
	}

	scale(s){
		this.relativeScale = s;
		return this;
	}
/**
 * Indicates the orientation of the block; if important. this matters for gyros.
 * 
 * @param {any} orientation 
 * @returns 
 * @memberof BlockConfiguration
 */
orientation(orientation){
		this.orientation = orientation;
		return this;
	}
}


const Block_Name = {
	Engine : 'Engine',
	Stone :  'Stone',
	Cargo :  'Cargo',
	CrewQuarters :  'CrewQuarters',
	Thruster :  'Thruster',
	Armour :  'Armour',
	Hangar :  'Hangar',
	DirectionalThruster :  'DirectionalThruster',
	GyroArray_X :  'GyroArray_X',
	GyroArray_Y :  'GyroArray_Y',
	GyroArray_Z :  'GyroArray_Z',
	InertiaDampener :  'InertiaDampener',
	FlightRecorder :  'FlightRecorder',
	Assembly :  'Assembly',
	ShieldGenerator :  'ShieldGenerator',
	EnergyContainer :  'EnergyContainer',
	Generator :  'Generator',
	IntegrityFieldGenerator :  'IntegrityFieldGenerator',
	ComputerCore :  'ComputerCore',
	HyperspaceCore :  'HyperspaceCore'
	}

	const Block_Id = {
		Engine : '3',
		Stone :  '4',
		Cargo :  '5',
		CrewQuarters :  '6',
		Thruster :  '7',
		Armour :  '8',
		Hangar :  '10',
		DirectionalThruster :  '13',
		GyroArray_X :  '14',
		GyroArray_Y :  '14',
		GyroArray_Z :  '14',
		InertiaDampener :  '15',
		FlightRecorder :  '16',
		Assembly :  '17',
		ShieldGenerator :  '50',
		EnergyContainer :  '51',
		Generator :  '52',
		IntegrityFieldGenerator :  '53',
		ComputerCore :  '54',
		HyperspaceCore :  '55'
		}


let defaultConfigurations = [
    new BlockConfiguration( Block_Name.Engine,					1,light_2_heavy_mats).orderBy(order.matters),
	new BlockConfiguration( Block_Name.Stone, 					0),
	new BlockConfiguration( Block_Name.Cargo, 					0,light_2_heavy_mats).orderBy(order.matters),
	new BlockConfiguration( Block_Name.CrewQuarters,			1,light_2_heavy_mats).orderBy(order.matters),
    new BlockConfiguration( Block_Name.Thruster, 				1,light_2_heavy_mats).orderBy(order.matters),
	new BlockConfiguration( Block_Name.Armour,	 				1,[m.Trinium,m.Titanium,m.Ogonite,m.Iron]).orderBy(order.matters).scale(2),
    new BlockConfiguration( Block_Name.Hangar,					0,light_2_heavy_mats).orderBy(order.matters),
    new BlockConfiguration( Block_Name.DirectionalThruster, 	1,light_2_heavy_mats).orderBy(order.matters),
	new BlockConfiguration( Block_Name.GyroArray_X, 			1),
	new BlockConfiguration( Block_Name.GyroArray_Y, 			1),
	new BlockConfiguration( Block_Name.GyroArray_Z, 			1),
    new BlockConfiguration( Block_Name.InertiaDampener, 		1,[m.Avorion,m.Iron]),
    new BlockConfiguration( Block_Name.FlightRecorder,	 		1,[m.Trinium,m.Titanium,m.Naonite,m.Xanion,m.Avorion,m.Ogonite,m.Iron]).orderBy(order.matters).scale(0.1),
    new BlockConfiguration( Block_Name.Assembly, 				1,[m.Avorion,m.Naonite,m.Xanion,m.Ogonite]),
    new BlockConfiguration( Block_Name.ShieldGenerator, 		1,[m.Trinium,m.Naonite,m.Xanion,m.Avorion,m.Iron]),
    new BlockConfiguration( Block_Name.EnergyContainer, 		1,[m.Trinium,m.Titanium,m.Naonite,m.Xanion,m.Avorion,m.Ogonite,m.Iron]),
	new BlockConfiguration( Block_Name.Generator,				1,[m.Trinium,m.Titanium,m.Naonite,m.Xanion,m.Avorion,m.Ogonite]),
	new BlockConfiguration( Block_Name.IntegrityFieldGenerator, 1,[m.Trinium,m.Titanium,m.Naonite,m.Xanion,m.Avorion,m.Ogonite]).orderBy(order.matters).scale(0.1),
    new BlockConfiguration( Block_Name.ComputerCore, 			1,[m.Trinium,m.Naonite,m.Xanion,m.Avorion]),
    new BlockConfiguration( Block_Name.HyperspaceCore, 			0,[m.Trinium,m.Naonite,m.Xanion,m.Avorion]),
    // 'Solar' : 60, //May add solar panel stacking in the future; is super nice for people to have in stations; they should be scaled specially though, conforming to their maximum effectivity.
];

/**
 * Represents the entire 'Cube.
 * 
 * @class Cube
 */
class Cube{
    constructor(blocks,bestMaterialAllowed){
		this.blockList = [];
		this.bestMaterialAllowed = bestMaterialAllowed;
		this.size = 1;

		for(let block of blocks)
		{
			console.log("okay, adding a block named "+block.BlockName+" to the list of the blocksPerType...")
			this.assignBestMaterialFor(block);
            this.blockList.push(block);
        }
	}
	
	assignBestMaterialFor(blockConfig){
		if(!blockConfig.material || blockConfig.material > Math.max( ... blockConfig.allowedMaterials) )
		{ 
			if(blockConfig.order === order.undefined)
			{
				//Get the best material of either the cube or the specific block.
				blockConfig.material = Math.min( Math.max( ... blockConfig.allowedMaterials),this.bestMaterialAllowed )
			}
			else
			{
				materialSearch: for(var i =0; i<blockConfig.allowedMaterials.length;i++)
				{
					var mat = blockConfig.allowedMaterials[i];
					if(mat <= this.bestMaterialAllowed)
					{
						blockConfig.material = mat;
						break materialSearch;
					}
				}
			}
			if(!blockConfig.material)
			{
				throw "There is no suitable material that you can use for the " + blockConfig.name;
			}
		}
	}

    getDescription()
    {
        var result = '';
        for(let block of this.blockList){
			if(!block.amount)
			{
				continue;
			}
            result += material_name[block.material] + " " +  block.BlockName +  " : " + block.amount + "\r\n";
        }
        return result;
	}

	set scale(s){
		this.size = s;
	}

  get blocks()
  {
	  if(this.blockList){
		return this.blockList;
	  }
  }

  get xml()
  {
	let parentIndex = -1; // -1 as parent index indicates the block is root; this is the case for the first block.
	let currentIndex = 0;
	let first = false;
	let rootName =  'auto_' + Math.floor(Math.random() * 9223372036854775807);
	let doc = `<?xml version="1.0"?><${rootName} accumulateHealth="true" convex="false">\n`;

	

	this.blockList.forEach(b =>
	{
		//Todo add in orientation for the gyros.
		let look =1;
		let up =3;
		let d = (this.size /2) * b.relativeScale; //diameter ${d}

		console.log(d)

		//Honestly; I do not know which axis is which; but any orientation in 3d can be described as a product of 2 rotations; combinations taken from existing ship.
		switch(b.BlockName)
		{
			case Block_Name.GyroArray_X: look = 5; up=0; break;
			case Block_Name.GyroArray_Y: look = 2; up=0; break;
			case Block_Name.GyroArray_Z: look = 1; up=3; break;
		}

		doc += `\t<item parent="${parentIndex}" index="${currentIndex++}"><block index="${Block_Id[b.BlockName]}" material="${b.material}" look="${look}" up="${up}" color="ffa3afbf" lx="-${d}" ux="${d}" ly="-${d}" uy="${d}" lz="-${d}" uz="${d}"/></item>\n`;
		parentIndex = 0; //The root element is the element whose parent is -1, after root element, add all blocks to the parent.
	});

	//Finish up document with closing tag for root XML element, then add a linebreak for good measure.
	doc += `</${rootName}>
	`;
	return doc;
  }
}

var cube = new Cube(defaultConfigurations,material_id.Xanion);
///cube.blocks.foreach(block=>block.BlockType == BlockType.Engine).forEach(m=>console.log(m));

cube.blocks.forEach(b=> console.log('' + b.BlockName))


console.log(cube.getDescription());
console.log(cube.xml);
console.log("Code executed succesfully.")
