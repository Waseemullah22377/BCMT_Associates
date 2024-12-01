var UserScript = {
    //select new { c.CounterID, d.BranchName, c.counterNumber, c.status,c.BranchCode,c.IP,c.Speaker })
    columns:
        [
            { "data": "id", "name": "id" },
            { "data": "firstName", "name": "firstName" },
            { "data": "middleName", "name": "middleName" },
            { "data": "lastName", "name": "lastName" },
            { "data": "username", "name": "username" },
            { "data": "roleName", "name": "roleName" },
            { "data": "contactNo", "name": "contactNo" },
            { "data": "email", "name": "email" },
            //{
            //    "mData": null,
            //    "bSortable": false,
            //    "mRender": function (data, type, full) {
            //        if (data.isActive) {
            //            return '<p class="demo"><div class="toggle btn btn-round btn-primary" data-toggle="toggle" style="width: 90.7031px; height: 43.7812px;"><input type="checkbox" id="switch" checked="" data-toggle="toggle" data-onstyle="primary" data-style="btn-round"><div class="toggle-group"><label class="btn btn-primary toggle-on">On</label><label class="btn btn-black active toggle-off">Off</label><span class="toggle-handle btn btn-black"></span></div></div></p>'
            //        }
            //        else {
            //            return '<div class="toggle btn btn-black off btn-round" data-toggle="toggle" style="width: 70.5333px; height: 23.0222px;"><input type="checkbox" id="switch" data-toggle="toggle" data-onstyle="primary" data-style="btn-round" data-parsley-multiple="switch"><div class="toggle-group"><label class="btn btn-primary toggle-on">On</label><label class="btn btn-black active toggle-off">Off</label><span class="toggle-handle btn btn-black"></span></div></div>'
            //        }


            //    }
            //},


            {
                "mData": null,
                "bSortable": false,
                "mRender": function (data, type, full) {
                    var Editbutton = '';
                    var DeleteButton = '';
                    if (Common.SessionValues.includes('/User/Update')) {
                        Common.IsActionAllowed = true;
                        Editbutton = '<button type="button" data-toggle="tooltip" id="' + data.id + '" title="" class="btn btn-link btn-primary btn-lg edit" data-original-title="Edit"> <i class="fa fa-edit"></i> </button>';
                    }
                    if (Common.SessionValues.includes('/User/Delete')) {
                        Common.IsActionAllowed = true;
                        DeleteButton = '<button type="button" data-toggle="tooltip" title="" id="' + data.id + '" class="btn btn-link btn-danger delete" data-original-title="Remove">  <i class="fa fa-times"></i> </button>';
                    }

                    return '<div class="form-button-action">' + Editbutton + DeleteButton + '</div>'

                }
            }
        ]
    ,
    RenderDataTable: function (role) {
        Common.ShowLoader();
        CrudScript.makeAjaxRequest('POST', '/User/Get/', {Id: null, SubDealerId: $('#SubDealer').val(), DealerId: $('#Dealer').val(), OrganizationDetailId: $('#OrganizationDetail').val(), OrganizationId: $('#Organization').val(), AreaId: $('#Area').val(), ZoneId: $('#Zone').val(), CityId: $('#City').val() }, null).then(function (data) {
            var dt = $('.tblmanage').DataTable();
            dt.destroy();
            
            CrudScript.JqueryDataTable('.tblmanage', data, UserScript.columns);

            Common.HideLoader();
        })
    },

    Save: function (formData, _url) {
        Common.ShowLoader();
        $("#form").parsley().validate(),
            $("#form").parsley().isValid() &&
            $.ajax({
                method: 'post',
                processData: false,
                contentType: false,
                cache: false,
                data: formData,
                enctype: 'multipart/form-data',
                url: _url,
                /*  headers: { "Authorization": 'Bearer ' + userToken },*/
                success: function (response) {
                    $('#addRowModal').modal("hide");
                    if (response == 1) {
                        //Common.SuccessAlert("Saved Successfully");
                        Common.Notification('Success', "Saved Successfully");
                    }
                    else if (response <= 0 ||  response == 'Error') {
                        //Common.ErrorAlert("Error Occured");
                        Common.Notification('Error', "Error Occured");
                    }
                    UserScript.RenderDataTable($('#role').val());
                }
            });
        Common.HideLoader();
    },
    Delete: function (Id) {
        Common.ShowLoader();
        Common.DeleteAlert('/User/Delete/', Id, 'User', UserScript);
    },
    FillModal: function (data) {

        $('#addRowModal').modal("show");
        $('#ModalTitle').text("Update User");
        $('.fw-mediumbold').text('Update');
        $('#btnUpdate').css('display', 'block');
        $('#btnAdd').css('display', 'none');
        $('#ID').val(data.id);
        $('#FirstName').val(data.firstName);
        $('#MiddleName').val(data.middleName);
        $('#LastName').val(data.lastName);
        $('#ContactNo').val(data.contactNo);
        $('#Email').val(data.email);
        /*$('#Address').val(data.address);*/
        $('#OrganizationId').val(data.organizationId);
        $('#OrganizationDetailId').val(data.organizationDetailId);
        $('#DealerId').val(data.dealerId);
        $('#SubDealerId').val(data.subDealerId);
        $('#Username').val(data.username);
        $('#Password').val(data.password);
        $('#RoleId').val(data.roleId);
        loadImage(data.profilePicture);
       
        if (data.isActive == true) {
            $('#IsActive').prop('checked', true).trigger('change');
            $('#IsActive').val(true);

        }
        else {
            $('#IsActive').val(false);
        }

    },

    


}