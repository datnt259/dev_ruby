jQuery(document).ready(function() {
    var product_names = new Bloodhound({
        datumTokenizer: function (ojb) {
            return Bloodhound.tokenizers.whitespace(ojb.product_name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: all_product
    });
    product_names.initialize();

    handle_delete = function(){
        $(this).parents('tr').remove();
        if(!$('#table-info tbody tr').length){
            $('#save-supply').hide();
        }
    }
    handle_typeahead_focus = function(){
         value_product_name = $(this).val();
    }
    handle_typeahead_blur  = function(){
        if (typeof(value_product_name) != "undefined") {
            if(value_product_name){
                $(this).val(value_product_name);
            }
        }else {
            $(this).val('value_product_name');
        };
        return false;
    };
    handle_typeahead_change = function(){
        var product_name = $(this).val();
            value_product_name = product_name;
            ojb_change = $(this).parents('td');
            not_found_id = 1;
            not_error_variant = 0;
        ojb_change.next().next().html($('#size-color-select-box').html());
        all_product.forEach(function(element){
            if(element.product_name===product_name){
                not_found_id = 0;
                ojb_change.prev().html(element.product_id);
                    if (typeof(element.variant)!="undefined") {
                            not_error_variant = 1;
                            ojb_change.next().html(element.variant[0].variant_id);
                            ojb_change.next().next().children().html('');
                            element.variant.forEach(function(tmp){
                            ojb_change.next().next().children().append('<option data-id="'+tmp.variant_id+'">'+tmp.size_name+' - '+tmp.color_name_ja+'</option');
                             });
                    } else {
                        not_error_variant = 0;
                         ojb_change.next().html('0');
                         ojb_change.next().addClass('error-item');
                         ojb_change.next().next().addClass('error-item');
                    }
                    ojb_change.prev().html(element.product_id);
                    return ;
            }
        });
        if (not_found_id) {
                ojb_change.prev().addClass('error-item');
                ojb_change.addClass('error-item');
                ojb_change.next().addClass('error-item');
                ojb_change.next().next().addClass('error-item');
                ojb_change.prev().html('0');
                ojb_change.next().html('0');
        } else {
                ojb_change.prev().removeClass('error-item');
                ojb_change.removeClass('error-item');
                if(typeof(not_error_variant)!='undefined'&&not_error_variant==1){
                    ojb_change.next().removeClass('error-item');
                    ojb_change.next().next().removeClass('error-item');
                }
        };
        $('.select-option').change(function(){
            var variant_id_select = $(this).children(":selected").attr('data-id');
            $(this).parent().prev().html(variant_id_select); 
            return false;  
        });
       return true;
    }

    handle_input_number = function(){
        number = $(this).val();
        if(/^[0-9]+$/.test(number)&&parseInt(number)>0){
            $(this).parent().removeClass('error-item');
        } else {
            $(this).parent().addClass('error-item');
        }
    }
    $('#save-supply').click(function(){
        if ($('.input-description').val()=='') {
           $('.input-description').focus();
            return false;
        };
        access_save = 1;
        $('#table-info').find('.product_id').each(function(){
            if ($(this).hasClass('error-item')||$(this).next().next().hasClass('error-item')) {
                $(this).next().find('.input-product-name').focus();
                access_save = 0 ;
                return false;
            };
            if( $(this).parent().find('.item_number').hasClass('error-item')){
                $(this).parent().find('.input-number').focus();
                access_save = 0;
                return false;
            }
        });
        if (access_save) {
            datas_variant_id = [];
            datas_item_number = [];
            $('#table-info tbody tr').each(function(){
                datas_variant_id.push($(this).find('.variant_id').html());
                datas_item_number.push($(this).find('.input-number').val());
            }); 
        description = $('.input-description').val();
         $.ajax({
              url: '/supplies/0',
              type: 'PUT',
              data:{'variant_id':datas_variant_id,'item_number':datas_item_number,'description':description},
              success: function(data) {
                if(data=='success'){
                    window.location.href = $('#save-supply').attr('link');
                }
              }
          });
        };
    });
    $('#add-item').click(function(){
    $('#body-table').prepend('<tr class="odd">\
                                <td class="product_id error-item">0</td>\
                                <td class="product_name error-item" >\
                                    <input type="text" class="input-product-name typeahead" style="background-color: white;"> \
                                </td>\
                                <td class="variant_id error-item">0</td>\
                                <td class="sizes_name error-item" colspan="2" align="center">\
                                    <select class="form-control select-option" style="height: inherit;width: inherit;padding: 0px 15px;">\
                                       <option>Size - Color</option>\
                                    </select>\
                                </td>\
                                <td class="item_number error-item" >\
                                    <input type="number" class="input-number" name="quantity" min="1" placeholder="Item Number" value="0">\
                                </td>\
                                <td class="" align="center">\
                                    <button class="btn btn-danger btn-sm delete-item" style="padding: 0px 18px;margin-left: 20px;"">Delete</button>\
                                </td>\
                            </tr>'
                            );
    $('#save-supply').show();
    $('.delete-item').unbind();
    $('.delete-item').bind('click',handle_delete);
    $('.input-number').unbind();
    $('.input-number').bind('change',handle_input_number);
    $('.input-product-name').typeahead({
         hint: true,
         highlight: true,
         minLength: 1
    }, {
        name: 'product_names',
        displayKey: 'product_name',
        source: product_names.ttAdapter()
    }).on('typeahead:selected', function (e, datum) {
        var product_name = $(this).val();
            value_product_name = product_name;
             not_error_variant = 0;
        ojb_change = $(this).parents('td');
        all_product.forEach(function(element){
            if(element.product_id==datum.product_id){
                ojb_change.prev().html(element.product_id);
                ojb_change.prev().removeClass('error-item');
                ojb_change.removeClass('error-item');
                ojb_change.next().next().html($('#size-color-select-box').html());
                if (typeof(element.variant)!="undefined") {
                    not_error_variant = 1;
                   
                    ojb_change.next().html(element.variant[0].variant_id);
                    ojb_change.next().next().children().html('');
                    element.variant.forEach(function(tmp){
                        ojb_change.next().next().children().append('<option data-id="'+tmp.variant_id+'">'+tmp.size_name+' - '+tmp.color_name_ja+'</option');
                     });
                    console.log(element.variant);
                } else {
                    not_error_variant = 0;
                    ojb_change.next().html('0');
                    ojb_change.next().addClass('error-item');
                    ojb_change.next().next().addClass('error-item');
                }
                if(typeof(not_error_variant)!='undefined'&&not_error_variant==1){
                     ojb_change.next().removeClass('error-item');
                    ojb_change.next().next().removeClass('error-item');
                }
                return ;
            }
        });
        $('.select-option').change(function(){
            var variant_id_select = $(this).children(":selected").attr('data-id');
            $(this).parent().prev().html(variant_id_select);   
        });
        return false;
    });
    $('.input-product-name').attr('style','');
    $('.input-product-name').unbind('focus');
    $('.input-product-name').bind('focus',handle_typeahead_focus); 
    $('.input-product-name').unbind('change');
    $('.input-product-name').bind('change',handle_typeahead_change);
    $('.input-product-name').unbind('blur');
    $('.input-product-name').bind('blur',handle_typeahead_blur);
    });
});