var database = firebase.database();
var item_here=sessionStorage.item_name;
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
function setup()
{
    var refitem=database.ref('foods/'+item_here+'/ingredients/');
    refitem.on('value',gotData,errData);
}
function errData(err)
{
  console.log("Some error occured");
}
function gotData(snapshot)
{
  var no_foods=snapshot.val();
  var food_key=Object.keys(no_foods);
  for(var i=0;i<food_key.length;i++)
  {
    var dum=food_key[i];
    var one=database.ref('foods/'+item_here+'/ingredients/'+dum+'/');
    one.on('value',goting,errData);
  }
}
function goting(snp)
{
    var no=snapshot.val();
    var foo=Object.keys(no);
    for(var j=0;j<foo.length;j++)
    {
        var hell=foo[j].ingredient;
        console.log(hell);
    }
}