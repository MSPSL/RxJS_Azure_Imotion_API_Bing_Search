 function load() {
     ShowCam()
     renderGraph({
     	anger: 0,
     	contempt: 0,
     	disgust: 0,
     	fear: 0,
     	happiness: 0,
     	neutral: 0,
     	sadness: 0,
     	surprise: 0
     })
 }

var button = document.querySelector('#captureButton');
var buttonClicks$ = Rx.Observable.fromEvent(button, 'click');

var faseApiService;

buttonClicks$.throttleTime(2000).subscribe(e => {
  take_snapshot();
  SaveSnap();
});


  function SaveSnap(){
  var file = document.getElementById("base64image").src.substring(23).replace(' ', '+');
  var img = Base64Binary.decodeArrayBuffer(file);

  faseApiService = Rx.Observable.ajax({
  url: 'https://eastasia.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=emotion',
  method: 'POST',
  headers: {
    'Content-Type': 'application/octet-stream',
    'Accept': 'application/json',
    'Ocp-Apim-Subscription-Key': '5811976123934cc3afc35f6e05d598d5'
  },
   body: img
  }).map(e => e.response);

  faseApiService.map(value=>{
  	return value[0].faceAttributes.emotion
  }).subscribe(observer);
}


var observer = {
  next : function(value){
    renderGraph(value)
    console.log(value)
  },
  error:function (error){
  	alert('Can not detect a face')
     console.log(error)
  }
}




function renderGraph(emotion){

var dataPoints_ = [];
var x= 10;
  Object.keys(emotion).forEach(function(key) {
    console.log(key, emotion[key]);
    dataPoints_.push({
      x: x,
      y: formatData(emotion[key]),
      label: key
    });
    x += 10;
  });

    var chart = new CanvasJS.Chart("chartContainer",
    {
      title:{
        text: "Emotion API Results"
      },
      data: [

      {
        dataPoints: dataPoints_
      }
      ]
    });

    chart.render();
}



function formatData(data){
    if(data < 0.01 ){
      data = 0;
    }else if(data >= 0.99){
      data = 0.99
    }
    return data*100;
}

// =======================================================================================




var searchText = document.querySelector('#searchText');
var searchTextInput$ = Rx.Observable.fromEvent(searchText, 'input');

var bingSearchService;

var searchWord = "";

searchTextInput$
.map(e => {return e.target.value})
.debounceTime(500)
.distinctUntilChanged()
.subscribe(e=>{
  console.log(e)
  searchWord = e;
})


searchTextInput$
.map(e => {return e.target.value})
.debounceTime(2000)
.distinctUntilChanged()
.subscribe(e=>{
  console.log(e)
  searchWord = e;
  search()
})


function search(){
     var params = {
            // Request parameters
            "q": searchWord,
            "count": "5",
            "offset": "0",
            "mkt": "en-us",
            "safeSearch": "Moderate",
        };


    bingSearchService = Rx.Observable
    .ajax({
      url: 'https://api.cognitive.microsoft.com/bing/v7.0/videos/search?' + $.param(params),
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Ocp-Apim-Subscription-Key': 'fdddf4141cef4d29b1fe5925ff657a15'
      }
    })
    .map(e => e.response);

    bingSearchService.filter(function(value) {
      return value.value.length > 0
    }).subscribe(observer1)
}

var observer1 = {
   next : function(value){
    createPlayList(value)
    console.log(value)
  },
  error:function (error){
    alert('An error occurred!')
     console.log(error)
  }
}

 function createPlayList(data){
        document.getElementById("content").innerHTML = "";
         for (var i = 0 ; i < data.value.length ; i++) {
            var str = data.value[i].embedHtml;
            var s = str.indexOf("src");
            var e = str.indexOf("?");
            var res = str.substr(s+5, e-39);

            var para = document.createElement("iframe");
            para.src = res;
            var element = document.getElementById("content");
            element.appendChild(para);
         }
    }
