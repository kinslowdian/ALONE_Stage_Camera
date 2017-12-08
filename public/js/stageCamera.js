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

	viewerFind(target)
	{
		var vf = {};

		vf.cx = -((target.x));
		vf.cy = -((target.y));
		vf.cx_f = vf.cx + ((this.w * 0.5) - (target.w * 0.5));
		vf.cy_f = vf.cy + ((this.h * 0.5) - (target.h * 0.5));

		trace(vf);

		this.viewerShift(vf.cx_f, vf.cy_f);
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

class Section
{
	constructor(main, w, h, x, y)
	{
		this.main = main;
		this.w = w;
		this.h = h;
		this.x = x;
		this.y = y;	
	}

	placement()
	{
		this.main.setAttribute("style", "width: " + this.w + "px; height: " + this.h + "px; transform: translate(" + this.x + "px, " + this.y + "px);");
	}
}


var CAM; 
var displayList;
var resizeTimeout;
var sectionsARR;

function pageLoad_init()
{
	trace("pageLoad_init();");

	project_setup();
}

function resize_init(run)
{
	if(run)
	{
		window.addEventListener("resize", resize_throttler, false);
	}

	else
	{
		window.removeEventListener("resize", resize_throttler, false);
	}
}

function resize_throttler()
{
	if(!resizeTimeout)
	{
		resizeTimeout = setTimeout(resize_call, 66);
	}
}

function resize_call()
{
	resizeTimeout = null;
	resize_apply();
}

function resize_apply()
{
	trace("RESIZE");
}

function project_setup()
{
	displayList = {};

	displayList.camera = document.querySelector(".camera");
	displayList.viewer = document.querySelector(".viewer");

	displayList.section0 = document.querySelector(".section0");

	section_init();
	camera_init();

	// LAST
	resize_init();
}

function section_init()
{
	sectionsARR = new Array();

	trace(displayList.section0);

	var s0 = new Section(displayList.section0, 320, 568, 1500, 400);

	s0.placement();

	sectionsARR.push(s0);
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
	// CAM.viewerShift(-500, -500);

	CAM.viewerFind(sectionsARR[0]);
}

function camera_newFocus()
{
	CAM.viewerUpdateValues();
}







