function testCzechChars( text ) {
//  var	regex = /[^A-Z0123456789]+/g;
    var   regex = /[^ a-zA-Z0123456789\u00A0-\u00FF\u002b\u003b\u002c\u002e\u005f\u002d\u0028\u0029\u0102\u0103\u0104\u0105\u0106\u0107\u010C\u010D\u010E\u010F\u0110\u0111\u0118\u0119\u011A\u011B\u0139\u013A\u013D\u013E\u0141\u0142\u0143\u0144\u0147\u0148\u0150\u0151\u0154\u0155\u0158\u0159\u015A\u015B\u015E\u015F\u0160\u0161\u0162\u0163\u0164\u0165\u016E\u016F\u0170\u0171\u0179\u017A\u017B\u017C\u017D\u017E\u02C7\u02D8\u02D9\u02DB\u02DD]+/g;
//    var   regex = /[^A-Z0123456789\u00A0-\u00FF\u002b\u003b\u002c\u002e\u005f\u002d\u0028\u0029\u0102\u0103\u0104\u0105\u0106\u0107\u010C\u010D\u010E\u010F\u0110\u0111\u0118\u0119\u011A\u011B\u0139\u013A\u013D\u013E\u0141\u0142\u0143\u0144\u0147\u0148\u0150\u0151\u0154\u0155\u0158\u0159\u015A\u015B\u015E\u015F\u0160\u0161\u0162\u0163\u0164\u0165\u016E\u016F\u0170\u0171\u0179\u017A\u017B\u017C\u017D\u017E\u02C7\u02D8\u02D9\u02DB\u02DD]+/g;

    return testAnyChars( text, regex );
/*    
    var res = RegExp(regex).test(value);
    var badChars = "";
// / /./_/-/-/(/)/{/}/[/] - \u002e\u005f\u002d\u002d\u0028\u0029\                
// kŕdeľ ďatľov učí koňa žrať kôru.                
// kŕdeľ ďatľov učí koňa žrať kôru.                
// Přílišžluťoučkýkůňúpělďábelskéódy
// řílšžlťčkýkůňúěďáéó
// ŘÍŠŽŤČÝŮŇÚĚĎÁÉÓ
//                var res = RegExp(/[^a-z0123456789\u00e\u00e9\u00fa]+/g).test(value);
	if ( res == true )
		badChars = value.match(regex).join('');

    alert( "test : " + value + " / " + res + " / bad : " + badChars );
/**/    
}

function testAnyChars( szText, regex ) {

	//  var	regex = /[^A-Z0123456789]+/g;
	var testText = szText;
	console.log("test text : " + testText );
	var origText = testText;
	var res = RegExp(regex).test(testText);
	var badChars = "";
	if ( res == true ) {
		badChars = testText.match(regex).join('');
	}
	
	console.log( "test file name : " + origText + " / " + res + " / bad : " + badChars );
	
return badChars; // nevalidne znaky
}

function chackFileNameForCzechChars( fullPath, errorText ) {

	var filename = fullPath.value.replace(/^.*[\\\/]/, '');

	console.log( "fullPath : " + fullPath + " / filename : " + filename );
	
	var retVal = testCzechChars( filename );
	if ( retVal.length > 0 ) {
		alert( errorText + " " + retVal );
//		alert("neco !!!");
		return false;
	}
	return true; // OK
}

function getShortString( longString, iCount, charOrCount, minChars ) {

	var retStr = "";

	if ( longString.length > minChars ) {
	
		if ( charOrCount == "" ) {
			retStr = longString.substring(1, iCount);
		}
		else {
			retStr = longString.split(charOrCount, iCount).join(charOrCount).length;
		}
	
	}

	return retStr;
}
