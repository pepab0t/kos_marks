/*header_main.js*/
$(function() {
	$('input').filter('.datepicker').datepicker({
		showOn: "button",
		buttonImage: "images/calendar.gif",
		buttonImageOnly: true,
		//buttonText: "Datepicker form",
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		monthNames:  param_monthNames, 
		dayNames:  param_dayNames, 
		dayNamesMin:  param_dayNamesMin
	});
});

$(function() {
	$('.inputText').focusout(function () {
		var jqObj=$(this);
		var textObj=this;
		var position0 = null;
		if(param_university=="AMU")
			position0 = existTextWin1250(textObj);
// KOSI-8230
//		if (position0 && position0!=null) {
//			if (confirm(param_confirmDialog)){
//				convertTextWin1250ToISO88592(textObj);
//				alert(param_alertChars);
//			}
//		}
		//var position1 = getNoISO88592charFirstBlockPosition(textObj);
		var position1 = null;
		var position2 = getNoISO88592charEndBlockPosition(textObj, position1);
		if (position1!=null) {
			alert(param_alertNotEnabledChars);
			setTimeout( function () { jqObj.focus(); textObj.setSelectionRange(position1,position2);}, 200);   
			return false;
		} 
	});
});

/*
$(function() {
	$('input').filter('.datepicker').datepicker({
		showOn: "button",
		buttonImage: "images/calendar.gif",
		buttonImageOnly: true,
//		buttonText: "Datepicker form",
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		monthNames:  [<%= pageLang.getText("datepicker.month.names")%>], 
		dayNames:  [<%= pageLang.getText("datepicker.day.names")%>], 
		dayNamesMin:  [<%= pageLang.getText("datepicker.day.names.min")%>]
	});
});

$(function() {
	$('.inputText').focusout(function () {
		var jqObj=$(this);
		var textObj=this;
		var position0 = null;
		<% if (!BasicProfile.getUniversityToUpper().equals("AMU")) { %>
		position0 = existTextWin1250(textObj);
		<% } %>
		
		if (position0!=null) {
			if (confirm('<%= pageLang.getText("confirm.znaky.1250.v.textu")%>')){
				convertTextWin1250ToISO88592(textObj);
				alert('<%= pageLang.getText("alert.znaky.1250.ok")%>');
			}
		}
		//var position1 = getNoISO88592charFirstBlockPosition(textObj);
		var position1 = null;
		var position2 = getNoISO88592charEndBlockPosition(textObj, position1);
		if (position1!=null) {
			alert('<%= pageLang.getText("alert.nepovolene.znaky.v.textu")%>');
			setTimeout( function () { jqObj.focus(); textObj.setSelectionRange(position1,position2);}, 200);   
			return false;
		} 
	});
});

*/