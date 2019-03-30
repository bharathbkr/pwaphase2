var para;
var paravalue;
var query=window.location.search.substring(1).split("?");
for(var i in query){
  para=query[i].split("=");
  paravalue=parseInt(para[1]);
}
var idb=window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webkitIndexedDB;

if(!idb in window)
{
  console.log("indexedDB is not supported");
}
// IndexedDb creation
var request;
var store;
var open=idb.open("storeData",1);
console.log("IndexedDb is created");
open.onupgradeneeded=function (e){
request=e.target.result;
 store=request.createObjectStore("formdata",{keyPath:"id",autoIncrement:true});
console.log("store is created");
}
open.onerror=function(e){
console.log("error occurred");
}
open.onsuccess=function(e){
request=e.target.result;
var transaction=request.transaction("formdata","readwrite");
store=transaction.objectStore("formdata");
var info=store.get(paravalue);
info.onsuccess=function(data){
  console.log(data);
  careerinfo(data.target.result);
  personalinfo(data.target.result);

  // educationdetails(data.target.result);
}
}
//personal info
var left=document.querySelector(".left");
//var right=document.querySelector(".right");
function personalinfo(pi){
  var image=document.createElement("img");
  image.src="images/add-user.svg";
  image.alt=pi.name;
  left.append(image);
  var hh=document.createElement("h2");
  hh.textContent=pi.name;
  left.append(hh);
  var hi=document.createElement("h2");
  hi.textContent=pi.address;
  left.append(hi);
  var hk=document.createElement("h2");
  hk.textContent=pi.phone;
  left.append(hk);
var hj=document.createElement("h2");
  hj.textContent=pi.email;
  left.append(hj);
}
// career info
var right=document.querySelector(".right");
function careerinfo(ca){
  var h1=document.createElement("h1");
  h1.textContent="career objective";
  right.append(h1);
  var hr=document.createElement("hr");
  right.append(hr);
  var h2=document.createElement("h2");
  h2.textContent=ca.career;
  right.append(h2);
  var head11=document.createElement("h2");
  head11.textContent="education details";
  right.append(head11);
  var table=document.createElement("table");
  table.border="1";
  var tr1="<tr><th>institute</th><th>branch</th><th>per</th><th>year</th></tr>";
  var tr2=" ";
  for(var i in ca.education){
    tr2=tr2+"<tr><td>"+ca.education[i].institute+"</td><td>"+ca.education[i].branch+"</td><td>"+ca.education[i].per+"</td><td>"+ca.education[i].year+"</td></tr>"
  }
table.innerHTML=tr1+tr2;
right.append(table);

var h1=document.createElement("h1");
h1.textContent="Skills";
right.append(h1);
var hr=document.createElement("hr");
right.append(hr);
var h2=document.createElement("h2");
h2.textContent=ca.skills;
right.append(h2);


}


// var right=document.querySelector(".right");
// function educationdetails(edu){
//   var ins=document.createElement("h2");
//   ins.textContent=edu.ginstitute;
//   right.append(ins);
//   var ine=document.createElement("h2");
//   ine.textContent=edu.gbranch;
//   right.append(ine);
// }
