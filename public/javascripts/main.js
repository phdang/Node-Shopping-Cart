$(document).ready(function() {
  $('.add-cart').on('click', function(event) {
    event.preventDefault();
    const productId = event.target.dataset['productid'];
    const addCartUrl = '/addCart';
    const isEmptyCart =
      $('#items-to-cart')
        .text()
        .trim() === '';
    $.ajax({
      method: 'POST',
      url: addCartUrl,
      data: {
        _csrf: csrfToken,
        productId: productId
      },
      success: function(data) {
        if (data.count) {
          if (isEmptyCart) {
            $('#items-to-cart').addClass('badge');
            $('#items-to-cart').html(data.count);
          } else {
            $('#items-to-cart').html(data.count);
          }
        }
      }
    });
  });
});
