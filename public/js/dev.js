
function dev_btns()
{
	displayList.btn0 = document.querySelector(".t0");
	displayList.btn1 = document.querySelector(".t1");
	displayList.btn2 = document.querySelector(".t2");

	dev_init();
}

function dev_init()
{
	for(var i = 0; i < 3; i++)
	{
		displayList["btn" + i].addEventListener("click", dev_event, false);
	}
}

function dev_event(event)
{
	event.preventDefault();

	trace(event.target.dataset.num);

	CAM.viewerFind(sectionsARR[event.target.dataset.num]);
}