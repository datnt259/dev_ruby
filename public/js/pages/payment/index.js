jQuery(document).ready(function() {
    $.ajax({
        url: '/payments',
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
                    initialData[i] = {id : item.id, amount : item.amount, operation_date : item.payed_at, request_date : item.created_at};
                }
                ko.applyBindings(new PagedGridModel(initialData));   
                $('table.ko-grid').addClass('table table-hover');
                var perPage = parseInt($('#record').data('record')) ? parseInt($('#record').data('record')):0;
                if (data.length > perPage) {
                    $('span.payment_log_page.pre_btn').removeClass('hide');
                    $('span.payment_log_page.next_btn').removeClass('hide');
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
                    
                    var lastPage = $('div#payment-log-list .ko-grid-pageLinks a:last-child').text();            
                    $a = $('div#payment-log-list .ko-grid-pageLinks a:contains(' + page + ')');
                    $a.click(); 
                    if (page == 1) {
                        $('span.payment_log_page.pre_btn').hide();  
                        $('span.payment_log_page.next_btn').show();       
                    } else if (page == lastPage) {
                        $('span.payment_log_page.pre_btn').show(); 
                        $('span.payment_log_page.next_btn').hide(); 
                    } else {
                        $('span.payment_log_page.pre_btn').show(); 
                        $('span.payment_log_page.next_btn').show(); 
                    }
                    if (lastPage == 1) {
                        $('span.payment_log_page.pre_btn').hide(); 
                        $('span.payment_log_page.next_btn').hide(); 
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
                    
                    var lastPage = $('div#payment-log-list .ko-grid-pageLinks a:last-child').text();
                    $a = $('div#payment-log-list .ko-grid-pageLinks a:contains(' + page + ')');
                    $a.click(); 
                    if (page == 1) {
                        $('span.payment_log_page.pre_btn').hide();  
                        $('span.payment_log_page.next_btn').show();       
                    } else if (page == lastPage) {
                        $('span.payment_log_page.pre_btn').show();
                        $('span.payment_log_page.next_btn').hide(); 
                    } else {
                        $('span.payment_log_page.pre_btn').show(); 
                        $('span.payment_log_page.next_btn').show(); 
                    }
                    if (lastPage == 1) {
                        $('span.payment_log_page.pre_btn').hide(); 
                        $('span.payment_log_page.next_btn').hide(); 
                    }
				});
                
                $('#payment-log-list table.ko-grid.table th:first-child').bind( 'click', function (e){
                    var direction = $(this).data('direction');
                    if (direction) {
                        $('#payment-log-id-asc').click();
                        $(this).data('direction',0);
                    } else {
                        $('#payment-log-id-desc').click();
                        $(this).data('direction',1);
                        
                    }  
                }); 
                
                $('#payment-log-list table.ko-grid.table th:nth-child(2)').bind( 'click', function (e){
                    var direction = $(this).data('direction');
                    if (direction) {
                        $('#payment-log-amount-asc').click();
                        $(this).data('direction',0)
                    } else {
                        $('#payment-log-amount-desc').click();
                        $(this).data('direction',1)
                    }
                });  
                
                $('#payment-log-list table.ko-grid.table th:nth-child(3)').bind( 'click', function (e){
                    var direction = $(this).data('direction');
                    if (direction) {
                        $('#payment-log-request-asc').click();
                        $(this).data('direction',0)
                    } else {
                        $('#payment-log-request-desc').click();
                        $(this).data('direction',1)
                    }  
                });
                
                $('#payment-log-list table.ko-grid.table th:nth-child(4)').bind( 'click', function (e){
                    var direction = $(this).data('direction');
                    if (direction) {
                        $('#payment-log-operation-desc').click();
                        $(this).data('direction',0)
                    } else {
                        $('#payment-log-operation-asc').click();
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
        
        this.sortByAmountAsc = function() {
            this.items.sort(function(a, b) {
                return a.amount < b.amount ? -1 : 1;
            });
        };
        
        this.sortByAmountDesc = function() {
            this.items.sort(function(a, b) {
                return a.amount > b.amount ? -1 : 1;
            });
        };
        
        this.sortByRequestAsc = function() {
            this.items.sort(function(a, b) {
                return a.request_date < b.request ? -1 : 1;
            });
        };
        
        this.sortByRequestDesc = function() {
            this.items.sort(function(a, b) {
                return a.request > b.request ? -1 : 1;
            });
        };
        
        this.sortByOperationAsc = function() {
            this.items.sort(function(a, b) {
                return a.operation_date < b.operation_date ? -1 : 1;
            });
        };
        
        this.sortByOperationDesc = function() {
            this.items.sort(function(a, b) {
                return a.operation_date > b.operation_date ? -1 : 1;
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
                { headerText: "Transaction ID", rowText: "id" },
                { headerText: "Payment Amount", rowText: "amount" },
                { headerText: "Request Date", rowText: "request_date" },
                { headerText: "Operation Date", rowText: "operation_date" },
            ],
            pageSize: this.perPage
        });
    };  
    
    	
});
