jQuery(document).ready(function() {
    $('.icheckbox_minimal').css('background','none');
    $('input#chkPrimary').css('opacity', '1');
    $.validator.addMethod("valueNotEquals", function(value, element, arg){
        return arg != value;
    }, "Value must not equal arg.");
    $('.bs-product-modal-lg').on('hidden.bs.modal', function () {
        location.href = '/products';
    })
    $('#slcCategory').change(function(){
        var value= $(this).val();
        $.ajax({
            url: '/products/subcategory',
            type: 'POST',
            cache: false,
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            data: {value:value},
            success: function(data){ 
                if (data.length) {
                    $("#slcSubcategory").empty();
                    var dataStr = '';
                    for (i = 0; i < data.length; i++) {
                        var item = data[i];
                        dataStr += '<option value="' + item.id + '">' + item.name + '</option>';
                    }
                    $("#slcSubcategory").append(dataStr);
                }
            }
        });
    });
    
    $("#btnAddNewVariant").click(function()
    {
		var strVariant = '';
        strVariant += '<tr><td id="variantId"></td>';
        strVariant += '<td id="variantSize" class="text-center"><div><div id="variant_size"></div></div>';
        strVariant += '<div><select class="form-control" name="size[]" id="slcVariantSize">'+ $('select#slcSize').html() +'</select></div></td>';
        strVariant += '<td id="variantColor" class="text-center"><div><div id="variant_color"></div></div>';
        strVariant += '<div><select class="form-control" name="color[]" id="slcVariantColor">'+ $('select#slcColor').html() +'</select></div></td>';
        strVariant += '<td id="variantStock" class="text-center "><div class="hide" id="variant_stock"></div><div><input placeholder="Stock" type="text" class="form-control" id="newVariantStock" /></div></td>';
        strVariant += '<td class="text-center" id="newVariantButton"><div class="col-lg-12">';
        strVariant += '<input type="button" value="Delete" variantid="0" class="btn btn-danger btnDeleteVariant hide" role="button">';
        strVariant += '<input type="button" value="Save" variantid="0" class="btn btn-success btn-mini btnSaveNewVariant" role="button">';
        strVariant += '<input type="button" value="Cancel" variantid="" class="btn btn-warning btn-mini btnCancelNewVariant" role="button"></div>';
        strVariant += '';
        $('#new_variant').append(strVariant);
        SaveNewVariant();
        CancelNewVariant();   
        DeleteVariant();        		
    });
    
    function DeleteVariant()
    {
        $(".btnDeleteVariant").click(function(e)
        {
            this1 = this;
            var row = $(this).closest("tr");
            var isNew = 0;
            if (row.find('#newVariantStock')) {
                 isNew = 1;
            }
            if (confirm("You Really want to delete this variant ?")) {
                var url = '/products/delete/variants' + "/" + parseInt($(this).attr('variantId'));
                $.ajax({
                    url: url,
                    type: 'delete',
                    cache: false,
                    dataType: 'json',
                    data: {'isNew':isNew},
                    success: function(data){
                        if (data) {
    				        //showAlert("#dlgAddnewVariant .alert",false,'Success!','Save data success');
             	            $(this1).closest("tr").remove();
           	            } else {
    						alert("You don not have permission to delete this variant. This does not belong to you or variant's stock more than 1.")
    						//showAlert("#dlgAddnewVariant .alert",true,'Error!',data['error']);
    					}
    				},
                    error: function(xhr, err) {
    					 //showAlert("#dlgAddnewVariant .alert",true,'Error!',formatErrorMessage(xhr, err));
    				}
                });
    		}
    	});
    }
    
    function CancelNewVariant()
    {
        $('.btnCancelNewVariant').click(function(e){ 
            var row = $(this).closest("tr");
            var id = row.find('#variantId').text();
            if (!id) {
                row.remove();
              }
                                        
        });
    }
    
    function SaveNewVariant()
    {
        $('.btnSaveNewVariant').click(function(e){ 
                var row = $(this).closest("tr");
                var param = {'variantId':row.find('#variantId').text(), 'size':row.find('#slcVariantSize').val(), 'colorCategoryId':row.find('#slcVariantColor').val(), 'stock':row.find('#newVariantStock').val() ? row.find('#newVariantStock').val():0, 'statusId':1};
                var url = '/products/' + $('input#txtId').val() + '/variants';
                if (isNumber(param.stock)) {
                $.ajax({
                        url: url,
                        type: 'post',
                        cache: false,
                        dataType: 'json',
                        data: $.param(param),
                        success: function(data){
                            if (data) {
        				        //showAlert("#dlgAddnewVariant .alert",false,'Success!','Save data success');
                                if (row.find('#slcVariantSize option:selected').val()) {
                                    row.find("#variant_size").html( row.find('#slcVariantSize option:selected').text());    
                                } else {
                                    row.find("#variant_size").html('');    
                                }
                 	            if (row.find('#slcVariantColor option:selected').val()) {
                 	                row.find("#variant_color").html( row.find('#slcVariantColor option:selected').text());  
                 	            } else {
                 	                row.find("#variant_color").html('');   
                 	            }
                                
                                row.find("#variant_stock").html(data.stock);
                                row.find("#variantId").html( data.id);
                                row.closest("tr").find('#variant_size, #variant_color, #variant_stock').parent().removeClass('hide');   
                                row.find('.btnDeleteVariant').removeClass('hide'); 
                                row.find('.btnDeleteVariant').attr('variantid', data.id);
                                row.find('#variant_stock').removeClass('hide');  
                                row.closest("tr").find('#slcVariantSize, #slcVariantColor, .btnCancelVariant, .btnSaveVariant, #newVariantStock, .btnSaveNewVariant, .btnCancelNewVariant').addClass('hide'); 
                                row.closest("tr").find('td#newVariantButton').append('<input type="button" value="Edit" variantid="'+ data.id +'" class="btn btn-primary btn-mini btnEditVariant" role="button">')
                                row.closest("tr").find('td#newVariantButton').append('<input type="button" value="Save" variantid="'+ data.id +'" class="btn btn-primary btn-mini btnSaveVariant hide" role="button">')
                                row.closest("tr").find('td#newVariantButton').append('<input type="button" value="Cancel" variantid="'+ data.id +'" class="btn btn-primary btn-mini btnCancelVariant hide" role="button">')
                                row.closest("tr").find('.btnEditVariant').insertBefore(row.closest("tr").find('.btnDeleteVariant')) ;
                                row.closest("tr").find('.btnSaveVariant').insertBefore(row.closest("tr").find('.btnDeleteVariant')) ;
                                row.closest("tr").find('.btnCancelVariant').insertBefore(row.closest("tr").find('.btnDeleteVariant')) ;
                                EditVariant();
                                CancelVariant();
                                SaveVariant();
                                
               	            } else {
        						alert("You don not have permission to add this variant. This does not belong to you or variant's stock more than 1.")
        						//showAlert("#dlgAddnewVariant .alert",true,'Error!',data['error']);
        					}
        				},
                        error: function(xhr, err) {
        					 //showAlert("#dlgAddnewVariant .alert",true,'Error!',formatErrorMessage(xhr, err));
        				}
                    });
                } else {
                    row.find('#newVariantStock').focus();
                }
           	});
    } 
       
    function EditVariant()
    {
        $(".btnEditVariant").click(function(e){
    	    var edit = this;
            var row = $(edit).closest("tr");
            $(edit).closest("tr").find('#variant_size, #variant_color').parent().addClass('hide');   
            $(edit).addClass('hide');   
            $(edit).closest("tr").find('#slcVariantSize, #slcVariantColor, .btnCancelVariant, .btnSaveVariant').removeClass('hide'); 
        });    
    }
    
    function CancelVariant()
    {
        $(".btnCancelVariant").click(function(e){
            var cancel = this;
            $(cancel).closest("tr").find('#variant_size, #variant_color').parent().removeClass('hide');      
            $(cancel).closest("tr").find('#slcVariantSize, #slcVariantColor, .btnCancelVariant, .btnSaveVariant').addClass('hide'); 
            $(cancel).closest("tr").find('.btnEditVariant').removeClass('hide'); 
        });    
    }   
	
    function SaveVariant()
    {
        $(".btnSaveVariant").click(function(e){ 
            var edit =  $(this).closest("tr").find('.btnEditVariant');
            var row = $(this).closest("tr");
            var param = {'variantId':row.find('#variantId').text(), 'size':row.find('#slcVariantSize').val(), 'color':row.find('#slcVariantColor').val()};
            var url = '/products/' + $('input#txtId').val() + '/variants/' + param.variantId;
            $.ajax({
                    url: url,
                    type: 'patch',
                    cache: false,
                    dataType: 'json',
                    data: $.param(param),
                    success: function(data){
                        if (data) {
    				        //showAlert("#dlgAddnewVariant .alert",false,'Success!','Save data success');
                            if (row.find('#slcVariantSize option:selected').val()) {
                                row.find("#variant_size").html( row.find('#slcVariantSize option:selected').text());    
                            } else {
                                row.find("#variant_size").html('');
                            }
             	            if (row.find('#slcVariantColor option:selected').val()) {
             	                row.find("#variant_color").html( row.find('#slcVariantColor option:selected').text());    
             	            } else {
             	                row.find("#variant_color").html(''); 
             	            }  
                            
                            $(edit).closest("tr").find('#variant_size, #variant_color').parent().removeClass('hide');   
                            $(edit).removeClass('hide');   
                            $(edit).closest("tr").find('#slcVariantSize, #slcVariantColor, .btnCancelVariant, .btnSaveVariant').addClass('hide'); 
            
           	            } else {
    						alert("You don not have permission to edit this variant. This does not belong to you or variant's stock more than 1.")
    						//showAlert("#dlgAddnewVariant .alert",true,'Error!',data['error']);
    					}
    				},
                    error: function(xhr, err) {
    					 //showAlert("#dlgAddnewVariant .alert",true,'Error!',formatErrorMessage(xhr, err));
    				}
                });
            
    	});
     }
     
    $("#form-variant").validate({
    	rules:{
    		stock:{
    			required:true,
    			number: true,
                digits: true
    		},
            status: { valueNotEquals: "" }
    	},
    	messages:{
    		stock:{
    			required:"Please fill out stock field",
    			number:"Stock must be digits",
    		},
            status: { valueNotEquals: "Please select variant status!" }
    	},
        submitHandler: function() {
            var productId = 0;  
            var productCode = 0;           
            productId = $('#txtId').val() ? $('#txtId').val(): 0;
            productCode = $('#txtCode').val() ? $('#txtCode').val()  : 0;
              
					var param = {'productId':productId,'variantId':$("#hdnVariantId").val(),'productCode':productCode,'sizeName':$('#slcSize option:checked').text(),
							'description': $("#txtVariantDescription").val(),'stock':$("#txtStock").val(),'statusId':$("#slcStatus").val(),'colorName':$('#slcColor option:checked').text(),
							'primary':($("#chkPrimary").is(':checked')?"1":"0"),'size':$("#slcSize").val(),'colorCategoryId':$("#slcColor").val()};
                    var method = $('#hdnVariantId').val()=='' ? 'post' : 'patch';
					var url = $('#hdnVariantId').val()=='' ? '/products/' + productId + '/variants' : '/products/' + productId + '/variants' + '/' + $("#hdnVariantId").val();

                    $.ajax({
                               url: url,
                               type: method,
                               cache: false,
                               contentType: 'application/x-www-form-urlencoded',
                               dataType: 'json',
                               data: $.param(param),
                               success: function(data){
                                   $('#dlgAddnewVariant').modal('hide');
                                   $('#dlgAddnewVariant').removeData();
                                   var tbodyVariant;
						           if(data)
						           {
						           	   if($('#hdnVariantId').val()=='')
						           	   {
								           //showAlert("#dlgAddnewVariant .alert",false,'Success!','Save data success');
								           tbodyVariant = "<tr><td>" + data['id'] + "</td>";
								           tbodyVariant += "<td>" + data['sizeName'] + "</td>";
								           tbodyVariant += "<td>" + data['colorName'] + "</td>";
								           tbodyVariant += "<td>" + data['stock'] + "</td>";
								           tbodyVariant += "<td class='text-center'><input type='button' value='Delete' variantId='" + data['id'] + "' class='btn btn-danger btnDeleteVariant' role='button'>";
										   tbodyVariant += "<input type='button' value='View' variantId='" + data['id'] + "'' class='btn btn-primary btn-mini btnViewVariant' role='button'></td></tr>";
								           //tbodyVariant += $('#new_variant').html();
								           $('#new_variant').append(tbodyVariant);
                                           deleteVariant();
								       }
								       else
								       {
								       		var tr = $('#new_variant input[variantid="' + $('#hdnVariantId').val() + '"]').parent().parent();
								       		tr.find('td').eq(0).html(data['id']);
								       		tr.find('td').eq(1).html(data['sizeName']);
								       		tr.find('td').eq(2).html(data['colorName']);
								       		tr.find('td').eq(3).html(data['stock']);
								       }
							           $('#dlgAddnewVariant').modal('hide');
									   viewVariant();
						           }
						           else
						           {
							           //showAlert("#dlgAddnewVariant .alert",true,'Error!',data['error']);
						           }
					           },
                               error: function(xhr, err) {
						           //showAlert("#dlgAddnewVariant .alert",true,'Error!',formatErrorMessage(xhr, err));
					           }
                           });
				}
    });
    
     $("#form-product").validate({
    	rules:{
    		name:{
    			required:true
    		} 
    	},
    	messages:{
    		name:{
    			required:"Please fill out product's name field"
    		}
    	},
        submitHandler: function() {
            var total = 0;
            var isInt = true;
            var materials = [];
            var select = $('#material_list #material_value');
            $.each (select, function(key,opt) {
                if (!isNumber($(opt).val())) {
                    isInt = false;
                }
                if (parseInt($(opt).val())) {
                    total += parseInt($(opt).val());
                    materials[$(opt).data('id')] = $(opt).val();
                }
            });
            if (total > 100) {
                $('#material_error').html('Total materials must be less than or equal 100%');
                $('#material_error').show();
            } else if (!isInt) {
                $('#material_error').html("Material's ratio must be integer");
                $('#material_error').show();
            } else {
                $('#material_error').hide();
                var images = [];
					$('.imageId').each(function(){
						images.push($(this).val());
					});
					var variants = [];
					$('.btnDeleteVariant').each(function(){
						variants.push($(this).attr('variantId'));
					});

					$('button#btnProductSave').attr("disabled", true);
					var param = {'id': $("#txtId").val(),'name':$("#name").val(),'category_id':$("#slcCategory").val(),
							'subcategory_id':$("#slcSubcategory").val(), 'materials':materials,
							'brand_id':$("#slcBrand").val(),'images':images,'variants':variants};   
                    $.ajax({
                        url: '/products/add',
                        type: 'POST',
                        cache: false,
                        dataType: 'json',
                        data: $.param(param),
                        success: function(data){
                            if (data) {
                                $('.bs-product-modal-lg').modal('show');
                            }
                        },
                        error: function(xhr, err) {
					               //showAlert("#dlgAddnewVariant .alert",true,'Error!',formatErrorMessage(xhr, err));
                        }
                    });
                    
            }
         
        }
    });
    
    function deleteVariant()
		{
			$("#new_variant tr:last-child .btnDeleteVariant").click(function(e){
				this1 = this;
				if(confirm("You Really want to delete this variant ?"))
				{
					var url = '/products/delete/variants' + "/" + parseInt($(this).attr('variantId'));
                    $.ajax({
                               url: url,
                               type: 'delete',
                               cache: false,
                               dataType: 'json',
                               data: null,
                               success: function(data){
						           if(data)
									{
										//showAlert("#dlgAddnewVariant .alert",false,'Success!','Save data success');
							           	$(this1).closest("tr").remove();
							       	}
							       	else
									{
									   alert('This variant does not exist or does not belong to you ')
										//showAlert("#dlgAddnewVariant .alert",true,'Error!',data['error']);
									}
					           },
                               error: function(xhr, err) {
					               //showAlert("#dlgAddnewVariant .alert",true,'Error!',formatErrorMessage(xhr, err));
					           }
                           });
				}
			});
		};
        
        		function viewVariant()
		{
			$(".btnViewVariant").click(function(e)
			{
				e.preventDefault();
				$("#dlgAddnewVariant .btnEdit , #dlgAddnewVariant label.data").removeClass('hide');
				$('#dlgAddnewVariant').find('input:text,input[type=number], input:password, input:file, select, textarea,input:radio, input:checkbox, #btnVariantSave,.alert,.multiselect,#dlgAddnewVariant .view').addClass('hide');
				$("#dlgAddnewVariant .modal-title").html("Show detail");
                var productId = 0;
				var url = '/products/' + productId + '/variants' + "/" + parseInt($(this).attr('variantId'));
				$.get(url,function(data){
					$("#hdnVariantId").val(data['id']);
					//$("#slcSize").val(data['prices']);
					$("#txtStock").val(data['stock']);
					$("#chkPrimary").val(data['primary']);
					$("#txtVariantStatus").val(data['status_id']);
					$("#txtVariantDescription").val(data['description']);
					$('#slcSize').find('option[value=' + data['size_id'] + ']').attr('selected','selected');
                    $('#slcColor').find('option[value=' + data['color_category_id'] + ']').attr('selected','selected');
					$('#lblSize').text($('#slcSize').find('option[value=' + data['size_id'] + ']').text());
                    $('#lblColorCategory').text($('#slcColor').find('option[value=' + data['color_category_id'] + ']').text());
                    
					$("#lblStock").html(data['stock']);
					$("#lblPrimary").html(data['primary']);
					//$('#lblSize').html($('#slcSize').parent().find('.multiselect').attr('title'));
					$('#dlgAddnewVariant .view').addClass('hide');
					$("#lblVariantStatus").html(data['status_id']);
					$("#lblVariantDescription").html(data['description']);
					$('#dlgAddnewVariant').modal({'keyboard':true,'show':true,'backdrop':'static'});
				}).fail(function(xhr, err) {
					//showAlert("#dlgAddnewVariant .alert",true,'Error!',formatErrorMessage(xhr, err));
				});
			});
		};
        
        $(".btnEdit").click(function()
			{
				$("#dlgAddnewVariant .modal-title").html("Edit");
				$('#dlgAddnewVariant').find('input:text,input[type=number], input:password, input:file, select, textarea,input:radio, input:checkbox,#btnVariantSave,.multiselect,.view').removeClass('hide');
				$("#dlgAddnewVariant .btnEdit , #dlgAddnewVariant label.data,#dlgAddnewVariant .alert,#dlgAddnewVariant input.key").addClass('hide');
				$("#dlgAddnewVariant label.key").removeClass('hide');
			});
    $('#product-dropzone').on('drop', function(event) {
				var image = event.originalEvent.dataTransfer.files[0];
				if(image==undefined)
					return false;
				var arrExtension = [".jpg", ".jpeg", ".bmp", ".gif", ".png"]
				var extension = image.name.substr(image.name.lastIndexOf('.')).toLowerCase();
				if(arrExtension.indexOf(extension)<0)
				{
					alert("#alertImage",true,'Error!','Invalid file Format. Only ' + arrExtension.join(', ') + ' are allowed.');
					return false;
				}

				var formData = new FormData();
				formData.append('image', image);
				formData.append('image_type_id',$('#slcImageType').val());
				if($('#txtId').val()!='')
					formData.append('product_id',$('#txtId').val());
				else
					formData.append('product_id',0);
				if($('#slcImageType').val()=='')
				{
					alert('The image type is required');
				}
				else
				{
					$.ajax('/images/store', {
    					processData: false,
    					contentType: false,
    					type: "POST",
    					data: formData
					}).done(function(data){
						if(!data['error'])
						{
							var html = $("#lstProductImage").html();
							html += '<div class="col-lg-3">';
							html += '<span style="position:relative;"><img  style="max-width:90%; max-height:100px;" src="'+data['uri']+'" />';
							html += '<span class="view iconDeleteImage glyphicon glyphicon-remove" onclick="deleteImage(this,'+data['id']+')"></span></span>';
							html += '<input type="hidden" class="imageId" value="'+ data['id'] +'"></div>';
							$("#lstProductImage").html(html);
							alert('Upload image success');
						}
						else
						{
							alert(data['error']);
						}
					}).fail(function(xhr, err) {
						alert(formatErrorMessage(xhr, err));
					});
				}
		        return false;
			}).on('dragleave', function(event) {
			    $('#product-dropzone').toggleClass("dragging");
		        return false;
			}).on('dragover', function(event) {
		        return false;
			}).on('dragenter', function(event) {
			    $('#product-dropzone').toggleClass("dragging");
		        return false;
			});
   $('#slcMaterials option').bind( 'click', function (e){
       $('#material_list').empty();
       var select = $('#slcMaterials option:selected');
       $.each(select, function(key,opt){
             $('#material_list').append('<div class="row"><div class="col-md-4"><div class="option_'+ $(opt).val() +'">'+ $(opt).text() +' : </div></div><div class="col-md-3"><input class="form-control" data-id="'+ $(opt).val() +'" name="material_value" type="text" id="material_value" ></div><div class="col-md-1">%</div></div>');
       });
       $('#material_list').append('<label id="material_error" class="error"></label>');
         
         /*
       if ($(this).is(':selected')) {
            $('#material_list').append('<div class="'+ $(this).text() +'">'+ $(this).text() +'</div>');
       } else {
            $('#material_list').find('.'+$(this).text()).remove();
       }  
       */
   });

});
function deleteImage(el,id)
{
    if(confirm("You Really want to delete this image ?"))
    {
        var url = '/images' + "/" + id;
        $.ajax({
            url: url,
            type: 'delete',
            cache: false,
            dataType: 'json',
            data: null,
            success: function(data){
                if(!data['error'])
				{
				    alert('Delete image success');
      		        $(el).parent().parent().remove();
       	        }
       	        else
				{
				    alert(data['error']);
				}
            },
            error: function(xhr, err) {
                alert(formatErrorMessage(xhr, err));
            }
        });
    }
};

function isNumber(data)
{
    if (data == parseInt(data))
        return true;
    else
        return false;
}