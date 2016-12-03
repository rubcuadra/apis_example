var clientId = ''; //Poner el Id que nos da SoundCloud
var clientParam = 'client_id='+clientId;
var host = 'https://api.soundcloud.com';
SC.initialize({client_id: clientId,}); //Existe por que jalamos el script de soundcloud
var widget = SC.Widget('player');
var soundcloudProperties = 
	{
		auto_play:true,
		buying:	true,
		liking:	true,
		download:	true,
		sharing:	true,
		show_artwork:	true,
		show_comments:	true,
		show_playcount:	true,
		show_user:	true,
		hide_related:true,
		visual:true,
		callback:onReady,   //Funcion cuando se carga
		//start_track:'0',
	} //Parametros del Widget

var template = $('<div class="large-4 small-6 columns" id="example">\
									<img src="http://placehold.it/1000x1000&amp;text=Thumbnail" height="200" width="200" onclick="clickedProfile(0)">\
									<div class="panel">\
										<h5 class=\'profile_username\'>Username</h5>\
										<h6 class="profile_description">Description</h6>\
									</div>\
								</div>'); //Usado para las cards

//Start
getUsers();	//Hara una request a la API y poblara con el template
widget.bind(SC.Widget.Events.PLAY_PROGRESS,onPlay); //Ver como va el progreso

function populateData(data)
{
	for (var i = 0; i < data.length; ++i) 
	{
		var profile = data[i];
		var currentDiv = template.clone();	//Generamos una copia de nuestro molde
		currentDiv.attr('id', 'card'+profile.id )								 //Ids a las cards		 
		currentDiv.find('img').attr('src',profile.avatar_url)					 //Ponemos las fotos
		currentDiv.find('img').attr('onclick','clickedProfile('+profile.id+')' ) //Agregar onClickListener
		currentDiv.find('.profile_username').text(profile.username)				 //Agregar nombre de ususario
		//console.log(profile);
		$('#profiles_list').append(currentDiv)									 //Agregamos la tarjeta
	}
}

function setTrack(trackId)
{
	widget.load('http://api.soundcloud.com/tracks/'+trackId,soundcloudProperties)
}

function getUsers()
{
	var url = host+'/users?'+clientParam+'&limit='+21;
	$.getJSON(url,populateData);
}

function onReady()
{
	widget.getDuration(onGetDuration);
}

function onPlay(positions)
{
	console.log(positions.currentPosition);
	//console.log(positions.loadedProgress);
	//console.log(positions.relativePosition);
}

function onGetDuration(duration)
{
	console.log(duration/1000); //Seconds
}

function trackResponse(data)
{
	if (data.length>0) 
		setTrack(data[0].id);
	else
		alert('NO SONGS FOR THIS USER');
}

function clickedProfile(profileId)
{
	var url = host+'/users/'+profileId+'/tracks?'+clientParam;
	$.getJSON(url,trackResponse);
}

/*
$.ajax({
	    	url: '/api/v1/products/',
	    	headers: {'X-CSRFToken': getCookie('csrftoken'),'Content-Type':'application/json'},
		    method: 'GET',
		    contentType: 'application/json; charset=UTF-8',
    		dataType: 'json',
	    	data: JSON.stringify({}),
	    	success: function(data)
	    	{
	    		lst = $('#items')
	    		data.forEach(addToList)
		    
		    	function addToList(item, index)
				{
					lst.append("<li id='"+item.id+"'>"+
									item.name+"<br><span>"+
									(item.amount/1000).toFixed(2)+"kg x $</span>"
						+"<span id=cost"+item.id+">"+item.price+
						"</span>cdu<input placeholder='Cantidad de kilos' type='text'></li>")
				}
		    }
	  	});

var data = {"requester": "70e9debf-c746-4373-b143-8452796a2ff1",'items':itemsToORder}

$.ajax({
			    	url: '/api/v1/products/',
			    	headers: {'X-CSRFToken': getCookie('csrftoken'),'Content-Type':'application/json'},
				    method: 'POST',
				    contentType: 'application/json; charset=UTF-8',
			    	dataType: 'json',
				    data: JSON.stringify({data}),
				    success: function(data)
				    	{
				    		console.log(data);
					    }
				  	});
*/


