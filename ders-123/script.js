var modal = document.getElementById('myModal');


var btn = document.getElementById('myBtn');

var span = document.getElementsByClassName('close')[0];


btn.onclick = function () {
  modal.style.display = 'block';
}

span.onclick = function () {
  modal.style.display = 'none';
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}



function evvel() {
  $('#mb').css("display", "block");
  $('#mb2').css("display", "none");
  $('#1pageli').addClass('active');
  $('#2pageli').removeClass('active');
};

function page1() {
  $('#mb').css("display", "block");
  $('#mb2').css("display", "none");
  $('#1pageli').addClass('active');
  $('#2pageli').removeClass('active');
};

function page2() {
  console.log($('#mb').height());
  $('#mb2').css("display", "block");
  $('#mb').css("display", "none");
  $('#2pageli').addClass('active');
  $('#1pageli').removeClass('active');
};

function sonra() {
  $('#mb2').css("display", "block");
  $('#mb').css("display", "none");
  $('#2pageli').addClass('active');
  $('#1pageli').removeClass('active');
};