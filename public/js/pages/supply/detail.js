jQuery(document).ready(function() {
    var product_names = new Bloodhound({
        datumTokenizer: function (ojb) {
            return Bloodhound.tokenizers.whitespace(ojb.product_name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: all_product
    });
    product_names.initialize();
    handle_edit = function(){
            $(this).parent().siblings().each(function(){
                var value = $(this).html();
                switch($(this).attr('class'))
                {
                    case 'product_name':
                        $(this).html('<input type="text" class="input-product-name typeahead""  style="background-color: white;">');
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
                                    // console.log(ojb_change.prev().html());
                                    if (typeof(element.variant)!="undefined") {
                                         not_error_variant = 1;
                                        ojb_change.next().next().html($('#size-color-select-box').html());
                                        ojb_change.next().html(element.variant[0].variant_id);
                                        ojb_change.next().next().children().html('');
                                        element.variant.forEach(function(tmp){
                                            ojb_change.next().next().children().append('<option data-id="'+tmp.variant_id+'">'+tmp.size_name+' - '+tmp.color_name_ja+'</option');
                                         });
                                        console.log(element.variant);
                                    } else {
                                         not_error_variant = 0;
                                         ojb_change.next().html('0');
                                         ojb_change.next().next().html($('#size-color-select-box').html());
                                        ojb_change.next().addClass('error-item');
                                         ojb_change.next().next().addClass('error-item');
                                         ojb_change.parent().find('.save-detail').addClass('can-not-save');
                                         ojb_change.parent().find('.save-detail').removeClass('btn-success');
                                        // console.log('no data');
                                    }
                                    if(typeof(not_error_variant)!='undefined'&&not_error_variant==1){
                                         ojb_change.next().removeClass('error-item');
                                        ojb_change.next().next().removeClass('error-item');
                                        if(!ojb_change.parent().find('.item_number').hasClass('error-item')){
                                            ojb_change.parent().find('.save-detail').removeClass('can-not-save');
                                            ojb_change.parent().find('.save-detail').addClass('btn-success');
                                        }
                                    }
                                    return ;
                                }
                            });
                            $('.select-option').change(function(){
                                var variant_id_select = $(this).children(":selected").attr('data-id');
                                $(this).parent().prev().html(variant_id_select);   
                            });
                            return false;
                        }).focus(function(){
                             value_product_name = $(this).val();
                        }).change(function(){
                            var product_name = $(this).val();
                                value_product_name = product_name;
                                // this1 = this;
                                ojb_change = $(this).parents('td');
                                not_found_id = 1;
                                not_error_variant = 0;
                                // alert('test');
                            all_product.forEach(function(element){
                                // alert(product_name);
                                if(element.product_name===product_name){
                                    not_found_id = 0;
                                    // alert('test');
                                    // alert($(this1).parent().parent().prev().html());
                                    ojb_change.prev().html(element.product_id);
                                        if (typeof(element.variant)!="undefined") {
                                                not_error_variant = 1;
                                                ojb_change.next().next().html($('#size-color-select-box').html());
                                                ojb_change.next().html(element.variant[0].variant_id);
                                                ojb_change.next().next().children().html('');
                                                element.variant.forEach(function(tmp){
                                                    ojb_change.next().next().children().append('<option data-id="'+tmp.variant_id+'">'+tmp.size_name+' - '+tmp.color_name_ja+'</option');
                                                 });
                                            // console.log(element.variant);
                                        } else {
                                            not_error_variant = 0;
                                             ojb_change.next().html('0');
                                             ojb_change.next().next().html($('#size-color-select-box').html());
                                             ojb_change.next().addClass('error-item');
                                             ojb_change.next().next().addClass('error-item');
                                        }
                                        ojb_change.prev().html(element.product_id);
                                        return ;
                                }
                            });
                            // alert('khong thay'+not_found_id);
                            if (not_found_id) {
                                    ojb_change.prev().addClass('error-item');
                                    ojb_change.addClass('error-item');
                                    ojb_change.next().addClass('error-item');
                                    ojb_change.next().next().addClass('error-item');

                                   ojb_change.prev().html('0');
                                   ojb_change.next().html('0');
                                   ojb_change.next().next().html($('#size-color-select-box').html());
                                   ojb_change.parent().find('.save-detail').addClass('can-not-save');
                                   ojb_change.parent().find('.save-detail').removeClass('btn-success');
                            } else {
                                    ojb_change.prev().removeClass('error-item');
                                    ojb_change.removeClass('error-item');
                                    if(typeof(not_error_variant)!='undefined'&&not_error_variant==1){
                                         ojb_change.next().removeClass('error-item');
                                        ojb_change.next().next().removeClass('error-item');
                                        if(!ojb_change.parent().find('.item_number').hasClass('error-item')){
                                            ojb_change.parent().find('.save-detail').removeClass('can-not-save');
                                            ojb_change.parent().find('.save-detail').addClass('btn-success');
                                        }
                                    } else{
                                             ojb_change.parent().find('.save-detail').addClass('can-not-save');
                                             ojb_change.parent().find('.save-detail').removeClass('btn-success');
                                    }
                            };
                            $('.select-option').change(function(){
                                var variant_id_select = $(this).children(":selected").attr('data-id');
                                $(this).parent().prev().html(variant_id_select); 
                                return false;  
                            });
                           return true;
                        }).blur(function(){
                            if (typeof(value_product_name) != "undefined") {
                                if(value_product_name){
                                    $(this).val(value_product_name);
                                }
                            }else {
                                $(this).val('value_product_name');
                            };
                            return false;
                        });
                        $('.input-product-name').attr('style','');
                        $(this).find('.input-product-name').val(value);
                        value_product_name = value;
                        var product_id = $(this).prev().html();
                        $(this).next().next().html($('#size-color-select-box').html());
                        $(this).next().next().attr('colspan','2');
                        $(this).next().next().attr('align','center');
                        $(this).next().next().next().remove();
                            variant_id = $(this).next().html();
                            this1=this;
                         all_product.forEach(function(element){
                            if(element.product_id==product_id){
                                if (typeof(element.variant)!="undefined") {
                                     $(this1).next().next().children().html('');
                                    element.variant.forEach(function(tmp){
                                        if(tmp.variant_id == variant_id)
                                            $(this1).next().next().children().append('<option selected data-id="'+tmp.variant_id+'">'+tmp.size_name+' - '+tmp.color_name_ja+'</option');
                                        else 
                                            $(this1).next().next().children().append('<option data-id="'+tmp.variant_id+'">'+tmp.size_name+' - '+tmp.color_name_ja+'</option');
                                    });
                                } else {
                                    $(this1).parent().parent().next().html('0');
                                    $(this1).parent().parent().next().next().html($('#size-color-select-box').html());
                                    // console.log('no data');
                                }
                                return ;
                            }
                        });
                        $('.select-option').change(function(){
                            var variant_id_select = $(this).children(":selected").attr('data-id');
                            $(this).parent().prev().html(variant_id_select);   
                        });
                        break;
                    case 'sizes_name':
                        break;
                    case 'color_name':
                        break;
                    case 'item_number':
                        $(this).html('<input type="number" class="input-number" name="quantity" min="1" placeholder="Item Number" value='+value+'>');
                        $('.input-number').change(function(){
                            number = $(this).val();
                            if(/^[0-9]+$/.test(number)&&parseInt(number)>0){
                                $(this).parent().removeClass('error-item');
                                if ( !$(this).parent().parent().find('.product_id').hasClass('error-item')&& !$(this).parent().parent().find('.variant_id').hasClass('error-item')) {
                                    $(this).parent().parent().find('.save-detail').removeClass('can-not-save');
                                    $(this).parent().parent().find('.save-detail').addClass('btn-success');
                                }
                                // $(this).siblings('.fa').hide();
                            } else {
                                // $(this).siblings('.fa').show();
                                $(this).parent().addClass('error-item');
                                $(this).parent().parent().find('.save-detail').addClass('can-not-save');
                                $(this).parent().parent().find('.save-detail').removeClass('btn-success');

                            }
                        });
                        break;
                }
            });

            var parent_this = $(this).parent();
            $(this).hide();
            $(this).next().show();
        return false;
    };
    $('.edit-detail').bind('click',handle_edit);
    handle_save=function(){
        this1=this;
        $(this).parent().siblings().each(function(){
            var value = $(this).html();

            switch($(this).attr('class'))
            {
               case 'product_id':
                    if (value=='0') {
                        $(this).addClass('error-item');
                        $(this).next().addClass('error-item');
                    } else {
                        product_id=value;
                    } 
                    break;
                case 'variant_id':
                    if (value=='0') {
                        $(this).addClass('error-item');
                        $(this).next().addClass('error-item');
                    } else {
                        variant_id = value;
                        all_product.forEach(function(element){
                            if (element.product_id==product_id) {
                                product_name=element.product_name;
                                element.variant.forEach(function(item){
                                    if (item.variant_id==variant_id) {
                                        size_name=item.size_name;
                                        color_name=item.color_name;
                                        color_name_ja=item.color_name_ja;
                                    };
                                });
                                return;
                            };
                        });
                    }
                    break;
                case 'item_number':
                    item_number = $(this).children('.input-number').val();
                    if(/^[0-9]+$/.test(item_number)&&parseInt(item_number)>0){
                        $(this).removeClass('error-item');
                    } else {
                        $(this).addClass('error-item');
                    }
                    break;
            }
        });
        if (!$(this1).hasClass('can-not-save')) {
            ojb_change = $(this1).parent().parent();
            var check_edit = 0;
            if($(this1).next().attr('data-product-id') != product_id) check_edit=1;
            if($(this1).next().attr('data-variant-id')!=variant_id) check_edit=1;
            if($(this1).next().attr('data-item-number')!=item_number) check_edit=1;
            if(check_edit){
                variant_id_old = $(this1).next().attr('data-variant-id');
                var datas = 'variant_id='+variant_id+'&variant_id_old='+variant_id_old+'&item_number='+item_number;
                $.ajax({
                  url: '/supplies/'+supply_id,
                  type: 'PUT',
                  data: datas,
                  success: function(data) {
                    if (data=='success') {
                        $(this1).next().attr('data-product-id',product_id);
                        $(this1).next().attr('data-product-name',product_name);
                        $(this1).next().attr('data-variant-id',variant_id);
                        $(this1).next().attr('data-size-name',size_name);
                        $(this1).next().attr('data-color-name',color_name_ja);
                        $(this1).next().attr('data-item-number',item_number);

                        ojb_change.find('.product_id').html(product_id);
                        ojb_change.find('.product_name').html(product_name);
                        ojb_change.find('.variant_id').html(variant_id);
                        ojb_change.find('.sizes_name').html(size_name);
                        ojb_change.find('.sizes_name').attr('colspan','1');
                        ojb_change.find('.sizes_name').attr('align','');
                        ojb_change.find('.sizes_name').after('<td class="color_name"></td>');
                        ojb_change.find('.color_name').html(color_name_ja);
                        ojb_change.find('.item_number').html(item_number);
                        ojb_change.find('.save-detail').hide();
                        ojb_change.find('.edit-detail').show();
                        // alert(data);
                    };
                  }
                });
                // alert(datas);
            }
            else{
                ojb_change.find('.product_id').html(product_id);
                ojb_change.find('.product_name').html(product_name);
                ojb_change.find('.variant_id').html(variant_id);
                ojb_change.find('.sizes_name').html(size_name);
                ojb_change.find('.sizes_name').attr('colspan','1');
                ojb_change.find('.sizes_name').attr('align','');
                ojb_change.find('.sizes_name').after('<td class="color_name"></td>');
                ojb_change.find('.color_name').html(color_name_ja);
                ojb_change.find('.item_number').html(item_number);
                ojb_change.find('.save-detail').hide();
                ojb_change.find('.edit-detail').show();
            }
        }
        return false;
    };
    $('.save-detail').bind('click',handle_save);
    handle_delete_old = function(){
        var product_id = $(this).attr('data-product-id');
        var variant_id = $(this).attr('data-variant-id');
        var item_number = $(this).attr('data-item-number');
        var datas = 'variant_id='+variant_id;
        this1 = this;
        $.ajax({
          url: '/supplies/'+supply_id,
          type: 'DELETE',
          data: datas,
          success: function(data) {
            if (data=='success') {
                $(this1).parents('tr').remove(); 
            };
          }
        });
        // alert(datas);
        return false;
    };
    $('.delete-detail').click(function(){
        var product_id = $(this).attr('data-product-id');
        var variant_id = $(this).attr('data-variant-id');
        var item_number = $(this).attr('data-item-number');
        var datas = 'variant_id='+variant_id;
        this1 = this;
        $.ajax({
          url: '/supplies/'+supply_id,
          type: 'DELETE',
          data: datas,
          success: function(data) {
            if (data=='success') {
                $(this1).parents('tr').remove(); 
            };
          }
        });
        // alert(datas);
        return false;
    });

    $('#add-item').click(function(){
        $('#table-info').attr('style','');
        $('.no-data').attr('style','display:none');
        $('#body-table').prepend('<tr class="odd">\
                                    <td class="product_id error-item">0</td>\
                                    <td class="product_name error-item"><input type="text" class="input-product-name typeahead""  style="background-color: white;"></td>\
                                    <td class="variant_id error-item">0</td>\
                                    <td class="sizes_name error-item" colspan="2" align="center">\
                                         <select class="form-control select-option" style="height: inherit;width: inherit;padding: 0px 15px;">\
                                           <option>Size - Color</option>\
                                        </select>\
                                    </td>\
                                    <td class="item_number error-item">\
                                        <input type="number" class="input-number" name="quantity" min="1" placeholder="Item Number" value="0">\
                                    </td>\
                                            <td class="" align="center">\
                                            <button class="btn btn-primary btn-sm edit-detail" style="padding: 0px 20px; display: none;" action="edit">Edit</button>\
                                            <button class="btn  btn-sm add-detail can-not-add" style="padding: 0px 20px;" action="save">Add</button>\
                                            <button class="btn btn-danger btn-sm delete-detail-new" style="padding: 0px 18px;margin-left: 20px;">Delete</button>\
                                    </td>\
                                </tr>');
        // value_product_name ='';
        $('.edit-detail').unbind('click');
        $('.edit-detail').bind('click',handle_edit);
        $('.add-detail').click(function(){
            if(!$(this).hasClass('can-not-add')){
                ojb_change = $(this).parents('tr');
                this1 = this;
                product_id = ojb_change.find('.product_id').html();
                variant_id = ojb_change.find('.variant_id').html();
                item_number = ojb_change.find('.item_number').children().val();
                all_product.forEach(function(element){
                    if (element.product_id==product_id) {
                        product_name=element.product_name;
                        element.variant.forEach(function(item){
                            if (item.variant_id==variant_id) {
                                size_name=item.size_name;
                                color_name=item.color_name;
                                color_name_ja=item.color_name_ja;
                            };
                        });
                        return;
                    };
                });
                var datas = 'variant_id='+variant_id+'&item_number='+item_number;
                $.ajax({
                  url: '/supplies/'+supply_id,
                  type: 'PUT',
                  data: datas,
                  success: function(data) {
                    if (data=='success') {
                        $(this1).next().attr('data-product-id',product_id);
                        $(this1).next().attr('data-product-name',product_name);
                        $(this1).next().attr('data-variant-id',variant_id);
                        $(this1).next().attr('data-size-name',size_name);
                        $(this1).next().attr('data-color-name',color_name_ja);
                        $(this1).next().attr('data-item-number',item_number);
                        $(this1).next().addClass('delete-detail');
                        $(this1).next().unbind();
                        $(this1).next().removeClass('delete-detail-new');
                        $(this1).html('Save');

                        ojb_change.find('.product_id').html(product_id);
                        ojb_change.find('.product_name').html(product_name);
                        ojb_change.find('.variant_id').html(variant_id);
                        ojb_change.find('.sizes_name').html(size_name);
                        ojb_change.find('.sizes_name').attr('colspan','1');
                        ojb_change.find('.sizes_name').attr('align','');
                        ojb_change.find('.sizes_name').after('<td class="color_name"></td>');
                        ojb_change.find('.color_name').html(color_name_ja);
                        ojb_change.find('.item_number').html(item_number);
                        ojb_change.find('.add-detail').addClass('save-detail');
                        ojb_change.find('.add-detail').hide();
                        ojb_change.find('.add-detail').unbind();
                        ojb_change.find('.add-detail').removeClass('add-detail');
                        ojb_change.find('.edit-detail').show();

                        $('.delete-detail').bind('click',handle_delete_old);

                        $('.save-detail').unbind('click');
                        $('.save-detail').bind('click',handle_save);
                        // alert(data);
                    };
                  }
                });
            }
        });

        $('.delete-detail-new').click(function(){
            $(this).parents('tr').remove();
        });
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
                    // console.log(ojb_change.prev().html());
                     ojb_change.prev().removeClass('error-item');
                    ojb_change.removeClass('error-item');
                    if (typeof(element.variant)!="undefined") {
                         not_error_variant = 1;
                        ojb_change.next().next().html($('#size-color-select-box').html());
                        ojb_change.next().html(element.variant[0].variant_id);
                        ojb_change.next().next().children().html('');
                        element.variant.forEach(function(tmp){
                            ojb_change.next().next().children().append('<option data-id="'+tmp.variant_id+'">'+tmp.size_name+' - '+tmp.color_name_ja+'</option');
                         });
                        console.log(element.variant);
                    } else {
                         not_error_variant = 0;
                         ojb_change.next().html('0');
                         ojb_change.next().next().html($('#size-color-select-box').html());
                        ojb_change.next().addClass('error-item');
                         ojb_change.next().next().addClass('error-item');
                         ojb_change.parent().find('.add-detail').addClass('can-not-add');
                         ojb_change.parent().find('.add-detail').removeClass('btn-success');
                        // console.log('no data');
                    }
                    if(typeof(not_error_variant)!='undefined'&&not_error_variant==1){
                         ojb_change.next().removeClass('error-item');
                        ojb_change.next().next().removeClass('error-item');
                        if(!ojb_change.parent().find('.item_number').hasClass('error-item')){
                            ojb_change.parent().find('.add-detail').removeClass('can-not-add');
                            ojb_change.parent().find('.add-detail').addClass('btn-success');
                        }
                    }
                    return ;
                }
            });
            $('.select-option').change(function(){
                var variant_id_select = $(this).children(":selected").attr('data-id');
                $(this).parent().prev().html(variant_id_select);   
            });
            return false;
        }).focus(function(){
             value_product_name = $(this).val();
        }).change(function(){
            var product_name = $(this).val();
                value_product_name = product_name;
                // this1 = this;
                ojb_change = $(this).parents('td');
                not_found_id = 1;
                not_error_variant = 0;
                // alert('test');
            all_product.forEach(function(element){
                // alert(product_name);
                if(element.product_name===product_name){
                    not_found_id = 0;
                    // alert('test');
                    // alert($(this1).parent().parent().prev().html());
                    ojb_change.prev().html(element.product_id);
                        if (typeof(element.variant)!="undefined") {
                                not_error_variant = 1;
                                ojb_change.next().next().html($('#size-color-select-box').html());
                                ojb_change.next().html(element.variant[0].variant_id);
                                ojb_change.next().next().children().html('');
                                element.variant.forEach(function(tmp){
                                    ojb_change.next().next().children().append('<option data-id="'+tmp.variant_id+'">'+tmp.size_name+' - '+tmp.color_name_ja+'</option');
                                 });
                            // console.log(element.variant);
                        } else {
                            not_error_variant = 0;
                             ojb_change.next().html('0');
                             ojb_change.next().next().html($('#size-color-select-box').html());
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
                   ojb_change.next().next().html($('#size-color-select-box').html());
                   ojb_change.parent().find('.add-detail').addClass('can-not-add');
                   ojb_change.parent().find('.add-detail').removeClass('btn-success');
            } else {
                    ojb_change.prev().removeClass('error-item');
                    ojb_change.removeClass('error-item');
                    if(typeof(not_error_variant)!='undefined'&&not_error_variant==1){
                         ojb_change.next().removeClass('error-item');
                        ojb_change.next().next().removeClass('error-item');
                        if(!ojb_change.parent().find('.item_number').hasClass('error-item')){
                            ojb_change.parent().find('.add-detail').removeClass('can-not-add');
                            ojb_change.parent().find('.add-detail').addClass('btn-success');
                        }
                    } else{
                             ojb_change.parent().find('.add-detail').addClass('can-not-add');
                             ojb_change.parent().find('.add-detail').removeClass('btn-success');
                    }
            };
            $('.select-option').change(function(){
                var variant_id_select = $(this).children(":selected").attr('data-id');
                $(this).parent().prev().html(variant_id_select); 
                return false;  
            });
           return true;
        }).blur(function(){
            if (typeof(value_product_name) != "undefined") {
                if(value_product_name){
                    $(this).val(value_product_name);
                }
            }else {
                $(this).val('value_product_name');
            };
            return false;
        });
        $('.input-product-name').attr('style','');
        $('.input-number').change(function(){
            number = $(this).val();
            if(/^[0-9]+$/.test(number)&&parseInt(number)>0){
                $(this).parent().removeClass('error-item');
                if ( !$(this).parent().parent().find('.product_id').hasClass('error-item')&& !$(this).parent().parent().find('.variant_id').hasClass('error-item')) {
                    $(this).parent().parent().find('.add-detail').removeClass('can-not-add');
                    $(this).parent().parent().find('.add-detail').addClass('btn-success');
                }
                // $(this).siblings('.fa').hide();
            } else {
                // $(this).siblings('.fa').show();
                $(this).parent().addClass('error-item');
                $(this).parent().parent().find('.add-detail').addClass('can-not-add');
                $(this).parent().parent().find('.add-detail').removeClass('btn-success');
            }
        });
// alert('add');
        return false;
    });

    $('.select-option').change(function(){
        alert('change');
    });

});