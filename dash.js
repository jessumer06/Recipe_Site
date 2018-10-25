var inst=[];
var names=[];//New
var database = firebase.database();
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var uemail = user.email;
    uemail=uemail.slice(0,-10);
    document.getElementById("username").innerHTML=uemail;
  } else {
    window.location="index.html";
  }
});

function logout()
{
	firebase.auth().signOut().then(function() {
  window.location="index.html";
}).catch(function(error) {
  alert(error)
});
}

//Data Fetching
function searchitem()
{
  var node=document.getElementById("items");
  while (node.hasChildNodes()) 
  {
    node.removeChild(node.lastChild);
  }
  var ckboxes=document.getElementsByClassName("ckbox");
  for(i=0;i<ckboxes.length;i++)
  {
    if(ckboxes[i].checked==true)
    {
      values=ckboxes[i].nextSibling.nodeValue;
      // console.log(values);
      inst.push(values);
    }
  }
  //localStorage.setItem("ingss", JSON.stringify(ingss));
  setup();
}
function errData(err)
{
  console.log("Some error occured");
}

function setup()
{
    var refitem=database.ref('foods/');
    refitem.on('value',gotData,errData);
  
}

function gotData(snapshot)
{
  var no_foods=snapshot.val();
  var food_key=Object.keys(no_foods);
  //console.log(food_key.length);
  for(var y=0;y<food_key.length;y++)
  {
    var datum=food_key[y];
    var get_ings=database.ref('foods/'+datum+'/ingredients/');
    get_ings.on('value',function(snap){
      getIns(snap,datum);
    },errData);
  }
  while(inst.length>0) 
  {
    inst.pop();

  }
  var uniqueNames = [];
$.each(names, function(i, el){
    if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
});
for(jk=0;jk<uniqueNames.length;jk++)
{
  var temps=uniqueNames[jk];
  var crumbs=database.ref('foods/'+temps+'/');
      crumbs.on('value',function(crumb_data){
        crumb_fetch(crumb_data,temps);
      },errData);
}
  while(names.length>0) 
  {
    names.pop();

  }
  

}
function getIns(snap,datum)
{
  var no_ings=snap.val();
  var ing_key=Object.keys(no_ings);
  //console.log(ing_key.length);
  for(t=0;t<ing_key.length;t++)
  {
    var dot=ing_key[t];
    //console.log(dot);
    var set_ings=database.ref('foods/'+datum+'/ingredients/'+dot+'/');
    set_ings.on('value',function(finaldata){
      setIns(finaldata,datum,dot);
    },errData);
  }
   

}
function setIns(finaldata,datum,dot)
{
  var one=finaldata.val();
  var ty=one.ingredient;
  //var storedNames=inst;
  //var storedNames = JSON.parse(localStorage.getItem("ingss"));
  for(j=0;j<inst.length;j++)
  {
    var temp=inst[j].toLocaleLowerCase();
    if(ty.toLocaleLowerCase().includes(temp))
    {
      names.push(datum);
      // var crumbs=database.ref('foods/'+datum+'/');
      // crumbs.on('value',function(crumb_data){
      //   crumb_fetch(crumb_data,datum);
      // },errData);
    }
  }

}

function crumb_fetch(crumb_data,datum)
{
  var lite=crumb_data.val();
  var litedata=lite.image;
  var main_div=document.createElement("div");
  main_div.setAttribute("class","col-sm-4 point");
  
  var inner_div=document.createElement("div");
  inner_div.setAttribute("class","card");
  var imgtag=document.createElement("img");
  imgtag.setAttribute("src",litedata);
  imgtag.setAttribute("alt",datum);
  imgtag.setAttribute("style","width:100%;");
  imgtag.setAttribute("onclick","itemfetch(\""+datum+"\")");
  var contain=document.createElement("div");
  contain.setAttribute("class","container");
  var hfour=document.createElement("h6");
  hfour.setAttribute("style","margin-left:-20px;")
  //var bold=document.createElement("b");
  hfour.innerHTML=datum;
  //hfour.appendChild(bold);
  contain.appendChild(hfour);
  inner_div.appendChild(imgtag);
  inner_div.appendChild(contain);
  main_div.appendChild(inner_div);
  var hold=document.getElementById("items");
  hold.appendChild(main_div);


}
function itemfetch(datum)
{
  location.href="content.html";
  sessionStorage.item_name=datum;
}

