const archiemlPipe = require('archieml-pipe').default;
const path = require('path');
const stories = require('../../src/data/data.json');

var _ = require('lodash');
//import './css/style.css';
var Handlebars = require('handlebars');
var fs = require('fs');
var mkdirp = require('mkdirp');
var prettifyHtml = require('prettify-html');

var pageTemplate = require("../../src/templates/article.hbs");
var num_stories = stories.Sheet1.length;



//   module.exports = () => {
//     for (i=18; i < 19 ; i++ ){
//     //!function(i){
//       console.log(stories.Sheet1[i].SLUG);
//         archiemlPipe({
//           googleDocId: stories.Sheet1[i].DOC_ID,
//           googleClientId: process.env.googleClientId,
//           googleClientSecret: process.env.googleClientSecret,
//           exportPath: path.join(process.cwd(), 'src/data/'+stories.Sheet1[i].SLUG+'.json'),
//         });
//         //cb();
//       //}(i);
//     }
// }



module.exports = () => {
for (var i = 1; i < num_stories; i++) {
  // make the directory
  if (!fs.existsSync('src/templates/'+stories.Sheet1[i].SLUG)) {
    console.log("hello");

    fs.mkdirSync('src/templates/'+stories.Sheet1[i].SLUG);
  };

  const story_body = require('../../src/data/'+stories.Sheet1[i].SLUG+'.json');


  // get story info from spreadsheet
  var context = {
    title: stories.Sheet1[i]['HEADLINE'],
    section: stories.Sheet1[i]['SECTION'],
    slug: stories.Sheet1[i]['SLUG'],
    subtitle: stories.Sheet1[i]['DECK'],
    byline: stories.Sheet1[i]['BYLINE'],
    byline_url: stories.Sheet1[i]['AUTHOR_LINK'],
    media_link: story_body['top-img'],
    media_byline: story_body['credit'],
    // media_author_url: stories.Sheet1[i]['MEDIA-AUTHOR-LINK'],
    // front_preview: stories.Sheet1[i]['FRONT-PREVIEW'],
    // article_lead: stories.Sheet1[i]['ARTICLE-LEAD'],
    // article_body: stories.Sheet1[i]['ARTICLE-BODY'],

    related_left_link: stories.Sheet1[i]['RELATED_LEFT_LINK'],
    related_left_hed: stories.Sheet1[i]['RELATED_LEFT_HED'],
    related_left_byline: stories.Sheet1[i]['RELATED_LEFT_BYLINE'],
    related_left_date: stories.Sheet1[i]['RELATED_LEFT_DATE'],
    related_right_link: stories.Sheet1[i]['RELATED_RIGHT_LINK'],
    related_right_hed: stories.Sheet1[i]['RELATED_RIGHT_HED'],
    related_right_byline: stories.Sheet1[i]['RELATED_RIGHT_BYLINE'],
    related_right_date: stories.Sheet1[i]['RELATED_RIGHT_DATE'],
    body: story_body['text']
  }


  console.log(story_body['top-img']);

  var fileName = 'src/templates/'+stories.Sheet1[i].SLUG+'/index.html';
  var stream = fs.createWriteStream(fileName);
  var articleResult = pageTemplate(context);
  //var fixedResult = articleResult.replace("&lt;p&gt;", "<p>");
  //var prettifiedResult = prettifyHtml(articleResult);
  stream.write(articleResult);
  stream.end();


}
}
