let width_canvas;
let hight_canvas;
let width_rec;
let hight_rec;
let timeGame;
let backMusic;
let badMusic;
let goodMusic;
var soundGame;
let flagSound=1;
let numberLive=3;
var interval;
var board;
let hight_bord=11;
let wight_bord=16;
var space_loc = new Object();
var keysDown;
let time_elapsed;
let start_time;
let img_space;
let img_chick_5Points;
let img_chick_10Points;
let img_chick_15Points;
let img_chick_20Points;
let move_right=false;
let img_shoot;
let i_shoot;
let j_shoot;
let count_time = 900;
let keyCode=32;
let hasBeenPressed = false;
let arrayChicken= [];
let img_egg;
let randomIndex;
let iChicken;
let jChicken;
let flag15=false;
let randomInt;
let intervalChickLock;
let intervalEgg;
let intervalShoot;
let intervalFlag15;
let intervalTimeOut;
let timeoutID ;
let score;
let lblScore;
let lblTime;
let table;
let dateGame;

window.onkeydown = function(e) {
	if (e.keyCode == 32 && e.target == document.body) {
		e.preventDefault();
	}
};


$(window).on('beforeunload', function(){
	$(window).scrollTop(0);
  });
  
  function show(div_show)
  {
	if(div_show=='LoginPage')
	  {

		let form = $("form[name='login']");
		form[0].reset();
		
	  }
	if(backMusic != undefined){
		flagSound=0;
		backMusic.pause();
	}
	window.clearInterval(interval);
	window.clearInterval(intervalChickLock);
	window.clearInterval(intervalEgg);
	window.clearInterval(intervalShoot);
	window.clearInterval(intervalFlag15);
	window.clearInterval(intervalTimeOut);
	window.clearTimeout(timeoutID);

	count_time = 900;
	$("#"+"welcomePage").hide();
	$("#"+"registrationPage").hide();
	$("#"+"about").hide();
	$("#"+"LoginPage").hide();
	$("#"+"configuration").hide();
	$("#"+"gamePage").hide();
	$("#"+"GameOver").hide();
	$("#"+div_show).show();
	table = document.getElementById("myTable");
	if(div_show=="welcomePage" || div_show=="LoginPage" || div_show=="registrationPage"){
		while(table.rows.length > 1) {
			table.deleteRow(table.rows.length-1);
		}		
	}
  }


/************************** Register ****************************/
$(document).ready(function () {
	localStorage.setItem('p', 'testuser');
	$("form[name='register']").validate({
		rules: 
		{
			username: 
			{
				required: true,
				freeUsername: true
			},
			firstname: 
			{ 
				required: true,
				lettersonly: true
			},
			lastname: 
			{ 
				required: true,
				lettersonly: true
			},
			email: 
			{
				required: true,
				email: true
			},
			psw: 
			{
				required: true,
				minlength: 8,
				validPassword: true
			},
			confirmPass:
			{
				required: true,
				minlength: 8,
				validPassword: true
			},
			year:
			{
				required: true,
				number: true
			},
			month:
			{
				required: true,
				number: true
			},
			day:
			{
				required: true,
				number: true
			}
		},

		messages: 
		{
			username: 
			{
				required: "Choose a User-Name <br>",
				freeUsername: "Please select another username because this username is already exist <br>"
			},
			firstname:
			{ 
				required: "Please enter your first name <br>",
				lettersonly: "Please enter a valid name - without numbers <br>"
			},
			lastname:
			{ 
				required: "Please enter your last name <br>",
				lettersonly: "Please enter a valid last name - without numbers <br>"
			},
			psw: 
			{
				required: "Please provide a password <br>",
				validPassword: "Your password must contain at least one letter and one number <br>",
				minlength:"Your password must be at least 8 characters long <br>"
			},
			confirmPass: 
			{
				required: "Please provide a password <br>",
				validPassword: "Your password must contain at least one letter and one number <br>",
				minlength:"Your password must be at least 8 characters long <br>"
			},
			email:
			{ 
				email: "Please enter a valid email address <br>",
				required: "Please enter an email <br>"
			},
			day: 
			{
				number: "Please choose a valid date of birth <br>"
			},
			year: 
			{
				number: "Please choose a valid date of birth <br>"
			},
			month: 
			{
				number: "Please choose a valid date of birth <br>"
			}
		},


		submitHandler: function() {
			let username = document.getElementById("username").value;
			let psw = document.getElementById("psw").value;
			let confirmPass = document.getElementById("confirmPass").value;

			if (psw != confirmPass){
				alert("Password verification does not match");
			}
			else{
				localStorage.setItem(username, psw);
				let form = $("form[name='register']");
				form[0].reset();
				show_login();				
			}
		},
	});


});
	
$(function() {
	//the username is free
	$.validator.addMethod('freeUsername', function (value) {
		return localStorage.getItem(value)==null;
	});

	// the password contain 1 number and 1 letter
	$.validator.addMethod('validPassword', function (value) {
		return /[a-z].*[0-9]|[0-9].*[a-z]/i.test(value);
	});

});
	
var days_of_month = [31,28,31,30,31,30,31,31,30,31,30,31];
$(document).ready(function(){
	var option = '<option value="day">day</option>';
	var selectedDay="day";
	for (var i=1;i <= days_of_month[0];i++){ //add option days
		option += '<option value="'+ i + '">' + i + '</option>';
	}
	$('#day').append(option);
	$('#day').val(selectedDay);

	var option = '<option value="month">month</option>';
	var selectedMon ="month";
	for (var i=1;i <= 12;i++){
		option += '<option value="'+ i + '">' + i + '</option>';
	}
	$('#month').append(option);
	$('#month').val(selectedMon);

	var d = new Date();
	var option = '<option value="year">year</option>';
	selectedYear ="year";
	for (var i=(d.getFullYear()-120);i <= d.getFullYear();i++){
		option += '<option value="'+ i + '">' + i + '</option>';
	}
	$('#year').append(option);
	$('#year').val(selectedYear);
});
	
function isLeapYear(year) {
	year = parseInt(year);
	if (year % 4 != 0) {
		return false;
	} else if (year % 400 == 0) {
		return true;
	} else if (year % 100 == 0) {
		return false;
	} else {
		return true;
	}
}

function change_year(select)
{
	if( isLeapYear( $(select).val() ) )
		{
			days_of_month[1] = 29;
			if( $("#month").val() == 2)
			{
					var day = $('#day');
					var val = $(day).val();
					$(day).empty();
					var option = '<option value="day">day</option>';
					for (var i=1;i <= days_of_month[1];i++){ //add option days
							option += '<option value="'+ i + '">' + i + '</option>';
					}
					$(day).append(option);
					if( val > days_of_month[ month ] )
					{
							val = 1;
					}
					$(day).val(val);
				}
	}
	else {
		days_of_month[1] = 28;
	}
}

function change_month(select) {
	var day = $('#day');
	var val = $(day).val();
	$(day).empty();
	var option = '<option value="day">day</option>';
	var month = parseInt( $(select).val() ) - 1;
	for (var i=1;i <= days_of_month[ month ];i++){ //add option days
		option += '<option value="'+ i + '">' + i + '</option>';
	}
	$(day).append(option);
	if( val > days_of_month[ month ] )
	{
		val = 1;
	}
	$(day).val(val);
}
	

/************************** login ****************************/

$(document).ready(function () {

	$("form[name='login']").validate({
		// Specify validation rules
		rules: 
		{
			loginUsername: 
			{
				required: true,
			},
			loginPsw: 
			{
				required: true,
			}
		},


		// Make sure the form is submitted to the destination defined
		// in the "action" attribute of the form when valid
		submitHandler: function() {
			
			let username = document.getElementsByName("loginUsername")[0].value;
			
			let psw = document.getElementsByName("loginPsw")[0].value;
			let psw_save = localStorage.getItem(username);
			
			let form = $("form[name='login']"); 
			if (psw_save == null || psw_save != psw){
				alert("incorrect password!");
				form[0].reset();
			}
			else if(psw_save == psw){
				show('configuration');
			}
			else{
				form[0].reset();
			}
		},
	});

});


function show_login(){
	$("#"+"welcomePage").hide();
	$("#"+"registrationPage").hide();
	$("#"+"LoginPage").hide();
	$("#"+"configuration").hide();
	$("#"+"about").hide();
	$("#"+"GameOver").hide();
	let form = $("form[name='login']");
	form[0].reset();
	$("#"+'welcomePage').show();
}

/************************** configuration ****************************/

function KeyUpdate(e){
	keyCode=e.keyCode;
	if(keyCode==32)
		document.getElementById("keyShoot").value= "space";
	else
		document.getElementById("keyShoot").value= String.fromCharCode(e.keyCode);
}

function setConfiguration(){
	if(document.getElementById("keyShoot").value==" "){
		document.getElementById("keyShoot").value="space";}
	timeGame= document.getElementById("timeGame").value;
	lblTime=document.getElementById("lblTime");
	backMusic=new Audio('music/back.mp3');
	badMusic=new Audio('music/bad.mp3');
	goodMusic=new Audio('music/good.mp3');


	$(document).ready(function() {
		context = canvas.getContext("2d");
		width_canvas=canvas.width;
		hight_canvas=canvas.height;
		width_rec=width_canvas/wight_bord;
		hight_rec=hight_canvas/hight_bord;
		document.getElementById("player_name").value =document.getElementsByName("loginUsername")[0].value;
		show('gamePage');
		Start();
	});
}

/************************** Game ****************************/
function Start() {
	window.focus();
	flagSound=0;
	stopSound();	
	flag15=false;
	numberLive=3;
	score = 0;
	board = new Array();
	count_time = 900;
	randomInt = Math.floor(Math.random() * (wight_bord-1));
	$("#"+'life1').show();
	$("#"+'life2').show();
	$("#"+'life3').show();
	start_time=new Date();
	document.getElementById("globalTime").value=timeGame;
	lblScore=document.getElementById("lblScore");
	dateGame=new Date();
	for (var i = 0; i < hight_bord; i++) {
		board[i] = new Array();
		for (var j = 0; j < wight_bord; j++) {
			if (i==0 && j>=((wight_bord-1)/3) && j<(((wight_bord-1)/3)+5))  {
				board[i][j]=4;
			}
			else if (i==1 && j>=((wight_bord-1)/3) && j<(((wight_bord-1)/3)+5))  {
				board[i][j]=3;
			}
			else if (i==2 && j>=((wight_bord-1)/3) && j<(((wight_bord-1)/3)+5))  {
				board[i][j]=2;
			}
			else if (i==3 && j>=((wight_bord-1)/3) && j<(((wight_bord-1)/3)+5))  {
				board[i][j]=1;
			}
			else if (i==(hight_bord-2) && j==randomInt)  {
				board[i][j]=5;
				space_loc.i=i;
				space_loc.j=j;
			}
			else{
				board[i][j]=0;
			}

		}
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			if(e.keyCode==keyCode){
				if(!hasBeenPressed){
					keysDown[e.keyCode] = true;

					hasBeenPressed=true
				}

			}
			else{
				keysDown[e.keyCode] = true;
			}
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			if(e.keyCode==keyCode){
				hasBeenPressed=false
			}
			keysDown[e.keyCode] = false;
		},
		false
	);

	creat_image();
	interval = setInterval(UpdatePosition, 80);
	let count_time_iterations = 0; // counter for number of iterations
	const MAX_ITERATIONS = 4; // maximum number of iterations
	// function to update the value of count_time every 5 seconds
	function updateCountTime() {
		if (count_time_iterations < MAX_ITERATIONS) {
			// decrease count_time by 1000ms every 5 seconds for 4 iterations
			count_time -= 100;
			count_time_iterations++;
		}
	}
	intervalTimeOut=setInterval(updateCountTime, 5000);
	function callUpdatePosition2() {
		UpdatePosition2();
		timeoutID =setTimeout(callUpdatePosition2, count_time);
	}
	callUpdatePosition2();
	intervalShoot=setInterval(function() {
		i_shoot=space_loc.i-1;
		j_shoot=space_loc.j;
		if (keysDown[keyCode])//shoot
		{
			keysDown[keyCode] = false;
			board[i_shoot][j_shoot]=6
		}
	}, 100);

	intervalChickLock=setInterval(function() {
		arrayChicken= [];
		for (var j = 0; j < wight_bord; j++) {
			for (var i = 0; i < 4; i++){
				if (board[i][j]!=0){
					let o=new Object();
					o.x=i;
					o.y=j;
					arrayChicken.push(o)
				}
			}
		}
	}, 80);

	intervalEgg=setInterval(function() {
		if (canEgg()){
			randomIndex = Math.floor(Math.random() * (arrayChicken.length));
			iChicken=arrayChicken[randomIndex].x
			jChicken=arrayChicken[randomIndex].y
			board[iChicken+1][jChicken]=board[iChicken+1][jChicken]+10
		}
		for (var i = 0; i < hight_bord-1; i++) {
			for (var j = 0; j < wight_bord; j++) {
				var center = new Object();
				center.y = i * width_rec+width_rec/2;
				center.x = j * hight_rec+hight_rec/2 ;
				if (board[i][j]>=10&& i<hight_bord){
					context.drawImage(img_egg, center.x-hight_rec/4+2, center.y-width_rec/2-8,30,30);
				}
			}
		}
		for (var i = hight_bord-2; i >= 0; i--) {
			for (var j = 0; j < wight_bord; j++) {
				if (board[i][j]>=10&& i<hight_bord){
					board[i][j]=board[i][j]-10
					board[i+1][j]=board[i+1][j]+10
				}
			}

		}
	}
	, 320);
	intervalFlag15=setInterval(function() {
		for (var i = hight_bord-2; i >= 7; i--) {
			for (var j = 0; j < wight_bord; j++) {
				if(board[i][j]==15){
					flag15=true
					downLive()
					numberLive=numberLive-1
					if (flagSound==1){
						badMusic.play()
					}
				}
			}
		}
	},80);

}

function extractTableData() {
	var table = document.getElementById("myTable");
	var rows = table.querySelectorAll("tr");
	var data = [];
	for (var i = 1; i < rows.length; i++) {
	  var cells = rows[i].querySelectorAll("td");
	  var rowData = {
		Score: cells[1].innerText,
		Date: cells[2].innerText
	  };
	  
	  data.push(rowData);
	}
	return data;
  }

function addRow(){
	let data=extractTableData()
	let year = dateGame.getFullYear();
	let month = dateGame.getMonth() + 1;
	let day = dateGame.getDate();

	let hours = dateGame.getHours();
	let minutes = dateGame.getMinutes();
	let seconds = dateGame.getSeconds();
	data.push({Score: score.toString(), Date:  `${day}-${month}-${year}  ${hours}:${minutes}:${seconds}` })
	let newArray = data.sort((a, b) => b.Score-a.Score).map((item, index) => ({ Place: index + 1, ...item }));
	while(table.rows.length > 1) {
		table.deleteRow(table.rows.length-1);
	}		
	for (var i = 0; i < newArray.length; i++) {
		var row = table.insertRow(i+1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		cell1.innerHTML = newArray[i].Place;
		cell2.innerHTML = newArray[i].Score;
		cell3.innerHTML = newArray[i].Date;

		let sTime=`${day}-${month}-${year}  ${hours}:${minutes}:${seconds}` 
		if (sTime == newArray[i].Date) {
		  row.style.backgroundColor = "red";
		}
	}
}


function UpdatePosition(){
	board[space_loc.i][space_loc.j]=0;
	if (keysDown[38])//up
	{
		if (space_loc.i > Math.floor(hight_bord*0.6)) {
			space_loc.i--;
		}

	}
	if (keysDown[40])//down
	{
		if (space_loc.i < (hight_bord-2)) {
			space_loc.i++;
		}
	}
	if (keysDown[37])//left
	{
		if (space_loc.j > 0) {
			space_loc.j--;
		}
	}
	if (keysDown[39])//right
	{
		if (space_loc.j < (wight_bord-2)) {
			space_loc.j++;
		}
	}
	board[space_loc.i][space_loc.j]=5;
	var currentTime = new Date();
	time_elapsed = timeGame-(currentTime - start_time) / 1000;
	if ( time_elapsed<=0) {
		if(score<100 && numberLive>0)
		{
		  alert("You can do better "+score+" points");
		  gameOver();
		}
		else if(numberLive>0 && score>=100){
		  alert("Winner!");
		  gameOver();
		}
	}
	if(numberLive<=0){
		alert("You Lost");
		gameOver();
	}
	if(existChicken()){
		alert("Champion!")
		gameOver();
	}
	if(flag15){
		cleanBoard();
	}
	Draw();
}
function UpdatePosition2(){
	let maxIndex=0;
	let minIndex=wight_bord-1;
	for (var j = 0; j < wight_bord; j++) {
		for  (var i = 0; i < 4; i++){
			if (board[i][j]==(4-i) && j<minIndex){
				minIndex=j
			}
			if (board[i][j]==(4-i) && j>maxIndex){
				maxIndex=j
			}
		}
	}
	if (minIndex==0){
		move_right=true
	}

	if (maxIndex==(wight_bord-2)){
		move_right=false
	}

	if(move_right){
		for (var j = maxIndex+1; j > minIndex-1; j--) {
			for (var i = 0; i < 4; i++){
				if (j==0){
					board[i][j]=0
				}
				else{
					if(board[i][j-1]==6){
						if(board[i][j]!=6){
							board[i][j]=0
						}
					}
					else{
						board[i][j]=board[i][j-1]
					}
				}
			}
		}
	}
	else{
		for (var j = minIndex-1; j < maxIndex+1; j++) {
			for (var i = 0; i < 4; i++){
				if(j==(wight_bord-1)){
					board[i][j]=0
				}
				else{
					if(board[i][j+1]==6){
						if(board[i][j]!=6){
							board[i][j]=0
						}
					}
					else{
						board[i][j]=board[i][j+1]
					}

				}
			}
		}
	}
	Draw()

}


function canEgg(){
	for (var i = 0; i < 7; i++) {
		for (var j = 0; j < wight_bord; j++) {
			if (board[i][j] >=10){
				return false;
			}
		}
	}
	return true;
}
function existChicken(){
	for (var i = 0; i < 5; i++) {
		for (var j = 0; j < wight_bord; j++) {
			if (board[i][j] !=0 && board[i][j]!=10 && board[i][j]!=6){
				return false;
			}
		}
	}
	return true;
}
function cleanBoard(){
	for (var i = 0; i < hight_bord-1; i++) {
		for (var j = 0; j < wight_bord; j++) {
			if (board[i][j]>=10){
				if(board[i][j]==15){
					board[i][j]=0
					board[hight_bord-2][randomInt]=5;
					space_loc.i=hight_bord-2;
					space_loc.j=randomInt;
				}
				else{
					board[i][j]=board[i][j]-10
				}
			}
			else if(board[i][j]==6){
				board[i][j]=0
			}
			else if(board[i][j]==5){
				board[i][j]=0
				board[hight_bord-2][randomInt]=5;
				space_loc.i=hight_bord-2;
				space_loc.j=randomInt;
			}
		}
	}
	flag15=false
}
function Draw() {
	canvas.width = canvas.width;
	lblScore.value = score;
	lblTime.value = Math.floor(time_elapsed) +" sec";
	for (var i = 0; i < hight_bord-1; i++) {
		for (var j = 0; j < wight_bord; j++) {
			var center = new Object();
			center.y = i * width_rec+width_rec/2;
			center.x = j * hight_rec+hight_rec/2 ;
			let add=5;
			if (board[i][j] == 5) 
			{
				context.drawImage(img_space, center.x-width_rec/2, center.y-hight_rec/2,width_rec-10,hight_rec+add);
			} 
			else if (board[i][j] == 4 || board[i][j] == 14) 
			{
				context.drawImage(img_chick_20Points, center.x-width_rec/2, center.y-hight_rec/2,width_rec+add,hight_rec+add);
			} 
			else if (board[i][j] == 3 || board[i][j] == 13) 
			{
				context.drawImage(img_chick_15Points, center.x-width_rec/2, center.y-hight_rec/2,width_rec+add,hight_rec+add);
			} 
			else if (board[i][j] == 2 || board[i][j] == 12) 
			{
				context.drawImage(img_chick_10Points, center.x-width_rec/2, center.y-hight_rec/2,width_rec+add,hight_rec+add);
			} 
			else if (board[i][j] == 1 || board[i][j] == 11) 
			{
				context.drawImage(img_chick_5Points, center.x-width_rec/2, center.y-hight_rec/2,width_rec+add,hight_rec+add);
			} 
			else if (board[i][j] == 6 || board[i][j] == 16) 
			{
				if (i>0 && (board[i-1][j]==0 || board[i-1][j]==10)){
					board[i-1][j]=board[i-1][j]+6
				}
				else if (i>0 && board[i-1][j]!=0 && board[i-1][j]!=10){
					if(flagSound==1){
						(new Audio('music/good.mp3')).play()
					}
					score=score+(board[i-1][j]%10)*5
					board[i-1][j]=0
				}

				board[i][j] = board[i][j]-6
				context.drawImage(img_shoot, center.x-10, center.y,10,hight_rec+add);
			} 
			if (board[i][j]>=10&& i<hight_bord){
				context.drawImage(img_egg, center.x-hight_rec/4+2, center.y-width_rec/2-8,30,30);
			}
		}
	}
}

function creat_image()
{
	img_space=new Image();
	img_space.src=document.querySelector('input[name="imageSpace"]:checked').value;
	

	img_chick_5Points = new Image();
	img_chick_5Points.src='photos/chick1.png';
	
	img_chick_10Points = new Image();
	img_chick_10Points.src='photos/chick2.png';

	img_chick_15Points = new Image();
	img_chick_15Points.src='photos/chick3.png';


	img_chick_20Points = new Image();
	img_chick_20Points.src='photos/chick4.png';

	img_shoot= new Image();
	img_shoot.src=document.querySelector('input[name="imageShoot"]:checked').value;

	img_egg= new Image();
	img_egg.src='photos/egg.png';


}

function stopSound() {
	const stopButton = document.getElementById("stopSound");

	if(flagSound==0){
		flagSound=1
		backMusic.play();
		stopButton.src = "photos/soundOn.png";
	}
	else{
		flagSound=0
		backMusic.pause();
		stopButton.src = "photos/soundOff.png";

	}
}


function downLive()
{
	$("#"+'life'+numberLive).hide();

}

function newGame()
{
	flagSound=0
	backMusic.pause();
	window.clearInterval(interval);
	window.clearInterval(intervalChickLock);
	window.clearInterval(intervalEgg);
	window.clearInterval(intervalShoot);
	window.clearInterval(intervalFlag15);
	window.clearInterval(intervalTimeOut);
	window.clearTimeout(timeoutID);
	show('configuration');
	
}

function gameOver(){
	addRow();
	flagSound=0
	backMusic.pause();
	show('GameOver')
}
