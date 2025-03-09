function contactus_validate(element)
{
	var inputs = element.getElementsByClassName("contactus-fields"),
		errorMessages = element.getElementsByClassName("contactus-error-message");
	for ( var i = errorMessages.length; i > 0; i-- ) {
			errorMessages[ i - 1].parentNode.removeChild( errorMessages[ i - 1] );
			console.log(i);
		}
	
	var flag = true;
	for (var i = 0; i < inputs.length; i++) {
		if ((inputs[i].hasAttribute("required")) && (inputs[i].required == true)  && (inputs[i].value.length == 0) && (inputs[i].parentNode.style.display !== "none")) { 
			parent = inputs[i].parentNode;
			parent.insertAdjacentHTML( "beforeend", "<div class='contactus-error-message'>" + 
			   type_field +
				"</div>" );
			flag = false;
		}
	}
	return flag;
}
function joomly_analytics(mod_id){
	if (contactus_params[mod_id].yandex_metrika_id)
	{
		if (typeof Ya.Metrika !== "undefined"){
			var yaCounter= new Ya.Metrika(contactus_params[mod_id].yandex_metrika_id);
			yaCounter.reachGoal(contactus_params[mod_id].yandex_metrika_goal);
		} else if (typeof Ya.Metrika2 !== "undefined"){
			var yaCounter= new Ya.Metrika2(contactus_params[mod_id].yandex_metrika_id);
			yaCounter.reachGoal(contactus_params[mod_id].yandex_metrika_goal);
		}
	}
	if (contactus_params[mod_id].google_analytics_action)
	{
		if (typeof ga === 'function') {
    		ga('send', 'event', contactus_params[mod_id].google_analytics_category, contactus_params[mod_id].google_analytics_action, contactus_params[mod_id].google_analytics_label, contactus_params[mod_id].google_analytics_value);
 		}
		if (typeof gtag === 'function') {
			var gtag_object = {};
			if (contactus_params[mod_id].google_analytics_category){
				gtag_object.event_category = contactus_params[mod_id].google_analytics_category;
			}
			if (contactus_params[mod_id].google_analytics_label){
				gtag_object.event_label = contactus_params[mod_id].google_analytics_label;
			}
			if (contactus_params[mod_id].google_analytics_value){
				gtag_object.value = contactus_params[mod_id].google_analytics_value;
			}
			gtag('event', contactus_params[mod_id].google_analytics_action, gtag_object);
		}
	}
}		
function contactus_uploader(mod_id){        
	var input = document.getElementById("file-input" + mod_id);
	var files = input.files;
	uploads_counter[mod_id] += files.length;
	var label = document.getElementById("file-label" + mod_id);
	var parent = document.getElementById("file-contactus" + mod_id);
	
	input.setAttribute("id", "");
	label.classList.add("contactus-added");
	
	new_input = document.createElement("input");
	new_input.setAttribute("type", "file");
	new_input.setAttribute("name", "file[]");
	new_input.setAttribute("multiple", "multiple");
	new_input.setAttribute("onchange", "contactus_uploader(" + mod_id + ")");
	new_input.setAttribute("class", "contactus-file");
	new_input.setAttribute("id", "file-input" + mod_id);

	parent.appendChild(new_input);

	if (uploads_counter[mod_id] > 1)
	{
		label.innerHTML = files_added + ": " + uploads_counter[mod_id];   
	} else
	{
		label.innerHTML = input.files[0].name.substr(0,30);
	}
}
function onloadContactusOld(){
	var captchas = document.getElementsByClassName("g-recaptcha");
	for (var i=0; i < captchas.length; i++) {
		var sitekey = captchas[i].getAttribute("data-sitekey");
		var size= captchas[i].getAttribute("data-size");
		if ((captchas[i].innerHTML === "") && (sitekey.length !== 0))
		{
			grecaptcha.render(captchas[i], {
	          'sitekey' : sitekey,
	          'theme' : 'light',
	          'size' : size
	        });		
		}
	};
}
function onloadContactus() {
	var tok = document.getElementsByName("module_token");	
	grecaptcha.ready(function() {
	    grecaptcha.execute(tok[0].getAttribute("data-sitekey"), {action: 'feedback'}).then(function(token) {
	        for (var i=0; i < tok.length; i++) {
				tok[i].value =  token;
			}
	    });
	});	
}; 
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
	"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
function getSendingFlag(m_id){
	var sendingalert = getCookie("sending-alert"),
		alerttype = getCookie("alert-type"),
		sflag = 0;
	if ((typeof sendingalert !== 'undefined') && (sendingalert == m_id))
	{
		al = document.getElementById("contactus-sending-alert" + m_id);
		if (alerttype == 'success')
		{
			sflag = 1;
		} else if (alerttype == 'captcha')
		{
			sflag = 2;
			al.childNodes[1].style.backgroundColor = "red";
			al.childNodes[3].childNodes[1].innerHTML = captcha_error;
		} else if (alerttype == 'file')
		{
			sflag = 3;
			al.childNodes[1].style.backgroundColor = "red";
			al.childNodes[3].childNodes[1].innerHTML = filesize_error;
		} else if (alerttype == 'defensive')
		{
			sflag = 4;
			al.childNodes[1].style.backgroundColor = "red";
			al.childNodes[3].childNodes[1].innerHTML = defense_error;
		}
		document.cookie = 'sending-alert=333; Path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		document.cookie = 'alert-type=;Path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	} else 
	{
		sflag = 0;
	}	
	return sflag;
}
function remove_alert(lightbox, dimmer)
{
	if (lightbox.style.display  != "none")
	{
		dimmer.parentNode.removeChild(dimmer);			
		lightbox.style.display = 'none';
	}
}
function submitForm() {
	document.getElementById("contactusForm").submit();
}
function joomlyHandleMask(event, mask) {
    with (event) {
        stopPropagation()
        preventDefault()
        if (!charCode) return
        var c = String.fromCharCode(charCode)
        if (c.match(/\D/)) return
        with (target) {
            var val = value.substring(0, selectionStart) + c + value.substr(selectionEnd)
            var pos = selectionStart + 1
        }
    }
    var nan = count(val, /\D/, pos)
    val = val.replace(/\D/g,'');

    var mask = mask.match(/^(\D*)(.+\d)(\D*)$/)
    if (!mask) return
    if (val.length > count(mask[2], /\d/)) return

    for (var txt='', im=0, iv=0; im<mask[2].length && iv<val.length; im+=1) {
        var c = mask[2].charAt(im)
        txt += c.match(/\D/) ? c : val.charAt(iv++)
    }

    with (event.target) {
        value = mask[1] + txt + mask[3]
        selectionStart = selectionEnd = pos + (pos==1 ? mask[1].length : count(value, /\D/, pos) - nan)
    }

    function count(str, c, e) {
        e = e || str.length
        for (var n=0, i=0; i<e; i+=1) if (str.charAt(i).match(c)) n+=1
        return n
    }
}