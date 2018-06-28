$(document).ready(function() {
  $('input').on('change', function(event) {
    var qty = event.target.value;

    var priceElement = event.target.parentNode.parentNode.lastElementChild;

    if (qty < 1) {
      event.target.value = 1;

      qty = 1;
    }

    var itemId = event.target.dataset['itemid'];
    const updateItemUrl = '/product/update';
    $.ajax({
      method: 'POST',
      url: updateItemUrl,
      data: {
        _csrf: csrfToken,
        productId: itemId,
        qty: qty
      },
      success: function(res) {
        if (res['price']) {
          priceElement.textContent = '$' + res['price'];

          $('#total-price').text('Total price: $' + res['totalPrice']);
        }
      }
    });
  });
});
