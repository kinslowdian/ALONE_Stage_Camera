// DEBUG
var trace = function(msg){ console.log(msg); };

class Camera
{
	constructor(main)
	{
		this.main = main;
	}

	updateResizeCamera()
	{
		this.w = this.main.offsetWidth;
		this.h = this.main.offsetHeight;
	}

	connectViewer(div)
	{
		this.viewer = div;
		this.viewW = this.viewer.offsetWidth;
		this.viewH = this.viewer.offsetHeight;
	}
}


var CAM; 
var displayList;

function pageLoad_init()
{
	trace("pageLoad_init();");

	project_setup();
}

function project_setup()
{
	displayList = {};

	displayList.camera = document.querySelector(".camera");
	displayList.viewer = document.querySelector(".viewer");

	camera_init();
}

function camera_init()
{
	var CAM = new Camera(displayList.camera);

	CAM.updateResizeCamera();
	CAM.connectViewer(displayList.viewer);

	trace(CAM);

}

