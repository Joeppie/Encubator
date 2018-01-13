"use strict";

//enumerations
const  material_id = { Iron: 0,Titanium : 1, Naonite: 2,Trinium : 3, Xanion: 4,Ogonite:5, Avorion: 6 };
const m = material_id; //shorthand
const material_name ={}; //Reverse of material: instead of getting an number by index, it gives an index by number.
for(var mat in material_id) { material_name[material_id[mat]] = mat }
const order = {matters:"matters",undefined:undefined}

const light_2_heavy_mats = [m.Trinium,m.Titanium,m.Naonite,m.Xanion,m.Avorion,m.Iron];

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
	Engine:					'Engine',
	Stone:					'Stone',
	Cargo:					'Cargo',
	CrewQuarters:			'CrewQuarters',
	Thruster:				'Thruster',
	Armour:					'Armour',
	Hangar:					'Hangar',
	DirectionalThruster:	'DirectionalThruster',
	GyroArray_X:			'GyroArray_X',
	GyroArray_Y:			'GyroArray_Y',
	GyroArray_Z:			'GyroArray_Z',
	InertiaDampener:		'InertiaDampener',
	FlightRecorder:			'FlightRecorder',
	Assembly:				'Assembly',
	ShieldGenerator:		'ShieldGenerator',
	EnergyContainer:		'EnergyContainer',
	Generator:				'Generator',
	IntegrityFieldGenerator:'IntegrityFieldGenerator',
	ComputerCore:			'ComputerCore',
	HyperspaceCore:			'HyperspaceCore'
	}

	const Block_Id = {
		Engine:					'3',
		Stone:					'4',
		Cargo:					'5',
		CrewQuarters:			'6',
		Thruster:				'7',
		Armour:					'8',
		Hangar:					'10',
		DirectionalThruster:	'13',
		GyroArray_X:			'14',
		GyroArray_Y:			'14',
		GyroArray_Z:			'14',
		InertiaDampener:		'15',
		FlightRecorder:			'16',
		Assembly:				'17',
		ShieldGenerator:		'50',
		EnergyContainer:		'51',
		Generator:				'52',
		IntegrityFieldGenerator:'53',
		ComputerCore:			'54',
		HyperspaceCore:			'55'
		}

class CostCalulator {
	constructor(){
		this.materialCostFactor = {};

		for(let stuff of material_name){
			//Calculate as per https://avorion.gamepedia.com/API:Material#value
			let id =  material_id[stuff];
			let pow = id-1;
			materialCostFactor[id] =  Math.pow(1.35,pow); //titanium is power 1.
		}

		this.blockTypeCreditsPerCubicKm = {
		Engine:					69/materialCostFactor[material_id[material.Trinium]], 
		Stone:					0/materialCostFactor[material_id[material.Trinium]],
		Cargo:					69/materialCostFactor[material_id[material.Trinium]],
		CrewQuarters:			62/materialCostFactor[material_id[material.Trinium]],
		Thruster:				42/materialCostFactor[material_id[material.Trinium]],
		Armour:					10 /materialCostFactor[material_id[material.Trinium]],
		Hangar:					124/materialCostFactor[material_id[material.Trinium]],
		DirectionalThruster:	42/materialCostFactor[material_id[material.Trinium]],
		GyroArray_X:			137/materialCostFactor[material_id[material.Trinium]],
		GyroArray_Y:			137/materialCostFactor[material_id[material.Trinium]],
		GyroArray_Z:			137/materialCostFactor[material_id[material.Trinium]],
		InertiaDampener:		823/materialCostFactor[material_id[material.Trinium]], //WRONG approximation; overestimates cost. 1.35 ^ -1 = 334 -- I just used 700 here as an approximation cause there is no trinium equivalent.
		FlightRecorder:			547/materialCostFactor[material_id[material.Trinium]],
		Assembly:				1367/materialCostFactor[material_id[material.Trinium]],
		ShieldGenerator:		1197/materialCostFactor[material_id[material.Trinium]],
		EnergyContainer:		96/materialCostFactor[material_id[material.Trinium]],
		Generator:				724/materialCostFactor[material_id[material.Trinium]],
		IntegrityFieldGenerator:387/materialCostFactor[material_id[material.Trinium]],
		ComputerCore:			1137/materialCostFactor[material_id[material.Trinium]],
		HyperspaceCore:			2367/materialCostFactor[material_id[material.Trinium]]}

		this.blockTypeResourcePerCubicKm = {
		Engine:					5,
		Stone:					15/1000,
		Cargo:					12500,
		CrewQuarters:			11250,
		Thruster:				SOMETHING,
		Armour:					SOMETHING,
		Hangar:					SOMETHING,
		DirectionalThruster:	SOMETHING,
		GyroArray_X:			SOMETHING,
		GyroArray_Y:			SOMETHING,
		GyroArray_Z:			SOMETHING,
		InertiaDampener:		SOMETHING,
		FlightRecorder:			SOMETHING,
		Assembly:				SOMETHING,
		ShieldGenerator:		SOMETHING,
		EnergyContainer:		SOMETHING,
		Generator:				SOMETHING,
		ComputerCore:			SOMETHING,
		HyperspaceCore:			SOMETHING,
		
	}
}
}

let defaultConfigurations = [
	new BlockConfiguration( Block_Name.Engine,					1,light_2_heavy_mats).orderBy(order.matters),
	new BlockConfiguration( Block_Name.Stone, 					0),
	new BlockConfiguration( Block_Name.Cargo, 					0,light_2_heavy_mats).orderBy(order.matters),
	new BlockConfiguration( Block_Name.CrewQuarters,			1,light_2_heavy_mats).orderBy(order.matters),
	new BlockConfiguration( Block_Name.Thruster, 				1,light_2_heavy_mats).orderBy(order.matters),
	new BlockConfiguration( Block_Name.Armour,	 				1,[m.Trinium,m.Titanium,m.Ogonite,m.Iron]).orderBy(order.matters).scale(2),
	new BlockConfiguration( Block_Name.Hangar,					0,[m.Trinium,m.Xanion,m.Avorion,m.Ogonite]).orderBy(order.matters),
	new BlockConfiguration( Block_Name.DirectionalThruster, 	1,light_2_heavy_mats).orderBy(order.matters),
	new BlockConfiguration( Block_Name.GyroArray_X, 			1),
	new BlockConfiguration( Block_Name.GyroArray_Y, 			1),
	new BlockConfiguration( Block_Name.GyroArray_Z, 			1),
	new BlockConfiguration( Block_Name.InertiaDampener, 		1,[m.Avorion,m.Iron]),
	new BlockConfiguration( Block_Name.FlightRecorder,	 		1,[m.Trinium,m.Titanium,m.Naonite,m.Xanion,m.Avorion,m.Ogonite,m.Iron]).orderBy(order.matters).scale(0.1),
	new BlockConfiguration( Block_Name.Assembly, 				1,[m.Avorion,m.Naonite,m.Xanion,m.Ogonite]),
	new BlockConfiguration( Block_Name.ShieldGenerator, 		1,[m.Trinium,m.Naonite,m.Xanion,m.Avorion,m.Iron]),
	new BlockConfiguration( Block_Name.EnergyContainer, 		1,[m.Trinium,m.Titanium,m.Naonite,m.Xanion,m.Avorion,m.Ogonite,m.Iron]),
	new BlockConfiguration( Block_Name.Generator,				2,[m.Trinium,m.Titanium,m.Naonite,m.Xanion,m.Avorion]),
	new BlockConfiguration( Block_Name.IntegrityFieldGenerator, 1,[m.Trinium,m.Titanium,m.Naonite,m.Xanion,m.Avorion,m.Ogonite]).orderBy(order.matters).scale(0.1),
	new BlockConfiguration( Block_Name.ComputerCore, 			1,[m.Trinium,m.Xanion,m.Avorion]),
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

  get cost()
  {
	let unCalculated = []

	let statistics = {};
	let cost = {};

	let credits = "credits";
	cots[credits] = 0;

	for(let block of this.blocks)
	{
		let material = block.material_name;
		let scale = block.scale;
		let volume = Math.pow(block.scale,3)
		switch(block.BlockName)
		{
			case Block_Name.Armour:
				cost[material] += volume *8;
			break;
			case Block_Name.Armour:
			break;
			default:
			unCalculated.push(block.blockName);
			
		}
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

		for(let i = 0; i < b.amount; i++)
		{
			doc += `\t<item parent="${parentIndex}" index="${currentIndex++}"><block index="${Block_Id[b.BlockName]}" material="${b.material}" look="${look}" up="${up}" color="ffa3afbf" lx="-${d}" ux="${d}" ly="-${d}" uy="${d}" lz="-${d}" uz="${d}"/></item>\n`;
			parentIndex = 0; //The root element is the element whose parent is -1, after root element, add all blocks to the parent.
		}
		
	});

	//Finish up document with closing tag for root XML element, then add a linebreak for good measure.
	doc += `</${rootName}>`;
	return doc;
  }
}


let test = [
	new BlockConfiguration( Block_Name.Engine,					20,light_2_heavy_mats).orderBy(order.matters),
	new BlockConfiguration( Block_Name.Stone,					30,[material_id.Xanion]),
	new BlockConfiguration( Block_Name.Stone,					1,[material_id.Xanion]).scale(1.1),
	new BlockConfiguration( Block_Name.Cargo,					2,light_2_heavy_mats).orderBy(order.matters).scale(0.15),
	new BlockConfiguration( Block_Name.CrewQuarters,			1,light_2_heavy_mats).orderBy(order.matters).scale(0.07),
	new BlockConfiguration( Block_Name.Thruster,				0,light_2_heavy_mats).orderBy(order.matters),
	new BlockConfiguration( Block_Name.Armour,					0,[m.Ogonite,m.Trinium,m.Titanium,m.Iron]).orderBy(order.matters).scale(2),
	//new BlockConfiguration( Block_Name.Armour,	 			1,[m.Ogonite,m.Trinium,m.Titanium,m.Iron]).orderBy(order.matters).scale(2),
	new BlockConfiguration( Block_Name.Hangar,					0,[m.Trinium,m.Xanion,m.Avorion,m.Ogonite]).orderBy(order.matters),
	new BlockConfiguration( Block_Name.DirectionalThruster, 	0,light_2_heavy_mats).orderBy(order.matters),
	new BlockConfiguration( Block_Name.GyroArray_X,				0),
	new BlockConfiguration( Block_Name.GyroArray_Y,				0),
	new BlockConfiguration( Block_Name.GyroArray_Z,				0),
	new BlockConfiguration( Block_Name.InertiaDampener,			0,[m.Avorion,m.Iron]),
	new BlockConfiguration( Block_Name.FlightRecorder,			0,[m.Trinium,m.Titanium,m.Naonite,m.Xanion,m.Avorion,m.Ogonite,m.Iron]).orderBy(order.matters).scale(0.1),
	new BlockConfiguration( Block_Name.Assembly,				0,[m.Avorion,m.Naonite,m.Xanion,m.Ogonite]),
	new BlockConfiguration( Block_Name.ShieldGenerator,			0,[m.Trinium,m.Naonite,m.Xanion]),
	new BlockConfiguration( Block_Name.EnergyContainer,			0,[m.Trinium,m.Titanium,m.Naonite,m.Xanion,m.Avorion,m.Ogonite,m.Iron]),
	new BlockConfiguration( Block_Name.Generator,				0,[m.Trinium,m.Titanium,m.Naonite,m.Xanion]),
	new BlockConfiguration( Block_Name.IntegrityFieldGenerator, 0,[m.Trinium,m.Titanium,m.Naonite,m.Xanion,m.Avorion,m.Ogonite]).orderBy(order.matters).scale(0.01),
	new BlockConfiguration( Block_Name.ComputerCore, 			0,[m.Trinium,m.Xanion,m.Avorion]),
	new BlockConfiguration( Block_Name.HyperspaceCore, 			0,[m.Xanion]).scale(0.1),
	new BlockConfiguration( Block_Name.HyperspaceCore, 			0,[m.Trinium,m.Naonite,m.Xanion,m.Avorion]).scale(0.1),
    // 'Solar' : 60, //May add solar panel stacking in the future; is super nice for people to have in stations; they should be scaled specially though, conforming to their maximum effectivity.
];

var cube = new Cube(test,material_id.Avorion);
///cube.blocks.foreach(block=>block.BlockType == BlockType.Engine).forEach(m=>console.log(m));

cube.blocks.forEach(b=> console.log('' + b.BlockName))
cube.scale = 5;

var fs = require('fs');

fs.writeFile('ship.xml', cube.xml, function (err) {
  if (err) throw err;
  console.log('Saved!');
});

console.log(cube.getDescription());
console.log("Code executed succesfully.")
