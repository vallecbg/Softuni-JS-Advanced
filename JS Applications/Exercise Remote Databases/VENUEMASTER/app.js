function attachEvents() {

    let url = 'https://baas.kinvey.com/rpc/kid_BJ_Ke8hZg/custom/calendar?query='
    let base64auth = btoa('guest:pass')
    let authHeaders = {"Authorization": "Basic "+base64auth, "Content-Type":"application/json"}

    $('#getVenues').on('click',function () {
        let value = $('#venueDate').val()
        $.ajax({
            method:'POST',
            url:url+value,
            headers:authHeaders
        }).then((result)=> {
            url = 'https://baas.kinvey.com/appdata/kid_BJ_Ke8hZg/venues/'
            for (let i = 0; i < result.length; i++) {
                $.ajax({
                    method:'GET',
                    url:url+result[i],
                    headers:authHeaders
                }).then((obj)=> {

                    let html = `<div class="venue" id="${obj._id}">
  <span class="venue-name"><input class="info${i}" type="button" value="More info">${obj.name}</span>
  <div class="venue-details" style="display: none;">
    <table>
      <tr><th>Ticket Price</th><th>Quantity</th><th></th></tr>
      <tr>
        <td class="venue-price">${obj.price} lv</td>
        <td><select class="quantity${i}">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select></td>
        <td><input class="purchase${i}" type="button" value="Purchase"></td>
      </tr>
    </table>
    <span class="head">Venue description:</span>
    <p class="description">${obj.description}</p>
    <p class="description">Starting time: ${obj.startingHour}</p>
  </div>
</div>`
                    $('#venue-info').append(html)
                    $('.info'+i).on('click',function () {
                        let div = $(this).parent().parent().find('.venue-details')
                        if(div.css('display') == 'none'){
                            div.css('display','block')
                        } else {
                            div.css('display','none')
                        }
                    })
                    $('.purchase'+i).on('click',function () {

                        let qty = Number($('.quantity'+i+' option:selected').text())
                        $('#venue-info').empty()
                        let html = `<span class="head">Confirm purchase</span>
<div class="purchase-info">
  <span>${obj.name}</span>
  <span>${qty} x ${obj.price}</span>
  <span>Total: ${qty * obj.price} lv</span>
  <input type="button" value="Confirm" class="${i}">
</div>`
                        $('#venue-info').append(html)
                        $('.'+i).on('click',function () {
                            url = `https://baas.kinvey.com/rpc/kid_BJ_Ke8hZg/custom/purchase?venue=${obj.name}&qty=${qty}`
                            $.ajax({
                                method:'POST',
                                url:url,
                                headers:authHeaders
                            }).then((res)=>{
                                $('#venue-info').empty()
                                $('#venue-info').text('You may print this page as your ticket')
                                $('#venue-info').append(res.html)
                                $('.venue-name').text(obj.name)
                                $('.left > :nth-child(3)').text(obj.startingHour)
                                $('.left > :nth-child(5)').text('Admit '+qty)
                                $('.left > :nth-child(6)').text(qty * obj.price+' lv')
                                $('.right > :nth-child(3)').text(obj._id)
                            }).catch((err)=>{
                                console.log(err)
                            })
                        })
                    })
                })
            }
        })
    })
}