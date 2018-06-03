var db = null;
var configdoc = "_local/config";
var config = null;
var replication = null;

var loadConfig = function(callback) {
  db.get(configdoc, function(err, data) {
    if (err) {
      data = { _id: configdoc, url: null};
    }
    config = data;
    callback(null, data);
  });
};

// MapReduce function that orders by date
var map = function(doc) {
  if (doc.date) {
    emit(doc.date,null);
  }
};

var loadList = function() {
  console.log("loadList");
  db.query(map, {include_docs:true, descending:true}).then(function(result) {
    console.log("loadList", result);
    var html = '<tbody>';
   
    for(var i in result.rows) {
      var doc = result.rows[i].doc;
      html += '<tr>';
      html += '<td><span class="truncate">' + doc.url + '</span><br />'
      html += '<span class="domain">' + '' + '</span>';
      html += '</td>';
      html += '<td><button class="pseudo delete" data-id="' + doc._id +'" data-rev="' + doc._rev + '"><img src="remove.png" class="removeicon"/></button></td>'
      html += '</tr>';
    }
    html += '</tbody>';
    $('#thetable').html(html);
    
    // when the delete button is pressed
    $(".delete").bind("click", function(event) {
      var b = $( this );
      var id = b.attr("data-id");
      var rev = b.attr("data-rev");
      db.remove(id,rev, function() {
        loadList();
      })
    });
  });
};

var saveLink = function(callback) {
    var doc = {    url: $('#blackList').val(), //
      date: (new Date()).toISOString()}
    db.post(doc, callback);
};

var kickOffReplication = function() {
  if (replication != null) {
    replication.cancel();
  }
  if (config.url) {
    replication = db.sync(config.url, {
      live:true, 
      retry:true
    }).on('change', function(change){ 
      console.log("change", change);
      loadList();
    });
  }
}

// when the page has loaded
$( document ).ready(function() {
  
  // start up PouchDB
  db = new PouchDB("linkshare");
  
  loadList();
  
  // when the save button is pressed
  $("#save").bind("click", function() {
    saveLink(function() {
      loadList();
    })
  });
    
  
  // load the config
  loadConfig(function(err, data) {
    console.log("!", err, data);
    if (!err && data.url) {
      $('#replicationurl').val(data.url);
      kickOffReplication();
    } 
  })


});