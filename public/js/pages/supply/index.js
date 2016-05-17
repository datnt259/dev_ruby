jQuery(document).ready(function() {
    $.ajax({
        url: '/supplies',
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
                    initialData[i] = {supply_id : item.supply_id, date : item.date, item_count : item.item_count, status : item.status};
                }
                ko.applyBindings(new PagedGridModel(initialData));   
                $('table.ko-grid').addClass('table table-hover');
                $('div#product_list tbody tr').bind( 'click', function (e){
                    var string = $(this).find('td:first-child').html();
                    var id = parseInt(string);
                    location.href='/supplies/'+id;
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
                        $('span.product_page.glyphicon-arrow-left').hide();   
                        $('span.product_page.glyphicon-arrow-right').show();     
                    } else if (page == lastPage) {
                        $('span.product_page.glyphicon-arrow-left').show(); 
                        $('span.product_page.glyphicon-arrow-right').hide(); 
                    } else {
                        $('span.product_page.glyphicon-arrow-left').show(); 
                        $('span.product_page.glyphicon-arrow-right').show(); 
                    }
                    if (lastPage == 1) {
                        $('span.product_page.glyphicon-arrow-left').hide(); 
                        $('span.product_page.glyphicon-arrow-right').hide(); 
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
                        location.href='/supplies/'+id;
                    });  
                    if (page == 1) {
                        $('span.product_page.glyphicon-arrow-left').hide();        
                    } else if (page == lastPage) {
                        $('span.product_page.glyphicon-arrow-right').hide(); 
                    } else {
                        $('span.product_page.glyphicon-arrow-left').show(); 
                        $('span.product_page.glyphicon-arrow-right').show(); 
                    }
                    if (lastPage == 1) {
                        $('span.product_page.glyphicon-arrow-left').hide(); 
                        $('span.product_page.glyphicon-arrow-right').hide(); 
                    }
				});
                
                $('#product_list table.ko-grid.table th:first-child').bind( 'click', function (e){
                    var direction = $(this).data('direction');
                    if (direction) {
                        $('#supply_id_asc').click();
                        $(this).data('direction',0)
                    } else {
                        $('#supply_id_desc').click();
                        $(this).data('direction',1)
                    }
                    $('div#product_list tbody tr').bind( 'click', function (e){
                        var string = $(this).find('td:first-child').html();
                        var id = parseInt(string);
                        location.href='/supplies/'+id;
                    });  
                }); 
                
                $('#product_list table.ko-grid.table th:nth-child(2)').bind( 'click', function (e){
                    var direction = $(this).data('direction');
                    if (direction) {
                        $('#supply_date_asc').click();
                        $(this).data('direction',0)
                    } else {
                        $('#supply_date_desc').click();
                        $(this).data('direction',1)
                    }
                    $('div#product_list tbody tr').bind( 'click', function (e){
                        var string = $(this).find('td:first-child').html();
                        var id = parseInt(string);
                        location.href='/supplies/'+id;
                    });  
                });  
                
                $('#product_list table.ko-grid.table th:nth-child(3)').bind( 'click', function (e){
                    var direction = $(this).data('direction');
                    if (direction) {
                        $('#supply_item_count_asc').click();
                        $(this).data('direction',0)
                    } else {
                        $('#supply_item_count_desc').click();
                        $(this).data('direction',1)
                    }
                    $('div#product_list tbody tr').bind( 'click', function (e){
                        var string = $(this).find('td:first-child').html();
                        var id = parseInt(string);
                        location.href='/supplies/'+id;
                    });  
                });
                
                $('#product_list table.ko-grid.table th:nth-child(4)').bind( 'click', function (e){
                    var direction = $(this).data('direction');
                    if (direction) {
                        $('#product_status_asc').click();
                        $(this).data('direction',0)
                    } else {
                        $('#product_status_desc').click();
                        $(this).data('direction',1)
                    }
                    $('div#product_list tbody tr').bind( 'click', function (e){
                        var string = $(this).find('td:first-child').html();
                        var id = parseInt(string);
                        location.href='/supplies/'+id;
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
        this.perPage = 2;
        
        this.sortBySupplyIdAsc = function() {
            this.items.sort(function(a, b) {
                return parseInt(a.supply_id) < parseInt(b.supply_id) ? -1 : 1;
            });
        };
        
        this.sortBySupplyIdDesc = function() {
            this.items.sort(function(a, b) {
                return parseInt(a.supply_id) > parseInt(b.supply_id) ? -1 : 1;
            });
        };
        
        this.sortByDateAsc = function() {
            this.items.sort(function(a, b) {
                return a.date < b.date ? -1 : 1;
            });
        };
        
        this.sortByDateDesc = function() {
            this.items.sort(function(a, b) {
                return a.date > b.date ? -1 : 1;
            });
        };
        
        this.sortByItemCountAsc = function() {
            this.items.sort(function(a, b) {
                return parseInt(a.item_count) < parseInt(b.item_count) ? -1 : 1;
            });
        };
        
        this.sortByItemCountDesc = function() {
            this.items.sort(function(a, b) {
                return parseInt(a.item_count) > parseInt(b.item_count) ? -1 : 1;
            });
        };
        this.sortByStatusAsc = function() {
            this.items.sort(function(a, b) {
                return pa.status > b.status ? -1 : 1;
            });
        };
        
        this.sortByStatusDesc = function() {
            this.items.sort(function(a, b) {
                return a.status > b.status ? -1 : 1;
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
                    location.href='/supplies/'+id;
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
                    location.href='/supplies/'+id;
                });
            } 
        };
        
        this.gridViewModel = new ko.simpleGrid.viewModel({
            data: this.items,
            columns: [
                { headerText: "Supply ID", rowText: "supply_id" },
                { headerText: "Date", rowText: "date" },
                { headerText: "Item Count", rowText: "item_count" },
                { headerText: "Status", rowText: "status" },
                // { headerText: "Stocks", rowText: "stock" }
            ],
            pageSize: 2
        });
    };  
    
    	
});
