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
		
		this.x = 0;
		this.y = 0;
	}

	connectViewer(div)
	{
		this.viewer = div;
		this.viewW = this.viewer.offsetWidth;
		this.viewH = this.viewer.offsetHeight;
		
		this.viewer.x = 0;
		this.viewer.y = 0;
	}

	viewerShift(x, y)
	{
		this.viewer.x = x;
		this.viewer.y = y;
		
		if(this.viewer.x != this.x || this.viewer.y != this.y)
		{
			this.viewerTransition();
		}

		trace(this.viewerTransition);
	}

	viewerTransition()
	{
		this.viewer.addEventListener("transitionend", this.viewerTransitionEvent, false);

		this.viewer.setAttribute("style", "transform: translate(" + this.viewer.x + "px, " + this.viewer.y + "px);");
	}

	// OUT OF SCOPE
	viewerTransitionEvent(event)
	{
		event.target.removeEventListener("transitionend", this.viewerTransitionEvent, false);
		
		trace(event);

		// LINK BACK VALUES
		camera_newFocus();
	}

	viewerUpdateValues()
	{
		this.x = this.viewer.x;
		this.y = this.viewer.y;	
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

	trace(displayList.viewer.style);

	camera_init();
}

function camera_init()
{
	CAM = new Camera(displayList.camera);

	CAM.updateResizeCamera();
	CAM.connectViewer(displayList.viewer);

	trace(CAM);

	var delay = setTimeout(camera_test1, 1 * 1000);
}

function camera_test1()
{
	CAM.viewerShift(-500, -500);
}

function camera_newFocus()
{
	CAM.viewerUpdateValues();
}






