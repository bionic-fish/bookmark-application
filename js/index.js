// listen for form submit
document.getElementById('appForm').addEventListener('submit', saveBookmark);

// save bookmark
function saveBookmark(e) {
    //get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    // bookmark object
    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    
    // test if bookmarks is null
    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        // add to array
        bookmarks.push(bookmark);
        // set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // add bookmark to array
        bookmarks.push(bookmark);
        // re set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //clear form
    document.getElementById('appForm').reset();

    // re-fetch bookmarks
    fetchBookmarks();

    // prevent form from submitting
    e.preventDefault();

    
}

// delete bookmark
function deleteBookmark(url) {
    console.log(url);
    // get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // loop through bookmarks
    for (i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            // remove from array
            bookmarks.splice(i, 1);
        }
    }
    // re set back into localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // re-fetch bookmarks
    fetchBookmarks();

}

// fetch bookmarks
function fetchBookmarks() {
    // get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // get output id
    var bookmarksResults = document.getElementById('results');

    // build output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="app__output">' + 
                                      '<h3 class="flex__item">' +name+
                                      '</h3>' +
                                      ' <a class="app__btn flex__item" target="_blank" href="'+url+'"><i class="far fa-arrow-alt-circle-right"></i><br>Visit</a> ' +
                                      ' <a onclick="deleteBookmark(\''+url+'\')" class="app__btn btn__delete flex__item" href="#"><i class="fas fa-times"></i><br>Delete</a> ' +
                                      '</div>';
        // test to see objects are created in localStorage
        console.log(bookmarks);
    }
}

