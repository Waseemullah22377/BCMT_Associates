var Common = {
    IsActionAllowed: false,
   
    SessionValues: null,
    Role: null,
    assignButton : null,
    acceptOrRejectButton : null,
    _url: null,
     savedCurrentPage : 0,
     savedCurrentPageLength : 10,
    SuccessAlert: function (msg) {

        swal(msg, {
            icon: "success",
            buttons: {
                confirm: {
                    className: 'btn btn-success'
                }
            },
        });
    },
    DeleteAlert: function (url, Id, formName, script, renderurl) {

        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            buttons: {
                cancel: {
                    visible: true,
                    text: 'No, cancel!',
                    className: 'btn btn-danger'
                },
                confirm: {
                    text: 'Yes, delete it!',
                    className: 'btn btn-success'
                }
            }
        }).then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    url: url,
                    /*headers: { "Authorization": 'Bearer ' + userToken },*/
                    type: "POST",
                    dataType: 'JSON',
                    data: { Id: Id },
                    success: function (data) {
                        
                        if (renderurl == "/Role/Index") {
                            window.location.href = "/Role/Index";
                        }
                        
                        else if (renderurl != '' || typeof (renderurl) != undefined) {
                            var dt = $('.tblmanage').DataTable();
                            dt.destroy();
                            if (renderurl.includes('Customers') || renderurl.includes('Invoice')) {
                                script.RenderDataTable(renderurl);
                            }
                            else {
                                script.RenderDataTable(renderurl, $('#role').val());
                            }
                            
                        }
                      
                    }
                });

                swal(formName + " has been deleted!", {
                    icon: "success",
                    buttons: {
                        confirm: {
                            className: 'btn btn-success'
                        }
                    }
                });
                
            }
            Common.HideLoader();
        })
    },
    WarningAlert: function (url, Type) {

        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            buttons: {
                cancel: {
                    visible: true,
                    text: 'No!',
                    className: 'btn btn-danger'
                },
                confirm: {
                    text: 'Yes!',
                    className: 'btn btn-success'
                }
            }
        }).then((willDelete) => {
            if (willDelete) {

                EmployeesAttendance.Save(url, Type);



            }
        });

    },
    ErrorAlert: function (msg) {
        swal(msg, {
            icon: "error",
            buttons: {
                confirm: {
                    className: 'btn btn-danger'
                }
            },
        });

    },
    HideLoader: function () {
        $('#cover-spin').hide(0);
    },
    ShowLoader: function () {
        $('#cover-spin').show(0);
    },

    Notification: function (Title, Message) {
        var placementFrom = 'top';
        var placementAlign = 'right';
        var state = 'default';
        var style = 'plain';
        var content = {};

        // Set the title and map to notification types (colors)
        content.message = Message;
        content.title = Title;

        if (Title.toLowerCase() === 'success') {
            state = 'success';  // Green background
        } else if (Title.toLowerCase() === 'error') {
            state = 'danger';   // Red background
        } else if (Title.toLowerCase() === 'info') {
            state = 'info';     // Blue background
        } else if (Title.toLowerCase() === 'warning') {
            state = 'warning';  // Yellow background
        } else {
            state = 'default';  // Default background
        }

        // Optionally set an icon if needed
        if (style == "withicon") {
            content.icon = 'fa fa-bell';
        } else {
            content.icon = 'none';
        }

        // Trigger the notification
        $.notify(content, {
            type: state,  // Use the dynamic state here
            placement: {
                from: placementFrom,
                align: placementAlign
            },
            time: 1000,
            delay: 3000,
        });
    },


    DownloadExcel: function (url,FileName) {
        Common.ShowLoader();

fetch(url, {
    method: 'GET', // or 'POST' depending on your server-side implementation
    headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
    },
})
    .then(response => {
        if (!response.ok) {
            Common.ErrorAlert('Network response was not ok');
            throw new Error('Network response was not ok');
        }
        return response.blob();
    })
    .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement('a');
        a.href = url;
        a.download = FileName+'.xlsx'; // Specify the desired file name
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        Common.HideLoader();
    })
    .catch(error => {
        Common.ErrorAlert(error);
        Common.HideLoader();
    });
},
    

    FillCustomerPaymentModal: function (data, form, URL) {
        $('#ID').val(data.id);
        $('#DealerId').val(data.dealerId);
        $('#DealerType').val(data.dealerType);
        $('#InvoiceNo').val(data.invoiceNo);
        $('#Received').val(data.received);
        $('#month').val(data.month);
        $('#Discount').val(data.discount);
        $('#CustomerId').val(data.customerId);
        $('select').prop('disabled', true);
        /* $('#CustomerId').prop('disabled', true);*/
        $('#CustomerName').val(data.customerName);
        $('#InvoiceNo').val(data.invoiceNo);
        $('#PackageId').val(data.packageId);
        $('#PackageId').attr('disabled', 'true');
        $('#PackageAmount').val(data.packageAmount);
        $('#URL').val(URL);
        $('#btnUpdate').text('Submit').button("refresh");
        $('#CustomerPaymentModal').modal("show");
        $('#btnUpdate').css('display', 'block');
        $('#btnAdd').css('display', 'none');
    },
    FillPaymentModal: function (data, form, URL) {
        $('select').removeAttr("disabled");
        $('#ID').val(data.id);
        $('#addRowModal #DealerId').val(data.dealerId);
        $('#DealerType').val(data.dealerType);
        $('#InvoiceNo').val(data.invoiceNo);
        $('#Received').val(data.received);
        $('#month').val(data.month);
        $('#Discount').val(data.discount);
        $('#addRowModal .CustomerId').select2().val(data.customerId).trigger("change");
       
       /* $('#CustomerId').prop('disabled', true);*/
        $('#CustomerName').val(data.customerName);
        $('#DealerId').val(data.dealerId);
        $('#InvoiceNo').val(data.invoiceNo);
        $('#PackageId').val(data.packageId);
        $('#PackageId').attr('disabled', 'true');
        $('#PackageAmount').val(data.packageAmount);
        $('#URL').val(URL);
        $('#btnUpdate').text('Submit').button("refresh");
        $('#addRowModal').modal("show");
        $('#btnUpdate').css('display', 'block');
        $('#btnAdd').css('display', 'none');
        CrudScript.makeAjaxRequest('POST', URL, { InvoiceNo: data.invoiceNo }, null).then(function (result) {
            if (result[0].installationFee != null && result[0].installationFee != "") {
                $('#InstallationDiv').css('display', 'block');
                    $('#IncludeInstallation').prop('checked', true).trigger('change');
                    $('#IncludeInstallation').val(true);

                
               
            } else {
                $('#InstallationDiv').css('display', 'none');
                $('#IncludeInstallation').val(false);
            }
            var productId ;
            if (result[0].productId != null && result[0].productId != "") {
                
               
                productId = result[0].productId;
                for (let i = 1; i < result.length; i++) {
                    if (productId != result[0].productId) {
                        productId = result[i].productId;
                        if (i > 0) {
                            $(".DataRow").first().clone().find('input').val('').end().show().insertAfter("div.DataRow:last");
                            $('#DataRow').css("display", 'none');

                        }
                    }
                }
            }

            var idCount = 0;
            $('.Rate').each(function () {
                $(this).closest('.DataRow').children('div').find('input').prop('readonly', true);
                $(this).closest('.DataRow').children('div').find('select').prop('disabled', true);
                $(this).closest('.DataRow').children('div').find('.ProductId').val(result[idCount].productId);
                $(this).closest('.DataRow').children('div').find('.Amount').val(result[idCount].amount);
                $(this).closest('.DataRow').children('div').find('.Quantity').val(result[idCount].quantity);
                $(this).closest('.DataRow').children('div').find('.Rate').val(result[idCount].rate);
                idCount++;
            });
            $(".Amount").trigger('change');
            
            $('.Received').trigger('change');

            $('.remove').css('display', 'none');
            $('#AddRow').css('display', 'none');
            $('#addRowModal select').prop("disabled", true);
            $('#PaymentMethodId').removeAttr("disabled");
            $('#PaymentMethodId').prop('required', true);
            
            $('#Note').removeAttr("disabled");
            $('#ChequeInfo').removeAttr("disabled");

        });

       
       
       

  
       
    },

    
    DateFormat: function (inputdate) {
        const date = new Date(inputdate);
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
        }).replace(/ /g, '-');

        return formattedDate;

    },

    GetTimeFromDateTime: function (inputdate) {
        if (inputdate != null && inputdate != '') {
            const currentDateTime = new Date(inputdate);
            const options = { hour: '2-digit', minute: '2-digit' };
            const timeOnly = currentDateTime.toLocaleTimeString([], options);

            return timeOnly;
        }
        else {
            return '';
        }
        

    },

    Get24hrsFormatTimeFromDatetime: function (inputdate) {
        if (inputdate != null && inputdate != '') {
            const date = new Date(inputdate);
            const time = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            return time; // Example output: "14:30:15"
        }
        

    },
    DateFormatReturnsMonthYear: function (inputdate) {
        const date = new Date(inputdate);
        const formattedDate = date.toLocaleDateString('en-GB', {
             month: 'short', year: 'numeric'
        }).replace(/ /g, '-');

        return formattedDate;

    },
    FillInventoryModal: function (data) {
        $('#addRowModal').modal("show");
        //$('#ModalTitle').text("Update Inventory");
        //$('.fw-mediumbold').text('Update');

        $('#btnAdd').css('display', 'none');
        $('#ID').val(data.id);
        $("#ChildId").val(data.childId)
        $("#MasterId").val(data.masterId)
        $('select[name="ChildId"]').val(data.childId);
        $('#ProductCategoryId').val(data.productCategoryId);
        $('#Name').val(data.name);
        $('#Quantity').val(data.quantity);
        $('#QuantityUnitId').val(data.quantityUnitId);
        $('#PurchasePrice').val(data.purchasePrice);
        $('#RetailPrice').val(data.retailPrice);
        $('#Description').val(data.description);
        $('#Status').val(data.status);

    },
    Inventorycolumns:
        [
            { "data": "id", "name": "id" },
            { "data": "masterName", "name": "masterName" },
            { "data": "childName", "name": "childName" },

            { "data": "name", "name": "name" },

            { "data": "quantity", "name": "quantity" },

            { "data": "quantityUnit", "name": "quantityUnit" },

            //{ "data": "purchasePrice", "name": "purchasePrice" },
            //{ "data": "retailPrice", "name": "retailPrice" },

            { "data": "statusName", "name": "statusName" },

            { "data": "description", "name": "description" },
            {
                "mData": null,
                "bSortable": false,
                "mRender": function (data, type, full) {
                   var acceptbutton = '';
                    var AssignButton = '';
                     acceptbutton = ' <div class="form-button-action"><button type="button" data-toggle="tooltip" id="' + data.id + '" title="Accept Or Reject" class="btn btn-link btn-primary btn-lg edit" data-original-title="Accept Or Reject"> <i class="fas fa-gavel"></i> </button>';
                     AssignButton = '<button type="button" data-toggle="tooltip" title="Assign Inventory" id="' + data.id + '" class="btn btn-link btn-danger assign" data-original-title="Assign Inventory"> <i class="fas fa-exchange-alt"></i> </button> </div>';
                    if (Common._url.includes('/SubDealer/GetInventory')) {
                        if (Common.SessionValues.includes('/SubDealer/InventoryUpdate')) {
                            Common.acceptOrRejectButton = acceptbutton;
                        }
                        else {
                            Common.acceptOrRejectButton = '';
                        }

                        if (Common.SessionValues.includes('/SubDealer/ReturnInventory')) {
                            Common.assignButton = '<button type="button" data-toggle="tooltip" title="Return Inventory" id="' + data.id + '" class="btn btn-link btn-danger return" data-original-title="Return Inventory"> <i class="fas fa-exchange-alt"></i> </button> </div>';
                        }
                        else {
                            Common.assignButton = '';
                        }

                        
                    }
                    else if (Common._url.includes('/Dealer/GetInventory')) {
                        if (Common.SessionValues.includes('/Dealer/InventoryUpdate')) {
                            Common.acceptOrRejectButton = acceptbutton;
                        }
                        else {
                            Common.acceptOrRejectButton = '';
                        }

                        if (Common.SessionValues.includes('/Dealer/AssignInventory')) {
                            Common.assignButton = AssignButton;
                        }
                        else {
                            Common.assignButton = '';
                        }
                    }

                    else if (Common._url.includes('/OrganizationDetail/GetInventory')) {
                        if (Common.SessionValues.includes('/OrganizationDetail/InventoryUpdate')) {
                            Common.acceptOrRejectButton = acceptbutton;
                        }
                        else {
                            Common.acceptOrRejectButton = '';
                        }

                        if (Common.SessionValues.includes('/OrganizationDetail/AssignInventory')) {
                            Common.assignButton = AssignButton;
                        }
                        else {
                            Common.assignButton = '';
                        }
                    }
                    if (data.statusName == 'Approved') {
                        return Common.assignButton; //'<button type="button" data-toggle="tooltip" title="Assign Inventory" id="' + data.id + '" class="btn btn-link btn-danger assign" data-original-title="Assign Inventory"> <i class="fas fa-exchange-alt"></i> </button> </div>'
                    }

                    else if (data.statusName == 'Pending') {
                        return Common.acceptOrRejectButton;
                        //return ' <div class="form-button-action"><button type="button" data-toggle="tooltip" id="' + data.id + '" title="Accept Or Reject" class="btn btn-link btn-primary btn-lg edit" data-original-title="Accept Or Reject"> <i class="fas fa-gavel"></i> </button>'

                    }


                    //else return ' <div class="form-button-action"><button type="button" data-toggle="tooltip" id="' + data.id + '" title="Accept Or Reject" class="btn btn-link btn-primary btn-lg edit" data-original-title="Accept Or Reject"> <i class="fas fa-gavel"></i> </button>'
                    //    +'<button type="button" data-toggle="tooltip" title="Assign Inventory" id="' + data.id + '" class="btn btn-link btn-danger assign" data-original-title="Assign Inventory"> <i class="fas fa-exchange-alt"></i> </button> </div>'

                }
            }
        ],
    RenderInventoryDataTable: function (_url) {
        CrudScript.makeAjaxRequest('POST', _url, { DealerId: $('#Dealer').val(), SubDealerId: $('#SubDealer').val(), ProductId: $('#Product').val() }, null).then(function (data) {
            var dt = $('.tblmanage').DataTable();
            dt.destroy();
            if (_url.includes('GetInventoryHistory')) {
                CrudScript.JqueryDataTable('.tblmanage', data, Common.InventoryHistorycolumns);

            }
            else if (_url.includes('GetPaymentHistory')) {
                CrudScript.JqueryDataTable('.tblmanage', data, OrganizationDetailScript.PaymentHistorycolumns);
            }
            else if (_url.includes('GetPayment')) {
                CrudScript.JqueryDataTable('.tblmanage', data, OrganizationDetailScript.Accountcolumns);
            }
            else {
                Common._url = _url;
               
                CrudScript.JqueryDataTable('.tblmanage', data, Common.Inventorycolumns);
                if (data.length > 0) {
                    $('#Routers').text(data.find(invoice => invoice.name.toUpperCase() === 'ROUTER' && invoice.statusName.toUpperCase() === 'APPROVED' )?.quantity);
                    $('#Charger').text(data.find(invoice => invoice.name.toUpperCase() === 'CHARGER' && invoice.statusName.toUpperCase() === 'APPROVED')?.quantity);
                    $('#Pigtail').text(data.find(invoice => invoice.name.toUpperCase() === 'PIGTAIL' && invoice.statusName.toUpperCase() === 'APPROVED')?.quantity);
                    $('#ONU').text(data.find(invoice => invoice.name.toUpperCase() === 'ONU' && invoice.statusName.toUpperCase() === 'APPROVED')?.quantity);
                    $('#2Core').text(data.find(invoice => invoice.name.toUpperCase() === '2 CORE' && invoice.statusName.toUpperCase() === 'APPROVED')?.quantity);
                    $('#4Core').text(data.find(invoice => invoice.name.toUpperCase() === '4 CORE' && invoice.statusName.toUpperCase() === 'APPROVED' )?.quantity);
                    $('#6Core').text(data.find(invoice => invoice.name.toUpperCase() === '6 CORE' && invoice.statusName.toUpperCase() === 'APPROVED')?.quantity);
                    $('#12Core').text(data.find(invoice => invoice.name.toUpperCase() === '12 CORE' && invoice.statusName.toUpperCase() === 'APPROVED')?.quantity);
                }
            }




        })
    },
    InventoryHistorycolumns:
        [
            { "data": "id", "name": "id" },
            { "data": "franchiseName", "name": "franchiseName" },
            { "data": "dealerName", "name": "dealerName" },
            { "data": "productName", "name": "productName" },
            { "data": "previousQuantity", "name": "previousQuantity" },
            { "data": "givenQuantity", "name": "givenQuantity" },
            { "data": "remainingQuantity", "name": "remainingQuantity" },
            { "data": "quantityUnit", "name": "quantityUnit" },
            { "data": "purchasePrice", "name": "purchasePrice" },
            { "data": "retailPrice", "name": "retailPrice" },

        ],
    GetZoneByCityId: function (cityId) {
        CrudScript.makeAjaxRequest('POST', '/Zone/Get/', { CityId: cityId }, null).then(function (data) {
            var selectOption = $('#ZoneId');
            selectOption.html('');
            selectOption.append(
                $('<option></option>').val("").html('Please Select Zone')
            );
            $.each(data, function (val, text) {
                selectOption.append(
                    $('<option></option>').val(text.id).html(text.name)
                );
            });
        });

    },
    GetAreaByZoneId: function (zoneId) {
        CrudScript.makeAjaxRequest('POST', '/Area/Get/', { ZoneId: zoneId }, null).then(function (data) {
            var selectOption = $('#AreaId');
            selectOption.html('');
            selectOption.append(
                $('<option></option>').val("").html('Please Select Area')
            );
            $.each(data, function (val, text) {
                selectOption.append(
                    $('<option></option>').val(text.id).html(text.name)
                );
            });
        })
    },
    GetDealerByOrganizationDetailId: function (organizationDetailId) {
        CrudScript.makeAjaxRequest('POST', '/Dealer/Get/', { OrganizationDetailId: organizationDetailId }, null).then(function (data) {
            var selectOption = $('#DealerId');
            selectOption.html('');
            selectOption.append(
                $('<option></option>').val("").html('Please Select Dealer ')
            );
            $.each(data, function (val, text) {
                selectOption.append(
                    $('<option></option>').val(text.id).html(text.name)
                );
            });
        })
    },

    GetDealerByOrganizationDetail: function (organizationDetailId) {
        CrudScript.makeAjaxRequest('POST', '/Dealer/Get/', { OrganizationDetailId: organizationDetailId }, null).then(function (data) {
            var selectOption = $('#Dealer');
            selectOption.html('');
            selectOption.append(
                $('<option></option>').val("").html('Please Select Dealer ')
            );
            $.each(data, function (val, text) {
                selectOption.append(
                    $('<option></option>').val(text.id).html(text.name)
                );
            });
        })
    },

    GetSubDealerByDealerId: function (DealerId) {
        CrudScript.makeAjaxRequest('POST', '/SubDealer/Get/', { DealerId: DealerId }, null).then(function (data) {
            var selectOption1 = $('#SubDealerId');
            selectOption1.html('');
            selectOption1.append(
                $('<option></option>').val("").html('Please Select SubDealer ')
            );
            $.each(data, function (val, text) {
                selectOption1.append(
                    $('<option></option>').val(text.id).html(text.name)
                );
            });

            var selectOption1 = $('#AssignToId');
            selectOption1.html('');
            selectOption1.append(
                $('<option></option>').val("").html('Please Select SubDealer ')
            );
            $.each(data, function (val, text) {
                selectOption1.append(
                    $('<option></option>').val(text.id).html(text.name)
                );
            });
        });


        CrudScript.makeAjaxRequest('POST', '/Customer/Get/', { Id: null, CustomerId: null, OrganizationId: $('#OrganizationId').val(), OrganizationDetailId: $('#OrganizationDetailId').val(), DealerId: DealerId, SubDealerId: null }, null).then(function (data) {
            var selectOption = $('.CustomerId');
            selectOption.html('');
            selectOption.append(
                $('<option></option>').val("").html('Please Select Customer ')
            );
            $.each(data, function (val, text) {
                var userinfo = text.fullName + " " + "(" + text.username + ")" + "(" + text.cnic + ")" + "(" + text.contactNo + ")";
                selectOption.append(
                    $('<option></option>').val(text.id).html(userinfo)
                );
            });
        })
    },

    ClearFields: function () {

        $('#form :input').val('');

    },
    GetSubDealerByDealer: function (DealerId) {
        CrudScript.makeAjaxRequest('POST', '/SubDealer/Get/', { DealerId: DealerId }, null).then(function (data) {
            var selectOption = $('#SubDealer');
            selectOption.html('');
            selectOption.append(
                $('<option></option>').val("").html('Please Select SubDealer ')
            );
            $.each(data, function (val, text) {
                selectOption.append(
                    $('<option></option>').val(text.id).html(text.name)
                );
            });
        });
        CrudScript.makeAjaxRequest('POST', '/Customer/Get/', { Id: null, CustomerId: null, OrganizationId: $('#OrganizationId').val(), OrganizationDetailId: $('#OrganizationDetailId').val(), DealerId: DealerId, SubDealerId: null }, null).then(function (data) {
            var selectOption = $('.CustomerId');
            selectOption.html('');
            selectOption.append(
                $('<option></option>').val("").html('Please Select Customer ')
            );

            $.each(data, function (val, text) {
                var userinfo = text.fullName + " " + "(" + text.username + ")" + "(" + text.cnic + ")" + "(" + text.contactNo + ")";
                selectOption.append(
                    $('<option></option>').val(text.id).html(userinfo)
                );
            });
        })

        
    },

    GetCustomerBySubDealerId: function (SubDealerId) {
        CrudScript.makeAjaxRequest('POST', '/Customer/Get/', { Id: null, CityId: null, ZoneId: null, AreaId: null, Id: null, OrganizationId: $('#OrganizationId').val(), OrganizationDetailId: $('#OrganizationDetailId').val(), DealerId: $('#DealerId').val(), SubDealerId: SubDealerId }, null).then(function (data) {
            var selectOption = $('.CustomerId');
            selectOption.html('');
            selectOption.append(
                $('<option></option>').val("").html('Please Select Customer ')
            );
            $.each(data, function (val, text) {
                var userinfo = text.fullName + " " + "(" + text.username + ")" + "(" + text.cnic + ")" + "(" + text.contactNo + ")";
                selectOption.append(
                    $('<option></option>').val(text.id).html(userinfo)
                );
            });
        })
    },

    GetCustomerBySubDealer: function (SubDealerId) {
        CrudScript.makeAjaxRequest('POST', '/Customer/Get/', { Id: null, CityId: null, ZoneId: null, AreaId: null, Id: null, OrganizationId: $('#OrganizationId').val(), OrganizationDetailId: $('#OrganizationDetailId').val(), DealerId: $('#DealerId').val(), SubDealerId: SubDealerId }, null).then(function (data) {
            var selectOption = $('.CustomerId');
            selectOption.html('');
            selectOption.append(
                $('<option></option>').val("").html('Please Select Customer ')
            );
            $.each(data, function (val, text) {
                var userinfo = text.fullName + " " + "(" + text.username + ")" + "(" + text.cnic + ")" + "(" + text.contactNo + ")";
                selectOption.append(
                    $('<option></option>').val(text.id).html(userinfo)
                );
            });
        })
    },

    GetOrganizationDetailByOrganizationId: function (OrganizationId) {
        CrudScript.makeAjaxRequest('POST', '/OrganizationDetail/Get/', { OrganizationId: OrganizationId }, null).then(function (data) {
            var selectOption = $('#OrganizationDetailId');
            selectOption.html('');
            selectOption.append(
                $('<option></option>').val("").html('Please Select SubDealer ')
            );
            $.each(data, function (val, text) {
                selectOption.append(
                    $('<option></option>').val(text.id).html(text.name)
                );
            });
        });

        
    },
    GetEmployeesByDealerId: function (dealerId) {
        CrudScript.makeAjaxRequest('POST', '/Employees/Get/', { Id: null, OrganizationId: null, OrganizationDetailId: null, DealerId: dealerId }, null).then(function (data) {
            var selectOption = $('#form #AssignToId');
            selectOption.html('');
            selectOption.append(
                $('<option></option>').val("").html('Please Select Employee ')
            );
            $.each(data, function (val, text) {
                selectOption.append(
                    $('<option></option>').val(text.id).html(text.firstName)
                );
            });
        });

    },
    GetCounters: function () {

        
            CrudScript.makeAjaxRequest('POST', '/Customer/CustomerPendingPaymentRequestCount/', null, null).then(function (data) {
                data.rechargeRequest = data.rechargeRequest == 0 ? "" : data.rechargeRequest;
                data.inProcessRequest = data.inProcessRequest == 0 ? "" : data.inProcessRequest;
                $('#RechargeRequestCollectionCount').text(data.rechargeRequest);

                $('#InProcessRequestCollectionCount').text(data.inProcessRequest);
            });



    },
    

};

$("select[name=CityId]").change(function () {
   
    Common.GetZoneByCityId(this.value);
});
$("select[name=ZoneId]").change(function () {

    Common.GetAreaByZoneId(this.value);
});
$("select[name=OrganizationId]").change(function () {

    Common.GetOrganizationDetailByOrganizationId(this.value);
});

$("select[name=OrganizationDetail]").change(function () {

    Common.GetDealerByOrganizationDetail(this.value);
});

$("select[name=OrganizationDetailId]").change(function () {

    Common.GetDealerByOrganizationDetailId(this.value);
});
$("select[name=DealerId]").change(function () {

    Common.GetSubDealerByDealerId(this.value);
});

$("select[name=Dealer]").change(function () {

    Common.GetSubDealerByDealer(this.value);
});
$("select[name=Dealer]").change(function () {

    Common.GetEmployeesByDealerId(this.value);
});

$("select[name=SubDealerId]").change(function () {

    Common.GetCustomerBySubDealerId(this.value);
});
$("select[name=SubDealer]").change(function () {

    Common.GetCustomerBySubDealer(this.value);
});

var loadCNICFrontBase64 = function (base64) {
    if (base64 != '' && base64 != null) {
        $('#FrontCNIC').attr("src", "data:image/png;base64," + base64);
        $("#CNICFront").prop('required', false);
    }


};
var loadCNICBackBase64 = function (base64) {
    if (base64 != '' && base64 != null) {
        $('#BackCNIC').attr("src", "data:image/png;base64," + base64);
        $("#CNICBack").prop('required', false);
    }


};
var loadTransactionAttachment = function (event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var base64String = e.target.result;

            // Update the image src
            var transactionAttachmentImg = document.getElementById('TransactionAttachment');
            transactionAttachmentImg.src = base64String;

            // Update the link href and data-mfp-src attributes
            var magnifierLink = document.querySelector('.popup-link');
            magnifierLink.href = base64String;
            magnifierLink.setAttribute('data-mfp-src', base64String);
        };
        reader.readAsDataURL(file);
    }
};
//var loadTransactionAttachment = function (event) {
//    var TransactionAttachment = document.getElementsByClassName('TransactionAttachment');
//    TransactionAttachment.src = URL.createObjectURL(event.target.files[0]);
//    TransactionAttachment.onload = function () {
//        URL.revokeObjectURL(TransactionAttachment.src) // free memory
//    }
//};
var loadImage = function (base64) {
    if (base64 != '' && base64 != null) {
        $('#profileImage').attr("src", "data:image/png;base64," + base64);
        $("#ProfilePicture").prop('required', false);
    }


};
$('body').append('<div id="cover-spin"></div>');
//$(window).on('load', function () {

//	$('#cover-spin').show(0)
//	setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
//});
//function removeLoader() {
//	$('#cover-spin').hide(0)
//}
$(document).ready(function () {
    setInterval(function () { CheckSession(); Common.GetCounters(); }, 30000);

    if ($('#hdnrole').val() == 'Super Admin') {
        CrudScript.makeAjaxRequest('POST', '/Customer/CustomerPendingPaymentRequestCount/', null, null).then(function (data) {
            data.customerPendingPayment = data.customerPendingPayment == 0 ? "" : data.customerPendingPayment;
            $('#customercollectionCount').text(data.customerPendingPayment);
        });
    }

})
function CheckSession() {
    var session = '@Accessor.HttpContext.Session.GetString("OrganizationLogo")';
    if (session == '' || session == null) {
        CrudScript.makeAjaxRequest('POST', '/Organization/Get/', { Id: $('#OrganizationId').val(), setlogo: true }, null).then(function (data) { })
    }
}
$('#Product').select2({
    theme: "bootstrap",
    dropdownAutoWidth: true
});
$('#Invoice').select2({
    theme: "bootstrap",
    dropdownAutoWidth: true
});

//$('#Package').select2({
//    theme: "bootstrap",
//    dropdownAutoWidth: true
//});

$('#OrganizationDetail').select2({
    theme: "bootstrap",
    dropdownAutoWidth: true
});

$('#Dealer').select2({
    theme: "bootstrap",
    dropdownAutoWidth: true
});


$('#SubDealer').select2({
    theme: "bootstrap",
    dropdownAutoWidth: true
});
$('#City').select2({
    theme: "bootstrap",
    dropdownAutoWidth: true
});
$('#Area').select2({
    theme: "bootstrap"
});
$('#Zone').select2({
    theme: "bootstrap",
    dropdownAutoWidth: true
});
$('#Customer').select2({
    theme: "bootstrap",
    dropdownAutoWidth: true
});

$('#CustomerId').select2({
    theme: "bootstrap",
    dropdownAutoWidth: true
});

// $('#OrganizationId').select2({
// 	theme: "bootstrap"
// });

$('.multiselect').select2({
    theme: "bootstrap",
    placeholder: "Please Select"
});

$(function () {
    $("body").delegate(".datepicker", "focusin", function () {
        $(this).datetimepicker({
            format: 'MM/DD/YYYY',
        });
    });
});

$(function () {
    $("body").delegate(".dateTimepicker", "focusin", function () {
        $(this).datetimepicker({
            format: 'HH:mm:ss', // 24-hour format with seconds
            // or 'hh:mm:ss A' for 12-hour format with AM/PM and seconds
        });
    });
});

$("#PaymentMethodId").change(function () {

    if (this.value == "2") {
        $('#chequediv').css('display', 'block'); $('#ChequeInfo').Attr('required', true);
    }


    else {
        $('#chequediv').css('display', 'none'); $('#ChequeInfo').removeAttr('required');
    }

});
$("#CustomerPaymentModal #TransferPaymentMethodId").change(function () {

    if (this.value == "2") {
        $('#CustomerPaymentModal #Transferchequediv').css('display', 'block'); $('#CustomerPaymentModal #TransferChequeInfo').Attr('required',true);
    }


    else {
        $('#CustomerPaymentModal #Transferchequediv').css('display', 'none'); $('#CustomerPaymentModal #TransferChequeInfo').removeAttr('required');
    }

});


$("#CustomerPaymentModal #RechargePaymentMethodId").change(function () {

    if (this.value == "2") {
        $('#CustomerPaymentModal #Rechargechequediv').css('display', 'block'); $('#RechargeChequeInfo').Attr('required');
    }


    else {
        $('#CustomerPaymentModal #Rechargechequediv').css('display', 'none'); $('#RechargeChequeInfo').removeAttr('required');
    }

});


$('.image-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    removalDelay: 300,
    gallery: {
        enabled: true,
    },
    mainClass: 'mfp-with-zoom',
    zoom: {
        enabled: true,
        duration: 300,
        easing: 'ease-in-out',
        opener: function (openerElement) {
            return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
    }
});

$('input[name=CNIC]').inputmask();
$(document).on('click', '.payment', function () {
    var data = $('.tblmanage').DataTable().row($(this).closest('tr')).data();
    $('#InvoiceNoDiv').css("display", 'block');
    $('#Payment').css("display", 'block');
    Common.FillPaymentModal(data, 'Customer', '/Invoice/GetInvoiceDetails/');
});

$(document).on('change paste keyup', '#Discount', function () {
    $('#Total').text(parseInt($('#SubTotal').text()) - parseInt($('#Discount').val()));
    $('.Total').val(parseInt($('#SubTotal').text()) - parseInt($('#Discount').val()));
})


$(document).on('change paste keyup', '.Received', function () {

    if ($(this).val() != '' && $(this).val() != '0') {
        $('#Remaining').text(parseInt($('#Total').text()) - parseInt($(this).val()));
        $('.Remaining').val(parseInt($('#Total').text()) - parseInt($(this).val()));
        $('#AddPayment').prop('checked', true).trigger('change');
        $('#AddPayment').val(true);
        $(this).closest('.Payment').children('div').find('input').prop('required', true);
        $('#TransferAttachment').prop('required', false);
        $('#TransactionAttach').css('display', 'block');
    }
    else {
        $('#Remaining').text(parseInt($('#Total').text()));
        $('.Remaining').val(parseInt($('#Total').text()));
        $('#AddPayment').prop('checked', false).trigger('change');
        $('#AddPayment').val(false);

        $(this).closest('.Payment').children('div').find('input').prop('required', false);
        $('#TransactionAttach').css('display', 'none');
    }

})

$(document).on('change', '.ProductId', function () {
    var Id = $(this).closest('.DataRow').children('div').find('.Rate').attr('id');
    CrudScript.makeAjaxRequest('POST', '/Product/Get/', { Id: $(this).val() }).then(function (data) {

        $('#' + Id).val(data[0].retailPrice);
    })

    var productIds = "";

    $('.ProductId').each(function () {
        if (productIds == '') {
            if ($(this).val() != '') {
                productIds = parseInt($(this).val());
            }

        }
        else {
            if ($(this).val() != '') {
                productIds = productIds + ',' + parseInt($(this).val());
            }

        }
        $('#AllProductId').val(productIds);
    })

});
$(document).on('change', '.Amount', function () {
    var subtotal = 0;
    var allamount = '';
    var allrate = '';
    var allquantity = '';
    $('#AllAmount').val('');
    // var data = $('.tblPendingGrid').DataTable().rows().every(function () {
    //     console.log(this.data().remaining);
    //     subtotal = subtotal + parseInt(this.data().remaining);
    // });
    $('.Amount').each(function () {
        if (allamount == '' && $(this).attr("id") != "InstallationFee" && $(this).attr("id") != "PackageAmount") {
            if ($(this).val() != '') {
                allamount = parseInt($(this).val());
            }
            
        }
        else {
            if ($(this).val() != '' && $(this).attr("id") != "PackageAmount" && $(this).attr("id") != "InstallationFee") {

                allamount = allamount + ',' + parseInt($(this).val());
            }

        }


        if ($(this).attr("id") == "InstallationFee" && $('#IncludeInstallation').val() == 'true') {
            if ($(this).val() != '') {

                subtotal = subtotal + parseInt($(this).val());
            }
        }
        else if ($(this).attr("id") != "InstallationFee" && $(this).val() != '') {

            subtotal = subtotal + parseInt($(this).val());
        }

        $('#SubTotal').text(subtotal);
        $('.SubTotal').val(subtotal);
        let numericString = String(allamount).replace(/,/g, '');

        // Check if the modified string is a valid number
        
            if (allamount != '' && !isNaN(numericString)) {
            $('#AllAmount').val(allamount);
        }
        
        
        


    })



    if ($('#Discount').val() != '') {
        $('#Total').text(parseInt(subtotal) - parseInt($('#Discount').val()));
        $('.Total').val(parseInt(subtotal) - parseInt($('#Discount').val()));
        //if ($('.Received').val() != '' && $('.Received').val() != 0) {
        //    var Total = parseInt($('#Total').text()) - parseInt($(this).val());
        //    $('#Remaining').text(parseInt(Total - parseInt($('.Received').val())));
        //    $('.Remaining').val(parseInt(Total - parseInt($('.Received').val())));
        //}
            $('.Received').trigger('change');
        
    }
    else {
        $('#Total').text(parseInt(subtotal));
        $('.Total').val(parseInt(subtotal));
            $('.Received').trigger('change');
    }

    //RATE
    $('.Rate').each(function () {
        if (allrate == '') {
            if ($(this).val() != '') {
                allrate = parseInt($(this).val());
            }

        }
        else {
            if ($(this).val() != '') {
                allrate = allrate + ',' + parseInt($(this).val());
            }

        }
        let numericString = String(allrate).replace(/,/g, '');
        if (allrate != '' && !isNaN(numericString)) {
            $('#AllRate').val(allrate);
        }

    })

    $(document).on('change paste keyup', '#Discount', function () {
        $('#Total').text(parseInt($('#SubTotal').text()) - parseInt($('#Discount').val()));
        $('.Total').val(parseInt($('#SubTotal').text()) - parseInt($('#Discount').val()));
        if ($('.Received').val() != '' && $('.Received').val() != 0) {
            var Total = parseInt($('#SubTotal').text()) - parseInt($(this).val());
            $('#Remaining').text(parseInt(Total - parseInt($('.Received').val())));
            $('.Remaining').val(parseInt(Total - parseInt($('.Received').val())));
        }
    })

    //Quantity
    $('.Quantity').each(function () {
        if (allquantity == '') {
            if ($(this).val() != '') {

                allquantity = parseInt($(this).val());
                console.log('val1: ' + $(this).val());
            }

        }
        else {
            if ($(this).val() != '') {
                allquantity = allquantity + ',' + parseInt($(this).val());
                console.log(allquantity);
                console.log('val2: ' + $(this).val());
            }

        }
        let numericString = String(allquantity).replace(/,/g, '');
        if (allquantity != '' && !isNaN(numericString)) {
            $('#AllQuantity').val(allquantity);
            console.log(allquantity)
            console.log('val3: ' + $(this).val());
        }
    });
    if ($('#Remaining').text() == '') {
        $('#Remaining').text(parseInt($('#Total').text()));
        $('.Remaining').val(parseInt($('#Total').text()));
    }
    
});

$(document).on('change paste keyup', '.Quantity', function () {

    $(this).closest('.DataRow').children('div').find('.Amount').val($(this).closest('.DataRow').children('div').find('.Quantity').val() * $(this).closest('.DataRow').children('div').find('.Rate').val());
    $(".Amount").trigger('change');

})

$(document).on('change paste keyup', '.Rate', function () {

    $(this).closest('.DataRow').children('div').find('.Amount').val($(this).closest('.DataRow').children('div').find('.Quantity').val() * $(this).closest('.DataRow').children('div').find('.Rate').val());
    $(this).closest($(".Amount").trigger('change'));
});


$(document).on('click', '.SubRow', function () {
    $(this).closest(".DataRow").remove();
});

$('#AddRow').click(function () {
    $(".DataRow").first().clone().find('input').val('').end().show().insertAfter("div.DataRow:last");
    var idCount = 0;
    $('.Rate').each(function () {
        $(this).attr('id', 'Rate' + idCount);
        idCount++;
    });
});

$("#AddPayment").change(function () {
    if (this.checked) {

        $('#Payment').css('display', 'block');

        $('.Payment').each(function () {

            $(this).closest('.Payment').children('div').find('input').prop('required', true);
        })
        if ($('#PaymentMethodId').val() != '2') {
            $('#ChequeInfo').removeAttr('required');
        }
        $(this).val('true');

    }
    else {
        $('#Payment').css('display', 'none');
        $(this).val('false');


        $('.Payment').each(function () {

            $(this).closest('.Payment').children('div').find('input').prop('required', false);
        })

    }
});
$("#IncludeInstallation").change(function () {

    if (this.checked) {

        $('#InstallationDiv').css('display', 'block');
        $(this).val(true);


    }
    else {
        $('#InstallationDiv').css('display', 'none');
        $(this).val(false);
    }
    $(".Amount").trigger('change');
})

$('#IsActive').change(function () {
    if ($('#IsActive').is(":checked")) {
        $('#IsActive').val(true);
    }
    else {
        $('#IsActive').val(false);
    }
});


$("#ISCIR").change(function () {

    if (this.checked) {
        $('#ISCIR').val(true);
        $('#PackageAmount').removeAttr('readonly');


    }
    else {
        $('#ISCIR').val(false);
        $('#PackageAmount').prop('readonly', 'readonly');
        CustomerScript.GePackageAmountByPackageId($('#PackageId').val());
    }
})




function createPackageChart(chartId, type, labels, datasets, options, contextId) {
    if (document.getElementById(chartId)) {
        $("canvas#" + chartId).remove();
        $("div." + contextId).append('<canvas id="' + chartId + '" class="animated fadeIn"></canvas>');
        var ctx = document.getElementById(chartId).getContext('2d');
        new Chart(ctx, {
            type: type,
            data: {
                labels: labels,
                datasets: datasets
            },
            options: options
        });
    }
}

var validColorNames = [
    "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond",
    "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue",
    "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkgrey",
    "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen",
    "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue",
    "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite",
    "gold", "goldenrod", "gray", "green", "greenyellow", "grey", "honeydew", "hotpink", "indianred", "indigo", "ivory",
    "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan",
    "lightgoldenrodyellow", "lightgray", "lightgreen", "lightgrey", "lightpink", "lightsalmon", "lightseagreen",
    "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen",
    "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen",
    "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream",
    "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid",
    "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum",
    "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown",
    "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen",
    "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow",
    "yellowgreen"
];
function createChart(chartId, chartType, labels, datasets, options, chartclass) {
    if (document.getElementById(chartId)) {
        $("canvas#" + chartId).remove();
        $("div." + chartclass).append('<canvas id="' + chartId + '" class="animated fadeIn"></canvas>');
        var ctx = document.getElementById(chartId).getContext('2d');

        var chart = new Chart(ctx, {
            type: chartType,
            data: {
                labels: labels,
                datasets: datasets
            },
            options: options
        });

        return chart;
    }
}

function isValidHexColor(str) {
    return /^#[0-9A-F]{6}$/i.test(str);
}
function isValidColorName(str) {
    return validColorNames.includes(str.toLowerCase());
}
function TaskChart(Maxvalue, ProgressValue) {

    Circles.create({
        id: 'task-complete',
        radius: 50,
        value: ProgressValue,
        maxValue: Maxvalue,
        width: 5,
        text: function (value) { return value; },
        colors: ['#36a3f7', '#fff'],
        duration: 400,
        wrpClass: 'circles-wrp',
        textClass: 'circles-text',
        styleWrapper: true,
        styleText: true
    })

}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function SalesChart(chartId, dataset,labels , options) {
    var dailySalesChart = document.getElementById(chartId).getContext('2d');
    var myDailySalesChart = new Chart(dailySalesChart, {
        type: 'line',
        datasets: dataset,
        options: {
            maintainAspectRatio: !1, legend: {
                display: !1
            }
            , animation: {
                easing: "easeInOutBack"
            }
            , scales: {
                yAxes: [{
                    display: !1, ticks: {
                        fontColor: "rgba(0,0,0,0.5)", fontStyle: "bold", beginAtZero: !0, maxTicksLimit: 10, padding: 0
                    }
                    , gridLines: {
                        drawTicks: !1, display: !1
                    }
                }
                ], xAxes: [{
                    display: !1, gridLines: {
                        zeroLineColor: "transparent"
                    }
                    , ticks: {
                        padding: -20, fontColor: "rgba(255,255,255,0.2)", fontStyle: "bold"
                    }
                }
                ]
            }
        }
    });
    return myDailySalesChart;
}
// Example usage:
function numberWithCommas(x) {
    if (x == null) {
        x = 0;
    }
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

$(document).on('change', '.PolicyId', function () {

    CrudScript.makeAjaxRequest('POST', '/Organization/GetPolicy/', { Id: $(this).val() }).then(function (data) {
        $('#InstallationFee').val(data[0].installationFee);
        $('#InstallationQuantity').val(data[0].quantity);
        $('.AllInstallationProductId').val(data[0].productId);
        $.each(data, function (key, value) {
            $('.InstallationRow').remove();
            var products = value.productId.split(',');
            var producstNames = value.productName.split(',');
            var Quantity = value.quantity.split(',');
            for (var val in products) {
                var divs = '';
                var s = $('<select  class="form-control" disabled/>');
                $('<option />', { value: products[val], text: producstNames[val] }).appendTo(s);
                divs = ' <div id="InstallationRow" class="row InstallationRow"><div class="col-md-3 pr-0"> <div class="form-group form-group-default"> <label>Products</label><div id="DropDown' + val + '"> </div></div></div>'
                    + '<div class="col-md-3 pr-0"> <div class="form-group form-group-default"> <label> Quantity</label> <input id="Quantity" type="text" class="form-control" required value="' + Quantity[val] + '" readonly> </div> </div></div>'
                var child = document.createElement('div');
                child.innerHTML = divs;
                child = child;
                document.getElementById('InvoiceDivs').appendChild(child);
                s.appendTo("#DropDown" + val);
            }
        })
        $(".Amount").trigger('change');

    });
    
});

// Event listener for the Font Awesome icon
$(document).on('click', '.dt-control .dt-icon-control', function (e) {
    // Your existing functionality for the fa-plus-circle icon
    let tr = $(this).closest('tr');
    let row = $('.tblpaymentRequest').DataTable().row(tr);

    let icon = $(this).find('i');

    if (row.child.isShown()) {
        row.child.hide();
        icon.removeClass('fa-minus-circle').addClass('fa-plus-circle');
    } else {
        row.child(format(row.data())).show();
        icon.removeClass('fa-plus-circle').addClass('fa-minus-circle');
    }
});

// Event listener for the checkbox
$(document).on('click', '.dt-checkbox', function (e) {
    
    let tr = $(this).closest('tr');
    let row = $('.tblpaymentRequest').DataTable().row(tr);
    var selectedPaymentStatus = row.data().paymentStatus;
    var isChecked = $(this).is(':checked');

    if (isChecked) {
        // If a checkbox is checked, disable all other checkboxes with different payment statuses
        $('.dt-checkbox').each(function () {
            if ($(this).data('payment-status') !== selectedPaymentStatus) {
                $(this).prop('disabled', true);
            }
        });
    } else {
        // If the checkbox is unchecked, re-enable all checkboxes
        $('.dt-checkbox').prop('disabled', false);
    }
});

//$(document).on('click', 'td.dt-control', function () {

    
//    let tr = $(this).closest('tr');
//    let row = $('.tblpaymentRequest').DataTable().row(tr);

//    let icon = $(this).find('i');

//    if (row.child.isShown()) {
//        row.child.hide();
//        icon.removeClass('fa-minus-circle').addClass('fa-plus-circle');
//    } else {
//        row.child(format(row.data())).show();
//        icon.removeClass('fa-plus-circle').addClass('fa-minus-circle');
//    }
//});
function format(d) {
    // `d` is the original data object for the row
    debugger

    if (d.productNames == null) {
        d.productNames = "";
    }
    if (d.transferPaymentMethodName == null) {
        d.transferPaymentMethodName = "";
    }
    if (d.userTransferApprovedBy == null) {
        d.userTransferApprovedBy = "";
    }
    return (
        '<dl>' +
        '<dt>Customer Name: ' + d.fullName + ' </dt>' +
        '<dt>Recharge Payment Method: ' + d.rechargePaymentMethodName +'</dt>' +
        '<dt>Recharge Approved By: ' + d.userRechargeRequestedBy +'</dt>' +
        '<dt>Transfer Payment Method: ' + d.transferPaymentMethodName + '</dt>' +
        '<dt>Transfer Approved By: ' + d.userTransferApprovedBy + '</dt>' +
        '<dt>Product Name: ' + d.productNames+'</dt>' +
       
        //'<dt>Extra info:</dt>' +
        //'<dd>And any further details here (images etc)...</dd>' +
        '</dl>'
    );
}
function getPaginationInfo(elem) {
    var table = $(elem).DataTable();
    var info = table.page.info(); // Get pagination info
    var currentPage = info.page + 1; // Page index is 0-based
    var pageLength = table.page.len(); // Records per page

    return {
        currentPage: currentPage,
        pageLength: pageLength
    };
}
