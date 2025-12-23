(function($){
  $(function(){

    $('.sidenav').sidenav({preventScrolling: true, edge: 'right'});
    $('.parallax').parallax();
    $('.modal').modal({preventScrolling: true});
    $('.tooltipped').tooltip();
    $('.collapsible').collapsible();
    $('.dropdown-trigger').dropdown({coverTrigger: false, constrainWidth: false, alignment: 'right'});

  }); // end of document ready
})(jQuery); // end of jQuery name space

//  var filterizd = $('.filtr-container').filterizr({
     //options object
//  });  
