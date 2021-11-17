$(document).ready(() => {
  console.log($('body'));
});

let num = 140;
const $tweetContainer = $('.tweet-container');
const $body = $('body')

$tweetContainer.on("keypress", function() {
  console.log("works");

  const $counter = $(this).find('div').find('output');

  num--;
  if (num < 0) $counter.css('color', 'red');
  
  $counter.val(num);
})

$tweetContainer.on('keydown',function(e) {
  if(e.which == 8) {
    const $counter = $(this).find('div').find('output');
    if (num < 140) num++; 
    if (num > 0) $counter.css('color', '#545149');
    $counter.val(num)
  }
});

 





