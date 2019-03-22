document.addEventListener("deviceready",start)
let map;
var localStorageObjs = [];
var key = "abcd";
function start(){
			
	if('geolocation' in navigator){
    const opts={
        enableHighAccurancy:true,
        timeout:20000,
        maximumAge:1000 * 60 * 60 * 24 * 7

    }
    navigator.geolocation.getCurrentPosition(ftw,wtf,opts);
		
}

}
function ftw(position){
	
	//let cuurentlocation =`${position.coords.latitude},${position.coords.longitude} with accurancy ${position.coords.accuracy}m`;
	let cuurentlocation = {
        lat : position.coords.latitude,
        lng : position.coords.longitude
    };
        let s = document.createElement("script");
            document.head.appendChild(s);
            s.addEventListener("load", () => {
		
                console.log("script has loaded");
                map = new google.maps.Map(document.getElementById("map"), {
                    center: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    },
                    zoom: 16,
					disableDoubleClickZoom: true,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
				
				var marker = new google.maps.Marker({
				  position: cuurentlocation,
				  map: map
				});
				
				google.maps.event.addListener(map,"dblclick",function(e){
		
					let m = prompt('Enter label','');
					
					let data = {
						"pos" : e.latLng,
						"lbl": m
					};

					localStorageObjs.push(data);
					let strrng = JSON.stringify(localStorageObjs);
					localStorage.setItem(key,strrng);
    			});

				ShowMarker(map);
			});
	 s.src = `https://maps.googleapis.com/maps/api/js?key=${keys}`;
	
}
	
function wtf(error){
    let p = document.createElement('p');
    p.textContent=`${error.code}-${error.message}`;
    document.body.appendChild(p);
	alert(error.code);

}
     
function setMsg(marker, label) {
  var infowindow = new google.maps.InfoWindow({
    content: label
  });

  marker.addListener('click', function() {
    infowindow.open(marker.get('map'), marker);
  });
}
function ShowMarker(map){
	let localData  = localStorage.getItem(key);
		if(localData){
		   localStorageObjs = JSON.parse(	localData);
			console.log(localStorageObjs);
		   }
		if(localStorageObjs){
			localStorageObjs.forEach( item => {
				//console.log(item);
				pos = item.pos;
				label = item.lbl
				var marker = new google.maps.Marker({
				  position: pos,
				  map: map
				});

				setMsg(marker, label);
			});
		}
}
           
       
       
