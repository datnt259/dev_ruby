jQuery(document).ready(function() {
    $.ajax({
        url: '/customer/admin/user',
        type: 'POST',
        cache: false,
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        success: function(data){
            if (data) {
                var i;
                var initialData = new Array();
                for (i = 0; i < data.length; i++) {
                    var item = data[i];
                    initialData[i] = {id : item.id, name : item.name, category : item.categoryName, brand : item.brandName, stock : item.stock};
                }
                ko.applyBindings(new PagedGridModel(initialData));   
                $('table.ko-grid').addClass('table table-hover');
                var perPage = parseInt($('#record').data('record')) ? parseInt($('#record').data('record')):0;
                if (data.length > perPage) {
                    $('span.product_page.pre_btn').removeClass('hide');
                    $('span.product_page.next_btn').removeClass('hide');
                }
                $('div#product_list tbody tr').bind( 'click', function (e){
                    var string = $(this).find('td:first-child').html();
                    var id = parseInt(string);
                    location.href='/products/'+id;
                });
                
                // Check Location
				if ( document.location.protocol === 'file:' ) {
					alert('The HTML5 History API (and thus History.js) do not work on files, please upload it to a server.');
				}

				// Establish Variables
				var
					State = History.getState(),
					$log = $('#log');
                    var page = 1;
                    if (State.data.state) {
                        page = State.data.state;          
                    }
                    
                    var lastPage = $('div#product_list .ko-grid-pageLinks a:last-child').text();            
                    $a = $('div#product_list .ko-grid-pageLinks a:contains(' + page + ')');
                    $a.click(); 
                    if (page == 1) {
                        $('span.product_page.pre_btn').hide();        
                    } else if (page == lastPage) {
                        $('span.product_page.next_btn').hide(); 
                    } else {
                        $('span.product_page.pre_btn').show(); 
                        $('span.product_page.next_btn').show(); 
                    }
                    if (lastPage == 1) {
                        $('span.product_page.pre_btn').hide(); 
                        $('span.product_page.next_btn').hide(); 
                    }
				// Log Initial State
				History.log('initial:', State.data, State.title, State.url);

				// Bind to State Change
				History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
					// Log the State
					var State = History.getState(); // Note: We are using History.getState() instead of event.state
					History.log('statechange:', State.data, State.title, State.url);
                    //ko.applyBindings(new PagedGridModel(initialData, )); 
                    var page = 1;
                    if (State.data.state) {
                        page = State.data.state;          
                    }
                    
                    var lastPage = $('div#product_list .ko-grid-pageLinks a:last-child').text();
                    $a = $('div#product_list .ko-grid-pageLinks a:contains(' + page + ')');
                    $a.click();
                    $('div#product_list tbody tr').bind( 'click', function (e){
                        var string = $(this).find('td:first-child').html();
                        var id = parseInt(string);
                        location.href='/products/'+id;
                    });  
                    if (page == 1) {
                        $('span.product_page.pre_btn').hide(); 
                        $('span.product_page.next_btn').show();        
                    } else if (page == lastPage) {
                        $('span.product_page.pre_btn').show(); 
                        $('span.product_page.next_btn').hide(); 
                    } else {
                        $('span.product_page.pre_btn').show(); 
                        $('span.product_page.next_btn').show(); 
                    }
                    if (lastPage == 1) {
                        $('span.product_page.pre_btn').hide(); 
                        $('span.product_page.next_btn').hide(); 
                    }
				});
                
                $('#product_list table.ko-grid.table th:first-child').bind( 'click', function (e){
                    var direction = $(this).data('direction');
                    if (direction) {
                        $('#product_id_asc').click();
                        $(this).data('direction',0)
                    } else {
                        $('#product_id_desc').click();
                        $(this).data('direction',1)
                    }
                    $('div#product_list tbody tr').bind( 'click', function (e){
                        var string = $(this).find('td:first-child').html();
                        var id = parseInt(string);
                        location.href='/products/'+id;
                    });  
                }); 
                
                $('#product_list table.ko-grid.table th:nth-child(2)').bind( 'click', function (e){
                    var direction = $(this).data('direction');
                    if (direction) {
                        $('#product_name_asc').click();
                        $(this).data('direction',0)
                    } else {
                        $('#product_name_desc').click();
                        $(this).data('direction',1)
                    }
                    $('div#product_list tbody tr').bind( 'click', function (e){
                        var string = $(this).find('td:first-child').html();
                        var id = parseInt(string);
                        location.href='/products/'+id;
                    });  
                });  
                
                $('#product_list table.ko-grid.table th:nth-child(3)').bind( 'click', function (e){
                    var direction = $(this).data('direction');
                    if (direction) {
                        $('#product_category_asc').click();
                        $(this).data('direction',0)
                    } else {
                        $('#product_category_desc').click();
                        $(this).data('direction',1)
                    }
                    $('div#product_list tbody tr').bind( 'click', function (e){
                        var string = $(this).find('td:first-child').html();
                        var id = parseInt(string);
                        location.href='/products/'+id;
                    });  
                });
                
                $('#product_list table.ko-grid.table th:nth-child(4)').bind( 'click', function (e){
                    var direction = $(this).data('direction');
                    if (direction) {
                        $('#product_band_asc').click();
                        $(this).data('direction',0)
                    } else {
                        $('#product_band_desc').click();
                        $(this).data('direction',1)
                    }
                    $('div#product_list tbody tr').bind( 'click', function (e){
                        var string = $(this).find('td:first-child').html();
                        var id = parseInt(string);
                        location.href='/products/'+id;
                    });  
                });
                
                $('#product_list table.ko-grid.table th:nth-child(5)').bind( 'click', function (e){
                    var direction = $(this).data('direction');
                    if (direction) {
                        $('#product_stock_asc').click();
                        $(this).data('direction',0)
                    } else {
                        $('#product_stock_desc').click();
                        $(this).data('direction',1)
                    }
                    $('div#product_list tbody tr').bind( 'click', function (e){
                        var string = $(this).find('td:first-child').html();
                        var id = parseInt(string);
                        location.href='/products/'+id;
                    });  
                });
            } else {
                $('.no_product').show();
                $('.has_product').hide();        
            }
        }
    });   

    var PagedGridModel = function(items) {
        this.items = ko.observableArray(items);
        this.perPage = parseInt($('#record').data('record'));
 
        this.sortByNameAsc = function() {
            this.items.sort(function(a, b) {
                return a.name < b.name ? -1 : 1;
            });
        };
        
        this.sortByNameDesc = function() {
            this.items.sort(function(a, b) {
                return a.name > b.name ? -1 : 1;
            });
        };
        
        this.sortByIdAsc = function() {
            this.items.sort(function(a, b) {
                return parseInt(a.id) < parseInt(b.id) ? -1 : 1;
            });
        };
        
        this.sortByIdDesc = function() {
            this.items.sort(function(a, b) {
                return parseInt(a.id) > parseInt(b.id) ? -1 : 1;
            });
        };
        
        this.sortByCategoryAsc = function() {
            this.items.sort(function(a, b) {
                return a.category < b.category ? -1 : 1;
            });
        };
        
        this.sortByCategoryDesc = function() {
            this.items.sort(function(a, b) {
                return a.category > b.category ? -1 : 1;
            });
        };
        
        this.sortByBrandAsc = function() {
            this.items.sort(function(a, b) {
                return a.brand < b.brand ? -1 : 1;
            });
        };
        
        this.sortByBrandDesc = function() {
            this.items.sort(function(a, b) {
                return a.brand > b.brand ? -1 : 1;
            });
        };
        this.sortByStockAsc = function() {
            this.items.sort(function(a, b) {
                return parseInt(a.stock) < parseInt(b.stock) ? -1 : 1;
            });
        };
        
        this.sortByStockDesc = function() {
            this.items.sort(function(a, b) {
                return parseInt(a.stock) > parseInt(b.stock) ? -1 : 1;
            });
        };
        
        this.jumpToFirstPage = function() {
            this.gridViewModel.currentPageIndex(0);
        };
        
        this.jumpPage = function(page) {
            alert(page);
            this.gridViewModel.currentPageIndex(page);
        };
        
        this.nextPage = function() {
            if (this.items().length > this.perPage * (this.gridViewModel.currentPageIndex() + 1)) {
                var page = this.gridViewModel.currentPageIndex() + 2;
                History.pushState({state:page,rand:Math.random()}, "Page "+page, "?page="+page);
               // this.gridViewModel.currentPageIndex(this.gridViewModel.currentPageIndex() + 1);
                $('table.ko-grid').addClass('table table-hover');
                $('div#product_list tbody tr').bind( 'click', function (e){
                    var string = $(this).find('td:first-child').html();
                    var id = parseInt(string);
                    location.href='/products/'+id;
                });
            }
        };
        
        this.prevPage = function() {
            if (this.gridViewModel.currentPageIndex() > 0) {
                var page = this.gridViewModel.currentPageIndex();
                History.pushState({state:page,rand:Math.random()}, "Page "+page, "?page="+page);
                //this.gridViewModel.currentPageIndex(this.gridViewModel.currentPageIndex() - 1);
                $('table.ko-grid').addClass('table table-hover');
                $('div#product_list tbody tr').bind( 'click', function (e){
                    var string = $(this).find('td:first-child').html();
                    var id = parseInt(string);
                    location.href='/products/'+id;
                });
            } 
        };
        
        this.gridViewModel = new ko.simpleGrid.viewModel({
            data: this.items,
            columns: [
                { headerText: "Product id", rowText: "id" },
                { headerText: "Name", rowText: "name" },
                { headerText: "Category", rowText: "category" },
                { headerText: "Brand", rowText: "brand" },
                { headerText: "Stocks", rowText: "stock" }
            ],
            pageSize: this.perPage
        });
    };  
    
    	
});
