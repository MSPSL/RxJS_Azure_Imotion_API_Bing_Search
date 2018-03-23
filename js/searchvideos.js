// function search() {
//     if(searchfor == ""){
//         searchfor = "new songs";
//     }
//         var params = {
//             // Request parameters
//             "q": searchfor,
//             "count": "5",
//             "offset": "0",
//             "mkt": "en-us",
//             "safeSearch": "Moderate",
//         };
      
//         $.ajax({
//             url: "https://api.cognitive.microsoft.com/bing/v7.0/videos/search?" + $.param(params),
//             beforeSend: function(xhrObj){
//                 // Request headers
//                 xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","fdddf4141cef4d29b1fe5925ff657a15");
//             },
//             type: "GET"
//             // Request body
//         })
//         .done(function(data) {
//            // alert("success");
//            console.log(data)
//             createPlayList(data);
//            // var text = JSON.stringify(data);
//            // var list = data.getElementsByTagName("value");
          
          
//         })
//         .fail(function() {
//             alert("error");
//         });    
// }


// function search(){
//      var params = {
//             // Request parameters
//             "q": "new songs",
//             "count": "5",
//             "offset": "0",
//             "mkt": "en-us",
//             "safeSearch": "Moderate",
//         };


//     const simple$ = Rx.Observable
//     .ajax({
//       url: 'https://api.cognitive.microsoft.com/bing/v7.0/videos/search?' + $.param(params),
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json',
//         'Ocp-Apim-Subscription-Key': 'fdddf4141cef4d29b1fe5925ff657a15'
//       }
//     })
//     .map(e => e.response);

//     simple$.subscribe(e=> {
//         console.log(e)
//         createPlayList(e)
//     })
// }

//  function createPlayList(data){
//         document.getElementById("content").innerHTML = "";
//          for (var i = 0 ; i < data.value.length ; i++) {
//             var str = data.value[i].embedHtml;
//             var s = str.indexOf("src");
//             var e = str.indexOf("?");
//             var res = str.substr(s+5, e-39);

//             var para = document.createElement("iframe");
//             para.src = res;
//             var element = document.getElementById("content");
//             element.appendChild(para);
//            // para = document.createElement("br");
//           //  element.appendChild(para);
            
//           //  document.getElementById("content").innerHTML = data.value[0].embedHtml;
//            // document.getElementById("content").innerHTML = document.getElementById("content").innerHTML + "<br>"+res;
//            }
//     }


    