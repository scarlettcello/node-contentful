const client = require('./contentfulClient').client;

let blogList = [];

client.getEntries({
  content_type: 'blog',
  select: 'sys.id,fields.title'
})
.then((response) => {
  for (let i = 0; i < response.items.length; i++) {
    blogList.push(response.items[i].fields.title);
  }
})
.catch(console.error);


//Make available for routes
module.exports = { blogList }


