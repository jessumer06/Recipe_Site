
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.location="dashboard.html";
  } else {
    // No user is signed in.
  }
});
function usersAdd()
{
    var email=document.getElementById("lemail").value;
    var password=document.getElementById("lpassword").value;

     firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  window.alert("Error : "+errorMessage);
});
}

function Signup()
{
   var emails=document.getElementById("semail").value;
    var passwords=document.getElementById("spassword").value;
  firebase.auth().createUserWithEmailAndPassword(emails, passwords).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
}