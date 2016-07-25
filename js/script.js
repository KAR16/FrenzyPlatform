// Up for the onload page
function goToUp() {
  $('body,html').animate({scrollTop : 0});
}
// Frenzy Menu Selected
$('#frenzySelected').click(function() {
  $(this).css({
    background: '#E3FFC3'
  });
  // Quit background of others div
  $('#promotionSelected').css({
    background: '#00BAB9'
  });
  $('#couponSelected').css({
    background: '#00BAB9'
  });
  $('#customerSelected').css({
    background: '#00BAB9'
  });
})
// Upload Promotion Menu Selected
$('#promotionSelected').click(function() {
  $(this).css({
    background: '#E3FFC3'
  });
  // Quit background of others div
  $('#frenzySelected').css({
    background: '#00BAB9'
  });
  $('#couponSelected').css({
    background: '#00BAB9'
  });
  $('#customerSelected').css({
    background: '#00BAB9'
  });
})
// Coupon Menu Selected
$('#couponSelected').click(function() {
  $(this).css({
    background: '#E3FFC3'
  });
  // Quit background of others div
  $('#promotionSelected').css({
    background: '#00BAB9'
  });
  $('#frenzySelected').css({
    background: '#00BAB9'
  });
  $('#customerSelected').css({
    background: '#00BAB9'
  });
})
// Customer Menu Selected
$('#customerSelected').click(function() {
  $(this).css({
    background: '#E3FFC3'
  });
  // Quit background of others div
  $('#promotionSelected').css({
    background: '#00BAB9'
  });
  $('#couponSelected').css({
    background: '#00BAB9'
  });
  $('#frenzySelected').css({
    background: '#00BAB9'
  });
})
// We can attach the `fileselect` event to all file inputs on the page
$(document).on('change', ':file', function() {
  var input = $(this),
      numFiles = input.get(0).files ? input.get(0).files.length : 1,
      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
  input.trigger('fileselect', [numFiles, label]);
  $('.nameImage').val(label)
});
// Función a lanzar cada vez que se presiona una tecla en un textarea
// en el que se encuentra el atributo maxlength
$("textarea[maxlength]").keyup(function() {
  var limit   = $(this).attr("maxlength"); // Límite del textarea
  var value   = $(this).val();             // Valor actual del textarea
  var current = value.length;              // Número de caracteres actual
  if (limit < current) {                   // Más del límite de caracteres?
    // Establece el valor del textarea al límite
    $(this).val(value.substring(0, limit));
  }
})
