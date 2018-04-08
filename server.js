/**
 * New node file
 */

const express = require('express');
const app = express();
const {spawn} = require('child_process');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');

app.use(timeout('200s'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/', express.static(__dirname + '/app'));

app.use(morgan('short'));
app.post('/query', (request, response) => {
  let data = request.body.data;
  console.log('---------------- IN PROGRESS ---------------------------------------');
  data = data.replace(/"/g, "'");
  // data = { "HIGH": ["youtube.com", "ndtv.com", "uk.pressfrom.com", "facebook.com"], "href": ["https://www.ndtv.com/india-news/will-salman-khan-get-bail-in-blackbuck-poaching-case-verdict-after-lunch-1834083", "https://www.youtube.com/watch?v=25UmcQQRhmo", "https://www.ndtv.com/topic/salman-khan", "https://www.facebook.com/IncodaTVHD/", "https://primefeed.in/", "https://www.facebook.com/AjabGazabChutkule/", "https://primefeed.in/category/news-feed/", "https://www.facebook.com/NowImOkay/", "https://moviemagic.in/celebs", "https://www.facebook.com/TheEPlusMedia/", "https://www.ndtv.com/india-news/will-salman-khan-get-bail-in-blackbuck-poaching-case-verdict-after-lunch-1834083", "https://www.youtube.com/watch?v=25UmcQQRhmo", "https://www.ndtv.com/topic/salman-khan", "https://www.facebook.com/IncodaTVHD/", "https://english.newsatfirst.com/", "https://www.facebook.com/AjabGazabChutkule/", "https://primefeed.in/", "https://www.facebook.com/NowImOkay/", "https://www.bollywoodpapa.com/news/salman-khan-reached-home-thousands-of-fans-welcomes-outside-galaxy-apartments-watch-video/", "https://www.facebook.com/TheEPlusMedia/", "https://www.ndtv.com/india-news/will-salman-khan-get-bail-in-blackbuck-poaching-case-verdict-after-lunch-1834083", "https://www.facebook.com/IncodaTVHD/", "https://www.ndtv.com/topic/morning", "https://www.youtube.com/watch?v=25UmcQQRhmo", "https://www.ndtv.com/video/news/news/salman-khan-back-in-mumbai-after-spending-2-nights-in-jodhpur-jail-482369", "http://uk.pressfrom.com/news/world/india/-249226-salman-khan-walks-out-of-jodhpur-jail-will-return-home-to-mumbai-tonight/", "https://www.ndtv.com/india-news/will-salman-khan-get-bail-in-blackbuck-poaching-case-verdict-after-lunch-1834083", "https://www.facebook.com/IncodaTVHD/", "https://www.ndtv.com/topic/morning", "https://www.youtube.com/watch?v=25UmcQQRhmo", "https://www.ndtv.com/topic/salman-khan", "https://english.newsatfirst.com/", "https://news.ava360.com/salman-khan-back-in-mumbai-after-spending-2-nights-in-jodhpur-jail_d70ceb690.html", "http://uk.pressfrom.com/news/world/india/-249226-salman-khan-walks-out-of-jodhpur-jail-will-return-home-to-mumbai-tonight/", "https://www.ndtv.com/india-news/will-salman-khan-get-bail-in-blackbuck-poaching-case-verdict-after-lunch-1834083", "https://www.facebook.com/IncodaTVHD/", "https://www.ndtv.com/topic/morning", "https://www.youtube.com/watch?v=25UmcQQRhmo", "https://www.ndtv.com/topic/salman-khan", "http://uk.pressfrom.com/news/world/india/-249226-salman-khan-walks-out-of-jodhpur-jail-will-return-home-to-mumbai-tonight/", "https://www.ndtv.com/topic/mumbai", "https://www.youtube.com/channel/UCZFMm1mMw0F81Z37aaEzTUA", "https://www.ndtv.com/india-news/will-salman-khan-get-bail-in-blackbuck-poaching-case-verdict-after-lunch-1834083", "https://www.facebook.com/IncodaTVHD/", "https://www.ndtv.com/topic/morning", "https://english.newsatfirst.com/", "https://www.ndtv.com/topic/salman-khan", "https://www.newsx.tv/channel/india/ndtv-24x7/", "https://newsgator.news/topics/culture/entertainment/salman-khan-walks-out-of-jodhpur-jail-will-return-home-to-mumbai-tonight/", "https://www.newsx.tv/channel/india/", "https://news.ava360.com/salman-khan-back-in-mumbai-after-spending-2-nights-in-jodhpur-jail_d70ceb690.html", "https://www.youtube.com/channel/UCZFMm1mMw0F81Z37aaEzTUA", "https://www.ndtv.com/india-news/will-salman-khan-get-bail-in-blackbuck-poaching-case-verdict-after-lunch-1834083", "https://www.facebook.com/IncodaTVHD/", "https://www.ndtv.com/topic/morning", "https://newsgator.news/topics/culture/entertainment/salman-khan-walks-out-of-jodhpur-jail-will-return-home-to-mumbai-tonight/", "https://www.ndtv.com/topic/salman-khan", "http://uk.pressfrom.com/news/world/india/-249226-salman-khan-walks-out-of-jodhpur-jail-will-return-home-to-mumbai-tonight/", "https://www.youtube.com/channel/UCZFMm1mMw0F81Z37aaEzTUA", "https://www.ndtv.com/india-news/salman-khan-blackbuck-poaching-case-live-bail-hearing-expected-today-1834032", "https://www.facebook.com/IncodaTVHD/", "https://www.ndtv.com/india-news/will-salman-khan-get-bail-in-blackbuck-poaching-case-verdict-after-lunch-1834083", "https://newsgator.news/topics/culture/entertainment/salman-khan-walks-out-of-jodhpur-jail-will-return-home-to-mumbai-tonight/", "https://www.ndtv.com/topic/morning", "http://uk.pressfrom.com/news/world/india/-249226-salman-khan-walks-out-of-jodhpur-jail-will-return-home-to-mumbai-tonight/", "https://www.youtube.com/channel/UCZFMm1mMw0F81Z37aaEzTUA", "https://www.ndtv.com/india-news/salman-khan-blackbuck-poaching-case-live-bail-hearing-expected-today-1834032", "https://www.facebook.com/IncodaTVHD/", "https://www.ndtv.com/india-news/will-salman-khan-get-bail-in-blackbuck-poaching-case-verdict-after-lunch-1834083", "https://www.newsx.tv/channel/india/ndtv-24x7/", "https://www.ndtv.com/topic/morning", "https://english.newsatfirst.com/", "https://www.newsx.tv/channel/india/", "https://newsgator.news/topics/culture/entertainment/salman-khan-walks-out-of-jodhpur-jail-will-return-home-to-mumbai-tonight/", "http://uk.pressfrom.com/news/world/india/-249226-salman-khan-walks-out-of-jodhpur-jail-will-return-home-to-mumbai-tonight/", "https://www.ndtv.com/india-news/will-salman-khan-get-bail-in-blackbuck-poaching-case-verdict-after-lunch-1834083", "https://www.youtube.com/watch?v=25UmcQQRhmo", "https://www.ndtv.com/topic/morning", "https://www.facebook.com/ndtv/", "https://www.ndtv.com/topic/salman-khan", "https://www.bollywoodpapa.com/news/salman-khan-reached-home-thousands-of-fans-welcomes-outside-galaxy-apartments-watch-video/", "https://news.ava360.com/salman-khan-back-in-mumbai-after-spending-2-nights-in-jodhpur-jail_d70ceb690.html", "https://www.ndtv.com/india-news/will-salman-khan-get-bail-in-blackbuck-poaching-case-verdict-after-lunch-1834083", "https://www.youtube.com/watch?v=25UmcQQRhmo", "https://www.ndtv.com/topic/morning", "https://www.facebook.com/ndtv/", "https://www.ndtv.com/topic/salman-khan", "https://www.bollywoodpapa.com/news/salman-khan-reached-home-thousands-of-fans-welcomes-outside-galaxy-apartments-watch-video/", "https://news.ava360.com/salman-khan-back-in-mumbai-after-spending-2-nights-in-jodhpur-jail_d70ceb690.html", "https://www.ndtv.com/india-news/will-salman-khan-get-bail-in-blackbuck-poaching-case-verdict-after-lunch-1834083", "https://www.youtube.com/watch?v=25UmcQQRhmo", "https://www.ndtv.com/topic/morning", "https://filmymantra.com/watch-rakhi-sawants-reaction-salman-khans-bail/", "https://www.ndtv.com/topic/salman-khan", "https://www.facebook.com/ndtv/", "https://filmymantra.com/trending/", "https://www.bollywoodpapa.com/news/salman-khan-reached-home-thousands-of-fans-welcomes-outside-galaxy-apartments-watch-video/", "https://news.ava360.com/salman-khan-back-in-mumbai-after-spending-2-nights-in-jodhpur-jail_d70ceb690.html"], "SOME": ["news.ava360.com"] }
 // data = { "SOME": ["youtube.com", "ndtv.com", "uk.pressfrom.com", "facebook.com"], "href": ["https://www.ndtv.com/india-news/will-salman-khan-get-bail-in-blackbuck-poaching-case-verdict-after-lunch-1834083", "https://www.youtube.com/watch?v=25UmcQQRhmo", "https://www.ndtv.com/topic/salman-khan", "https://www.facebook.com/IncodaTVHD/", "https://primefeed.in/", "https://www.facebook.com/AjabGazabChutkule/", "https://primefeed.in/category/news-feed/", "https://www.facebook.com/NowImOkay/", "https://moviemagic.in/celebs", "https://www.facebook.com/TheEPlusMedia/", "https://www.ndtv.com/india-news/will-salman-khan-get-bail-in-blackbuck-poaching-case-verdict-after-lunch-1834083", "https://www.youtube.com/watch?v=25UmcQQRhmo", "https://www.ndtv.com/topic/salman-khan", "https://www.facebook.com/IncodaTVHD/", "https://english.newsatfirst.com/", "https://www.facebook.com/AjabGazabChutkule/", "https://primefeed.in/", "https://www.facebook.com/NowImOkay/", "https://www.bollywoodpapa.com/news/salman-khan-reached-home-thousands-of-fans-welcomes-outside-galaxy-apartments-watch-video/", "https://www.facebook.com/TheEPlusMedia/", "https://www.ndtv.com/india-news/will-salman-khan-get-bail-in-blackbuck-poaching-case-verdict-after-lunch-1834083", "https://www.facebook.com/IncodaTVHD/", "https://www.ndtv.com/topic/morning", "https://www.youtube.com/watch?v=25UmcQQRhmo", "https://www.ndtv.com/video/news/news/salman-khan-back-in-mumbai-after-spending-2-nights-in-jodhpur-jail-482369", "http://uk.pressfrom.com/news/world/india/-249226-salman-khan-walks-out-of-jodhpur-jail-will-return-home-to-mumbai-tonight/", "https://www.ndtv.com/india-news/will-salman-khan-get-bail-in-blackbuck-poaching-case-verdict-after-lunch-1834083", "https://www.facebook.com/IncodaTVHD/", "https://www.ndtv.com/topic/morning", "https://www.youtube.com/watch?v=25UmcQQRhmo", "https://www.ndtv.com/topic/salman-khan", "https://english.newsatfirst.com/", "https://news.ava360.com/salman-khan-back-in-mumbai-after-spending-2-nights-in-jodhpur-jail_d70ceb690.html", "http://uk.pressfrom.com/news/world/india/-249226-salman-khan-walks-out-of-jodhpur-jail-will-return-home-to-mumbai-tonight/", "https://www.ndtv.com/india-news/will-salman-khan-get-bail-in-blackbuck-poaching-case-verdict-after-lunch-1834083", "https://www.facebook.com/IncodaTVHD/", "https://www.ndtv.com/topic/morning", "https://www.youtube.com/watch?v=25UmcQQRhmo", "https://www.ndtv.com/topic/salman-khan", "http://uk.pressfrom.com/news/world/india/-249226-salman-khan-walks-out-of-jodhpur-jail-will-return-home-to-mumbai-tonight/", "https://www.ndtv.com/topic/mumbai", "https://www.youtube.com/channel/UCZFMm1mMw0F81Z37aaEzTUA", "https://www.ndtv.com/india-news/will-salman-khan-get-bail-in-blackbuck-poaching-case-verdict-after-lunch-1834083", "https://www.facebook.com/IncodaTVHD/", "https://www.ndtv.com/topic/morning", "https://english.newsatfirst.com/", "https://www.ndtv.com/topic/salman-khan", "https://www.newsx.tv/channel/india/ndtv-24x7/", "https://newsgator.news/topics/culture/entertainment/salman-khan-walks-out-of-jodhpur-jail-will-return-home-to-mumbai-tonight/", "https://www.newsx.tv/channel/india/", "https://news.ava360.com/salman-khan-back-in-mumbai-after-spending-2-nights-in-jodhpur-jail_d70ceb690.html", "https://www.youtube.com/channel/UCZFMm1mMw0F81Z37aaEzTUA", "https://www.ndtv.com/india-news/will-salman-khan-get-bail-in-blackbuck-poaching-case-verdict-after-lunch-1834083", "https://www.facebook.com/IncodaTVHD/", "https://www.ndtv.com/topic/morning", "https://newsgator.news/topics/culture/entertainment/salman-khan-walks-out-of-jodhpur-jail-will-return-home-to-mumbai-tonight/", "https://www.ndtv.com/topic/salman-khan", "http://uk.pressfrom.com/news/world/india/-249226-salman-khan-walks-out-of-jodhpur-jail-will-return-home-to-mumbai-tonight/", "https://www.youtube.com/channel/UCZFMm1mMw0F81Z37aaEzTUA", "https://www.ndtv.com/india-news/salman-khan-blackbuck-poaching-case-live-bail-hearing-expected-today-1834032", "https://www.facebook.com/IncodaTVHD/", "https://www.ndtv.com/india-news/will-salman-khan-get-bail-in-blackbuck-poaching-case-verdict-after-lunch-1834083", "https://newsgator.news/topics/culture/entertainment/salman-khan-walks-out-of-jodhpur-jail-will-return-home-to-mumbai-tonight/", "https://www.ndtv.com/topic/morning", "http://uk.pressfrom.com/news/world/india/-249226-salman-khan-walks-out-of-jodhpur-jail-will-return-home-to-mumbai-tonight/", "https://www.youtube.com/channel/UCZFMm1mMw0F81Z37aaEzTUA", "https://www.ndtv.com/india-news/salman-khan-blackbuck-poaching-case-live-bail-hearing-expected-today-1834032", "https://www.facebook.com/IncodaTVHD/", "https://www.ndtv.com/india-news/will-salman-khan-get-bail-in-blackbuck-poaching-case-verdict-after-lunch-1834083", "https://www.newsx.tv/channel/india/ndtv-24x7/", "https://www.ndtv.com/topic/morning", "https://english.newsatfirst.com/", "https://www.newsx.tv/channel/india/", "https://newsgator.news/topics/culture/entertainment/salman-khan-walks-out-of-jodhpur-jail-will-return-home-to-mumbai-tonight/", "http://uk.pressfrom.com/news/world/india/-249226-salman-khan-walks-out-of-jodhpur-jail-will-return-home-to-mumbai-tonight/", "https://www.ndtv.com/india-news/will-salman-khan-get-bail-in-blackbuck-poaching-case-verdict-after-lunch-1834083", "https://www.youtube.com/watch?v=25UmcQQRhmo", "https://www.ndtv.com/topic/morning", "https://www.facebook.com/ndtv/", "https://www.ndtv.com/topic/salman-khan", "https://www.bollywoodpapa.com/news/salman-khan-reached-home-thousands-of-fans-welcomes-outside-galaxy-apartments-watch-video/", "https://news.ava360.com/salman-khan-back-in-mumbai-after-spending-2-nights-in-jodhpur-jail_d70ceb690.html", "https://www.ndtv.com/india-news/will-salman-khan-get-bail-in-blackbuck-poaching-case-verdict-after-lunch-1834083", "https://www.youtube.com/watch?v=25UmcQQRhmo", "https://www.ndtv.com/topic/morning", "https://www.facebook.com/ndtv/", "https://www.ndtv.com/topic/salman-khan", "https://www.bollywoodpapa.com/news/salman-khan-reached-home-thousands-of-fans-welcomes-outside-galaxy-apartments-watch-video/", "https://news.ava360.com/salman-khan-back-in-mumbai-after-spending-2-nights-in-jodhpur-jail_d70ceb690.html", "https://www.ndtv.com/india-news/will-salman-khan-get-bail-in-blackbuck-poaching-case-verdict-after-lunch-1834083", "https://www.youtube.com/watch?v=25UmcQQRhmo", "https://www.ndtv.com/topic/morning", "https://filmymantra.com/watch-rakhi-sawants-reaction-salman-khans-bail/", "https://www.ndtv.com/topic/salman-khan", "https://www.facebook.com/ndtv/", "https://filmymantra.com/trending/", "https://www.bollywoodpapa.com/news/salman-khan-reached-home-thousands-of-fans-welcomes-outside-galaxy-apartments-watch-video/", "https://news.ava360.com/salman-khan-back-in-mumbai-after-spending-2-nights-in-jodhpur-jail_d70ceb690.html"], "HIGH": ["news.ava360.com"] };
  //data = {"SOME":[], "HIGH":[]};
  //run the python process
  const pythonProcess = spawn('python', ["E:/FakeOrFact/fof.py", data]);

  pythonProcess.stdout.on('data', function (data) {
    data = data.toString('utf-8');
    console.log('call is success');
    console.log(data);
    response.send(JSON.stringify({
      'success': true,
      'data': JSON.parse(data)
    }));
  });
});

const port = 8000;
let ip = '127.0.0.1';

require('dns').lookup(require('os').hostname(), function(err, add, fam) {
  ip = add;
  app.listen(port, function(){
    console.log('Running on http://'+ip+':'+port);
  });
});