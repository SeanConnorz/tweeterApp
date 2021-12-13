$(document).ready(function() {
  loadTweets();
});

// Empties tweets then appends new tweet data
const renderTweets = (tweets) => {
  let HTML = '';
  console.log(tweets);
  for (const item of tweets) {
    HTML += createTweetElement(item);
  }
  $('#tweets-container').empty();
  $('#tweets-container').prepend(HTML);
}

// Html template to load
const createTweetElement = (object) => {
  let $tweet =  `
  <article class="old-tweet">
    <header class="old-tweet-header">
      <i class="far fa-meh fa-3x"></i>
      <h5 class="header-person">${object.user.name}</h5>
      <h3>${object.user.handle}</h3>
    </header>
      <div name="text" class="old-tweet-text">${escape(object.content.text)}</div>
    <footer class="old-tweet-footer">
      <h5>${timeago.format(object.created_at)}</h5>
      <ul>
        <i class="old fas fa-flag"></i>
        <i class="old fas fa-share"></i>  
        <i class="old fas fa-heart"></i>
      </ul>
    </footer>
  </article>
  `;
  return $tweet;
};

// Calls and renders tweets if their valid if their not valid an error will be displayed
$("#tweet-btn").on("submit", function(event) {
  event.preventDefault();
  $('.error').css('display', 'none');
  if (num >= 0 && num !== 140) {
    const data = $(this).serialize();
    $.post('/tweets', data, () => loadTweets());
    $('#tweet-text').val("");
  } else if (num === 140) {
    $(".tweet-form").append(`<label class="tweet-form error">Field cannot be left blank!</label>`);
  } else {
    $(".tweet-form").append(`<label class="tweet-form error">Field has too many characters!</label>`);
  }
});

// Gets data from ajax post request and passes it into render tweets
const loadTweets = () => {
  $.ajax('/tweets', { method: 'GET' })
  .then(function(JSON) {
    renderTweets(JSON);
  });
};

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// displays tweet form when arrow icon is clicked
$('.compose').on('click', () => {
    $('.new-tweet').slideDown().css('display', 'flex');
})

$('.error').css('display', 'none');


