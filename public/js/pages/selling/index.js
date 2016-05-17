jQuery(document).ready(function() {
    $.ajax({
        url: '/sellings',
        type: 'POST',
        cache: false,
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        success: function(data){
            if (data.length) {
                var i;
                var initialData = new Array();
                for (i = 0; i < data.length; i++) {
                    var item = data[i];
                    initialData[i] = {time : item.sold_time, product_id : item.product_id, product_name : item.product_name, size : item.size_name, stock : item.stock, color : item.color_name, price : item.total_price};
                }
                ko.applyBindings(new PagedGridModel(initialData));   
                $('table.ko-grid').addClass('table table-hover');
                var perPage = parseInt($('#record').data('record')) ? parseInt($('#record').data('record')):0;
                if (data.length > perPage) {
                    $('span.selling_log_page.pre_btn').removeClass('hide');
                    $('span.selling_log_page.next_btn').removeClass('hide');
                }
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
                    
                    var lastPage = $('div#selling-log-list .ko-grid-pageLinks a:last-child').text();            
                    $a = $('div#selling-log-list .ko-grid-pageLinks a:contains(' + page + ')');
                    $a.click(); 
                    if (page == 1) {
                        $('span.selling_log_page.pre_btn').hide();  
                        $('span.selling_log_page.next_btn').show();       
                    } else if (page == lastPage) {
                        $('span.selling_log_page.pre_btn').show(); 
                        $('span.selling_log_page.next_btn').hide(); 
                    } else {
                        $('span.selling_log_page.pre_btn').show(); 
                        $('span.selling_log_page.next_btn').show(); 
                    }
                    if (lastPage == 1) {
                        $('span.selling_log_page.pre_btn').hide(); 
                        $('span.selling_log_page.next_btn').hide(); 
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
                    
                    var lastPage = $('div#selling-log-list .ko-grid-pageLinks a:last-child').text();
                    $a = $('div#selling-log-list .ko-grid-pageLinks a:contains(' + page + ')');
                    $a.click(); 
                    if (page == 1) {
                        $('span.selling_log_page.pre_btn').hide();  
                        $('span.selling_log_page.next_btn').show();       
                    } else if (page == lastPage) {
                        $('span.selling_log_page.pre_btn').show();
                        $('span.selling_log_page.next_btn').hide(); 
                    } else {
                        $('span.selling_log_page.pre_btn').show(); 
                        $('span.selling_log_page.next_btn').show(); 
                    }
                    if (lastPage == 1) {
                        $('span.selling_log_page.pre_btn').hide(); 
                        $('span.selling_log_page.next_btn').hide(); 
                    }
				});
                
                $('#selling-log-list table.ko-grid.table th:first-child').bind( 'click', function (e){
                    var direction = $(this).data('direction');
                    if (direction) {
                        $('#selling-log-date-desc').click();
                        $(this).data('direction',0);
                    } else {
                        $('#selling-log-date-asc').click();
                        $(this).data('direction',1);
                        
                    }  
                }); 
                
                $('#selling-log-list table.ko-grid.table th:nth-child(2)').bind( 'click', function (e){
                    var direction = $(this).data('direction');
                    if (direction) {
                        $('#selling-log-productid-asc').click();
                        $(this).data('direction',0)
                    } else {
                        $('#selling-log-productid-desc').click();
                        $(this).data('direction',1)
                    }
                });  
                
                $('#selling-log-list table.ko-grid.table th:nth-child(3)').bind( 'click', function (e){
                    var direction = $(this).data('direction');
                    if (direction) {
                        $('#selling-log-productname-asc').click();
                        $(this).data('direction',0)
                    } else {
                        $('#selling-log-productname-desc').click();
                        $(this).data('direction',1)
                    }  
                });
                
                $('#selling-log-list table.ko-grid.table th:nth-child(6)').bind( 'click', function (e){
                    var direction = $(this).data('direction');
                    if (direction) {
                        $('#selling-log-number-asc').click();
                        $(this).data('direction',0)
                    } else {
                        $('#selling-log-number-desc').click();
                        $(this).data('direction',1)
                    } 
                });
                
                $('#selling-log-list table.ko-grid.table th:nth-child(7)').bind( 'click', function (e){
                    var direction = $(this).data('direction');
                    if (direction) {
                        $('#selling-log-price-asc').click();
                        $(this).data('direction',0)
                    } else {
                        $('#selling-log-price-desc').click();
                        $(this).data('direction',1)
                    } 
                });
            } else {
                $('.no_log').show();
                $('.has_log').hide();        
            }
        }
    });   

    var PagedGridModel = function(items) {
        this.items = ko.observableArray(items);
        this.perPage = parseInt($('#record').data('record'));
 
        this.sortByProductIdAsc = function() {
            this.items.sort(function(a, b) {
                return parseInt(a.product_id) < (b.product_id) ? -1 : 1;
            });
        };
        
        this.sortByProductIdDesc = function() {
            this.items.sort(function(a, b) {
                console.log(a.product_id);
                return (a.product_id) > (b.product_id) ? -1 : 1;
            });
        };
        
        this.sortByDateAsc = function() {
            this.items.sort(function(a, b) {
                return a.time < b.time ? -1 : 1;
            });
        };
        
        this.sortByDateDesc = function() {
            this.items.sort(function(a, b) {
                return a.time > b.time ? -1 : 1;
            });
        };
        
        this.sortByProductNameAsc = function() {
            this.items.sort(function(a, b) {
                return a.product_name < b.product_name ? -1 : 1;
            });
        };
        
        this.sortByProductNameDesc = function() {
            this.items.sort(function(a, b) {
                return a.product_name > b.product_name ? -1 : 1;
            });
        };
        
        this.sortByNumberAsc = function() {
            this.items.sort(function(a, b) {
                return parseInt(a.stock) < parseInt(b.stock) ? -1 : 1;
            });
        };
        
        this.sortByNumberDesc = function() {
            this.items.sort(function(a, b) {
                return parseInt(a.stock) > parseInt(b.stock) ? -1 : 1;
            });
        };
        this.sortByPriceAsc = function() {
            this.items.sort(function(a, b) {
                return parseInt(a.price) < parseInt(b.price) ? -1 : 1;
            });
        };
        
        this.sortByPriceDesc = function() {
            this.items.sort(function(a, b) {
                return parseInt(a.price) > parseInt(b.price) ? -1 : 1;
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
            }
        };
        
        this.prevPage = function() {
            if (this.gridViewModel.currentPageIndex() > 0) {
                var page = this.gridViewModel.currentPageIndex();
                History.pushState({state:page,rand:Math.random()}, "Page "+page, "?page="+page);
                //this.gridViewModel.currentPageIndex(this.gridViewModel.currentPageIndex() - 1);
                $('table.ko-grid').addClass('table table-hover');
            } 
        };
        
        this.gridViewModel = new ko.simpleGrid.viewModel({
            data: this.items,
            columns: [
                { headerText: "DateTime", rowText: "time" },
                { headerText: "ProductID", rowText: "product_id" },
                { headerText: "ProductName", rowText: "product_name" },
                { headerText: "Size", rowText: "size" },
                { headerText: "Color", rowText: "color" },
                { headerText: "ItemNumber", rowText: "stock" },
                { headerText: "Price", rowText: "price" }
            ],
            pageSize: this.perPage
        });
    };     	
});
