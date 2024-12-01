var CrudScript = {

    makeAjaxRequest: function (methodType, url, params, FormData) {
        return new Promise(function (resolve, reject) {
            if (methodType == "GET") {
                if (params == null) {
                    $.get(url).done(function (response) {
                        resolve(response)
                    }).fail(function (response) {
                        reject(response);
                    })
                } else {
                    $.get(url, params).done(function (response) {
                        resolve(response)
                    }).fail(function (response) {
                        reject(response);
                    })
                }
            } else {
                if (params == null) {
                    $.post(url).done(function (response) {
                        resolve(response)
                    }).fail(function (response) {
                        reject(response);
                    });
                }
                else {
                    $.post(url, params).done(function (response) {
                        resolve(response)
                    }).fail(function (response) {
                        reject(response);
                    });
                }
            }
        })
    },
    makeAjaxRequestToDownloadFile: function (methodType, url, params, FileName) {
        return new Promise(function (resolve, reject) {
            if (methodType == "GET") {
                if (params == null) {
                    $.get(url).done(function (response) {
                        resolve(response)
                    }).fail(function (response) {
                        reject(response);
                    })
                } else {
                    $.get(url, params).done(function (response) {
                        resolve(response)
                    }).fail(function (response) {
                        reject(response);
                    })
                }
            } else {
                if (params == null) {
                    $.post(url).done(function (response) {
                        resolve(response)
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.blob();
                    })
                        .then(blob => {
                            const url = window.URL.createObjectURL(new Blob([blob]));
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = FileName + '.xlsx'; // Specify the desired file name
                            document.body.appendChild(a);
                            a.click();
                            window.URL.revokeObjectURL(url);
                        })
                        .catch(error => {
                            console.error('There was a problem with the fetch operation:', error);
                        }).fail(function (response) {
                            reject(response);
                        });
                }
                else {
                    $.post(url, params).done(function (response) {
                        resolve(response)
                    }).fail(function (response) {
                        reject(response);
                    });
                }
            }
        })
    },

    JqueryDataTable: function (elem, data, columns, Condition, processRowColor) {
        $(elem).DataTable({
            data: data,
            columns: columns,
            columnDefs: [{
                targets: [0],
                visible: false,
                searchable: false,
                className: "hide_column"
            }],
            sPaginationType: "simple_numbers",
            aaSorting: [],
            bFilter: true,
            bInfo: false,
            scrollX: true,
            "ordering": false,
            initComplete: function () {
                var table = this.api();
                if (Common.IsActionAllowed) {
                    condition = false;
                } else {
                    condition = true;
                }

                if (Condition) {
                    // Find the index of the column with the header "Action"
                    var columnIndex = table.columns().header().toArray().findIndex(header => $(header).text() === 'Action');
                    if (columnIndex >= 0) {
                        // Hide the column
                        table.column(columnIndex).visible(false);
                    }
                }

                // Check if there are any buttons in the action column
                //var actionColumnIndex = table.columns().header().toArray().findIndex(header => $(header).text() === 'Action');
                //var hasButtons = false;

                //if (actionColumnIndex >= 0) {
                //    table.rows().every(function () {
                //        var rowData = this.data();
                //        var cellHtml = $(table.cell(this.index(), actionColumnIndex).node()).html();
                //        if ($(cellHtml).find('button').length > 0) {
                //            hasButtons = true;
                //            return false; // Exit the loop if at least one row has a button
                //        }
                //    });

                //    // If no buttons found in action column, hide the column
                //    if (!hasButtons) {
                //        table.column(actionColumnIndex).visible(false);
                //    }
                //}

                if (processRowColor) {
                    table.rows().every(function () {
                        var rowData = this.data();
                        if (rowData.invoiceStatus === 'red') {
                            $(this.node()).addClass('red-row');
                        }
                        if (rowData.isDisabled === true) {
                            $(this.node()).addClass('disabled-row');
                        }
                        if (rowData.daysDifference > 0) {
                            $(this.node()).addClass('expired-row');
                        }
                    });
                }
            }
        });
    },

    JqueryDataTable_Old: function (elem, data, columns, Condition, processRowColor) {
        $(elem).DataTable({
            data: data,
            columns: columns,
            columnDefs: [{
                targets: [0],
                visible: false,
                searchable: false,
                className: "hide_column"
            }],
            sPaginationType: "simple_numbers",
            aaSorting: [],
            bFilter: true,
            bInfo: false,
            scrollX: true,
            initComplete: function () {
                var table = this.api();
                if (Common.IsActionAllowed) {
                    condition = false;
                } else {
                    condition = true;
                }

                if (Condition) {
                    // Find the index of the column with the header "Action"
                    var columnIndex = table.column(":contains('Action')").index();
                    // Hide the column
                    table.column(columnIndex).visible(false);
                }

                // Check if there are any buttons in the action column
                var actionColumnIndex = table.column(":contains('Action')").index();
                var hasButtons = false;
                table.rows().every(function () {
                    var rowData = this.data();
                    var cellData = rowData[actionColumnIndex];
                    if ($(cellData).find('button').length > 0) {
                        hasButtons = true;
                        return false; // Exit the loop if at least one row has a button
                    }
                });

                // If no buttons found in action column, hide the column
                if (!hasButtons) {
                    table.column(actionColumnIndex).visible(false);
                }

                if (processRowColor) {
                    table.rows().every(function () {
                        var rowData = this.data();
                        if (rowData.invoiceStatus === 'red') {
                            $(this.node()).addClass('red-row');
                        }
                        if (rowData.isDisabled === true) {
                            $(this.node()).addClass('disabled-row');
                        }
                        if (rowData.daysDifference > 0) {
                            $(this.node()).addClass('expired-row');
                        }
                    });
                }
            }
        });
    },

    JqueryDataTable_Old: function (elem, data, columns, Condition, processRowColor) {

        $(elem).DataTable({
            data: data,
            //"aaData": data,
            "columns": columns,
            "columnDefs": [
                {
                    "targets": [0],
                    "visible": false,
                    "searchable": false,
                    className: "hide_column"
                },
            ],
            "sPaginationType": "simple_numbers", //
            "aaSorting": [],
            "bFilter": true, //
            "bInfo": false, //
            scrollX: true,

            initComplete: function () {
                if (Common.IsActionAllowed) {
                    condition = false
                }
                else {
                    condition = true;
                }

                if (Condition) {
                    var table = this.api();
                    // Find the index of the column with the header "Action"
                    var columnIndex = table.column(":contains('Action')").index();

                    // Hide the column
                    table.column(columnIndex).visible(false);
                }
                if (processRowColor) {
                    var table = this.api();
                    table.rows().every(function () {
                        var rowData = this.data();
                        if (rowData.invoiceStatus === 'red') {
                            $(this.node()).addClass('red-row');
                        }
                        if (rowData.isDisabled === true) {
                            $(this.node()).addClass('disabled-row');
                        }
                        if (rowData.daysDifference > 0) {
                            $(this.node()).addClass('expired-row');

                        }
                    });
                }
            }
        });


    },
    JqueryDataTableWithColorTD: function (elem, data, columns) {

        $(elem).DataTable({
            data: data,
            //"aaData": data,
            "columns": columns,
            "columnDefs": [
                {
                    "targets": [0],
                    "visible": false,
                    "searchable": false,
                    className: "hide_column"
                },
            ],
            "sPaginationType": "simple_numbers", //
            "aaSorting": [],
            "bFilter": true, //
            "bInfo": false, //
            'rowCallback': function (row, data, index) {
                debugger
                if (data.paymentVerified == "Not Verified") {
                    $(row).find('td:eq(6)').empty();
                    $(row).find('td:eq(6)').append("<span class='btn btn-danger verify'>" + data.paymentVerified + "</span>");
                }
                else {
                    $(row).find('td:eq(6)').empty();
                    $(row).find('td:eq(6)').append("<span class='btn btn-success'>" + data.paymentVerified + "</span>");
                }
            }
        });
    },


    JqueryDataTableWithImage: function (elem, data, columns) {

        $(elem).DataTable({
            data: data,
            //"aaData": data,
            "columns": columns,
            "columnDefs": [
                {
                    "targets": [0],
                    "visible": false,
                    "searchable": false,
                    className: "hide_column"
                },
            ],
            "sPaginationType": "simple_numbers", //
            "aaSorting": [],
            "bFilter": true, //
            "bInfo": false, //
            scrollX: true,

            "fnDrawCallback": function () {
                $('.image-popup').magnificPopup({
                    type: 'image',
                    closeOnContentClick: true,
                    closeBtnInside: false,
                    fixedContentPos: true,

                    image: {
                        verticalFit: true
                    },
                    zoom: {
                        enabled: true,
                        duration: 300 // don't foget to change the duration also in CSS
                    },

                });
            }
        });

    },


    PendingGrid: function (elem, data, columns, Condition, hiddenColumnNumber) {

        $(elem).DataTable({
            data: data,
            //"aaData": data,
            "columns": columns,
            "columnDefs": [
                {
                    "targets": [0],
                    "visible": false,
                    "searchable": false,
                    className: "hide_column"
                },
            ],
            "bPaginate": false,
            "aaSorting": [],
            "bFilter": false, //
            "bInfo": false, //
            scrollX: false,
            initComplete: function () {
                var api = this.api();
                if (Condition) {
                    // Hide Office column
                    if (!hiddenColumnNumber) {
                        hiddenColumnNumber = 5;
                    }
                    api.column(hiddenColumnNumber).visible(false);
                }
            }
        });
    },



    ServerSideProcessingJqueryDataTable_old: function (elem, ajaxUrl, columns, Condition, processRowColor, _Module) {
        $(elem).DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": ajaxUrl,
                "type": "POST",
                "contentType": "application/json", // Set the content type to JSON
                "data": function (d) {
                    var organizationDetailId = $('#OrganizationDetail').val() || null;
                    var dealerId = $('#Dealer').val() || null;
                    var subdealerId = $('#SubDealer').val() || null;
                    var customerId = $('#Customer').val() || null;
                    var invoiceTypeId = $('#ConnectionType').val() || null;
                    var packageId = $('#Package').val() || null;
                    var expiredInDays = $('#ExpiredInDays').val() || null;
                    var module = _Module == 'Payment' ? _Module : null;
                    var invoiceId = $('#Invoice').val() || null;
                    var paymentStatusId = $('#PaymentStatus').val() || null;
                    var paymentMethodId = $('#PaymentMethod').val() || null;
                    var startDate = $('#StartDate').val() || null;
                    var endDate = $('#EndDate').val() || null;

                    if (startDate) {
                        startDate = new Date(startDate);  // Assuming startDate is in correct format or adjust parsing as needed
                    }
                    if (endDate) {
                        endDate = new Date(endDate);  // Assuming endDate is in correct format or adjust parsing as needed
                    }
                    return JSON.stringify({
                        draw: d.draw,
                        start: d.start,
                        length: d.length,
                        columns: d.columns, // Pass columns directly if needed
                        order: d.order,
                        search: d.search,
                        OrganizationDetailId: organizationDetailId,
                        DealerId: dealerId,
                        SubdealerId: subdealerId,
                        CustomerId: customerId,
                        ConnectionTypeId: invoiceTypeId,
                        PackageId: packageId,
                        ExpiredInDays: expiredInDays,
                        InvoiceId: invoiceId,
                        PaymentStatusId: paymentStatusId,
                        PaymentMethodId: paymentMethodId,
                        StartDate: startDate ? startDate.toISOString() : null,  // Convert to ISO string format for proper JSON serialization
                        EndDate: endDate ? endDate.toISOString() : null,  // Convert to ISO string format for proper JSON serialization
                        Module: module
                        // Add more parameters as needed
                    });
                },
                "dataSrc": function (json) {
                    // Assuming the server response contains properties for draw, recordsTotal, recordsFiltered, and data
                    // If not, adjust accordingly
                    json.draw = json.draw || 1; // Ensure draw property is set
                    json.recordsTotal = json.recordsTotal || 0;
                    json.recordsFiltered = json.recordsFiltered || 0;

                    //Invoices
                    $('#TotalInvoices').text(0);
                    $('#TotalAmount').text(0);
                    $('#CollectedAmount').text(0);
                    $('#PendingAmount').text(0);

                    //Customers
                    $('#TotalCustomers').text(0);
                    $('#Active').text(0);
                    $('#Disabled').text(0);
                    $('#Expired').text(0);

                    //Recharge
                    $('#TotalInvoices').text(0);
                    $('#RejectedInvoices').text(0);
                    $('#ApprovedInvoices').text(0);
                    $('#InprocessInvoices').text(0);
                    $('#PendingInvoices').text(0);
                    $('#PendingAmount').text(0);
                    $('#CollectedAmount').text(0);

                    //Payment
                    $('#TotalInvoices').text(0);
                    $('#TotalAmount').text(0);
                    $('#CollectedAmount').text(0);
                    $('#PendingAmount').text(0);
                    $('#RejectedAmount').text(0);
                    $('#PendingTransferAmount').text(0);


                    if (json.data.length > 0) {
                        if (_Module == 'Invoice') {
                            $('#TotalInvoices').text(json.data[0].totalInvoices !== undefined ? json.data[0].totalInvoices : 0);
                            $('#TotalAmount').text(json.data[0].totalAmount !== undefined ? json.data[0].totalAmount : 0);
                            $('#CollectedAmount').text(json.data[0].collectedAmount !== undefined ? json.data[0].collectedAmount : 0);
                            $('#PendingAmount').text(json.data[0].pendingAmount !== undefined ? json.data[0].pendingAmount : 0);
                        }
                        else if (_Module == 'Customers') {
                            $('#TotalCustomers').text(json.data[0].totalCustomers);

                            // 'isDisabled' property is available in at least one invoice
                            $('#Active').text(json.data[0].totalActiveCustomers);
                            $('#Disabled').text(json.data[0].totalDisabledCustomers);

                            if (json.data.some(invoice => invoice.hasOwnProperty('daysDifference'))) {
                                // 'isDisabled' property is available in at least one invoice
                                $('#Expired').text(json.data.filter(invoice => invoice.daysDifference > 0).length);
                            }
                            if (_Module != undefined && _Module == 'Payment') {

                                json.data = json.data.filter(x => x.paymentStatus != 'Pending');
                            }
                        }
                        else if (_Module == 'Recharge') {
                            $('#TotalInvoices').text(json.data[0].totalInvoices);

                            $('#RejectedInvoices').text(json.data[0].rejectedInvoices);
                            $('#ApprovedInvoices').text(json.data[0].approvedInvoices);
                            $('#InprocessInvoices').text(json.data[0].inprocessInvoices);
                            $('#PendingInvoices').text(json.data[0].pendingInvoices);
                            $('#PendingAmount').text(json.data[0].totalPendingAmountForRecharge);
                            $('#CollectedAmount').text(json.data[0].totalCollectedAmountForRecharge);
                        }


                        else if (_Module == 'Payment') {
                            json.data = json.data.filter(x => x.paymentStatus != 'Pending');
                            $.each(json.data, function (kye, value) {
                                CustomerScript.InvoicesTotalAmount = CustomerScript.InvoicesTotalAmount + parseInt(value.amount);
                                CustomerScript.TotalInvoices = json.data.length;
                                CustomerScript.CollectedAmount = CustomerScript.CollectedAmount + parseInt(value.totalApprovedAmount);
                                CustomerScript.PendingAmount = CustomerScript.PendingAmount + parseInt(value.remaining);

                            })
                            CustomerScript.RejectedInvoices = json.data.filter(invoice => invoice.paymentStatus === 'reject').length;

                            $('#TotalInvoices').text(json.data[0].totalInvoices);

                            if (CustomerScript.InvoicesTotalAmount != null) {
                                $('#TotalAmount').text(CustomerScript.InvoicesTotalAmount);
                            }

                            $('#CollectedAmount').text(json.data[0].totalApprovedAmount);
                            $('#PendingAmount').text(json.data[0].totalPendingAmountForPayment);
                            $('#RejectedAmount').text(json.data[0].totalRejectedAmountForPayment);
                            $('#PendingTransferAmount').text(json.data[0].totalPendingTransferAmountForPayment);


                        }


                    }
                    return json.data; // Return the data array from the server response
                }
            },
            "columns": columns,
            "columnDefs": [
                {
                    "targets": [0],
                    "visible": false,
                    "searchable": false,
                    className: "hide_column"
                },
            ],
            "sPaginationType": "simple_numbers",
            "aaSorting": [],
            "bFilter": true,
            "bInfo": false,
            scrollX: true,
            paging: true,
            fixedHeader: {
                header: true
            },
            initComplete: function () {
                if (Common.IsActionAllowed) {
                    condition = false;
                }
                else {
                    condition = true;
                }

                if (Condition) {
                    var table = this.api();
                    var columnIndex = table.column(":contains('Action')").index();
                    table.column(columnIndex).visible(false);
                }
                if (processRowColor) {
                    var table = this.api();
                    table.rows().every(function () {
                        var rowData = this.data();
                        if (rowData.invoiceStatus === 'red') {
                            $(this.node()).addClass('red-row');
                        }
                        if (rowData.isDisabled === true) {
                            $(this.node()).addClass('disabled-row');
                        }
                        if (rowData.daysDifference > 0) {
                            $(this.node()).addClass('expired-row');
                        }
                    });
                }
            }
        });
    },


    ServerSideProcessingJqueryDataTable: function (elem, ajaxUrl, columns, Condition, processRowColor, _Module, Start, Length) {

        // Prepare the buttons array
        var buttonsArray = [];
        if (elem != null) {
            var tables = $(elem).DataTable();
            tables.clear();
            tables.destroy();
        }

        // Check if the module is 'Payment' or 'Recharge'
        if (_Module === 'Payment' || _Module === 'Recharge') {
            buttonsArray = [
                {
                    text: 'Approve Selected',
                    className: 'btn btn-success btn-approve',
                    action: function () {
                        debugger
                        // Iterate through all the rows in the table
                        table.rows().every(function () {
                            var rowNode = $(this.node());
                            // Find all checked checkboxes in the current row
                            var checkedCheckboxes = rowNode.find('input.dt-checkbox:checked');

                            if (checkedCheckboxes.length > 0) {
                                // Perform your action for rows with checked checkboxes
                                console.log('Checked row:', this.data()); // Example action
                                var newRow = $('<tr>' +
                                    '<td>' + this.data().customerUserName+'</td>' +
                                    '<td>' + this.data().packageName +'</td>' +
                                    '<td>' + this.data().paymentMethodName +'</td>' +
                                    '<td>' + Common.DateFormat(this.data().invoiceMonth) +'</td>' +
                                    '<td>' + Common.DateFormat(this.data().amount) +'</td>' +
                                    '<td>' + Common.DateFormat(this.data().paymentDate) +'</td>' +
                                    '<td>' + this.data().paymentStatus +'</td>' +
                                    '<td>' + this.data().requestedBy +'</td>' +
                                    '</tr>');

                                // Append the new row to the tbody
                                $('.tblpaymentRequestAp tbody').append(newRow);
                                $('#ApproveRejectCustomerPaymentModal').modal("show");
                            }
                        });
                    }
                },
                {
                    text: 'Reject Selected',
                    className: 'btn btn-danger btn-reject',
                    action: function () {
                        table.rows().every(function () {
                            $(this.node()).find('input.row-select').prop('checked', false);
                        });
                    }
                },
                {
                    text: 'Transfer Selected',
                    className: 'btn btn-warning btn-transfer',
                    action: function () {
                        table.rows().every(function () {
                            $(this.node()).find('input.row-select').prop('checked', false);
                        });
                    }
                }
            ];
        }
        var table = $(elem).DataTable({
           
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": ajaxUrl,
                "type": "POST",
                "contentType": "application/json", // Set the content type to JSON
                "data": function (d) {
                    var organizationDetailId = $('#OrganizationDetail').val() || null;
                    var dealerId = $('#Dealer').val() || null;
                    var subdealerId = $('#SubDealer').val() || null;
                    var customerId = $('#Customer').val() || null;
                    var invoiceTypeId = $('#ConnectionType').val() || null;
                    var packageId = $('#Package').val() || null;
                    var expiredInDays = $('#ExpiredInDays').val() || null;
                    var module = _Module == 'Payment' ? _Module : null;
                    var invoiceId = $('#Invoice').val() || null;
                    var paymentStatusId = $('#PaymentStatus').val() || null;
                    var paymentMethodId = $('#PaymentMethod').val() || null;
                    var startDate = $('#StartDate').val() || null;
                    var endDate = $('#EndDate').val() || null;
                    var employeeId = $('#Employee').val() || null;
                    
                   

                    if (startDate) {
                        startDate = new Date(startDate);  // Assuming startDate is in correct format or adjust parsing as needed
                    }
                    if (endDate) {
                        endDate = new Date(endDate);  // Assuming endDate is in correct format or adjust parsing as needed
                    }
                    return JSON.stringify({
                        draw: d.draw,
                        start: d.start ,
                        length:  d.length ,
                        columns: d.columns, // Pass columns directly if needed
                        order: d.order,
                        search: d.search,
                        OrganizationDetailId: organizationDetailId,
                        DealerId: dealerId,
                        SubdealerId: subdealerId,
                        CustomerId: customerId,
                        ConnectionTypeId: invoiceTypeId,
                        PackageId: packageId,
                        ExpiredInDays: expiredInDays,
                        InvoiceId: invoiceId,
                        PaymentStatusId: paymentStatusId,
                        PaymentMethodId: paymentMethodId,
                        StartDate: startDate ? startDate.toISOString() : null,  // Convert to ISO string format for proper JSON serialization
                        EndDate: endDate ? endDate.toISOString() : null,  // Convert to ISO string format for proper JSON serialization
                        Module: module,
                        EmployeeId: employeeId
                        // Add more parameters as needed
                    });
                },
                "dataSrc": function (json) {
                    
                    // Assuming the server response contains properties for draw, recordsTotal, recordsFiltered, and data
                    // If not, adjust accordingly
                    json.draw = json.draw || 1; // Ensure draw property is set
                    json.recordsTotal = json.recordsTotal || 0;
                    json.recordsFiltered = json.recordsFiltered || 0;

                    //Invoices
                    $('#TotalInvoices').text(0);
                    $('#TotalAmount').text(0);
                    $('#CollectedAmount').text(0);
                    $('#PendingAmount').text(0);

                    //Customers
                    $('#TotalCustomers').text(0);
                    $('#Active').text(0);
                    $('#Disabled').text(0);
                    $('#Expired').text(0);

                    //Recharge
                    $('#TotalInvoices').text(0);
                    $('#RejectedInvoices').text(0);
                    $('#ApprovedInvoices').text(0);
                    $('#InprocessInvoices').text(0);
                    $('#PendingInvoices').text(0);
                    $('#PendingAmount').text(0);
                    $('#CollectedAmount').text(0);

                    //Payment
                    $('#TotalInvoices').text(0);
                    $('#TotalAmount').text(0);
                    $('#CollectedAmount').text(0);
                    $('#PendingAmount').text(0);
                    $('#RejectedAmount').text(0);
                    $('#PendingTransferAmount').text(0);


                    if (json.data.length > 0) {
                        if (_Module == 'Invoice') {
                            $('#TotalInvoices').text(json.data[0].totalInvoices !== undefined ? json.data[0].totalInvoices : 0);
                            $('#TotalAmount').text(json.data[0].totalAmount !== undefined ? json.data[0].totalAmount : 0);
                            $('#CollectedAmount').text(json.data[0].collectedAmount !== undefined ? json.data[0].collectedAmount : 0);
                            $('#PendingAmount').text(json.data[0].pendingAmount !== undefined ? json.data[0].pendingAmount : 0);
                        }
                        else if (_Module == 'Customers') {
                            $('#TotalCustomers').text(json.data[0].totalCustomers);

                            // 'isDisabled' property is available in at least one invoice
                            $('#Active').text(json.data[0].totalActiveCustomers);
                            $('#Disabled').text(json.data[0].totalDisabledCustomers);
                            $('#Expired').text(json.data[0].expiredCustomers);

                            if (_Module != undefined && _Module == 'Payment') {

                                json.data = json.data.filter(x => x.paymentStatus != 'Pending');
                            }
                        }
                        else if (_Module == 'Recharge') {
                            $('#TotalInvoices').text(json.data[0].totalInvoices);

                            $('#RejectedInvoices').text(json.data[0].rejectedInvoices);
                            $('#ApprovedInvoices').text(json.data[0].approvedInvoices);
                            $('#InprocessInvoices').text(json.data[0].inprocessInvoices);
                            $('#PendingInvoices').text(json.data[0].pendingInvoices);
                            $('#PendingAmount').text(json.data[0].totalPendingAmountForRecharge);
                            $('#CollectedAmount').text(json.data[0].totalCollectedAmountForRecharge);
                        }


                        else if (_Module == 'Payment') {
                            json.data = json.data.filter(x => x.paymentStatus != 'Pending');
                            $.each(json.data, function (kye, value) {
                                CustomerScript.InvoicesTotalAmount = CustomerScript.InvoicesTotalAmount + parseInt(value.amount);
                                CustomerScript.TotalInvoices = json.data.length;
                                CustomerScript.CollectedAmount = CustomerScript.CollectedAmount + parseInt(value.totalApprovedAmount);
                                CustomerScript.PendingAmount = CustomerScript.PendingAmount + parseInt(value.remaining);

                            })
                            CustomerScript.RejectedInvoices = json.data.filter(invoice => invoice.paymentStatus === 'reject').length;

                            $('#TotalInvoices').text(json.data[0].totalInvoices);

                            if (CustomerScript.InvoicesTotalAmount != null) {
                                $('#TotalAmount').text(CustomerScript.InvoicesTotalAmount);
                            }

                            $('#CollectedAmount').text(json.data[0].totalApprovedAmount);
                            $('#PendingAmount').text(json.data[0].totalPendingAmountForPayment);
                            $('#RejectedAmount').text(json.data[0].totalRejectedAmountForPayment);
                            $('#PendingTransferAmount').text(json.data[0].totalPendingTransferAmountForPayment);


                        }
                        else if (_Module == 'Attendance') {
                            $('#TotalAttendance').text(json.data[0].totalRecords);
                            $('#OnTime').text(json.data[0].totalOnTimeCheckIn);
                            $('#Late').text(json.data[0].totalLateTimeCheckIn);
                            $('#Absent').text(json.data[0].totalAbsents);
                        }
                       


                    }
                    return json.data; // Return the data array from the server response
                }
            },
            "columns": columns,
            "columnDefs": [
                {
                    "targets": [0],
                    "visible": false,
                    "searchable": false,
                    className: "hide_column"
                },
            ],
            "sPaginationType": "simple_numbers",
            "aaSorting": [],
            "bFilter": true,
            "bInfo": false,
            scrollX: true,
            paging: true,
            ordering: false,
            fixedHeader: {
                header: true
            },
            "stateSave": true,
            dom: 'Bfrtip',
            buttons: buttonsArray, // Use the dynamically generated buttons array
            //dom: 'Bfrtip', // 'B' is for buttons, 'f' is for filter input, 'r' is for processing, 't' is for table, 'i' is for info, 'p' is for pagination
            //buttons: [
            //    {
            //        text: 'Approve Selected',
            //        className: 'btn btn-success btn-approve', // Add your custom class here
            //        action: function () {
            //            table.rows().every(function () {
            //                $(this.node()).find('input.row-select').prop('checked', true);
            //            });
            //        }
            //    },
            //    {
            //        text: 'Reject Selected',
            //        className: 'btn btn-danger btn-reject', // Add your custom class here
            //        action: function () {
            //            table.rows().every(function () {
            //                $(this.node()).find('input.row-select').prop('checked', false);
            //            });
            //        }
            //    },
            //    {
            //        text: 'Transfer Selected',
            //        className: 'btn btn-warning btn-transfer', // Add your custom class here
            //        action: function () {
            //            table.rows().every(function () {
            //                $(this.node()).find('input.row-select').prop('checked', false);
            //            });
            //        }
            //    },

            //],

            initComplete: function () {
                // Handle row coloring based on conditions
                if (processRowColor) {
                    table.rows().every(function () {
                        var rowData = this.data();
                        if (rowData.invoiceStatus === 'red') {
                            $(this.node()).addClass('red-row');
                        }

                        if (rowData.daysDifference > 0) {
                            $(this.node()).addClass('expired-row');
                        }
                        if (rowData.isDisabled === true) {
                            $(this.node()).addClass('disabled-row');
                        }
                        // Add additional conditions for other row colors if needed
                    });
                }

                // Ensure 'red-row' class remains applied after each draw
                table.on('draw', function () {
                    table.rows('.red-row').nodes().each(function (row) {
                        $(row).addClass('red-row');
                    });
                    table.rows('.expired-row').nodes().each(function (row) {
                        $(row).addClass('expired-row');
                    });
                    table.rows('.disabled-row').nodes().each(function (row) {
                        $(row).addClass('disabled-row');
                    });
                    
                });

                // Handle column visibility based on condition
                if (Condition) {
                    var columnIndex = table.column(":contains('Action')").index();
                    table.column(columnIndex).visible(false);
                }

                if (_Module == 'Attendance') {
                    EmployeesAttendance.UpdateButtonVisibility();
                }
            }
        });
        // Logic to handle the expanding/collapsing of rows
        //table.on('click', 'td.dt-control', function (e) {
        //    let tr = e.target.closest('tr');
        //    let row = table.row(tr);
        //    debugger
        //    if (row.child.isShown()) {
        //        // This row is already open - close it
        //        row.child.hide();
        //        $(e.target).find('i').toggleClass('fa-plus-circle fa-minus-circle');
        //    } else {
        //        // Open this row
        //        row.child(format(row.data())).show();
        //        $(e.target).find('i').toggleClass('fa-plus-circle fa-minus-circle'); 
        //    }
        //});

        table.on('draw', function () {
           
            table.rows().every(function () {
                var rowData = this.data();
                if (rowData.invoiceStatus === 'red') {
                    $(this.node()).addClass('red-row');
                }
                if (rowData.daysDifference > 0) {
                    $(this.node()).addClass('expired-row');
                }
                if (rowData.isDisabled === true) {
                    $(this.node()).addClass('disabled-row');
                }
                // Add additional conditions for other row colors if needed
            });
           
        });
       
       
        // Additional handling after initial table setup
        //table.on('xhr', function () {
        //    // Reapply 'red-row' class after AJAX request completes
        //    table.rows().every(function () {
        //        var rowData = this.data();
        //        if (rowData.invoiceStatus === 'red') {
        //            $(this.node()).addClass('red-row');
        //        }
        //        // Add additional conditions for other row colors if needed
        //    });
           
        //});

        return table; // Return DataTable instance if needed externally
    }

}


