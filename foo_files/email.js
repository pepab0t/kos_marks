function email()
{
	if(document.all) hSize = document.body.clientHeight;
	else hSize = innerHeight;
	descript = "menubar=no,personalbar=no,location=no,titlebar=no,scrollbars=yes,toolbar=no,status=no,width=1000,height=" + hSize + ",resizable=yes,left=20px,top=20px";
	window.open("", "kosiEmailWin", descript);
}

function detail()
{
	console.log("detail()");
	if(document.all) hSize = document.body.clientHeight;
	else hSize = innerHeight;
	descript = "menubar=no,personalbar=no,location=no,titlebar=no,scrollbars=yes,toolbar=no,status=no,width=960,height=" + hSize + ",resizable=yes,left=20px,top=20px";
	window.open("", "kosiSubjectDetail", descript);
}

function rozvrhWindow()
{
	console.log("rozvrh()");
	if(document.all) hSize = document.body.clientHeight;
	else hSize = innerHeight;
	descript = "menubar=no,personalbar=no,location=no,titlebar=no,scrollbars=yes,toolbar=no,status=no,width=960,height=" + hSize + ",resizable=yes,left=20px,top=20px";
	window.open("", "kosiRozvrh", descript);
}

function groupDetail()
{
	if(document.all) hSize = document.body.clientHeight;
	else hSize = innerHeight;
	descript = "menubar=no,personalbar=no,location=no,titlebar=no,scrollbars=yes,toolbar=no,status=no,width=900,height=" + hSize + ",resizable=yes,left=10px,top=10px";
	window.open("", "groupDetail", descript);
}

function detailForPopUpStudent()
{
	descript = "menubar=no,personalbar=no,location=no,titlebar=no,scrollbars=yes,toolbar=no,status=no,width=1000,height=475,resizable=yes,left=40px,top=40px";
	window.open("", "kosiPopUpStudentDetail", descript);
}