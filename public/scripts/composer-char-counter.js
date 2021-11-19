const $tweetContainer = $('.tweet-container');
const $body = $('body')
let num;

$tweetContainer.on("keypress", function() {
  const $counter = $(this).find('div').find('output');
  const $characterCount = $('#tweet-text').val().length;

  num = 140 - $characterCount;
  if (num < 0) $counter.css('color', 'red');
  
  $counter.val(num);
})

$tweetContainer.on('keydown',function(e) {
  if(e.which == 8) {
    const $characterCount = $('#tweet-text').val().length;
    num = 140 - $characterCount;
    
    const $counter = $(this).find('div').find('output');
    if (num < 140) num++; 
    if (num > 0) $counter.css('color', '#545149');
    $counter.val(num)
  }
});

const checkCounter = () => {
  setTimeout(() => {
    const $characterCount = $('#tweet-text').val().length;
    const $counter = $('.counter');
    num = 140 - $characterCount;
    $counter.val(num);
    checkCounter();
  }, 500);
};

checkCounter();





 





