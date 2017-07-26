function showLearnMore () {
  // set up Learn More click-thru form
  let div = $('<div><br /><br /></div>');
  let backsplash = $('<div></div>');
  let form = $('<form><br />Name: <input type="text" value="' + config.cs.getCustomerName(config.cs.customer) + '"><br />Company: <input type="text" value="RockCoast"><br /><br /><button type="submit">Submit</button></form>');
  let fieldset = $('<fieldset><legend>Please confirm your information</legend></fieldset>');
  form.prepend(fieldset);
  backsplash
  .css('z-index','1000')
  .css('position', 'fixed')
  .css('left', '0')
  .css('top', '0')
  .css('background-color', 'black')
  .css('opacity', '0.7')
  .css('width', '100%')
  .css('height', '100%');

  $('body').append(backsplash);
  form
  .css('position', 'relative')
  .css('left', '30%');

  div.append(form);
  // show the form when learn more is clicked
  $('body').append(div);
  div
  .css('z-index','9999')
  .css('position', 'fixed')
  .css('left', '30%')
  .css('top', '30%')
  .css('background-color', 'white')
  .css('width', '40%')
  .css('height', '40%');

  form.submit(function (e) {
    // add CS POD
    addPod({notes: 'Website Click – Like to learn more'});
    // continue to learn more page after form is submitted
    window.location.href = 'who-we-are.html';
    // clear the splash screen form
    div.hide();
    backsplash.hide();
  });
}

// start scripts
$( document ).ready(function() {
    // init REM library
    AssistBoot.addAssistBehaviour();
});
