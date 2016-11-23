var targetSever='http://paddlers.cn';
var gotParticipatorInfo = false;
var testArea = document.getElementById('testArea');
var trigger = document.getElementById('trigger');
var TestTimes = 1;
var testAreaHeight;
var testAreaWidth;
var isStarted = false;
var startTime;
var endTime;
var testAreaInterval;

var triggerTimmerID;
var triggerStartAt;
var triggerEndAt;
var triggerInterval;
var triggerRemains = 1000;
var triggerPosition;
var triggerColor;

var reactionTimerID;
var reactionTime;
var IP;
var dataScope = [{}];
var aheadError = [];
var isNoticed;
var noticeNumber = 0;
var resolution = screen.width.toString() + 'x' + screen.height.toString();

var lock = true; //用来防止多次提交数据
var beforeTestTime = 1;
var nextStep = document.getElementById('nextstep');

//beforeTes
var itID = setInterval(function() {
	beforeTestTime--;
	if (beforeTestTime == 0) {
		nextStep.innerHTML = "下一步";
		nextStep.removeAttribute("disabled")
		clearInterval(itID);
	} else {
		nextStep.innerHTML = beforeTestTime;

	}

}, 1000);

function guideReaded() {
	document.getElementById('guidePage').style.display = 'none';
	document.getElementById('scopeInfo').removeAttribute('style');
	requestFullScreen(document.documentElement);
}

function beforeTest() {
	if($("input[name='vision']").val()){
		document.getElementById('scopeInfo').style.display = 'none';
		swal({
				title: "Are you Ready?",
				type: "warning",
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Go!",
				closeOnConfirm: true,
				html: true
			},
			function() {
				getParitcipatorInfo();
				gotParticipatorInfo = true;
				document.getElementById('body').style.display = 'flex';
				document.getElementById('testArea').style.display = 'flex';
			}
		);
	}
	document.getElementById('nosize').style.display = 'block';
}

function getParitcipatorInfo() {
	dataScope[0].age = $("input[name='age']").val();
	dataScope[0].sex = $("input[name='sex']:checked").val();
	dataScope[0].discipline = $("input[name='discipline']").val();
	dataScope[0].vision = $("input[name='vision']").val();
	dataScope[0].resolution = resolution;
	dataScope[0].IP = IP;
}

function requestFullScreen(element) {
	// 判断各种浏览器，找到正确的方法
	var requestMethod = element.requestFullScreen || //W3C
		element.webkitRequestFullScreen || //Chrome等
		element.mozRequestFullScreen || //FireFox
		element.msRequestFullScreen; //IE11
	if (requestMethod) {
		requestMethod.call(element);
	} else if (typeof window.ActiveXObject !== "undefined") { //for Internet Explorer
		var wscript = new ActiveXObject("WScript.Shell");
		if (wscript !== null) {
			wscript.SendKeys("{F11}");
		}
	}
}



//随机获取trigger settings
$.get("getTriggerSettings.php", function(result) {
	var got = JSON.parse(result);
	triggerPosition = got.triggerPosition;
	triggerColor = got.triggerColor;
});
// 监听space
document.getElementById('body').onkeydown = function(event) {
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if (e && e.keyCode == 32) {
		init();
		document.getElementById('testArea').focus();
	}

};

function init() {
	if (TestTimes > 5) {
		document.getElementById('body').innerHTML = "";
		document.onkeydown = null;
		askQuestion();
		return;

	} else {
		if (gotParticipatorInfo) {
			setTestArea();
		} else {
			return
		}

	}

	if (!isStarted) {
		triggerInterval = Math.floor(Math.random() * 1400 + 2500);
		testAreaInterval = Math.floor(Math.random() * 3000 + 4000);
		testArea.innerHTML = "";
		isStarted = true;
		reactionTimerID = setTimeout('startTest()', testAreaInterval);
		triggerTimmerID = setTimeout(function() {
			setTrigger();
			triggerStartAt = new Date();

			setTimeout(function() {
				trigger.style.display = 'none';
				triggerEndAt =triggerStartAt?(triggerStartAt.getTime() + triggerRemains):0;
			}, triggerRemains);

		}, triggerInterval);

	} else {
		endTime = new Date();
		if (!startTime) {
			clearTimeout(triggerTimmerID);
			sweetAlert({
				title: "按早了，放松",
				type: "error"
			});
			testAreaHeight = testArea.offsetHeight;
			testAreaWidth = testArea.offsetWidth;
			aheadError.push({
				"testNumber": TestTimes,
				"subjectEndTime": endTime.getTime(),
				"testAreaInterval": testAreaInterval,
				"testAreaWidth": testAreaWidth,
				"testAreaHeight": testAreaHeight,
				"triggerStartAt": triggerStartAt ? triggerStartAt.getTime() : 0,
				"triggerEndAt": triggerEndAt ? triggerEndAt : 0,
				"triggerColor": triggerColor,
				"triggerPosition": triggerPosition,
				"triggerInterval": triggerInterval

			});
			stopTest();
			return;
		}
		clearTimeout(triggerTimmerID);
		reactionTime = endTime.getTime() - startTime.getTime();
		// swal(reactionTime.toString());
		var tmp = reactionTime.toString();
		sweetAlert({
			title: "第" + TestTimes +"次实验: ",
			text: "<h1>反应时间:" + tmp + "ms</h1>",
			html: true
		});
		scopeData();
		stopTest();
		console.log(TestTimes);
		TestTimes++;
	}
}

function startTest() {
	isStarted = true;
	testArea.style.background = '#EF443D';
	startTime = new Date();
}

function setTestArea() {
	switch (TestTimes) {
		case 2:
			testArea.style.width = "40%";
			testArea.style.height = "40%";
			break;
		case 3:
			testArea.style.width = "60%";
			testArea.style.height = "60%";
			break;
		case 4:
			testArea.style.width = "80%";
			testArea.style.height = "80%";
			break;
		case 5:
			testArea.style.width = "100%";
			testArea.style.height = "100%";
			break;
	}

}

function setTrigger() {
	switch (triggerPosition + triggerColor) {
		case "upRightred":
			trigger.style.display = 'block';
			trigger.style.position = 'fixed';
			trigger.style.top = '0px';
			trigger.style.right = '0px';
			trigger.style.background = '#EF443D';
			break;
		case "upRightgreen":
			trigger.style.position = 'fixed';
			trigger.style.display = 'block';
			trigger.style.top = '0px';
			trigger.style.right = '0px';
			trigger.style.background = '#8CC152';
			break;
		case "upRightyellow":
			trigger.style.position = 'fixed';

			trigger.style.display = 'block';
			trigger.style.top = '0px';
			trigger.style.right = '0px';
			trigger.style.background = '#FEEA3B';
			break;
		case "upLeftred":
			trigger.style.position = 'fixed';

			trigger.style.display = 'block';
			trigger.style.top = '0px';
			trigger.style.left = '0px';
			trigger.style.background = '#EF443D';
			break;
		case "upLeftgreen":
			trigger.style.position = 'fixed';

			trigger.style.display = 'block';
			trigger.style.top = '0px';
			trigger.style.left = '0px';
			trigger.style.background = '#8CC152';
			break;
		case "upLeftyellow":
			trigger.style.position = 'fixed';

			trigger.style.display = 'block';
			trigger.style.top = '0px';
			trigger.style.left = '0px';
			trigger.style.background = '#FEEA3B';
			break;
			/****************bottomSide**************/
		case "bottomRightred":
			trigger.style.position = 'fixed';

			trigger.style.display = 'block';
			trigger.style.bottom = '0px';
			trigger.style.right = '0px';
			trigger.style.background = '#EF443D';
			break;
		case "bottomRightgreen":
			trigger.style.position = 'fixed';

			trigger.style.display = 'block';
			trigger.style.bottom = '0px';
			trigger.style.right = '0px';
			trigger.style.background = '#8CC152';
			break;
		case "bottomRightyellow":
			trigger.style.position = 'fixed';

			trigger.style.display = 'block';
			trigger.style.bottom = '0px';
			trigger.style.right = '0px';
			trigger.style.background = '#FEEA3B';
			break;
		case "bottomLeftred":
			trigger.style.position = 'fixed';

			trigger.style.display = 'block';
			trigger.style.bottom = '0px';
			trigger.style.left = '0px';
			trigger.style.background = '#EF443D';
			break;
		case "bottomLeftgreen":
			trigger.style.position = 'fixed';

			trigger.style.display = 'block';
			trigger.style.bottom = '0px';
			trigger.style.left = '0px';
			trigger.style.background = '#8CC152';
			break;
		case "bottomLeftyellow":
			trigger.style.position = 'fixed';

			trigger.style.display = 'block';
			trigger.style.bottom = '0px';
			trigger.style.left = '0px';
			trigger.style.background = '#FEEA3B';
			break;
	}
}

function stopTest() {
	clearTimeout(reactionTimerID);
	isStarted = false;
	trigger.style.display = 'none';
	testArea.style.background = '#1EAAF1';
	testArea.innerHTML = "<p style='font-weight: 400;color: cyan;font-size: 20px;line-height: 28px;'>请按空格键开始</p>";
	//Scope experiments data

	//reinitiate variables
	startTime = null;
	endTime = null;
	triggerStartAt = null;
	triggerEndAt = null;

}

function scopeData() {
	testAreaHeight = testArea.offsetHeight;
	testAreaWidth = testArea.offsetWidth;

	dataScope.push({
		"testNumber": TestTimes,
		"testAreaStartTime": startTime ? startTime.getTime() : 0,
		"testAreaInterval": testAreaInterval,
		"testAreaWidth": testAreaWidth,
		"testAreaHeight": testAreaHeight,
		"subjectEndTime": endTime.getTime(),
		"reactionTime": reactionTime,
		"triggerStartAt": triggerStartAt ? triggerStartAt.getTime() : 0,
		"triggerEndAt": triggerEndAt ? triggerEndAt : 0,
		"triggerColor": triggerColor,
		"triggerPosition": triggerPosition,
		"triggerInterval": triggerInterval
	});

}

function displayReport() {
	console.log(dataScope);
}


var noticeNumber
var options = {
	'keyboard': false, // teardown when <esc> key is pressed (default: true)
	'static': true, // maintain overlay when clicked (default: false)
	'onclose': function() {} // execute function when overlay is closed
};
var positionWindow = document.getElementById('detail');
var first = document.getElementById('first');

function askQuestion() {
	first.style.display = 'block';
	mui.overlay('on', options, first);
}


function yes() {
	mui.overlay('off')
	positionWindow.style.display = 'block';
	mui.overlay('on', options, positionWindow);
}

function no() {
	mui.overlay('off')
	if (lock) {
		lock = false;
		isNoticed = 0;
		dataScope.push({
			'isNoticed': isNoticed
		});

		$.post("data.php", {
			'data': JSON.stringify(dataScope),
			'aheadError':JSON.stringify(aheadError)
		}, function(success) {
			swal({
				title: "感谢你的参与",
				text: "3秒后返回首页",
				type:"success",
				timer: 3000,
				showConfirmButton: false
			}, function() {
				console.log(dataScope);
				window.location.replace(targetSever);
			});
		});
	}
}

function mgmuioff() {
	var selectedPosition = $("input[name='position']:checked").val()
	var selectedColor = $("input[name='color']:checked").val()
	if (!(selectedColor && selectedPosition)) {
		document.getElementById('error').style.display = 'block';
	} else {
		dataScope[0].report = (selectedPosition + selectedColor); //scopeData
		var originalnoticeNumber = [];
		$('input[type="checkbox"]:checked').each(function() {
			originalnoticeNumber.push($(this).val());
		});
		noticeNumber = originalnoticeNumber.join('')
		isNoticed = 1;
		dataScope.push({
			'isNoticed': isNoticed,
			'noticeNumber': noticeNumber
		});

		$.post("data.php", {
			'data': JSON.stringify(dataScope),
			'aheadError': JSON.stringify(aheadError)
		}, function(success) {
			swal({
				title: "感谢你的参与",
				text: "5秒后返回首页",
				timer: 5000,
				type:"success",
				showConfirmButton: false
			}, function() {
				console.log(dataScope);
				window.location.replace(targetSever);

			});
		});
		mui.overlay('off')
	}
}
